import "../global.css";
import './RentalPage.css';

export default function RentalPage(props) {
  return (
    <div className="rental-page">
      <nav className="sort-bar">
        <select name="Sort" className="sort-button" label = "Sort">
          <option value="price">Price</option>
          <option value="alphabet">Alphabet</option>
        </select>
        <select name="Car Type" className="sort-button">
          <option value="Car Type">All Car Types</option>
          <option value="volvo">Volvo</option>
          <option value="mercedes">Mercedes</option>
        </select>
        <select name="Transmission Type" className="sort-button">
          <option value="Transmission Type">All Transmission Type</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select name="Passengers" onchange="updatePassengerText()" className="sort-button">
          <option value="Passengers" selected disabled>Passengers</option>
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
      </nav>
      <section class="main-section">
        <main className="main-body">
          {props.children}
        </main>
      </section>
    </div>
  );
};