import '../../App.css';
import '../Account.css';
import BookingsCarDisplay from './BookingsCarDisplay'; // Import the BookingsCarDisplay component



const Booking = ({ bookings = [] }) => { // Default to an empty array
  return (
    <div className="booking">
      <header className="account-menu">
        <ul className="account-menu-list">
          <li><a href="/account/account">Account</a></li>
          <li id="selected-site-link"><a href="/account/bookings">Bookings</a></li>
        </ul>
      </header>
      <section>
        <h2 className="title">My Bookings</h2>
        <div className="bookings-list">
        {bookings.map((booking) => (
            <BookingsCarDisplay
              key={booking.id}
              name={booking.name}
              model={booking.model}
              pricePerDay={booking.pricePerDay}
              seats={booking.seats}
              image={booking.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Booking;