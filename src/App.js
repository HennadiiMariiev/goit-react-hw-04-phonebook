import React from 'react';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import HardCodeContactsCheckbox from './components/HardCodeCheckbox/HardCodeCheckbox';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { StyledApp, StyledBanner } from './components/AppComponents/AppComponents';

import hardCodedContacts from './data/hardCodedContacts';

import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      filter: '',
      isHardCodedContactsUsed: false,
    };
  }

  //#region class methods

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromLocalStorage) {
      this.setState({
        isHardCodedContactsUsed: contactsFromLocalStorage.some((contactEl) => !hardCodedContacts.includes(contactEl)),
        contacts: contactsFromLocalStorage,
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  isNameInContacts = (searchName) => {
    return this.state.contacts.find(({ name }) => name === searchName);
  };

  isContactAdded = (bool) => bool;

  addContact = (name, number) => {
    if (this.isNameInContacts(name)) {
      const existContactMessage = (name) => toast.warn(`There is an existing contact with name "${name}"!`);
      existContactMessage(name);

      return this.isContactAdded(false);
    }

    const id = uuidv4();

    this.setState({
      contacts: [...this.state.contacts, { id, name, number }],
    });

    const addedContactMessage = (name) => toast.success(`New contact "${name}" was added!`);
    addedContactMessage(name);

    return this.isContactAdded(true);
  };

  deleteContact = (event) => {
    const id = event.target.value;

    this.setState({
      filter: '',
      contacts: [
        ...this.state.contacts.filter((contact) => {
          return contact.id !== id;
        }),
      ],
    });
  };

  deleteAll = () => {
    this.setState({
      contacts: [],
      isHardCodedContactsUsed: !this.state.isHardCodedContactsUsed,
    });
  };

  onFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  getHardCodedContacts = () => {
    this.state.isHardCodedContactsUsed
      ? this.setState({
          contacts: this.state.contacts.filter((contactEl) => !hardCodedContacts.includes(contactEl)),
          isHardCodedContactsUsed: !this.state.isHardCodedContactsUsed,
        })
      : this.setState({
          contacts: [...this.state.contacts, ...hardCodedContacts],
          isHardCodedContactsUsed: !this.state.isHardCodedContactsUsed,
        });
  };

  filterContacts = () => {
    if (this.state.filter === '') {
      return this.state.contacts;
    }

    const searchStr = this.state.filter.toLowerCase();

    return this.state.contacts.filter((contact) => contact.name.toLowerCase().includes(searchStr));
  };

  //#endregion

  render() {
    const contacts = this.filterContacts();

    return (
      <StyledApp>
        <Form onNewContactAdd={this.addContact}></Form>
        <HardCodeContactsCheckbox
          onHardCodedCheckboxChange={this.getHardCodedContacts}
          isHardCodedContactsUsed={this.state.isHardCodedContactsUsed}
        />
        <Filter
          onFilterChange={this.onFilterChange}
          value={this.state.filter}
          disabled={this.state.contacts.length ? false : true}
        />
        {contacts.length === 0 ? (
          <StyledBanner>No contacts...</StyledBanner>
        ) : (
          <Contacts contacts={contacts} deleteContact={this.deleteContact} deleteAll={this.deleteAll} />
        )}
        <ToastContainer />
      </StyledApp>
    );
  }
}

export default App;
