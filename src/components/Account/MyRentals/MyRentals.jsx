import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getAccountId, makeApiRequest } from '../../utils/JwtUtility';
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
      const data = await makeApiRequest(`http://localhost:8080/api/cars/my-cars/${getAccountId()}`);
      setCars(data);
    } catch (error) {
      setCars([]);
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
    <header id='my-rentals-header'>
      <h2 className="title">My Rentals</h2>
      {isCreateCarModalOpen && <CreateCarModal onClose={toggleCreateCarModal} isCreateCarModalOpen={isCreateCarModalOpen} />}
      <button id="add-car-button" onClick={toggleCreateCarModal} aria-label="Add Car">
        <PlusCircle size={32} aria-hidden="true" />
        <span className="add-car-text">Add Car</span>
      </button>
    </header>
    
    {isLoading ? (
      <div className="loading-container" role="status" aria-live="polite">
        <p className="loading-message">Loading your rentals...</p>
      </div>
    ) : cars.length === 0 ? (
      <div className="empty-state" role="status">
        <p>You haven't added any cars yet. Click "Add Car" to get started.</p>
      </div>
    ) : (
      <ul className="my-rentals-list" aria-label="Your rental vehicles">
        {paginatedCars.map(car => (
          <li key={car.id} className="rental-list-item">
            <MyRentalsCarDisplay car={car} />
          </li>
        ))}
      </ul>
    )}
    
    {!isLoading && cars.length > 0 && (
      <nav aria-label="Pagination navigation">
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          aria-controls="my-rentals-list"
        />
      </nav>
    )}
  </section>
  );
}

export default MyRentals;