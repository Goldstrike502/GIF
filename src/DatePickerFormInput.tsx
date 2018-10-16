import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';

export const DatePickerFormInput = (props)  => {
    return (
    <DatePicker 
        {...props}
        selected={props.input.value} 
        onChange={(e) => {
            props.input.onChange(e); }} 
    />);
};