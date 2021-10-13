import React, { useEffect, useState } from 'react'
import { formService } from '../services/formService'

export const FormAutocomplete = ({ onSetTreeType, options }) => {

    const [display, setDisplay] = useState(false)
    // const [options, setOptions] = useState([])
    const [search, setSearch] = useState('')
    const [treeObj, setTreeObj] = useState('')


    useEffect(() => {
        // setOptions(formService.treeTypes)
    }, [options])



    useEffect(() => {
        onSetTreeType(treeObj)
        setDisplay(false)
    }, [treeObj])



    const setTree = (tree) => {
        setTreeObj(tree)
        setSearch(tree.label)
    }

    return (
        <section className="`autocomplete-form` ">
            <input onChange={(ev) => { setSearch(ev.target.value) }} value={search} type="text" placeholder=" מין העץ" onClick={() => { setDisplay(!display) }} />
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