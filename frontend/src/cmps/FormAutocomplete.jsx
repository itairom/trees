import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'

export const FormAutocomplete = forwardRef(({ tree, onSetTreeType, options }, ref) => {
    useImperativeHandle(
        ref, () => ({
            onResetAutocomplete() {
                setTreeObj({})
                setSearch('')
            }
        })
    )
    const [display, setDisplay] = useState(false)
    const [search, setSearch] = useState('')
    const [treeObj, setTreeObj] = useState({})
    useEffect(() => {
        if (tree) {
            setTreeObj(tree)
            setSearch(tree.label)
            onSetTreeType(tree)
        }
    }, [tree])

    useEffect(() => {
        setDisplay(false)
        onSetTreeType(treeObj)
    }, [treeObj, onSetTreeType])



    const setTree = (treeset) => {
        setTreeObj(treeset)
        setSearch(treeset.label)
    }

    return (
        <section className="autocomplete-form">
            <input
                onChange={(ev) => { setSearch(ev.target.value) }}
                className="autocomplete-input"
                name="type"
                // value={tree ? tree.type : search}
                value={search}
                type="text"
                placeholder=" מין העץ"
                autoComplete="off"
                onClick={() => { setDisplay(!display) }} />
            {display &&
                <div className="autocomplete-container">
                    {options.filter((option) => option?.label?.includes(search)).map((v, i) => {
                        return (
                            <div onClick={() => { setTree(v) }} className="tree-option" key={v.label}>
                                <span>{v.label}</span>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </section>
    )
})