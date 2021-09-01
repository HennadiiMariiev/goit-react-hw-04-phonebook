import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledForm,
  StyledTitle,
  StyledLable,
  StyledInput,
  StyledButton as StyledPrimaryButton,
} from './StyledFormComponents';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
    };
  }

  //#region class methods

  isValidInput = (event) => {
    if (event.target.value.match(event.target.pattern) === null && event.target.value.length !== 0) {
      return false;
    }
    return true;
  };

  colorizeInputOnValidation = (event) => {
    if (!this.isValidInput(event)) {
      event.target.style = 'background-color: #f7d7d7;';
    } else {
      event.target.style = 'background-color: transparent;';
    }
  };

  onInputChange = (event) => {
    this.colorizeInputOnValidation(event);

    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState({ [inputName]: inputValue });
  };

  clearInputs = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  submitNewContact = (event) => {
    event.preventDefault();

    const name = this.state.name;
    const number = this.state.number;
    const isContactAdded = this.props.onNewContactAdd(name, number);

    if (isContactAdded) {
      this.clearInputs();
    }
  };

  //#endregion

  render() {
    return (
      <>
        <StyledTitle>Phonebook</StyledTitle>
        <StyledForm onSubmit={this.submitNewContact}>
          <StyledLable>
            Name
            <StyledInput
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              placeholder="Please, type contact name"
              required
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </StyledLable>
          <StyledLable>
            Number
            <StyledInput
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              placeholder="Please, type contact number"
              required
              value={this.state.number}
              onChange={this.onInputChange}
            />
          </StyledLable>
          <StyledPrimaryButton type="submit">Add contact</StyledPrimaryButton>
        </StyledForm>
      </>
    );
  }
}

Form.propTypes = {
  onNewContactAdd: PropTypes.func,
};

export default Form;
