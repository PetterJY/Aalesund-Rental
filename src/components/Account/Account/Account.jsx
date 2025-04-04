import '../../App.css';
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
        <h3>First name</h3>
        <input type="text" id="name" name="name" required></input>
        <h3>Last name</h3>
        <input type="text" id="last-name" name="last-name" required></input>
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