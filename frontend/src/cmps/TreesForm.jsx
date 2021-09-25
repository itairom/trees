import React, { useEffect, useState } from 'react'
import { useForm } from '../services/customHooks'
import { Sheet } from './Sheet'
import { TextField, Button, MenuItem, InputAdornment, Select, FormControl, Paper, InputLabel } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';
import { CloudinaryUpload } from './CloudinaryUpload';

//specious

export const TreesForm = (...props) => {

    const [surveyId, setSurveyId] = useState('kfar saba')
    // const [CurrentSurveyId, setCurrentSurveyId] = useState('')
    const [inputValue, setInputValue] = useState('');
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
        recommendation: ''
    })

    useEffect(()=>{
        async function getSurveyIdList(){
            await treeService.queryTableIdList()
        }
        getSurveyIdList()

    },[])
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
        treeCopy.surveyId = surveyId
        treeCopy.imgUrl = imgUrl
        console.log('form', treeCopy);
        treeService.save(treeCopy)
    }


    return (
        <div className="form-container">
            <h1>טופס סקר עצים </h1>

            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>

                <div className="survey-control">
                    <div className="current-survey">
                        <p>טופס נוכחי: </p>
                        <p>{surveyId}</p>
                    </div>
                    <div className="survey-select">
                        <p>בחר טופס: </p>

                        <div className="survey-list"></div>
                    </div>                    <form action="">
                        <label htmlFor="new-survey">שם טופס: </label>
                        <input id="new-survey" type="text" />
                    </form>
                </div>

                <div className="trees-form flex column">
                    <TextField
                        ran
                        required
                        label="אינדקס"
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
                        label="כמות"
                        type="number"
                        id="quantity"
                        name="quantity"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="קוטר"
                        type="number"
                        id="diameter"
                        name="diameter"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
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
                    <TextField
                        required
                        label="גובה"
                        type="number"
                        id="height"
                        name="height"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="מיקום"
                        type="number"
                        id="location"
                        name="location"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
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
                        InputProps={{
                            inputProps: {
                                max: 5,
                                min: 0
                            }
                        }}
                        label="ניקוד חופץ עץ"
                        type="number"
                        id="canopy"
                        name="canopy"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />

                    <TextField
                        required
                        label="שווי כספי"
                        type="number"
                        id="monetaryValue"
                        name="monetaryValue"
                        variant="filled"
                        color="primary"
                        InputProps={{
                            // endAdornment: <InputAdornment position="start">₪</InputAdornment>,
                            startAdornment: <InputAdornment position="end">₪</InputAdornment>,
                        }}
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="קוטר שורשים "
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
                        label="תיאור"
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
