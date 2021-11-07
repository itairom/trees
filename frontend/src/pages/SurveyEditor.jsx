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
    const { loggedInUser } = useSelector(state => state.appModule)

    const [isAddingTree, setIsAddingTree] = useState(true)
    const [currentSurveyTrees, setCurrentSurveyTrees] = useState([])
    const [currentPreviewTree, setCurrentPreviewTree] = useState(false)
    const [localCurrentSurvey, setLocalCurrentSurvey] = useState(null)


    useEffect(() => { // querySurveyTreessss
        querySurveyTrees()
    }, [])



    const querySurveyTrees = async () => {
        let trees = await treeService.querySurveyTrees(currentSurvey?.surveyTitle,loggedInUser?.username)
        setCurrentSurveyTrees(trees)
        setLocalCurrentSurvey(currentSurvey)
        if (!currentSurvey) {
            const storageTreeId = storageService.loadFromStorage('surveyId')
            if (storageTreeId) {
                let trees = await treeService.querySurveyTrees(storageTreeId.surveyTitle,loggedInUser?.username)
                setLocalCurrentSurvey(storageTreeId)
                setCurrentSurveyTrees(trees)
            }
        }
    }
    // const querySurveyTrees = async () => {
    //     let trees = await treeService.querySurveyTrees(currentSurvey?.surveyTitle,loggedInUser?.username)
    //     setCurrentSurveyTrees(trees)
    //     if (Object.keys(currentSurvey).length === 0) {
    //         const storageTreeId = storageService.loadFromStorage('surveyId')
    //         if (storageTreeId) {
    //             let trees = await treeService.querySurveyTrees(storageTreeId.surveyTitle,loggedInUser?.username)
    //             setLocalCurrentSurvey(storageTreeId)
    //             setCurrentSurveyTrees(trees)
    //         }
    //     }
    // }

    return (
        <section className="main-container rtl">
            {/* <h1><span>{currentSurvey.surveyTitle}</span> טופס סקר עצים </h1> */}
            <h1>טופס סקר עצים <span>{localCurrentSurvey?.surveyTitle}</span>  </h1>
            <div className="add-tree">
                {<p onClick={(ev) => {
                    ev.preventDefault()
                    setIsAddingTree(true)
                }}>הוסף עץ</p> && !isAddingTree}
                {isAddingTree && <TreesForm querySurveyTrees={querySurveyTrees} />}
            </div>
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
        </section>
    )
}