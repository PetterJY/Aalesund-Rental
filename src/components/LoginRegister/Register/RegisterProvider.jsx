import React from 'react';
import { useAuth } from '../../utils/AuthContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import '../LoginRegister.css';

const RegisterProviderModal = ({ closeModal, isModalVisible, toggleMode }) => {
  const { setIsAuthenticated, setIsAuthInitialized } = useAuth();

  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{8,}$/;
    return phoneRegex.test(phoneNumber);
  }

  function retrieveData() {
    return {
      companyName: document.getElementById('company-name-field').value,
      email: document.getElementById('register-email-field').value,
      password: document.getElementById('register-password-field').value,
      phoneNumber: document.getElementById('phone-number-field').value,
    };
  }

  async function handleRegister(event) {
    event.preventDefault();

    console.log('Provider register button clicked.');

    const data = retrieveData();

    // Check if password and confirm password match
    if (data.password !== document.getElementById('confirm-password-field').value) {
      setErrorMessage('Passwords do not match.');
      setShowErrorMessage(true);
      alert('Passwords do not match.');
      return;
    }

    // Validate password format
    if (!validatePassword(data.password)) {
      setErrorMessage(
        'Password must be at least 8 characters with at least one letter and one number, no special or non-ASCII characters.'
      );
      setShowErrorMessage(true);
      alert('Password must be at least 8 characters with at least one letter and one number, no special or non-ASCII characters.');
      return;
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      setErrorMessage('Invalid email format.');
      setShowErrorMessage(true);
      return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(data.phoneNumber)) {
      setErrorMessage('Phone number must contain at least 8 digits.');
      setShowErrorMessage(true);
      alert('Phone number must contain at least 8 digits.');
      return;
    }

    console.log('Provider data object: ', data);

  try {
    const response = await fetch('https://norwegian-rental.online/api/providers/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Get more detailed error information
      const errorData = await response.json().catch(() => null);
      console.error('Registration failed:', response.status, errorData);
      
      // Show more specific error message based on status code
      if (response.status === 400) {
        setErrorMessage(errorData?.message || 'Invalid provider information. Please check your details.');
      } else if (response.status === 409) {
        setErrorMessage('A provider with this email already exists.');
      } else {
        setErrorMessage(`Registration failed (${response.status}): ${errorData?.message || response.statusText}`);
      }
      
      setShowErrorMessage(true);
      throw new Error('Provider registration failed');
    }

      console.log('Provider has been registered.');
      const responseData = await response.json();
      console.log('Response data: ', responseData);
      closeModal();
      alert('Provider account created successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error creating provider account. Please try again later.');
      setShowErrorMessage(true);
    }
  }

  return (
    <>
      {isModalVisible && (
        <div id="registerProviderModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2 className="title">Create Provider Account</h2>
            <form id="wrapper">
              <input
                className="input-field"
                id="company-name-field"
                type="text"
                placeholder="Company Name"
                required
              />
              <input
                className="input-field"
                id="register-email-field"
                type="text"
                placeholder="E-mail"
                required
              />
              <input
                className="input-field"
                id="phone-number-field"
                type="text"
                placeholder="Phone Number"
                required
              />
              <div id="password-wrapper">
                <div className="toggle-password-button-container">
                  <input
                    id="register-password-field"
                    className="password-input-field"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={togglePasswordVisibility}
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? (
                      <EyeSlash color="var(--secondary-color)" />
                    ) : (
                      <Eye color="var(--secondary-color)" />
                    )}
                  </button>
                </div>
                <div className="toggle-password-button-container">
                  <input
                    id="confirm-password-field"
                    className="password-input-field"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={confirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {confirmPasswordVisible ? (
                      <EyeSlash color="var(--secondary-color)" />
                    ) : (
                      <Eye color="var(--secondary-color)" />
                    )}
                  </button>
                </div>
              </div>
              {showErrorMessage && (
                <p className="error-message" id="register-error-message">
                  {errorMessage}
                </p>
              )}
              <button
                id="submit-button"
                type="submit"
                onClick={handleRegister}
                className="submit-button"
                aria-label="Register Provider"
              >
                Register Provider
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterProviderModal;