import React, { useCallback, useEffect, useState } from 'react'


export const FormAutocomplete = ({ onSetTreeType, options }) => {

    const [display, setDisplay] = useState(false)
    // const [options, setOptions] = useState([])
    const [search, setSearch] = useState('')
    const [treeObj, setTreeObj] = useState('')


    useEffect(() => {
        // setOptions(formService.treeTypes)
    }, [options])


    const debounce = (func) => {
        let timer
        return function (...args) {
            const context = this
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 1000)
        }
    }


    useEffect(() => {
        onSetTreeType(treeObj)
        setDisplay(false)
    }, [treeObj])



    const onSetSearch = useCallback(debounce(setSearch))

    const setTree = (tree) => {
        setTreeObj(tree)
        setSearch(tree.label)
    }

    return (
        <section className="autocomplete-form">
            <input onChange={(ev) => { onSetSearch(ev.target.value) }} name="type" value={search} type="text" placeholder=" מין העץ" onClick={() => { setDisplay(!display) }} />
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
}