import '../../global.css';
import '../Account.css';

const Booking = ({ booking }) => {
  return (
    <div className="booking">
      <header className="account-menu">
        <ul className="account-menu-list">
          <li><a href="/account/account">Account</a></li>
          <li id="selected-site-link"><a href="/account/bookings">Bookings</a></li>
        </ul>
      </header>
      <p>dick</p>
    </div>
  );
}

export default Booking;