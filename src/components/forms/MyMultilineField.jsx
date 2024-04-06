import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function MyMultilineField(props) {
    const {label,width,placeholder,name,control} = props

    return (

        <Controller
            name = {name}
            control = {control}
            render = {({
                field:{onChange,value},
                fieldState:{error},
                formState
            }) => (
                <TextField
                    id="standard-multiline-static"
                    sx = {{width:{width}}}
                    label={label}
                    multiline
                    onChange = {onChange}
                    value ={value}
                    rows={1}
                    placeholder = {placeholder}
                    variant="standard"
                    error = {!!error}
                    helperText = {error?.message}
                />
            )
        }
            
        />
  );
}