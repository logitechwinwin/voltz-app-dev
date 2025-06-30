export const validateEmail = (email) => {
  let emailValue = email.trim();
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue === "" || !emailValue) {
    return "The email is required.";
  } else if (!emailValue.match(emailFormat)) {
    return "Please enter a valid email address.";
  }
  return "";
};

export const validateName = (name, message) => {
  if (name === "" || !name.trim()) {
    return message ? message : "The name field is required.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (password === "" || !password) {
    return "The Password is required.";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === "" || !confirmPassword) {
    return "The confirm password is required.";
  } else if (confirmPassword !== password) {
    return "Password does not match.";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (phone === "" || !phone) {
    return "The phone number is required.";
  } else if (phone?.length < 8 || phone?.length > 15) {
    return "Invalid phone number. Please enter 8 to 15 digit number.";
  }
  return "";
};

export const validateEmptyField = (field, fieldName) => {
  if (field === "" || !field) {
    return `The ${fieldName} is required`;
  }
  return "";
};