import React, { useEffect, useState } from 'react'
import { useForm } from '../services/customHooks'
import { Sheet } from './Sheet'
import { TextField, Button, MenuItem, InputAdornment, Select, FormControl, Paper } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';
import { CloudinaryUpload } from './CloudinaryUpload';

//specious

export const TreesForm = (...props) => {

    const [type, setType] = useState('')
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
        rootsDiameter:''
    })

    const onGetImgUrl = (imgUrl) => {
        // return imgUrl
        console.log(imgUrl);
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        let treeCopy = { ...form }
        treeCopy.type = type
        console.log('form', treeCopy);
        treeService.save(treeCopy)
    }


    return (
        <div className="trees-form">
            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>
                <div className="trees-form flex column">
                    <TextField
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
                        value={form.type}
                        options={formService.treTypes}
                        onChange={(ev, newValue) => { setType(newValue.BinomialNomenclature) }} // TRY DOC 
                        getOptionLabel={(option) => option.BinomialNomenclature}
                        fullWidth
                        PaperComponent={({ children }) => (
                            <Paper style={{ background: "" }}>{children}</Paper>
                        )}
                        style={{ width: 200, marginTop: 20 }}
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
                        label="גובה"
                        type="number"
                        id="height"
                        name="height"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="מיקום"
                        type="number"
                        id="location"
                        name="location"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="ערך מין העץ"
                        type="number"
                        id="location"
                        name="location"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="ניקוד חופץ עץ"
                        type="number"
                        id="canopy"
                        name="canopy"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
                        label="ערך העץ"
                        type="number"
                        id="totalValue"
                        name="totalValue"
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
                </div>
                <Button onClick={(ev) => submitForm(ev)} color="primary">סיום </Button>
            </form>
            <CloudinaryUpload onGetImgUrl={onGetImgUrl} />
            <Sheet data={form} />
        </div>
    )
}
