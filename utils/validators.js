
// Validate register
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Please enter a username';
  }
  if (email.trim() === '') {
    errors.email = 'Please enter an Email Address';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Please enter a password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

// Validate login
module.exports.validateLoginInput = ( username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}