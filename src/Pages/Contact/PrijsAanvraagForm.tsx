import { DatePickerFormInput } from '../../DatePickerFormInput';
import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form';
import * as React from 'react';
import axios from 'axios';
import { prijsFormSubmitUrl } from '../../Constants/api';

const PrijsFormComponent = (props: InjectedFormProps) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field name="firstName" component="input" type="text" placeholder="Voornaam" />
            </div>
            <div>
                <Field name="lastName" component="input" type="text" placeholder="Achternaam" />
            </div>
            <div>
                <Field name="email" component="input" type="email" placeholder="E-mail" />
            </div>
            <div>
                <label>
                    Voorkeursdatum vanaf:
                    <Field name="vanaf" component={DatePickerFormInput}/>
                </label>
            </div>
            <div>
                <label>
                    Voorkeursdatum tot:
                    <Field name="tot" component={DatePickerFormInput}/>
                </label>
            </div>
            <div>
                <label>
                    <Field name="bericht" component="textarea" placeholder="Bericht / Vraag / Opmerking" />
                    Voorkeursdatum vanaf:
                </label>
            </div>
            <button type="submit">Verzenden</button>
        </form>
    );
};

export const PrijsForm = reduxForm<PrijsFormData>({
    // a unique name for the form
    form: 'prijs',
    onSubmit
})(PrijsFormComponent);

export const contactFormValidate = (values) => {
    const errors = {} as FormErrors<PrijsFormData>;
    if (!values.username) {
        errors.firstName = 'Verplicht';
    }
    if (!values.password) {
        errors.lastName = 'Verplicht';
    }
    return errors;
};

export interface PrijsFormData {
    firstName: string;
    lastName: string;
    email: string;
}
function onSubmit(data: PrijsFormData) {
    console.log("data", data);
    return axios.post(prijsFormSubmitUrl, data);
}