import '../../App.css';
import '../Account.css';
import OrdersCarDisplay from './OrdersCarDisplay'; 

const Orders = ({ orders = [] }) => { 
  return (
    <div className="orders">
      <header className="account-menu">
        <ul className="account-menu-list">
          <li><a href="/account/account">Account</a></li>
          <li id="selected-site-link"><a href="/account/orders">Orders</a></li>
        </ul>
      </header>
      <section className="orders-section">
        <div className="orders-list">
        <h2 className="title">My Bookings</h2>
        {orders.map((order) => (
            <OrdersCarDisplay
              key={order.id}
              brand={order.brand}
              model={order.model}
              pricePerDay={order.pricePerDay}
              rentingTime={order.rentingTime}
              pickUpLocation={order.pickUpLocation}
              dropOffLocation={order.dropOffLocation}
              pickUpTime={order.pickUpTime}
              dropOffTime={order.dropOffTime}
              priceTotal={order.priceTotal}
              image={order.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;