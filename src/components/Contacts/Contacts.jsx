import PropTypes from 'prop-types';

import {
  StyledItem,
  StyledName,
  StyledNumber,
  StyledDiv,
  StyledList,
  StyledSubTitle,
  StyledButton,
} from './StyledContactsComponents';

import { StyledButton as StyledPrimaryButton } from '../Form/StyledFormComponents';

const Contacts = ({ contacts, deleteContact, deleteAll }) => {
  const contactsItems = contacts.map(({ name, number, id }) => {
    return (
      <StyledItem key={id}>
        <StyledName>{name}</StyledName>
        <StyledNumber>{number}</StyledNumber>

        <StyledButton onClick={deleteContact} value={id}>
          Remove
        </StyledButton>
      </StyledItem>
    );
  });

  return (
    <StyledDiv>
      <StyledSubTitle>Contacts</StyledSubTitle>
      <StyledList>{contactsItems}</StyledList>
      <StyledPrimaryButton onClick={deleteAll} style={{ backgroundColor: '#FAFAFA' }}>
        Remove all
      </StyledPrimaryButton>
    </StyledDiv>
  );
};

Contacts.propTypes = {
  deleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default Contacts;
