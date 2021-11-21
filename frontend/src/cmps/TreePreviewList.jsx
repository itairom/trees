import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { toggleIsTreePreviewShowen } from "../actions/TreeActions"
import { TreePreview } from "./TreePreview"




 export   const  TreePreviewList  = ({ querySurveyTrees, currentSurveyTrees }) => {

    const [currentPreviewTree, setCurrentPreviewTree] = useState(false)
    const { isTreePreviewShowen } = useSelector(state => state.TreeModule)
    const dispatch = useDispatch()

    useEffect(()=>{
    console.log(currentSurveyTrees,'currentSurveyTrees');
    },[currentSurveyTrees])

    return (
        <div className="other-trees">
            <h3>עצים נוספים</h3>
            {currentSurveyTrees && <div className="current-trees pointer flex">
                {currentSurveyTrees.map((tree) => {
                    return <div
                        key={tree._id}
                        className="tree-index"
                        onClick={() => {
                            setCurrentPreviewTree(tree)
                            dispatch(toggleIsTreePreviewShowen())
                        }} >
                        <p>{tree.idx}</p>
                        <img src="imgs/treeLogo.png" alt="index" />
                    </div>
                })}
                {isTreePreviewShowen && <TreePreview tree={currentPreviewTree} querySurveyTrees={querySurveyTrees} />}
            </div>}
        </div>
    )
}
