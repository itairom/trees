import React, { useEffect, useState } from 'react'
import { useForm, useHandleModal } from '../services/customHooks'
import { Button, MenuItem, Select, FormControl } from '@material-ui/core';
import { formService } from '../services/formService';
import { useSelector } from 'react-redux';
import { FormAutocomplete } from './FormAutocomplete';
import Input from './form/input';
import FormModal from './form/FormModal';
import { ImgUpload } from './ImgUpload';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateSurvey } from '../actions/TreeActions';
import { utilService } from '../services/utilService';


export const TreesForm = ({ querySurvey }) => {

    const { survey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    const [treeTypeOptions, setTreeTypeOptions] = useState([])
    const [treeType, setType] = useState(null)
    const [localSurvey, setLocalSurvey] = useState({})
    const [isAddingDiameter, setIsAddingDiameter] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const childRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        setTreeTypeOptions(formService.treeTypes)
    }, [])

    useEffect(() => {
        setLocalSurvey(survey)
    }, [survey])


    const initialFValues = {
        quantity: '',
        type: '',
        height: '',
        diameter: '',
        diameter2: '',
        diameter3: '',
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
            temp.health = isLessThenFiveInput(fieldValues.health) || isEmptyInput(fieldValues.health)
        if ('canopy' in fieldValues)
            temp.canopy = isLessThenFiveInput(fieldValues.canopy) || isEmptyInput(fieldValues.canopy)
        if ('location' in fieldValues)
            temp.location = isLessThenFiveInput(fieldValues.location) || isEmptyInput(fieldValues.location)
        if ('mobile' in fieldValues)
            temp.mobile = isLessThenFiveInput(fieldValues.mobile) || isEmptyInput(fieldValues.mobile)
        if ('quantity' in fieldValues)
            temp.quantity = isEmptyInput(fieldValues.quantity)
        // if ('idx' in fieldValues)
        // temp.idx = isEmptyInput(fieldValues.idx)
        if ('diameter' in fieldValues)
            temp.diameter = isEmptyInput(fieldValues.diameter)
        if ('height' in fieldValues)
            temp.height = isEmptyInput(fieldValues.height)
        if ('rootsDiameter' in fieldValues)
            temp.rootsDiameter = isEmptyInput(fieldValues.rootsDiameter)
        if ('movingPossibility' in fieldValues)
            temp.movingPossibility = isEmptyInput(fieldValues.movingPossibility)
        if ('recommendation' in fieldValues)
            temp.recommendation = isEmptyInput(fieldValues.recommendation)

        setErrors({
            ...temp
        })

        if (fieldValues === values)
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
        // setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const [isModalShown, HandleIsModalShown] = useHandleModal({
        health: '',
        location: '',
        canopy: '',
        isAddingTree: ''
    })

    const onResetForm = () => {
        resetForm()
        childRef.current.onResetAutocomplete()
        const inputsRef = document.querySelectorAll('input')
        const textareaRef = document.querySelectorAll('textarea')
        inputsRef.forEach(input => {
            input.value = ''
        })
        textareaRef.forEach(textarea => {
            textarea.value = ''
        })
    }

    const onGetImgUrl = (img) => {
        setImgUrl(img)
    }

    const onSetTreeType = (treeTypeObj) => {
        setType(treeTypeObj);
    }

    const setIsPalmTree = (ev) => {
        handleInputChange(ev)
            (ev.target.checked) ? setTreeTypeOptions(formService.palmstreeTypes) : setTreeTypeOptions(formService.treeTypes)
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        if (!treeType) return alert('בחר מין עץ')
        const treeCopy = { ...values }
        treeCopy._id = utilService.makeId()
        treeCopy.type = treeType
        treeCopy.imgUrl = imgUrl
        if (validate()) {
            localSurvey.surveyTrees.push(treeCopy)
            dispatch(updateSurvey(localSurvey, loggedInUser))
            HandleIsModalShown(!isModalShown.isAddingTree)
            querySurvey()
            onResetForm()
        }
        setImgUrl('')
        window.scrollTo(0, 0)
    }
    return (
        <div className="form-container">
            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>
                <div className="trees-form flex column">
                    <div className="type-form ">
                        <label htmlFor="isPalmTree rtl">
                            <input type="checkbox" name="isPalmTree" id="isPalmTree" onChange={(ev) => { setIsPalmTree(ev) }} />
                            עץ דקל
                        </label>
                        <FormAutocomplete ref={childRef} options={treeTypeOptions} onSetTreeType={onSetTreeType} />
                    </div>
                    <div className="input-container">
                        <p>מספר עץ</p>
                        <Input
                            type
                            // error={errors.idx}
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
                        <div className="flex">
                            <p>קוטר הגזע</p>
                            <p
                                onClick={() => { setIsAddingDiameter(true) }}
                                style={{
                                    cursor: 'pointer',
                                    color: '#27782a',
                                    marginRight: '10px'
                                }}>קוטר נוסף+</p>
                        </div>
                        <Input
                            error={errors.diameter}
                            value={values.diameter}
                            placeholder="קוטר בס״מ של הגזע"
                            name="diameter"
                            variant="standard"
                            onChange={handleInputChange} />
                    </div>
                    {isAddingDiameter && <div className="input-container">
                        <p>קוטר הגזע 2</p>
                        <Input
                            error={errors.diameter}
                            value={values.diameter2}
                            placeholder="קוטר בס״מ של הגזע 2"
                            name="diameter2"
                            variant="standard"
                            onChange={handleInputChange} />
                    </div>}
                    {isAddingDiameter && <div className="input-container">
                        <p>קוטר הגזע 3</p>
                        <Input
                            error={errors.diameter}
                            value={values.diameter3}
                            placeholder="קוטר בס״מ של הגזע 3"
                            name="diameter3"
                            variant="standard"
                            onChange={handleInputChange} />
                    </div>}

                    <div className="input-container">
                        <p onClick={() => HandleIsModalShown('health', !isModalShown.health)} >*מצב בריאותי</p>
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
                            onChange={handleInputChange} />
                        {isModalShown.health &&
                            <FormModal
                                HandleiIsModalShown={HandleIsModalShown}
                                modal={{
                                    type: 'health',
                                    isShowen: isModalShown.health
                                }}
                                imgSrc="/imgs/modal/healthModal.png" />}
                    </div>
                    <div className="input-container">
                        <p>גובה העץ</p>
                        <Input
                            error={errors.height}
                            name="height"
                            variant="standard"
                            placeholder="גובה העץ במטרים"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p onClick={() => HandleIsModalShown('location', !isModalShown.location)} > *מיקום העץ</p>

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

                        {isModalShown.location &&
                            <FormModal
                                HandleiIsModalShown={HandleIsModalShown}
                                modal={{
                                    type: 'location',
                                    isShowen: isModalShown.location
                                }}
                                imgSrc="/imgs/modal/locationModal.png" />}
                    </div>
                    <div className="input-container">
                        <p onClick={() => HandleIsModalShown('canopy', !isModalShown.canopy)} >*ניקוד חופת העץ</p>
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
                        {isModalShown.canopy &&
                            <FormModal
                                HandleiIsModalShown={HandleIsModalShown}
                                modal={{
                                    type: 'canopy',
                                    isShowen: isModalShown.canopy
                                }}
                                imgSrc="/imgs/modal/canopyModal.png" />}
                    </div>
                    <div className="input-container">
                        <p>אזור שורשים מוגן</p>
                        <Input
                            error={errors.rootsDiameter}
                            placeholder="אזור שורשים מוגן במטרים"
                            id="rootsDiameter"
                            name="rootsDiameter"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>היתכנות העתקה</p>
                        <FormControl>
                            <Select
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
                    <div className="input-container">
                        <p>סיבת כריתה או
                            העתקת
                            העץ</p>
                        <Input
                            multiline
                            rows={2}
                            type="text"
                            id="movingReason"
                            name="movingReason"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-container">
                        <p>הערות</p>
                        <Input
                            multiline
                            rows={2}
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleInputChange} />
                    </div>
                </div>
                <ImgUpload onGetImgUrl={onGetImgUrl} />
                <Button onClick={(ev) => submitForm(ev)} color="primary" variant="outlined">הוסף עץ </Button>

                {isModalShown.isAddingTree &&
                    <div
                        onClick={() => { HandleIsModalShown(!isModalShown.health) }}
                        className="adding-modal">
                        <div className="background"></div>
                        <h1>העץ נוסף בהצלחה!</h1>
                    </div>}
            </form>
        </div>
    )
}
