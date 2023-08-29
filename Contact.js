const ContactDetails = require("./ContactDetails");

class Contact {
  static id = 0;
  constructor(firstName, lastName) {
    this.id = Contact.id++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = true;
    this.contactDetails = [];
  }

  static newContact(firstName, lastName) {
    // validation
    try {
      if (typeof firstName != "string") {
        throw new Error("invalid First Name");
      }
      if (typeof firstName != "string") {
        throw new Error("invalid Last Name");
      }
      return new Contact(firstName, lastName);
    } catch (error) {
      throw error;
    }
  }

  UpdateContactFirstName(newValue) {
    try {
      if (typeof newValue != "string") {
        throw new Error("Invalid First Name");
      }
      this.firstName = newValue;
    } catch (error) {
      throw error;
    }
  }

  UpdateContactLastName(newValue) {
    try {
      if (typeof newValue != "string") {
        throw new Error("Invalid Last Name");
      }
      this.lastName = newValue;
    } catch (error) {
      throw error;
    }
  }

  updateContact(parameter, newValue) {
    try {
      switch (parameter) {
        case "firstName":
          this.UpdateContactFirstName(newValue);
          return this;
        case "lastName":
          this.UpdateContactLastName(newValue);
          return this;
        default:
          throw new Error("Invalid Parameter");
      }
    } catch (error) {
      throw error;
    }
  }

  createContactDetail(typeOfContactDetail, valueOfContactDetail) {
    let newContactDetail = ContactDetails.newContactDetail(
      typeOfContactDetail,
      valueOfContactDetail
    );
    this.contactDetails.push(newContactDetail);
  }

  static findContactDetail(contactId) {
    for (let index = 0; index < this.contactDetails.length; index++) {
      if (contactId == this.contacts[index].id) {
        return this.contacts[index];
      }
    }
    return null;
  }

  getContactDetails(){
    return this.contactDetails
  }
}

module.exports = Contact;
