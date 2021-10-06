import React, { useEffect, useState } from 'react'
import { useForm, useHandleModal } from '../services/customHooks'
import { TextField, Button, MenuItem, Select, FormControl, Paper, InputLabel } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';
import { CloudinaryUpload } from './CloudinaryUpload';
// import { storageService } from '../services/storageService';
import { useSelector } from 'react-redux';
import { FormAutocomplete } from './FormAutocomplete';


export const TreesForm = (...props) => {

    // const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const [surveyId, setSurveyId] = useState('')
    // const [newSurveyId, setNewTableIdList] = useState('')
    // const [survyIdList, setSurvyIdList] = useState([''])
    const [treeTypeOptions, setTreeTypeOptions] = useState([])

    // const [isPalmTree, setIsPalmTree] = useState(false)

    const [treeType, setType] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [form, handleChange] = useForm({
        quantity: '',
        type: '',
        height: '',
        diameter: '',
        health: '',
        location: '',
        canopy: '',
        description: '',
        movingPossibility: '',
        movingReason: '',
        idx: '',
        rootsDiameter: '',
        recommendation: '',
        isPalmTree: false
    })

    const [isModalShown, HandleiIsModalShown] = useHandleModal({
        health: false
    })

    useEffect(() => {
        // setSurveyId(storageService.loadFromStorage('surveyId'))
        setTreeTypeOptions(formService.treeTypes)
        setSurveyId(currentSurvey?.surveyTitle)
    }, [])

    useEffect(() => {
        async function queryTrees() {
            // setSurvyIdList(await treeService.querySurveyIdList())
        }
        queryTrees()
    }, [surveyId])


    useEffect(() => {
    }, [treeType])

    const onGetImgUrl = (img) => {
        setImgUrl(img)
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        let treeCopy = { ...form }
        treeCopy.type = treeType
        treeCopy.surveyId = currentSurvey
        treeCopy.imgUrl = imgUrl
        treeService.save(treeCopy)
    }

    const onSetTreeType = (treeTypeObj) => {
        setType(treeTypeObj);
    }

    const setIsPalmTree = (ev) => {
        handleChange(ev)
        if (ev.target.checked) {
            setTreeTypeOptions(formService.palmstreeTypes)
        }
        else {
            setTreeTypeOptions(formService.treeTypes)
        }
    }


    return (
        <div className="form-container">


            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>
                <div className="trees-form flex column">
                    <div className="type-form ">
                        <FormAutocomplete options={treeTypeOptions} onSetTreeType={onSetTreeType} />
                        <label htmlFor="isPalmTree rtl">
                            <input type="checkbox" name="isPalmTree" id="isPalmTree" onChange={(ev) => { setIsPalmTree(ev) }} />
                            עץ תמר
                        </label>
                    </div>
                    <div className="input-container">
                        <p>מספר עץ</p>
                        <TextField
                            ran
                            required
                            dir="rtl"
                            // label="מספר עץ"
                            variant="standard"
                            type="number"
                            id="idx"
                            name="idx"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>כמות עצים</p>
                        <TextField
                            required
                            // label="כמות עצים"
                            type="number"
                            id="quantity"
                            name="quantity"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>קוטר הגזע</p>
                        <TextField
                            required
                            // label="קוטר הגזע"
                            type="number"
                            id="diameter"
                            name="diameter"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>

                    <div className="input-container">
                        <p onClick={() => HandleiIsModalShown('health', !isModalShown.health)} >מצב בריאותי</p>
                        {/* <p onClick={() => HandleiIsModalShown('health', !isModalShown.health)} className="health-container">מצב בריאותי</p> */}
                        <TextField
                            required
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            // label="מצב בריאותי"
                            placeholder="0-5"
                            type="number"
                            id="health"
                            name="health"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                        {isModalShown.health &&
                            <div
                                onClick={() => HandleiIsModalShown('health', !isModalShown.health)}
                                className="form-modal health-modal" >
                                <div className="modal-container ">
                                    <img src="/imgs/modal/healthModal.png" alt="מקרא מצב בריאותי" />
                                </div>
                            </div>}

                    </div>


                    <div className="input-container">
                        <p>גובה העץ</p>
                        {/* <div className="health-container">גובה העץ</div> */}
                        <TextField
                            required
                            // label="גובה העץ (מטר)"
                            type="number"
                            id="height"
                            name="height"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>מיקום העץ</p>
                        <TextField
                            required
                            placeholder="0-5"
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            // label="מיקום העץ"
                            type="number"
                            id="location"
                            name="location"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>ניקוד חופת העץ</p>
                        <TextField
                            required
                            placeholder="0-5"
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            // label="ניקוד חופת עץ"
                            type="number"
                            id="canopy"
                            name="canopy"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>אזור שורשים מוגן</p>
                        <TextField
                            required
                            // label="אזור שורשים מוגן"
                            type="number"
                            id="rootsDiameter"
                            name="rootsDiameter"
                            variant="standard"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>היתכנות העתקה</p>
                        <FormControl>
                            {/* <InputLabel required id="movingPossibility">היתכנות העתקה</InputLabel> */}
                            <Select
                                required
                                // label="היתכנות העתקה"
                                type="text"
                                id="movingPossibility"
                                name="movingPossibility"
                                variant="standard"
                                color="primary"
                                value={form.movingPossibility}
                                onChange={(ev) => { handleChange(ev) }}>
                                {
                                    formService.movingPossibility.map((option) => (
                                        <MenuItem
                                            key={option.label}
                                            value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                        </FormControl>
                    </div>
                    <div className="input-container">
                        <p>הערות</p>
                        <TextField
                            multiline
                            required
                            rows={4}
                            // label="הערות"
                            type="text"
                            id="description"
                            name="description"
                            variant="outlined"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>
                    <div className="input-container">
                        <p>סיבת כריתה או
                            העתקת
                            העץ</p>
                        <TextField
                            required
                            multiline
                            rows={2}
                            //             label="סיבת
                            // כריתה או
                            // העתקת
                            // העץ "
                            type="text"
                            id="movingReason"
                            name="movingReason"
                            variant="outlined"
                            color="primary"
                            onChange={(ev) => { handleChange(ev) }} />
                    </div>

                    <div className="input-container">
                        <p>המלצה</p>
                        <FormControl >
                            {/* <InputLabel required id="recommendation">המלצה</InputLabel> */}
                            <Select
                                required
                                type="text"
                                id="recommendation"
                                name="recommendation"
                                variant="standard"
                                // color="primary"
                                value={form.recommendation}
                                onChange={(ev) => { handleChange(ev) }}>
                                {
                                    formService.recomandationOptions.map((option) => (
                                        <MenuItem
                                            key={option.label}
                                            value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <CloudinaryUpload onGetImgUrl={onGetImgUrl} />
                <Button onClick={(ev) => submitForm(ev)} color="primary" variant="outlined">הוסף עץ </Button>
            </form>
            {/* <Sheet data={form} /> */}
        </div>
    )
}
