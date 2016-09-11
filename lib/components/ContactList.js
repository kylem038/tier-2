import React, { Component } from 'react';
import firebase from '../firebase';
import CreateContact from './CreateContact';
import Contact from './Contact';
const split = require('split-object');

export default class ContactList extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
    };
  }


  get reference() {
    return firebase.database().ref(`${firebase.auth().currentUser.uid}/user-contacts`);
  }

  componentDidMount() {
    this.reference.on('value', (snapshot) => {
      let contacts = snapshot.val();
      if(!contacts) { return this.setState({ contacts: [] }); }
      contacts = split(contacts).map(contact => Object.assign({ key: contact.key }, contact.value));
      this.setState({
        contacts
      });

    });
  }


  componentWillUnmount() {
    this.reference.off();
  }

  loadContacts() {
    return this.state.contacts.map(function (contact) {
      return (
        <div key={contact.key}>
          <p>{contact.name}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="renderContact">
      <h1>{this.loadContacts()}</h1>
      </div>
    );
  }
}