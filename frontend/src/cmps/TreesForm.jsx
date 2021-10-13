import React, { useEffect, useState } from 'react'
import { useForm, useHandleModal } from '../services/customHooks'
import { Button, MenuItem, Select, FormControl } from '@material-ui/core';
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';
import { CloudinaryUpload } from './CloudinaryUpload';
import { useSelector } from 'react-redux';
import { FormAutocomplete } from './FormAutocomplete';
import Input from './form/input';
import { storageService } from '../services/storageService';

export const TreesForm = () => {

    const { currentSurvey } = useSelector(state => state.TreeModule)
    const [surveyId, setSurveyId] = useState('')
    const [treeTypeOptions, setTreeTypeOptions] = useState([])
    const [treeType, setType] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const initialFValues = {
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
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('health' in fieldValues)
            temp.health = isLessThenFiveInput(fieldValues.health)
        if ('canopy' in fieldValues)
            temp.canopy = isLessThenFiveInput(fieldValues.canopy)
        if ('location' in fieldValues)
            temp.location = isLessThenFiveInput(fieldValues.location)
        if ('mobile' in fieldValues)
            temp.mobile = isLessThenFiveInput(fieldValues.mobile)
        if ('quantity' in fieldValues)
            temp.quantity = isEmptyInput(fieldValues.quantity)
        if ('idx' in fieldValues)
            temp.idx = isEmptyInput(fieldValues.idx)
        if ('diameter' in fieldValues)
            temp.diameter = isEmptyInput(fieldValues.diameter)
        if ('height' in fieldValues)
            temp.height = isEmptyInput(fieldValues.height)
        if ('rootsDiameter' in fieldValues)
            temp.rootsDiameter = isEmptyInput(fieldValues.rootsDiameter)
        if ('movingPossibility' in fieldValues)
            temp.movingPossibility = isEmptyInput(fieldValues.movingPossibility)
        if ('description' in fieldValues)
            temp.description = isEmptyInput(fieldValues.description)
        if ('movingReason' in fieldValues)
            temp.movingReason = isEmptyInput(fieldValues.movingReason)
        if ('recommendation' in fieldValues)
            temp.recommendation = isEmptyInput(fieldValues.recommendation)

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }

    const isLessThenFiveInput = (field) => {
        return (field <= 5 && field >= 0) ? "" : "קלט צריך להיות בין 0 ל 5"
    }
    const isEmptyInput = (field) => {
        const length = (field + '').length
        return (length > 0) ? "" : "הכנס ערך"
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const [isModalShown, HandleiIsModalShown] = useHandleModal({
        health: '',
        location: '',
        canopy: ''
    })

    useEffect(() => {
        setTreeTypeOptions(formService.treeTypes)
        setSurveyId(currentSurvey?.surveyTitle)
        console.log(currentSurvey);
    }, [])

    useEffect(() => {
        console.log('surveyId',surveyId);
        if (Object.keys(surveyId).length === 0) {
            let storageId = storageService.loadFromStorage('surveyId')
            setSurveyId(storageId)
        }
    }, [surveyId])

    const onGetImgUrl = (img) => {
        setImgUrl(img)
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        if (!imgUrl) alert('יש לבחור תמונה')
        let treeCopy = { ...values }
        treeCopy.type = treeType
        treeCopy.surveyId = surveyId
        treeCopy.imgUrl = imgUrl
        if (validate()) {
            console.log('SUBMIT');
            treeService.save(treeCopy)
            resetForm()
        }
    }

    const onSetTreeType = (treeTypeObj) => {
        setType(treeTypeObj);
    }

    const setIsPalmTree = (ev) => {
        handleInputChange(ev)
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
                            עץ דקל
                        </label>
                    </div>
                    <div className="input-container">
                        <p>מספר עץ</p>
                        <Input
                            error={errors.idx}
                            name="idx"
                            value={values.idx}
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>כמות עצים</p>
                        <Input
                            error={errors.quantity}
                            value={values.quantity}
                            name="quantity"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>קוטר הגזע</p>
                        <Input
                            error={errors.diameter}
                            value={values.diameter}
                            name="diameter"
                            variant="standard"
                            onChange={handleInputChange} />
                    </div>

                    <div className="input-container">
                        <p onClick={() => HandleiIsModalShown('health', !isModalShown.health)} >מצב בריאותי</p>
                        <Input
                            error={errors.health}
                            value={values.health}
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            placeholder="0-5"
                            id="health"
                            name="health"
                            variant="standard"
                            onChange={handleInputChange}
                        />
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
                        <Input
                            error={errors.height}
                            id="height"
                            name="height"
                            variant="standard"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>מיקום העץ</p>
                        <Input
                            error={errors.location}
                            placeholder="0-5"
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            id="location"
                            name="location"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>ניקוד חופת העץ</p>
                        <Input
                            error={errors.canopy}
                            placeholder="0-5"
                            InputProps={{
                                inputProps: {
                                    max: 5,
                                    min: 0
                                }
                            }}
                            id="canopy"
                            name="canopy"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>אזור שורשים מוגן</p>
                        <Input
                            error={errors.rootsDiameter}
                            id="rootsDiameter"
                            name="rootsDiameter"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>היתכנות העתקה</p>
                        <FormControl>
                            <Select
                                // error={errors.movingPossibility}
                                type="text"
                                id="movingPossibility"
                                name="movingPossibility"
                                value={values.movingPossibility}
                                onChange={handleInputChange}>
                                {formService.movingPossibility.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="input-container">
                        <p>הערות</p>
                        <Input
                            error={errors.description}
                            multiline
                            rows={2}
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>סיבת כריתה או
                            העתקת
                            העץ</p>
                        <Input
                            error={errors.movingReason}
                            multiline
                            rows={2}
                            type="text"
                            id="movingReason"
                            name="movingReason"
                            onChange={handleInputChange} />
                    </div>

                    <div className="input-container">
                        <p>המלצה</p>
                        <FormControl >
                            <Select
                                // error={errors.recommendation}
                                type="text"
                                id="recommendation"
                                name="recommendation"
                                value={values.recommendation}
                                onChange={handleInputChange}>
                                {formService.recomandationOptions.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <CloudinaryUpload onGetImgUrl={onGetImgUrl} />
                <Button onClick={(ev) => submitForm(ev)} color="primary" variant="outlined">הוסף עץ </Button>
            </form>
        </div>
    )
}
