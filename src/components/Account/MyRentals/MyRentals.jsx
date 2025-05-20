import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getAccountId } from '../../utils/JwtUtility';
import { PlusCircle } from "@phosphor-icons/react";
import PaginationControls, { getPaginatedItems } from '../../PaginationControls/PaginationControls';
import MyRentalsCarDisplay from './MyRentalsCarDisplay/MyRentalsCarDisplay';
import CreateCarModal from './CreateCarModal/CreateCarModal';
import './MyRentals.css';

const MyRentals = () => {
  const navigate = useNavigate();
  const role = getRole();
  
  useEffect(() => {
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_PROVIDER') {
      console.error('Unauthorized access to My Rentals page. Redirecting to home.');
      navigate('/home');
    }
  }, [navigate, role]);

  const [cars, setCars] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function fetchCars() {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/cars/my-cars/' + getAccountId(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchCars();
  }, []);

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const toggleCreateCarModal = () => {
    setIsCreateCarModalOpen(!isCreateCarModalOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const paginatedCars = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="my-rentals-container">
      <div id='my-rentals-header'>
        <h2 className="title">My Rentals</h2>
        {isCreateCarModalOpen && <CreateCarModal onClose={toggleCreateCarModal} isCreateCarModalOpen={isCreateCarModalOpen} />}
        <button id="add-car-button" onClick={toggleCreateCarModal} aria-label="Add Car">
          <PlusCircle size={32} />
          <span className="add-car-text">Add Car</span>
        </button>
      </div>

      {isLoading ? (
        <h1>
          Loading your rentals... 
        </h1>
      ) : (
        <div className="my-rentals-list">
          {paginatedCars.map(car => (
            <MyRentalsCarDisplay 
              key={car.id}
              car={car}
            />
          ))}
        </div>
      )}

      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default MyRentals;