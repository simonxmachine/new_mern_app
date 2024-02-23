import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Analytics } from '@segment/analytics-node'

// const analytics = new Analytics({ writeKey: 'YBdHaB2iSFODnXzNWHUpymQYvhijm7pH' }); // Replace with your Segment write key

// import axios from 'axios'

function App() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
// axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // axios.post('https://mern-app-api-seven.vercel.app/register', {name, email, password})
    // .then(result => console.log(result))
    // .catch(err => console.log(err))

    // analytics.track({
    //   anonymousId: '5392759vvv32fdsf',
    //   event: 'Item Purchased',
    //   properties: {
    //     revenue: 39.95,
    //     shippingMethod: '2-day', 
    //     name: name,
    //     email: email,
    //     password: password,
    //     userAgent: navigator.userAgent,
    //     language: navigator.language,
    //     screenWidth: window.screen.width,
    //     screenHeight: window.screen.height,
    //   }
    // });


    try {
      const response = await fetch("https://fn.segmentapis.com/?b=eG9hQWo1WmJmbTNWMWdMamtzVXFmSjo6VmlRZUZpaURRMHRlSFlwQ3VpQmlGWFhmb1BWNGppVEs=", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
              "Authorization": "secret_api_key",
            },
            body: JSON.stringify({ name, email, password }),

      });
      if (response.ok) {
          console.log("Registered Successfully");
      } else {
          console.log("Registration Failed");
      }
  } catch (error) {
      console.log(error);
  }

  }
  
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
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
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}          
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
