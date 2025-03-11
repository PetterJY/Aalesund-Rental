import React from 'react';
import '../../global.css';
import '../LoginRegister.css';

const ForgotPassword = ({ closeModal, isModalVisible, toggleMode }) => {
  return (
    <>
      {isModalVisible && (
        <div id="forgotPasswordModal" className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h2>Forgot Password</h2>
            <form>
              <input id="email-field" type="text" placeholder="E-mail" required />
              <button id="submit-button" type="submit">Reset Password</button>
            </form>
            <button className="toggle-login-register-button" onClick={toggleMode}>Back to Login</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

