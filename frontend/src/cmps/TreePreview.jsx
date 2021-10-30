import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toggleIsTreePreviewShowen } from '../actions/TreeActions'
import { treeService } from '../services/treeService'

export const TreePreview = ({ tree, querySurveyTrees }) => {

    const dispatch = useDispatch()
    const [isRemove, setIsRemove] = useState(false)
    const history = useHistory()
    const { loggedInUser } = useSelector(state => state.appModule)



    useEffect(() => {
    })

    const onRemoveTree = () => {
        treeService.removeTree(tree._id,loggedInUser.username)
        querySurveyTrees()
    }

    return (
        <section className="main-container tree-preview">
            <div className="preview-info">
                <p>מספר עץ: {tree?.idx}</p>
                <p> סוג עץ: {tree?.type.typeValue}</p>
                <p>קוטר גזע: {tree?.diameter}</p>
                <p>מצב בריאותי: {tree?.health}</p>
                <p>גובה העץ: {tree?.height}</p>
                <p>מיקום העץ: {tree?.location}</p>
                <p>ניקוד חופת העץ: {tree?.canopy}</p>
                <p>היתכנות העתקה: {tree?.movingPossibility}</p>
                <p>המלצה: {tree?.recommendation}</p>
            </div>
            {tree.imgUrl !== '' && <img src={tree?.imgUrl} alt="tree" />}
            {tree.imgUrl === '' && <img src='imgs/tree_silhouette.png' alt="tree" />}
            <div className="options">
                <div
                    className="remove-btn btn"
                    onClick={() => { setIsRemove(true) }}>
                    <span>מחק</span>
                </div>
                <div
                    className="update-btn btn"
                    onClick={() => {
                        history.push(`/tree_update/${tree._id}`)
                    }}>
                    <span>עדכן</span>
                </div>

            </div>
            {isRemove && <div className="remove-modal ">
                <p>האם למחוק ?</p>
                <div className="">
                    <p className="btn" onClick={() => { onRemoveTree() }}>מחק</p>
                    <p className="btn" onClick={() => { setIsRemove(false) }}>חזור</p>
                </div>
            </div>}
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