import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TreesForm } from '../cmps/TreesForm'
import { treeService } from '../services/treeService'
import { storageService } from '../services/storageService';
import { TreePreview } from '../cmps/TreePreview';
import { toggleIsTreePreviewShowen } from '../actions/TreeActions';

export const SurveyEditor = () => {

    const dispatch = useDispatch()
    const { currentSurvey, isTreePreviewShowen } = useSelector(state => state.TreeModule)
    const [isAddingTree, setIsAddingTree] = useState(true)
    // const [isAddingTree, setIsAddingTree] = useState(false)
    const [currentSurveyTrees, setCurrentSurveyTrees] = useState([])
    const [currentPreviewTree, setCurrentPreviewTree] = useState(false)
    const [localCurrentSurvey, setLocalCurrentSurvey] = useState('')

    useEffect(() => {
        const querySurveyTrees = async () => {

            let trees = await treeService.querySurveyTrees(currentSurvey.surveyTitle)
            setCurrentSurveyTrees(trees)

            if (Object.keys(currentSurvey).length === 0) {
                const storageTreeId = storageService.loadFromStorage('surveyId')
                let trees = await treeService.querySurveyTrees(storageTreeId.surveyTitle)
                setLocalCurrentSurvey(storageTreeId)
                setCurrentSurveyTrees(trees)
            }
        }
        querySurveyTrees()
    }, [])

    return (
        <section className="main-container rtl">
            {/* <h1><span>{currentSurvey.surveyTitle}</span> טופס סקר עצים </h1> */}
            <h1>טופס סקר עצים <span>{localCurrentSurvey.surveyTitle}</span>  </h1>
            <div className="add-tree">
                <p onClick={(ev) => {
                    ev.preventDefault()
                    setIsAddingTree(true)
                }}>הוסף עץ</p>
                {isAddingTree && <TreesForm />}
            </div>
            <div className="other-trees">
                <h3>עצים נוספים</h3>
                {currentSurveyTrees && <div className="current-trees flex">
                    {currentSurveyTrees.map((tree) => {
                        return <div
                            key={tree._id}
                            className="tree-index"
                            onClick={() => {
                                setCurrentPreviewTree(tree)
                                dispatch(toggleIsTreePreviewShowen())
                            }} >
                            <p>{tree.idx}</p>
                        </div>
                    })}
                    {isTreePreviewShowen && <TreePreview tree={currentPreviewTree} />}
                </div>}
            </div>
        </section>
    )
}