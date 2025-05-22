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
          aria-hidden="true"
        />
      );
    }
    return null;
  };

return (
  <div className="rentals-details-table">
    <table aria-label="Car Rental History">
      <thead>
        <tr>
          {[
            { id: 'renter.firstName', label: 'Renter' },
            { id: 'renter.email', label: 'Mail' },
            { id: 'renter.phoneNumber', label: 'Phonenumber' },
            { id: 'pickupLocation', label: 'Pick-Up Location' },
            { id: 'dropoffLocation', label: 'Drop-Off Location' },
            { id: 'startDate', label: 'Pick-Up Time' },
            { id: 'endDate', label: 'Drop-Off Time' },
            { id: 'status', label: 'Status' },
            { id: 'totalCost', label: 'Price' }
          ].map(column => (
            <th 
              key={column.id}
              onClick={() => handleSort(column.id)}
              onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') handleSort(column.id)}}
              tabIndex="0"
              role="button"
              aria-sort={sortedColumn === column.id ? sortOrder : "none"}
              style={{ cursor: 'pointer' }}
            >
              {column.label} {getCaret(column.id)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRentals.length > 0 ? (
          sortedRentals.map((rental, index) => {
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
                <td>{rental.renter?.email || 'N/A'}</td>
                <td>{rental.renter?.phoneNumber || 'N/A'}</td>
                <td>{rental.pickupLocation || 'N/A'}</td>
                <td>{rental.dropoffLocation || 'N/A'}</td>
                <td>{formattedStartDate}</td>
                <td>{formattedEndDate}</td>
                <td>{rental.status || 'N/A'}</td>
                <td>{rental.totalCost ? `${rental.totalCost}kr` : 'N/A'}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="9" className="no-data-message">No rental data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}

export default MyRentalsCarTable;