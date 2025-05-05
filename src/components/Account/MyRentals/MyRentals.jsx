import { useEffect, useState } from 'react';
import { PlusCircle } from "@phosphor-icons/react";
import AccountHeader from '../AccountHeader/AccountHeader';
import MyRentalsCarDisplay from './MyRentalsCarDisplay';
import CreateCarModal from './CreateCarModal/CreateCarModal';
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

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const toggleCreateCarModal = () => {
    setIsCreateCarModalOpen(!isCreateCarModalOpen);
  };

  return (
    <div className="orders">
      <AccountHeader />
      <section className="my-rentals-section">
        <div id='my-rentals-header'>
          <h2 className="title">My Rentals</h2>
          {isCreateCarModalOpen && <CreateCarModal onClose={toggleCreateCarModal} isCreateCarModalOpen={isCreateCarModalOpen} />}
          <button id="add-car-button" onClick={toggleCreateCarModal}>
            <PlusCircle size={32} />
            <span className="add-car-text">Add Car</span>
          </button>
        </div>
        <div className="my-rentals-list">
          {cars.map(car => (
            <MyRentalsCarDisplay car={car} key={car.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyRentals;