import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TreesForm } from '../cmps/TreesForm'



export const SurveyEditor = () => {

    const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.carModule)
    const [isAddingTree, setIsAddingTree] = useState(false)
    const [isChangeSurvey, setIsChangeSurvey] = useState(false)


    return (
        <section className="main-container ">
            <h1><span>{currentSurvey.surveyTitle}</span> טופס סקר עצים </h1>

            <div className="add-tree">
                <p onClick={(ev) => {
                    ev.preventDefault()
                    setIsAddingTree(true)
                }}>הוסף עץ</p>
                {isAddingTree && <TreesForm />}
                <div className="other-trees">
                    <h3>עצים נוספים</h3>
                </div>
            </div>

        </section>
    )
}