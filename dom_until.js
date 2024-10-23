const getElement = (id) => document.getElementById(id);

const inputs = {
  title: getElement('shipName'),
  description: getElement('description'),
  dailyCost: getElement('dailyCost'),
  type: getElement('shipType'),
};

const shipList = getElement('shipList');

const itemTemplate = ({ id, title, description, dailyCost, type }) => `
  <li id="${id}" class="card mb-3 item-card">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">Description: ${description}</p>
      <p class="card-text">Daily Expense: $${dailyCost}</p>
      <p class="card-text">Type: ${type}</p>
    </div>
    <div class="card-buttons">
      <a href="editShip.html?id=${id}" class="edit-btn">Edit</a>
      <button class="delete-btn" data-id="${id}">Delete</button>
    </div>
  </li>`;

export const addItemToPage = (ship) => {
  shipList.insertAdjacentHTML('beforeend', itemTemplate(ship));
};

export const clearInputs = () => {
  Object.values(inputs).forEach(input => input && (input.value = ''));
};

export const getInputValues = () => {
  const values = Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [key, input?.value || ''])
  );

  if (Object.values(values).every(val => val !== '')) {
    return values;
  } else {
    console.log('Form inputs not found or empty on this page.');
    return null;
  }
};
