const CarImageMapping = {
  "Tesla Model 3": require("../../resources/images/cars/TeslaModel3.webp"),
  "Tesla Model Y": require("../../resources/images/cars/TeslaModelY.png"),
  "Volkswagen Golf": require("../../resources/images/cars/VolkswagenGolf.png"),
  "Volkswagen Transporter": require("../../resources/images/cars/VolkswagenTransporter.webp"),
  "BMW M3": require("../../resources/images/cars/BMWm3.png"),
  "Mazda 2": require("../../resources/images/cars/Mazda2.png"),
  "Nissan Leaf": require("../../resources/images/cars/NissanLeaf.png"),
  "Peugeot 207": require("../../resources/images/cars/Peugeot207.png"),
  "Peugeot 307 SW": require("../../resources/images/cars/Peugeot307SW.png"),
  "Peugeot iOn": require("../../resources/images/cars/PeugeotiOn.png"),
  "Peugeot 3008": require("../../resources/images/cars/Peugeot3008.png"),
  "Skoda Fabia": require("../../resources/images/cars/SkodaFabia.png"),
};

export const getCarImage = (carBrand, modelName) => {
  const key = `${carBrand} ${modelName}`;
  return CarImageMapping[key] || require("../../resources/images/car.png"); 
};