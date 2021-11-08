import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, value, error = null, onChange, InputProps, id, multiline, rows, placeholder, type } = props;
    return (
        <TextField
            autoComplete="off"
            variant="standard"
            name={name}
            // value={value}
            onChange={onChange}
            InputProps={InputProps}
            id={id}
            color="primary"
            {...(type && { type: "text" })}
            {...(!type && { type: "number" })}
            {...(error && { error: true, helperText: error })}
            {...multiline &&
            {
                rows: rows,
                multiline
            }}
            // {...placeholder && { placeholder: placeholder }}
            placeholder={placeholder}
        />
    )
}