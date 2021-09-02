import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyledForm,
  StyledTitle,
  StyledLable,
  StyledInput,
  StyledButton as StyledPrimaryButton,
} from './StyledFormComponents';

function Form({ onNewContactAdd }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //#region class methods

  const isValidInput = (event) => {
    if (event.target.value.match(event.target.pattern) === null && event.target.value.length !== 0) {
      return false;
    }
    return true;
  };

  const colorizeInputOnValidation = (event) => {
    if (!isValidInput(event)) {
      event.target.style = 'background-color: #f7d7d7;';
    } else {
      event.target.style = 'background-color: transparent;';
    }
  };

  const onInputChange = (event) => {
    colorizeInputOnValidation(event);

    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };

  const clearInputs = () => {
    setName('');
    setNumber('');
  };

  const submitNewContact = (event) => {
    event.preventDefault();

    const isContactAdded = onNewContactAdd(name, number);

    if (isContactAdded) {
      clearInputs();
    }
  };

  //#endregion

  return (
    <>
      <StyledTitle>Phonebook</StyledTitle>
      <StyledForm onSubmit={submitNewContact}>
        <StyledLable>
          Name
          <StyledInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            placeholder="Please, type contact name"
            required
            value={name}
            onChange={onInputChange}
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
            value={number}
            onChange={onInputChange}
          />
        </StyledLable>
        <StyledPrimaryButton type="submit">Add contact</StyledPrimaryButton>
      </StyledForm>
    </>
  );
}

Form.propTypes = {
  onNewContactAdd: PropTypes.func,
};

export default Form;
