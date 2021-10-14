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
                <p>מספר עץ: {tree.idx}</p>
                <p> סוג עץ: {tree.type.typeValue}</p>
                <p>קוטר גזע: {tree.diameter}</p>
                <p>מצב בריאותי: {tree.health}</p>
                <p>גובה העץ: {tree.height}</p>
                <p>מיקום העץ: {tree.location}</p>
                <p>ניקוד חופת העץ: {tree.canopy}</p>
                <p>היתכנות העתקה: {tree.movingPossibility}</p>
                <p>המלצה: {tree.recommendation}</p>
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