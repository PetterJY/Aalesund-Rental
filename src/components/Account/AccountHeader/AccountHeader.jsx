import { useLocation } from 'react-router-dom'; 
import './AccountHeader.css';
import '../../App.css';

const AccountHeader = () => {
  const location = useLocation(); 

  return (
    <header className="account-menu">
      <ul className="account-menu-list">
        <li id="account-link" className={location.pathname === '/account/account' ? 'active' : ''}>
          <a href="/account/account">Account</a>
        </li>
        <li id="orders-link" className={location.pathname === '/account/orders' ? 'active' : ''}>
          <a href="/account/orders">Orders</a>
        </li>
        <li id="my-rentals-link" className={location.pathname === '/account/my-cars' ? 'active' : ''}>
          <a href="/account/my-cars">My Rentals</a>
        </li>
      </ul>
    </header>
  );
};

export default AccountHeader;