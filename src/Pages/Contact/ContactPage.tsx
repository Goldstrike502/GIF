import { PrijsForm, PrijsFormData } from './PrijsAanvraagForm';
import { BelMijTerugForm } from './BelMijTerugForm';
import * as React from 'react';
import './ContactPage.css';
import { ChangeEvent } from 'react';
import { ContactForm, ContactFormData } from './ContactForm';
import { StoreState } from '../../Types/index';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { sendFormToGoogleSheets } from '../../Actions';

interface Props {
  initialSelectedForm: 'contact' | 'prijs' | 'belmijterug';
  handleFormPost: (form: any) => void;
  showThankMessage: boolean;
}
interface State {
  selectedForm: 'contact' | 'prijs' | 'belmijterug' | undefined;
}
export class ContactPageComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      selectedForm: undefined
    };
  }
  submit(values: Partial<ContactFormData>) {
    // tslint:disable-next-line:no-console
    console.log('submit', values);
    this.props.handleFormPost(values);
    // axios.post(belMijTerugSubmitUrl, values);
    // print the form values to the console
    // console.log(JSON.stringify(values));
  }
  onFormRadioChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === 'contact' ||
      e.target.value === 'prijs' ||
      e.target.value === 'belmijterug') {
      this.setState({ selectedForm: e.target.value });
    }
  }
  render() {
    const selectedForm = this.state.selectedForm || this.props.initialSelectedForm;
    return (
      <section className="contact-page">
        <div className="contact-forms">
          <h1>Contact</h1>
          <p>Zend ons uw vraag of verzoek en we reageren zo snel mogelijk. <br /> Ook 's-avonds of in het weeekend.</p>
          {!this.props.showThankMessage && this.renderFormTypeRadio(selectedForm)}
          {this.props.showThankMessage ? this.renderThankMessage() : this.renderForm(selectedForm)}
        </div>
        <div className="social-media">
          <div className="personal-contact">
            <img src="/images/franca.jpg" />
            <p>
              Wij zijn een stiching bestaande uit 7 villa eigenaren, wij steken zo veel mogelijk liefde en tijd in onze tweede 'thuis'. We willen daarom ook graag persoonlijk contact, om zoveel mogelijk specifieke informatie over onze vakantie villa's te kunnen geven.
            </p>
            <h3>0623189594</h3>
            <h4>Dagelijks: 18.00 tot 22.00 uur </h4>
          </div>
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
  renderThankMessage(): React.ReactNode {
    return (
      <p>Bedankt voor uw interesse, we nemen uw aanvraag zo spoedig mogelijk in behandeling.</p>
    );
  }
  renderForm(selectedForm: 'contact' | 'belmijterug' | 'prijs' | undefined): React.ReactNode {
    switch (selectedForm) {
      case 'belmijterug':
        return <BelMijTerugForm onSubmit={(values) => this.submit(values)} />;
      case 'prijs':
        return <PrijsForm onSubmit={(values: PrijsFormData) => this.submit(values)} />;
      default: 
        return <ContactForm onSubmit={(values) => this.submit(values)} />;
    }
  }
  renderFormTypeRadio(selectedForm: string): React.ReactNode {
    return (
      <div className="contact-form-type">
            <label htmlFor="contact">
              <input
                id="contact"
                name="contactType"
                type="radio"
                value="contact"
                onChange={(e) => this.onFormRadioChange(e)}
                checked={selectedForm === 'contact'}
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
                checked={selectedForm === 'prijs'}
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
                checked={selectedForm === 'belmijterug'}
              />
              {' '}
              Bel mij terug
              </label>
          </div>
    );
  }
}
function mapStateToProps(state: StoreState): Partial<Props> {
  return {
    initialSelectedForm: state.layout.selectedForm,
    showThankMessage: state.layout.showThankMessage || false
  };
}
function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: Props): Partial<Props> {
  return {
    handleFormPost: (formData) => dispatch(sendFormToGoogleSheets(formData))
  };
}
export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(ContactPageComponent);