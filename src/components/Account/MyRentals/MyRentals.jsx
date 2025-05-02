import { useEffect, useState } from 'react';
import AccountHeader from '../AccountHeader/AccountHeader';
import MyRentalsCarDisplay from './MyRentalsCarDisplay';
import './MyRentals.css';
import '../../App.css';

const MyRentals = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('http://localhost:8080/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch cars:', response.statusText);
          return;
        }
        const data = await response.json();
        setCars(data);
        console.log('Fetched cars:', data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }
    fetchCars();
  }, []);

  return (
    <div className="orders">
      <AccountHeader />
      <section className="my-rentals-section">
        <div className="my-rentals-list">
          <h2 className="title">My Rentals</h2>
          {cars.map(car => (
            <MyRentalsCarDisplay car={car} key={car.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyRentals;