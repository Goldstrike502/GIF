import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form';
import * as React from 'react';

const BelMijTerugFormComponent = (props: InjectedFormProps) => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field name="firstName" component="input" type="text" placeholder="Voornaam" />
            </div>
            <div>
                <Field name="phone" component="input" type="text" placeholder="Telefoon nummer" />
            </div>
            <div>
            <Field name="tijdstip" component="select">
                <option>{}</option>
                <option value="ochtend">Ochtend</option>
                <option value="middag">Middag</option>
                <option value="avond">Avond</option>
                <option value="geen">Geen voorkeur</option>
            </Field>
            </div>
            <button type="submit" disabled={pristine || submitting}>>Verzenden</button>
        </form>
    );
};

export const BelMijTerugForm = reduxForm<BelmIJTerugFormData>({
    // a unique name for the form
    form: 'belmijterug',
})(BelMijTerugFormComponent);

export const contactFormValidate = (values) => {
    const errors = {} as FormErrors<BelmIJTerugFormData>;
    if (!values.username) {
        errors.firstName = 'Verplicht';
    }
    if (!values.password) {
        errors.phone = 'Verplicht';
    }
    return errors;
};

interface BelmIJTerugFormData {
    firstName: string;
    phone: string;
    tijdstip: 'ochtend' | 'middag' | 'avond' | 'geen';
}