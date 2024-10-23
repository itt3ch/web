document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const shipId = params.get('id');
  let ships = JSON.parse(localStorage.getItem('ships')) || [];
  const shipToEdit = ships.find(ship => ship.id === shipId);

  const getElement = (id) => document.getElementById(id);

  if (shipToEdit) {
    ['shipName', 'description', 'dailyCost', 'shipType'].forEach(field => {
      getElement(field).value = shipToEdit[field === 'shipName' ? 'title' : field];
    });
  }

  getElement('editShipForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const updatedShip = {
      id: shipId,
      title: getElement('shipName').value,
      description: getElement('description').value,
      dailyCost: parseFloat(getElement('dailyCost').value),
      type: getElement('shipType').value,
    };

    if (validateForm(updatedShip)) {
      ships = ships.map(ship => (ship.id === shipId ? updatedShip : ship));
      localStorage.setItem('ships', JSON.stringify(ships));
      window.location.href = 'index.html';
    }
  });

  const validateForm = ({ title, description, dailyCost, type }) => {
    if (title.length < 3 || title.length > 30) 
      return alertError('Ship name should be between 3 and 30 characters.');
    
    if (description.length < 10) 
      return alertError('Description should be at least 10 characters long.');
    
    if (dailyCost <= 0) 
      return alertError('Daily expense must be a positive number.');
    
    if (!type) 
      return alertError('Please select a ship type.');

    return true;
  };

  const alertError = (message) => {
    alert(message);
    return false;
  };
});
