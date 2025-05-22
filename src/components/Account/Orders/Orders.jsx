import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getAccountId } from '../../utils/JwtUtility'; 
import PaginationControls, { getPaginatedItems as getPaginatedItems } from '../../PaginationControls/PaginationControls';
import OrdersCarDisplay from './OrdersCarDisplay/OrdersCarDisplay'; 
import carImage from '../../../resources/images/logo.svg';
import OrdersDropdown from './OrdersDropDown/OrdersDropDown';
import '../Orders/Orders.css';

const Orders = () => { 
  const navigate = useNavigate();
  const role = getRole();
  
  useEffect(() => {
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_USER') {
      console.error('Unauthorized access to My Rentals page. Redirecting to home.');
      navigate('/home');
    }
  }, [navigate, role]);

  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All'); 

  useEffect(() => {
    async function fetchRentals() {
      setIsLoading(true); 
      try {
        const response = await fetch(`http://localhost:8080/api/rentals/renter/${getAccountId()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch rentals:', response.statusText);
          return;
        }
        const rentalDetails = await response.json();
        setRentals(rentalDetails);
        console.log('Fetched rentals:', rentalDetails);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setIsLoading(false);
      }
    } 
    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter((rental) => {
    if (selectedStatus === 'All') return true;
    return rental.status === selectedStatus;
  });

  const statusOptions = ['All', 'PENDING', 'ACTIVE', 'CANCELLED', 'COMPLETED'];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);
  const paginatedRentals = filteredRentals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <main className="orders">
      <section className="orders-section">
        <div className="orders-container"> 
        <header className="orders-header">
            <h1 className="title">My Bookings - </h1> 
            <OrdersDropdown
              options={statusOptions}
              selectedOption={selectedStatus}
              onSelect={setSelectedStatus}
            />
          </header>
          <div className="orders-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : paginatedRentals.length > 0 ? (
              paginatedRentals.map((rental) => (
                <OrdersCarDisplay
                  key={rental.rentalId}
                  rental={rental}
                />
              ))
            ) : (
              <div className='no-matching'>
                <h3>No rentals match the selected filter.</h3>
                <img src={carImage} alt="No rentals" className="no-rentals-image" />
                <p>Try changing the filter or check back later.</p>
              </div> 
            )}
          </div>
        </div>
      </section>

      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default Orders;