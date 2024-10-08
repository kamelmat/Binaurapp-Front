import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap

// Spotify Auth App
import { SpotifyAuth } from "../component/SpotifyAuth.jsx";

export const SignUp = () => {
  const { actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Añadir estado para el error de contraseña
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // To check if password and confirm password match
  const handlePasswordConfirmed = () => {
    if (password !== confirmPassword) {
      setPasswordError("Does not match password");
    } else {
      setPasswordError("");
    }
  };

  const handleAgreeTerms = e => setAgreeTerms(e.target.checked);

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);
  }

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Password regex
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordConfirmed();

    // Validate email and password
    if (!validateEmail(email)) {
      setModalMessage("Please enter a valid email address (format: @xxx.com)");
      setShowModal(true);
      return;
    }
    if (!validatePassword(password)) {
      setModalMessage("Password must be at least 8 characters, include one uppercase letter and one special character.");
      setShowModal(true);
      return;
    }
    if (passwordError !== "") {
      setModalMessage(passwordError);
      setShowModal(true);
      return;
    }

    const dataToSend = { email, password, agreeTerms };
    const url = `${process.env.BACKEND_URL}/api/signup`;
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };
    const response = await fetch(url, options)
    console.log(response);
    if (!response.ok) {
      console.log('Error: ', response.status, response.statusText);
      return
    }
    const data = await response.json()
    console.log();
    localStorage.setItem("token", data.access_token)
    actions.setIsLogin(true)
    actions.setUser(data.results)
    console.log(data.access_token);
    navigate('/profile')
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Sign Up To Binaurapp</p>
        <div className="field" onSubmit={handleSubmit}>
          <span className="material-symbols-outlined">alternate_email</span>
          <input autoComplete="off" placeholder="Username" className="form-control" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="field">
          <span className="material-symbols-outlined">lock</span>
          <input placeholder="Password" required={true} className="form-control" type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="field">
          <span className="material-symbols-outlined">password</span>
          <input placeholder="Confirm Password" required={true} className="form-control" type="password" id="passwordConfirmed" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="radio" className="form-check-input" id="termsAgreement" checked={agreeTerms} onChange={handleAgreeTerms}></input>
          <label className="form-check-label text-muted" htmlFor="termsAgreement">I agree the Terms of Privacy Policy</label>
        </div>
        <div className="d-flex justify-content">
          <button className="button1 mx-auto" type="submit" onClick={handleSubmit}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button type="reset" className="button1 mx-auto" onClick={handleReset}>&nbsp;&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;&nbsp;</button>
        </div>
        <div className="d-flex mx-auto justify-content-center text-white mb-2">
          <div className="border align-self-center"></div>
          <span>Or sign up with</span>
          <div className="border align-self-center"></div>
        </div>
        <SpotifyAuth />
        {/* <p className="text-muted" id="termsPolicy">By registering, you are agreeing to Binaurapp's Privacy Policy and Terms of Use.</p> */}
      </form>

      {/* Modal for error messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};