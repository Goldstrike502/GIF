import { prijsFormSubmitUrl } from '../../Constants/api';
import { PrijsForm, PrijsFormData } from './PrijsAanvraagForm';
import { BelMijTerugForm } from './BelMijTerugForm';
import * as React from 'react';
import './ContactPage.css';
import { ChangeEvent } from 'react';
import { ContactForm, ContactFormData } from './ContactForm';
import axios from 'axios';

interface Props {

}
interface State {
  selectedForm: 'contact' | 'prijs' | 'belmijterug';
}
export class ContactPageComponent extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      selectedForm: 'contact'
    };
  }
  submit(values: Partial<ContactFormData>) {
    // print the form values to the console
    console.log(values);
  }
  onFormRadioChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === 'contact' ||
      e.target.value === 'prijs' ||
      e.target.value === 'belmijterug') {
      this.setState({ selectedForm: e.target.value });
    }
  }
  render() {
    return (
      <section className="contact-page">
        <div className="container">
          <div style={{ marginTop: 150 }}>
            <label htmlFor="contact">
              <input 
                id="contact" 
                name="contactType" 
                type="radio" 
                value="contact"
                onChange={(e) => this.onFormRadioChange(e)} 
                checked={this.state.selectedForm === 'contact'}
              />
              {' '}
              Contact / Vraag / Opmerking
              </label>
            <label htmlFor="prijs">
              <input 
                id="prijs" 
                name="contactType" 
                type="radio" 
                value="prijs"  
                onChange={(e) => this.onFormRadioChange(e)} 
                checked={this.state.selectedForm === 'prijs'} 
              />
              {' '}
              Prijs aanvraag
              </label>
            <label htmlFor="belmijterug">
              <input 
                id="belmijterug" 
                name="contactType"  
                type="radio" 
                value="belmijterug"  
                onChange={(e) => this.onFormRadioChange(e)} 
                checked={this.state.selectedForm === 'belmijterug'} 
              />
              {' '}
              Bel mij terug
              </label>
          </div>
          {(this.state.selectedForm === 'contact') ? <ContactForm onSubmit={(values) => this.submit(values)} /> : null}
          {(this.state.selectedForm === 'belmijterug') ? 
            <BelMijTerugForm onSubmit={(values) => this.submit(values)} /> : null}
          {(this.state.selectedForm === 'prijs') ? 
            <PrijsForm onSubmit={(values: PrijsFormData) => onSubmit(values)} /> : null}
          
        </div>
      </section>
    );
  }
}
function onSubmit(data: PrijsFormData) {
  console.log("data", data);
  return axios.post(prijsFormSubmitUrl, data);
}