import React, { useEffect, useState } from 'react'
import { useForm, useHandleModal } from '../services/customHooks'
import { TextField, Button, MenuItem, Select, FormControl, Paper, InputLabel } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';
import { CloudinaryUpload } from './CloudinaryUpload';
// import { storageService } from '../services/storageService';
import {  useSelector } from 'react-redux';

//specious

export const TreesForm = (...props) => {
    
    // const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const [surveyId, setSurveyId] = useState('')
    const [newSurveyId, setNewTableIdList] = useState('')
    const [survyIdList, setSurvyIdList] = useState([''])
    // const [CurrentSurveyId, setCurrentSurveyId] = useState('')
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
        comments: '',
        totalValue: '',
        monetaryValue: '',
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
        console.log('currentSurvey',currentSurvey);
        // setSurveyId(storageService.loadFromStorage('surveyId'))
        setSurveyId(currentSurvey?.surveyTitle)
    }, [])

    useEffect(() => {
        async function queryTrees() {
            setSurvyIdList(await treeService.querySurveyIdList())
        }
        queryTrees()
    }, [surveyId])


    useEffect(() => {
        console.log('tree type', treeType);
    }, [treeType])

    const onGetImgUrl = (img) => {
        console.log(img);
        setImgUrl(img)
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        let treeCopy = { ...form }
        treeCopy.type = treeType
        treeCopy.surveyId = currentSurvey
        treeCopy.imgUrl = imgUrl
        console.log('form', treeCopy);
        treeService.save(treeCopy)
    }


    return (
        <div className="form-container">

             
            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>
                <div className="trees-form flex column">
                    <TextField
                        ran
                        required
                        label="מספר עץ"
                        type="number"
                        id="idx"
                        name="idx"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <Autocomplete
                        id="type"
                        value={treeType}
                        inputValue={treeType}
                        options={formService.treeTypes}
                        onChange={(ev, newValue) => { setType(newValue.BinomialNomenclature) }} // TRY DOC 
                        // getOptionLabel={(option) => option.BinomialNomenclature}
                        getOptionLabel={(option) => typeof option === 'string'
                            || option instanceof String ? option.BinomialNomenclature : ""}
                        fullWidth
                        PaperComponent={({ children }) => (
                            <Paper style={{ background: "" }}>{children}</Paper>
                        )}
                        // style={{ width: 200, marginTop: 20 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="מין העץ"
                                variant="outlined"
                                style={{ backgroundColor: "pink !important" }}
                            // name={params.}
                            />
                        )}
                        required
                    />
                    {/* <Autocomplete
                        value={treeType}
                        onChange={(ev, newValue) => {
                             setType(newValue.BinomialNomenclature) }} // TRY DOC 
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={formService.treeTypes}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Controllable" />}
                    /> */}

                    <TextField
                        required
                        label="כמות עצים"
                        type="number"
                        id="quantity"
                        name="quantity"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="קוטר הגזע"
                        type="number"
                        id="diameter"
                        name="diameter"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <div onClick={() => HandleiIsModalShown('health', !isModalShown.health)} className="health-container">מצב בריאותי</div>
                    {isModalShown.health &&
                        <div
                            onClick={() => HandleiIsModalShown('health', !isModalShown.health)}
                            className="form-modal health-modal"
                        >
                            <div className="modal-container ">
{/* 
                                <div className="modal-header ">
                                <h4>מקרא מצב בריאותי</h4>
                                <p>X</p>

                            </div> */}
                                <img src="/imgs/modal/healthModal.png" alt="מקרא מצב בריאותי" />
                            </div>
                        </div>}
                    <TextField
                        required
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="מצב בריאותי"
                        placeholder="0-5"
                        type="number"
                        id="health"
                        name="health"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <div className="health-container">גובה העץ</div>

                    <TextField
                        required
                        label="גובה העץ (מטר)"
                        type="number"
                        id="height"
                        name="height"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        placeholder="0-5"
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="מיקום העץ"
                        type="number"
                        id="location"
                        name="location"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        placeholder="0-5"
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="ערך מין העץ"
                        type="number"
                        id="location"
                        name="location"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        placeholder="0-5"
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="ניקוד חופת עץ"
                        type="number"
                        id="canopy"
                        name="canopy"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="אזור שורשים מוגן"
                        type="number"
                        id="rootsDiameter"
                        name="rootsDiameter"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <FormControl>
                        <InputLabel required id="movingPossibility">היתכנות העתקה</InputLabel>
                        <Select
                            required
                            label="היתכנות העתקה"
                            type="text"
                            id="movingPossibility"
                            name="movingPossibility"
                            variant="filled"
                            color="primary"
                            value={form.movingPossibility}
                            onChange={(ev) => { handleChange(ev) }}>
                            {
                                formService.movingPossibility.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        multiline
                        required
                        rows={4}
                        label="הערות"
                        type="text"
                        id="description"
                        name="description"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        multiline
                        rows={2}
                        label="סיבת
                        כריתה או
                        העתקת
                        העץ "
                        type="text"
                        id="movingReason"
                        name="movingReason"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <FormControl >
                        <InputLabel required id="recommendation">המלצה</InputLabel>
                        <Select
                            required
                            type="text"
                            id="recommendation"
                            name="recommendation"
                            variant="filled"
                            color="primary"
                            value={form.recommendation}
                            onChange={(ev) => { handleChange(ev) }}>
                            {
                                formService.recomandationOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <CloudinaryUpload onGetImgUrl={onGetImgUrl} />
                <Button onClick={(ev) => submitForm(ev)} color="primary">סיום </Button>
            </form>
            {/* <Sheet data={form} /> */}
        </div>
    )
}
