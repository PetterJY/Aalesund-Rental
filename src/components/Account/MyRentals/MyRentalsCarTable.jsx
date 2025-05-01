import React from 'react';
import './MyRentals.css';
import '../../App.css';

const MyRentalsCarTable = ({ rentals = [] }) => {
  return (
    <div className="details-table">
      <table>
        <thead>
          <tr>
            <th>Renter</th>
            <th>Mail</th>
            <th>Phonenumber</th>
            <th>Renting-Time</th>
            <th>Pick-Up Location</th>
            <th>Drop-Off Location</th>
            <th>Pick-Up Time</th>
            <th>Drop-Off Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental, index) => {
            const startDate = new Date(rental.startDate);
            const endDate = new Date(rental.endDate);
            const rentingTime = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            return (
              <tr key={index}>
                <td>
                  {rental.renter?.firstName && rental.renter?.lastName
                    ? `${rental.renter.firstName} ${rental.renter.lastName}`
                    : 'N/A'}
                </td>
                <td>{rental.renter.email}</td>
                <td>{rental.renter.phoneNumber}</td>
                <td>{rentingTime} days</td>
                <td>{rental.pickupLocation}</td>
                <td>{rental.dropoffLocation}</td>
                <td>{rental.startDate}</td>
                <td>{rental.endDate}</td>
                <td>{rental.totalCost}kr</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyRentalsCarTable;