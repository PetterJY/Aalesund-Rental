import '../App.css';
import './CarSelected.css';
import { Car, Seatbelt, PlusCircle } from "@phosphor-icons/react";

const CarSelected = (props) => {
  return (
    <div className="car-selected" style={props.style}>
      <div>
        <h2>{props.carBrand}</h2>
        <h3>{props.carTag}</h3>
        <img src={props.image} alt="Car" className="car-image" />
      </div>
      <section className="car-details">
        <Car size={30} color="#252422" weight="fill" />
        <figure id='car-info-figure'>
          <h2>Y</h2>
          <h3>Year  |  2003</h3>
        </figure>
        <figure id="car-info-figure">
          <Seatbelt size={30} color="#252422" weight="fill" />
          <h3>Passengers  |   {props.passengerCount}</h3>
        </figure>
        <figure id='car-info-figure'>
          <PlusCircle size={30} color="#252422" weight="fill" />
          <h3>Extra features |<select name="extra features" id=""></select></h3>
        </figure>
        <h3>Price per day: {props.priceDay}</h3>
        <h3>Total price: {props.priceTotal}</h3>
      </section>
      <button className='next-button'>next</button>
    </div>
  );
}

/* Shows CarSelected */


export default CarSelected;