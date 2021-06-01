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
  validateTitle(str) {
    if (validator.isEmpty(str)) {
      return 'this field is required';
    } else if (!validator.isAlphanumeric(str, 'en-US', " - '")) {
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

  validateEmail(value) {
    if (validator.isEmpty(value)) {
      return 'this field is required';
    } else if (!validator.isEmail(value)) {
      return 'Invalid email';
    }
    return false;
  }

  validatePrice(price){
    if (validator.isEmpty(price)) {
        return 'this field is required';
        // isNumeric(str [, options])
      } else if (!validator.isCurrency(price)) {
        return 'Invalid price';
      }
      return false;
  }

  validateStok(stok){
    if (validator.isEmpty(stok)) {
        return 'this field is required';
        // isNumeric(str [, options])
      } else if (!validator.isNumeric(stok)) {
        return 'Invalid Stok';
      }
      return false;
  }

  validatePhone(recipient_phone_number){
    if (validator.isEmpty(recipient_phone_number)) {
        return 'this field is required';
        // isNumeric(str [, options])
      } else if (!validator.isNumeric(recipient_phone_number)) {
        return 'Invalid phone number';
      }
      return false;
  }

  validateAddress(addresS){
    if (validator.isEmpty(addresS)) {
        return 'this field is required';
      } else if (!validator.isLength(addresS, { min: 10})) {
        return 'this field sould be minimum 10 characters';
      }
      return false;
  }

  validatePos(postal_code){
    if (validator.isEmpty(postal_code)) {
        return 'this field is required';
      } else if (!validator.isLength(postal_code, { min: 4 })) {
        return 'this field sould be minimum 4 characters';
      }
      return false;
  }

  validateText(value){
    if (validator.isEmpty(value)) {
        return 'this field is required';
      } else if (!validator.isLength(value, { min: 50 })) {
        return 'this field sould be minimum 50 characters';
      }
      return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };