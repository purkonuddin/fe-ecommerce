import validator from 'validator';

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateTitle(save_address_as) {
    if (validator.isEmpty(save_address_as)) {
      return 'this field is required';
    } else if (!validator.isLength(save_address_as)) {
      return 'Invalid value';
    }
    return false;
  }

  validateName(recipient_name) {
    if (validator.isEmpty(recipient_name)) {
      return 'this field is required';
    } else if (!validator.isLength(recipient_name, { min: 3 })) {
      return 'this field sould be minimum 3 characters';
    }
    return false;
  }

  validatePhone(recipient_phone_number){
    if (validator.isEmpty(recipient_phone_number)) {
        return 'recipient_phone_number is required';
      } else if (!validator.isLength(recipient_phone_number, { min: 10 })) {
        return 'partisipant sould be minimum 10 characters';
      }
      return false;
  }

  validateAddress(addresS){
    if (validator.isEmpty(addresS)) {
        return 'addresS is required';
      } else if (!validator.isLength(addresS, { min: 10})) {
        return 'addresS sould be minimum 10 characters';
      }
      return false;
  }

  
  validatePos(postal_code){
    if (validator.isEmpty(postal_code)) {
        return 'postal_code is required';
      } else if (!validator.isLength(postal_code, { min: 4 })) {
        return 'postal_code sould be minimum 4 characters';
      }
      return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };