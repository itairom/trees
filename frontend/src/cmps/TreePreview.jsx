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
            <div className="preview-info">
                <p>מספר עץ: <span></span>{tree.type.index}</p>
                <p> סוג עץ: <span></span>{tree.type.typeValue}</p>
                <p>קוטר גזע: <span></span>{tree.diameter}</p>
                <p>מצב בריאותי: <span></span>{tree.health}</p>
                <p>גובה העץ: <span></span>{tree.height}</p>
                <p>מיקום העץ: <span></span>{tree.location}</p>
                <p>ניקוד חופת העץ: <span></span>{tree.canopy}</p>
                <p>היתכנות העתקה: <span></span>{tree.movingPossibility}</p>
                <p>המלצה: <span></span>{tree.recommendation}</p>
            </div>
            <img src={tree.imgUrl} alt="tree image" />
            <div
                className="close-preview"
                onClick={(ev) => {
                    ev.preventDefault()
                    dispatch(toggleIsTreePreviewShowen())
                }}
            ><span>X</span></div>
        </section>
    )
}