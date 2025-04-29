

const AddObjectsToDatabase = () => {

  const data = {
    "provider": 10,
    "plateNumber": "ABC123",
    "carBrand": "Toyota",
    "modelName": "Corolla",
    "carType": "Sedan",
    "pricePerDay": 500,
    "productionYear": 2020,
    "passengers": 5,
    "automatic": true,
    "energySource": "Gasoline",
    "available": true,
    "extraFeatures": null,
  };

  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => {
    console.log("Data sent successfully:", data);
  })
  .catch((error) => {
    console.error(error);
  });
}

export default AddObjectsToDatabase;