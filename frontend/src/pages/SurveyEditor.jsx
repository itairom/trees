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
    const [isAddingTree, setIsAddingTree] = useState(false)
    const [currentSurveyTrees, setCurrentSurveyTrees] = useState([])
    // const [isChangeSurvey, setIsChangeSurvey] = useState(false)
    const [currentPreviewTree, setCurrentPreviewTree] = useState(false)

    useEffect(() => {
        const querySurveyTrees = async () => {
            let trees = await treeService.querySurveyTrees(currentSurvey.surveyTitle)
            setCurrentSurveyTrees(trees)
        }
        querySurveyTrees()
    }, [])

    useEffect(() => {
        console.log('currentSurvey', currentSurvey);
    }, [currentSurvey])

    return (
        <section className="main-container ">
            <h1><span>{currentSurvey.surveyTitle}</span> טופס סקר עצים </h1>

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
                                // setIsTreePreviewShowen(true)
                                dispatch(toggleIsTreePreviewShowen())

                            }}
                        >
                            <p>{tree.idx}</p>
                        </div>
                    })}
                    {isTreePreviewShowen && <TreePreview tree={currentPreviewTree} />}
                </div>}
            </div>


        </section>
    )
}