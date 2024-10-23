import { addItemToPage } from './dom_until.js';

document.addEventListener('DOMContentLoaded', () => {
  const shipList = document.getElementById('shipList');
  const totalExpensesElement = document.getElementById('totalExpenses');
  const [countBtn, searchBtn, clearBtn, searchInput, sortToggle] = [
    'countExpenses', 'searchButton', 'clearButton', 'searchShip', 'sortShips'
  ].map(id => document.getElementById(id));

  if (!shipList) return console.error('Ship list container not found!');

  let ships = JSON.parse(localStorage.getItem('ships')) || [];
  let filteredShips = [...ships];

  const renderShips = (ships) => {
    shipList.innerHTML = '';
    ships.forEach(addItemToPage);
  };

  const updateExpenses = () => {
    const total = filteredShips.reduce((sum, { dailyCost }) => sum + parseFloat(dailyCost), 0);
    totalExpensesElement.textContent = `$${total.toFixed(2)}`;
  };

  const filterShips = (query) =>
    ships.filter(({ title }) => title.toLowerCase().includes(query));

  searchBtn.addEventListener('click', () => {
    filteredShips = filterShips(searchInput.value.trim().toLowerCase());
    renderShips(filteredShips);
  });

  clearBtn.addEventListener('click', () => {
    filteredShips = [...ships];
    searchInput.value = '';
    renderShips(filteredShips);
  });

  sortToggle.addEventListener('change', () => {
    filteredShips.sort((a, b) => sortToggle.checked ? b.dailyCost - a.dailyCost : 0);
    renderShips(filteredShips);
  });

  countBtn.addEventListener('click', updateExpenses);

  renderShips(filteredShips);
});
