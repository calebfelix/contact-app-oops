class ContactDetails {
  static id = 0;
  constructor(typeOfContactDetail, valueOfContactDetail) {
    this.id = ContactDetails.id++;
    this.typeOfContactDetail = typeOfContactDetail;
    this.valueOfContactDetail = valueOfContactDetail;
  }

  static newContactDetail(typeOfContactDetail, valueOfContactDetail) {
    try {
      if (typeof typeOfContactDetail != "string") {
        throw new Error("invalid Contact Detail type");
      }
      if (typeof valueOfContactDetail != "string") {
        throw new Error("invalid Contact Detail value");
      }
      return new ContactDetails(typeOfContactDetail, valueOfContactDetail);
    } catch (error) {
      throw error;
    }
  }

  updateContactDetils(contactDetailId, parameter, newValue) {}
}

module.exports = ContactDetails;
