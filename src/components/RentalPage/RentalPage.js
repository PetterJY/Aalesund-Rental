import './RentalPage.css';
import '../Header/Header.css';
import '../Footer/Footer.css';
import CarDisplay from '../CarDisplay/CarDisplay';

export default function RentalPage(props) {
  return (
    <div>
      <nav className="sort-bar">
        <label>
          <select name="Sort" className="sort-button">
            <option value="Sort By">Sort By</option>
            <option value="price">Price</option>
            <option value="alphabet">Alphabet</option>
          </select>
          <select name="Car Type" className="sort-button">
            <option value="Car Type">Car Type</option>
            <option value="volvo">Volvo</option>
            <option value="mercedes">Mercedes</option>
          </select>
          <select name="Transmission Type" className="sort-button">
            <option value="Transmission Type">Transmission Type</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          <select name="Passengers" className="sort-button">
            <option value="Passengers">Passengers</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
      </nav>

      <main className="main-body">
        <main className="complete-section">
          {props.children}
        </main>
      </main>
    </div>
  );
};