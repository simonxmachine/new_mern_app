import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const url = 'https://mern-app-api-seven.vercel.app/register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    
    try {
      const data = {
        name,
        email,
        address, // Add address to the data object
      };

      const response = await axios.post(url, data, {
        withCredentials: true, // Include credentials for CORS
      });

      if (response.data.success) {
        setSuccessMessage('Registration successful!');
        // Optionally clear form fields or redirect to a confirmation page
      } else {
        setErrorMessage(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Server error. Please try again later.');
    }

  }
  
  return (
    <div className="d-flex justify-content-center align-items-center bg-black vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">
              <strong>Address</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              className="form-control rounded-0"
              onChange={(e) => setAddress(e.target.value)}          
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>Already Have an Account</p>
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
