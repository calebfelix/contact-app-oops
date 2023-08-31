const Contact = require("./Contact");

class User {
  static #id = 0;
  static #allUsers = [];
  constructor(firstName, lastName, isAdmin) {
    this.id = User.#id++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = true;
    this.isAdmin = isAdmin;
    this.contacts = [];
  }

  static #findUser(userId) {
    for (let index = 0; index < User.#allUsers.length; index++) {
      if (userId === User.#allUsers[index].id) {
        return User.#allUsers[index];
      }
    }
    return null;
  }

  #findContact(contactId) {
    for (let index = 0; index < this.contacts.length; index++) {
      if (contactId == this.contacts[index].id) {
        return [this.contacts[index], index];
      }
    }
    return [null, -1];
  }

  #updateFirstName(newValue) {
    try {
      if (typeof newValue != "string") {
        throw new Error("Invalid First Name");
      }
      this.firstName = newValue;
    } catch (error) {
      throw error;
    }
  }

  #updateLastName(newValue) {
    try {
      if (typeof newValue != "string") {
        throw new Error("Invalid Last Name");
      }
      this.lastName = newValue;
    } catch (error) {
      throw error;
    }
  }

  /// CREATE user///
  static newAdmin(firstName, lastName) {
    // validation check
    try {
      if (typeof firstName != "string") {
        throw new Error("invalid first Name");
      }
      if (typeof lastName != "string") {
        throw new Error("invalid Last Name");
      }

      let newAdmin = new User(firstName, lastName, true);
      return newAdmin;
    } catch (error) {
      return error// TODO;
    }
  }

  newUser(firstName, lastName) {
    // validation
    try {
      if (!this.isAdmin) {
        throw new Error("Not a Admin");
      }
      if (typeof firstName != "string") {
        throw new Error("invalid first Name");
      }
      if (typeof lastName != "string") {
        throw new Error("invalid Last Name");
      }

      let newUser = new User(firstName, lastName, false);
      User.#allUsers.push(newUser);
      return newUser;
    } catch (error) {
      return error// TODO;
    }
  }

  /// READ user///
  getAllUsers() {
    try {
      // validation
      if (!this.isAdmin) {
        throw new Error("Only admin can get contact");
      }

      if (User.#allUsers.length === 0) {
        throw new Error("Contact list is empty");
      }

      return User.#allUsers;
    } catch (error) {
      return error// TODO;
    }
  }

  /// UPDATE user///
  updateUser(id, parameter, newValue) {
    try {
      if (!this.isAdmin) {
        throw new Error("Only admin can update");
      }

      let userToBeUpdated = User.#findUser(id);
      if (userToBeUpdated == null) {
        throw new Error("User Not Found!");
      }

      switch (parameter) {
        case "FirstName":
          userToBeUpdated.#updateFirstName(newValue);
          return userToBeUpdated;
        case "LastName":
          userToBeUpdated.#updateLastName(newValue);
          return userToBeUpdated;
        default:
          throw new Error("Invalid Parameter");
      }
    } catch (error) {
      return error// TODO;
    }
  }

  /// DELETE user///
  deleteUser(id) {
    try {
      let userToBeDeleted = User.#findUser(id);
      if (!this.isAdmin) {
        throw new Error("Only admin can Delete");
      }
      userToBeDeleted.isActive = false;
      return userToBeDeleted;
    } catch (error) {
      return error// TODO;
    }
  }

  /// CREATE contact///
  createContact(firstName, lastName) {
    try {
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot create contact");
      }

      let newContact = Contact.newContact(firstName, lastName);
      this.contacts.push(newContact);
      return newContact;
    } catch (error) {
      return error// TODO;
    }
  }

  /// READ contact///
  getAllContacts() {
    try {
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot get contact");
      }
      return this.contacts;
    } catch (error) {
      return error// TODO;
    }
  }

  /// UPDATE contact///
  updateContact(id, parameter, newValue) {
    try {
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot update contact");
      }
      let [contactToBeUpdated, contactIndex] = this.#findContact(id);
      if (contactToBeUpdated == null) {
        throw new Error("Contact Not Found");
      }
      return contactToBeUpdated.updateContact(parameter, newValue);
    } catch (error) {
      return error.message;
    }
  }

  /// DELETE contact///
  deleteContact(id) {
    try {
      if (this.isAdmin) {
        throw new Error("Admin cannot delete contact");
      }
      let [contactToBeDeleted, contactIndex] = this.#findContact(id);
      contactToBeDeleted.isActive = false;
      return contactToBeDeleted;
    } catch (error) {
      return error// TODO;
    }
  }

  /// CREATE contact Details///
  createContactDetail(contactId, typeOfContactDetail, valueOfContactDetail) {
    try {
      if (!this.isActive) {
        throw new Error("Contact Detail Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot create contact Detail");
      }
      let [contactDetailContact, contactIndex] = this.#findContact(contactId);

      if (contactDetailContact == null) {
        throw new Error("Contact Not Found");
      }
      contactDetailContact.createContactDetail(
        typeOfContactDetail,
        valueOfContactDetail
      );
      return contactDetailContact;
    } catch (error) {
      return error// TODO;
    }
  }

  /// READ contact Details///
  getContactDetails(contactId) {
    try {
      let [contactDetailsToFetch, contactIndex] = this.#findContact(contactId);
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot get contact");
      }
      if (typeof contactId != "number") {
        throw new Error("Invalid Id");
      }
      if (contactDetailsToFetch == null) {
        throw new Error("Contact Not Found!");
      }
      return contactDetailsToFetch.getContactDetails();
    } catch (error) {
      return error// TODO;
    }
  }

  /// UPDATE contact Details///
  updateContactDetails(contactId, contactDetailId, type, value) {
    try {
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot update contact details");
      }
      let [contactDetailToBeUpdated, contactIndex] =
        this.#findContact(contactId);
      if (contactDetailToBeUpdated == null) {
        throw new Error("Contact Not Found");
      }
      if (typeof contactDetailId != "number") {
        throw new Error("invalid new Value");
      }
      let [contactDetailToBeUpdatedDetailById, index] =
        contactDetailToBeUpdated.getContactDetailsById(contactDetailId);
      if (contactDetailToBeUpdatedDetailById == null) {
        throw new Error("Contact Detail Not Found");
      }
      contactDetailToBeUpdatedDetailById.updateContactDetailWithNewValue(
        type,
        value
      );
      return contactDetailToBeUpdatedDetailById;
    } catch (error) {
      return error// TODO;
    }
  }

  /// DELETE contact Details///
  deleteContactDetails(contactId, contactDetailId) {
    try {
      if (!this.isActive) {
        throw new Error("User Dosen't exist");
      }
      if (this.isAdmin) {
        throw new Error("Admin Cannot update contact details");
      }
      let [contactDetailToBeDeleted, contactIndex] =
        this.#findContact(contactId);
      if (contactDetailToBeDeleted == null) {
        throw new Error("Contact Not Found");
      }
      if (typeof contactId != "number") {
        throw new Error("invalid Contact ID");
      }
      if (typeof contactDetailId != "number") {
        throw new Error("invalid Contact Detail ID");
      }
      let [contactDetailToBeDeletedDetailById, detailIndex] =
        contactDetailToBeDeleted.getContactDetailsById(contactDetailId);
      if (contactDetailToBeDeletedDetailById == null) {
        throw new Error("Contact Detail Not Found");
      }
      let contactDetailToBeDeletedDetailByIndex =
        this.contacts[contactIndex].deleteContactDetail(detailIndex);
      return this.contacts;
    } catch (error) {
      return error// TODO;
    }
  }
}

module.exports = User;
