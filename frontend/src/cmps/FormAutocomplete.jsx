import React, {  useEffect, useState, useImperativeHandle, forwardRef } from 'react'

export const FormAutocomplete = forwardRef(({ onSetTreeType, options }, ref) => {
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
        onSetTreeType(treeObj)
        setDisplay(false)
    }, [treeObj, onSetTreeType])
    

    const setTree = (tree) => {
        setTreeObj(tree)
        setSearch(tree.label)
    }

    return (
        <section className="autocomplete-form">
            <input
                onChange={(ev) => { setSearch(ev.target.value) }}
                className="autocomplete-input"
                name="type"
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