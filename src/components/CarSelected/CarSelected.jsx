import './CarSelected.css';


const CarSelected = (props) => {
  return (
    <div className="car-selected" style={props.style}>
      <h2>{props.carName}</h2>
      <h3>Passenger count: {props.passengerCount}</h3>
      <h3>Car type: {props.carTag}</h3>
      <h3>Rental place: {props.rentalPlace}</h3>
      <h3>Price per day: {props.priceDay}</h3>
      <h3>Total price: {props.priceTotal}</h3>
    </div>
  );
}

/* Shows CarSelected */


export default CarSelected;