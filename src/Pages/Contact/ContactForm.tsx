import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form';
import * as React from 'react';

const ContactFormComponent = (props: InjectedFormProps) => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            {submitting && 'submitting'}
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
                <Field name="bericht" component="textarea" placeholder="Bericht / Vraag / Opmerking" />
            </div>
            <button type="submit" className="button yellow" disabled={submitting}>Verzenden</button>
        </form>
    );
};

export const ContactForm = reduxForm<ContactFormData>({
    // a unique name for the form
    form: 'contact'
})(ContactFormComponent);

export const contactFormValidate = (values) => {
    const errors = {} as FormErrors<ContactFormData>;
    if (!values.username) {
        errors.firstName = 'Verplicht';
    }
    if (!values.password) {
        errors.lastName = 'Verplicht';
    }
    return errors;
};

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
}