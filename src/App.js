import { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import HardCodeContactsCheckbox from './components/HardCodeCheckbox/HardCodeCheckbox';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { StyledApp, StyledBanner } from './components/AppComponents/AppComponents';

import hardCodedContacts from './data/hardCodedContacts';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isHardCodedContactsUsed, setIsHardCodedContactsUsed] = useState(false);

  //#region class methods
  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromLocalStorage) {
      setContacts([...contactsFromLocalStorage]);
      setIsHardCodedContactsUsed(contactsFromLocalStorage.some((contactEl) => !hardCodedContacts.includes(contactEl)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isNameInContacts = (searchName) => {
    return contacts.find(({ name }) => name === searchName);
  };

  const isContactAdded = (bool) => bool;

  const addContact = (name, number) => {
    if (isNameInContacts(name)) {
      const existContactMessage = (name) => toast.warn(`There is an existing contact with name "${name}"!`);
      existContactMessage(name);

      return isContactAdded(false);
    }

    const id = uuidv4();

    setContacts([...contacts, { id, name, number }]);

    const addedContactMessage = (name) => toast.success(`New contact "${name}" was added!`);
    addedContactMessage(name);

    return isContactAdded(true);
  };

  const deleteContact = (event) => {
    const id = event.target.value;

    setFilter('');
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const deleteAll = () => {
    setContacts([]);
    setIsHardCodedContactsUsed(!isHardCodedContactsUsed);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getHardCodedContacts = () => {
    isHardCodedContactsUsed
      ? setContacts(contacts.filter((contactEl) => !hardCodedContacts.includes(contactEl)))
      : setContacts([...contacts, ...hardCodedContacts]);

    setIsHardCodedContactsUsed(!isHardCodedContactsUsed);
  };

  const filterContacts = () => {
    if (filter === '') {
      return contacts;
    }

    const searchStr = filter.toLowerCase();

    return contacts.filter((contact) => contact.name.toLowerCase().includes(searchStr));
  };

  //#endregion
  return (
    <StyledApp>
      <Form onNewContactAdd={addContact}></Form>
      <HardCodeContactsCheckbox
        onHardCodedCheckboxChange={getHardCodedContacts}
        isHardCodedContactsUsed={isHardCodedContactsUsed}
      />
      <Filter onFilterChange={onFilterChange} value={filter} disabled={contacts.length ? false : true} />
      {contacts.length === 0 ? (
        <StyledBanner>No contacts...</StyledBanner>
      ) : (
        <Contacts contacts={filterContacts()} deleteContact={deleteContact} deleteAll={deleteAll} />
      )}
      <ToastContainer />
    </StyledApp>
  );
}

export default App;
