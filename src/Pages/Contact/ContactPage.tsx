import { prijsFormSubmitUrl, belMijTerugSubmitUrl } from '../../Constants/api';
import { PrijsForm, PrijsFormData } from './PrijsAanvraagForm';
import { BelMijTerugForm } from './BelMijTerugForm';
import * as React from 'react';
import './ContactPage.css';
import { ChangeEvent } from 'react';
import { ContactForm, ContactFormData } from './ContactForm';
import axios from 'axios';
import { StoreState } from '../../Types/index';
import { connect } from 'react-redux';

interface Props {
  initialSelectedForm: 'contact' | 'prijs' | 'belmijterug';
}
interface State {
  selectedForm: 'contact' | 'prijs' | 'belmijterug';
}
export class ContactPageComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      selectedForm: 'contact'
    };
  }
  submit(values: Partial<ContactFormData>) {
    axios.post(belMijTerugSubmitUrl, values);
    // print the form values to the console
    console.log(JSON.stringify(values));
  }
  componentWillReceiveProps(props: Partial<Props>) {
    if (props.initialSelectedForm) {
      this.setState({selectedForm: props.initialSelectedForm});
    }
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
        <div className="contact-forms">
          <div className="contact-form-type">
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
        <div className="social-medial">
        <section className="social">
        <div 
          className="fb-page" 
          // tslint:disable-next-line:jsx-alignment
          // tslint:disable-next-line:jsx-alignment
          // tslint:disable-next-line:max-line-length
          // tslint:disable-next-line:jsx-alignment
          data-href="https://www.facebook.com/goedinfrankrijk/" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/goedinfrankrijk/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/goedinfrankrijk/">Goed in Frankrijk</a></blockquote></div>
      </section>
        </div>
      </section>
    );
  }
}
function onSubmit(data: PrijsFormData) {
  console.log("data", data);
  return axios.post(prijsFormSubmitUrl, data);
}
function mapStateToProps(state: StoreState): Props {
  return {
    initialSelectedForm: state.layout.selectedForm
  };
}
export const ContactPage = connect(mapStateToProps)(ContactPageComponent);