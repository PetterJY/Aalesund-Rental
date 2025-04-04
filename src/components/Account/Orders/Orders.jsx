import '../../App.css';
import '../Account.css';
import OrdersCarDisplay from './OrdersCarDisplay'; // Import the BookingsCarDisplay component



const Orders = ({ orders = [] }) => { // Default to an empty array
  return (
    <div className="orders">
      <header className="account-menu">
        <ul className="account-menu-list">
          <li><a href="/account/account">Account</a></li>
          <li id="selected-site-link"><a href="/account/orders">Orders</a></li>
        </ul>
      </header>
      <section>
        <h2 className="title">My Bookings</h2>
        <div className="orders-list">
        {orders.map((order) => (
            <OrdersCarDisplay
              key={order.id}
              name={order.name}
              model={order.model}
              pricePerDay={order.pricePerDay}
              seats={order.seats}
              image={order.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;