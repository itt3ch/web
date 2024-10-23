import { clearInputs, getInputValues } from './dom_until.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addShipForm');
  const submitButton = document.getElementById('submit_button');
  let ships = JSON.parse(localStorage.getItem('ships')) || [];

  if (!submitButton || !form) {
    console.error('Form or submit button not found!');
    return;
  }

  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    const inputValues = getInputValues();

    if (inputValues && validateForm(inputValues)) {
      ships.push({ ...inputValues, id: uuid.v4() });
      localStorage.setItem('ships', JSON.stringify(ships));
      clearInputs();
      alert('Ship successfully added!');
      window.location.href = 'index.html';
    }
  }

  function validateForm({ title, description, dailyCost, type }) {
    const validations = [
      { valid: title.length >= 3 && title.length <= 30, message: 'Ship name should be between 3 and 30 characters.' },
      { valid: description.length >= 10, message: 'Description should be at least 10 characters long.' },
      { valid: dailyCost > 0, message: 'Daily expense must be a positive number greater than 0.' },
      { valid: !!type, message: 'Please select a ship type.' },
    ];

    for (const { valid, message } of validations) {
      if (!valid) {
        alert(message);
        return false;
      }
    }
    return true;
  }
});
