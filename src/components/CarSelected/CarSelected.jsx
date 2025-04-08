import '../App.css';
import './CarSelected.css';
import { Car, Seatbelt, PlusCircle, Calendar, CaretDown } from "@phosphor-icons/react";

const CarSelected = (props) => {
  return (
    <div className="car-selected" style={props.style}>
      <div id ="car-background">
        <header>
        <h2>{props.carBrand} {props.carModel}</h2>
        <h3>{props.carTag}</h3>
        </header>
        <img src={props.image} alt="Car" className="car-image" />
        <footer><h2>Ørsta Kommune</h2></footer>
      </div>
      <section className="car-details">
        <div className="car-info">
          <figure id='car-info-figure'>
            <Car id='logo' size={30} color="#252422" weight="fill" />
            <h3>Car Brand  |  {props.carBrand}</h3>
          </figure>
          <figure id='car-info-figure'>
            <Calendar id='logo' size={30} color="#252422" weight="fill" />
            <h3>Year  |  2003</h3>
          </figure>
          <figure id="car-info-figure">
            <Seatbelt id='logo' size={30} color="#252422" weight="fill" />
            <h3>Passengers  |   {props.passengerCount}</h3>
          </figure>
          <figure id='car-info-figure'>
            <PlusCircle id='logo' size={30} color="#252422" weight="fill" />
            <button id='extra-features-button'><h3>Extra features |</h3> <CaretDown size={25} color='#252422'/> </button>
          </figure>
        </div>
        <div className="car-rental-economics">
          <h3>Transmission Type - Automatic</h3>
          <h4>Price details</h4>
          <h4>{props.priceDay},- kr / day - {props.priceTotal},- kr in total</h4>
        </div>
      </section>
      <button className='next-button'>next</button>
    </div>
  );
}

/* Shows CarSelected */


export default CarSelected;