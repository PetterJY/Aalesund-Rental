import React from 'react';
import '../../global.css';
import '../LoginRegister.css';

const RegisterButton = ({ closeModal, isModalVisible, toggleMode }) => {
  const applyEventListener = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Register button clicked.");
    const data = {
      firstName: document.getElementById('first-name-field').value,
      lastName: document.getElementById('last-name-field').value,
      email: document.getElementById('email-field').value,
      account: {
        role: "USER", // Default role
        password: document.getElementById('password-field').value,
      },
    };

    const confirmPassword = document.getElementById('confirm-password-field').value;
    if (data.account.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    delete data.confirmPassword; // Remove confirmPassword from the data object
    console.log("Data object: ", data);

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User has been registered.");
          alert("Account created successfully!");
          closeModal();
        } else {
          console.log("Error creating account.");
          alert("Error creating account. Please try again.");
        }
      });
  };

  return (
    <>
      {isModalVisible && (
        <div id="registerModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 className="title">Create Account</h2>
            <form id="wrapper">
              <input id="email-field" type="text" placeholder="E-mail" required />
              <div id="name-wrapper">
                <input id="first-name-field" type="text" placeholder="First Name" required />
                <input id="last-name-field" type="text" placeholder="Last Name" required />
              </div>
              <div id="password-wrapper">
                <input id="password-field" type="password" placeholder="Password" required />
                <input id="confirm-password-field" type="password" placeholder="Confirm Password" required />
              </div>
              <button
                id="submit-button"
                type="submit"
                onClick={applyEventListener}
                className="submit-button"
              >
                Register
              </button>
              <button className="toggle-login-register-button" onClick={toggleMode}>
                Already have an account? Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterButton;