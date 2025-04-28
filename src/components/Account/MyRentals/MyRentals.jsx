import { useEffect, useState } from 'react';
import AccountHeader from '../AccountHeader/AccountHeader';
import OrdersCarDisplay from '../Orders/OrdersCarDisplay';
import './MyRentals.css';
import '../../App.css';

const MyRentals = ({ importedRentals = [] }) => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch cars:', response.statusText);
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="orders">
      <AccountHeader />
      <section className="orders-section">
        <div className="orders-list">
        <h2 className="title">My Rentals</h2>
        {importedRentals.map((rental) => (
            <OrdersCarDisplay
              key={rental.id}
              brand={rental.brand}
              model={rental.model}
              pricePerDay={rental.pricePerDay}
              rentingTime={rental.rentingTime}
              pickUpLocation={rental.pickUpLocation}
              dropOffLocation={rental.dropOffLocation}
              pickUpTime={rental.pickUpTime}
              dropOffTime={rental.dropOffTime}
              priceTotal={rental.priceTotal}
              image={rental.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyRentals;