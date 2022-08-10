const firebaseAdmin = require('firebase-admin');

const db = firebaseAdmin.database();

class Contact {
  constructor(contact) {
    this.firstname = contact?.firstname || '';
    this.lastname = contact?.lastname || '';
    this.email = contact?.email || '';
    this.phone = contact?.phone || '';
  }

  async getAllContacts() {
    const contacts = (await db.ref('contacts').once('value')).val();
    return contacts;
  }

  save() {
    const newContact = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
    };
    db.ref('contacts').push(newContact);
  }

  delete(id) {
    db.ref('contacts/' + id).remove();
  }

}

module.exports = Contact;
