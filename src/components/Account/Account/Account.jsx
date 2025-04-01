import '../../global.css';
import '../Account.css';

const Account = () => {
  return (
    <div className="account">
       <header className="account-menu">
        <ul className="account-menu-list">
          <li id="selected-site-link"><a href="/account/account">Account</a></li>
          <li><a href="/account/bookings">Bookings</a></li>
        </ul>
      </header>
      <section className="account-section">
        <h1>Account</h1>
        <h2>Personal Information</h2>
        <h2>First name</h2>
        <input type="text" />
        <h2>Last name</h2>
        <input type="text" />
        <button className='save-button'>Save</button>
        <ul className='bottom-button-list'>
          <li><button className='bottom-button'>Delete Account</button></li>
          <li><button className='bottom-button'>Change Password</button></li>
        </ul>

      </section>
    </div>
  );
}

export default Account;