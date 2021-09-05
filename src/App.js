import { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { StyledApp, StyledBanner } from './components/AppComponents/AppComponents';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  //#region class methods
  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromLocalStorage) {
      setContacts([...contactsFromLocalStorage]);
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
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
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
      <Filter
        onFilterChange={(e) => setFilter(e.target.value)}
        value={filter}
        disabled={contacts.length ? false : true}
      />
      {contacts.length === 0 ? (
        <StyledBanner>No contacts...</StyledBanner>
      ) : (
        <Contacts contacts={filterContacts()} deleteContact={deleteContact} deleteAll={() => setContacts([])} />
      )}
      <ToastContainer />
    </StyledApp>
  );
}

export default App;
