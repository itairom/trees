import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleIsTreePreviewShowen } from '../actions/TreeActions'

export const TreePreview = ({ tree }) => {

    const dispatch = useDispatch()
    // const { currentSurvey,isTreePreviewShowen } = useSelector(state => state.TreeModule)


    useEffect(() => {
    })

    return (
        <section className="main-container tree-preview">
            <p>{tree.type.typeValue}</p>
            <p>{tree.quantity}</p>
            <p>{tree.height}</p>
            <p>{tree.diameter}</p>
            <p>{tree.health}</p>
            <p>{tree.location}</p>
            <p>{tree.type.typeValue}</p>
            <p>{tree.canopy}</p>
            {/* <p className={ValueColor(tree)}>{calculateValue(tree)}</p> */}
            <p>{tree.rootsDiameter}</p>
            {/* <p>{calculateMonetaryValue(tree)}</p> */}
            <p>{tree.movingPossibility}</p>
            <p>{tree.description}</p>
            <p>{tree.movingReason}</p>
            <div
                onClick={(ev) => {
                    ev.preventDefault()
                    dispatch(toggleIsTreePreviewShowen())
                }}
                className="close-preview">X</div>
        </section>
    )
}