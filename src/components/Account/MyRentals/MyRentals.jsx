import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getAccountId } from '../../utils/JwtUtility';
import { PlusCircle } from "@phosphor-icons/react";
import MyRentalsCarDisplay from './MyRentalsCarDisplay/MyRentalsCarDisplay';
import CreateCarModal from './CreateCarModal/CreateCarModal';
import './MyRentals.css';
import '../../App.css';

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
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchCars();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCars = cars.slice(startIndex, endIndex);

  console.log("Paginated cars: ", JSON.stringify(paginatedCars, null, 2));

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [isCreateCarModalOpen, setIsCreateCarModalOpen] = useState(false);
  const toggleCreateCarModal = () => {
    setIsCreateCarModalOpen(!isCreateCarModalOpen);
  };

  return (
    <section className="my-rentals-container">
      <div id='my-rentals-header'>
        <h2 className="title">My Rentals</h2>
        {isCreateCarModalOpen && <CreateCarModal onClose={toggleCreateCarModal} isCreateCarModalOpen={isCreateCarModalOpen} />}
        <button id="add-car-button" onClick={toggleCreateCarModal}>
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

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </section>
  );
}

export default MyRentals;