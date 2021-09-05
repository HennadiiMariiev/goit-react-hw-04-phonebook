import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  StyledForm,
  StyledTitle,
  StyledLable,
  StyledInput,
  StyledButton as StyledPrimaryButton,
} from './StyledFormComponents';

const useInput = (input) => {
  const [value, setValue] = useState(() => '');

  useEffect(() => {
    function isValidInput(input) {
      if (!input.value.match(input.pattern) && input.value.length) return false;

      return true;
    }

    if (!isValidInput(input.current)) {
      input.current.style = 'background-color: #f7d7d7;';
    } else {
      input.current.style = 'background-color: transparent;';
    }
  }, [value, input]);

  return [value, setValue];
};

function Form({ onNewContactAdd }) {
  const nameInput = useRef();
  const numberInput = useRef();

  const [name, setName] = useInput(nameInput);
  const [number, setNumber] = useInput(numberInput);

  //#region class methods

  const onInputChange = (event) => {
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
            ref={nameInput}
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
            ref={numberInput}
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
