import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import './MyRentalsCarTable.css';

const MyRentalsCarTable = ({ rentals = [] }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const handleSort = (column) => {
    if (sortedColumn === column) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending order
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedRentals = [...rentals].sort((a, b) => {
    if (!sortedColumn) return 0; // No sorting if no column is selected

    const valueA = a[sortedColumn] || '';
    const valueB = b[sortedColumn] || '';

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  const getCaret = (column) => {
    if (sortedColumn === column) {
      return (
        <CaretDown
          size={16}
          className={`caret-icon ${sortOrder === 'desc' ? 'rotated' : ''}`}
        />
      );
    }
    return null; // No caret if the column is not sorted
  };

  return (
    <div className="rentals-details-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('renter.firstName')}>
              Renter {getCaret('renter.firstName')}
            </th>
            <th onClick={() => handleSort('renter.email')}>
              Mail {getCaret('renter.email')}
            </th>
            <th onClick={() => handleSort('renter.phoneNumber')}>
              Phonenumber {getCaret('renter.phoneNumber')}
            </th>
            <th onClick={() => handleSort('pickupLocation')}>
              Pick-Up Location {getCaret('pickupLocation')}
            </th>
            <th onClick={() => handleSort('dropoffLocation')}>
              Drop-Off Location {getCaret('dropoffLocation')}
            </th>
            <th onClick={() => handleSort('startDate')}>
              Pick-Up Time {getCaret('startDate')}
            </th>
            <th onClick={() => handleSort('endDate')}>
              Drop-Off Time {getCaret('endDate')}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {getCaret('status')}
            </th>
            <th onClick={() => handleSort('totalCost')}>
              Price {getCaret('totalCost')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRentals.map((rental, index) => {
            const startDate = new Date(rental.startDate);
            const endDate = new Date(rental.endDate);

            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedStartDate = startDate.toLocaleDateString(undefined, options);
            const formattedEndDate = endDate.toLocaleDateString(undefined, options);

            return (
              <tr key={index}>
                <td>
                  {rental.renter?.firstName && rental.renter?.lastName
                    ? `${rental.renter.firstName} ${rental.renter.lastName}`
                    : 'N/A'}
                </td>
                <td>{rental.renter.email}</td>
                <td>{rental.renter.phoneNumber}</td>
                <td>{rental.pickupLocation}</td>
                <td>{rental.dropoffLocation}</td>
                <td>{formattedStartDate}</td>
                <td>{formattedEndDate}</td>
                <td>{rental.status}</td>
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