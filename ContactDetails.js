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

  getTypeOfContactDetail() {
    return this.typeOfContactDetail;
  }

  getValueOfContactDetail() {
    return this.valueOfContactDetail;
  }

  updateContactDetailWithNewValue(type, value) {
    try {
      if (typeof type != "string") {
        throw new Error("invalid type");
      }
      if (typeof value != "string") {
        throw new Error("invalid new Value");
      }
      this.typeOfContactDetail = type;
      this.valueOfContactDetail = value;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = ContactDetails;
