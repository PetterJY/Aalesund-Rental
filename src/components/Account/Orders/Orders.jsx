import OrdersCarDisplay from './OrdersCarDisplay'; 
import AccountHeader from '../AccountHeader/AccountHeader';
import '../Account.css';
import '../../App.css';

const Orders = ({ orders = [] }) => { 
  return (
    <div className="orders">
      <AccountHeader />
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