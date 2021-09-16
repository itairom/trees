
import React, { useEffect, useState } from 'react'
import { useForm } from '../services/customHooks'
import { Sheet } from './Sheet'
import { TextField, Button, MenuItem, InputAdornment, Select, FormControl } from '@material-ui/core';
import { formService } from '../services/formService';
import { treeService } from '../services/treeService';


export const TreesForm = (...props) => {



    const [form, handleChange] = useForm({
        quantity: '',
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
        movingReason: ''
    })



    const submitForm = (ev) => {
        ev.preventDefault()
        console.log('form', form);
        treeService.save(form)
    }


    return (
        <div className="trees-form">
            <form dir="rtl" action="#" onSubmit={(ev) => submitForm(ev)}>
                <div className="trees-form flex column">
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
                        label="ארץ העץ"
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
                        required
                        label="תיאור"
                        type="text"
                        id="description"
                        name="description"
                        variant="filled"
                        color="primary"
                        onChange={(ev) => { handleChange(ev) }} />
                    <TextField
                        required
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
            <Sheet data={form} />
        </div>
    )
}
