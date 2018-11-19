import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as React from 'react';
import * as moment from 'moment';
export const DatePickerFormInput = (props)  => {
    return (
    <DatePicker 
        {...props}
        selected={props.input.value ? moment(props.input.value) : moment()} 
        onChange={(date) => {
            return date && props.input.onChange(date);
        }} 
    />);
};