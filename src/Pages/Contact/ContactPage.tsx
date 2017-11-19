import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface Props {

}
export class ContactPageComponent extends React.Component<Props, {}> {
  submit(values: FormData) {
    // print the form values to the console
    console.log(values);
  }
  render() {
    return (
      <section className="contact-page">
        <div className="container">
          <ContactForm onSubmit={this.submit}/>
        </div>
      </section>
    );
  }
}
const ContactFormComponent = (props: InjectedFormProps) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginTop: 150}}>
        <label htmlFor="firstName">Voornaam</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Achternaam</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Verzenden</button>
    </form>
  );
};

export const ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactFormComponent);