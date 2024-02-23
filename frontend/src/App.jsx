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

    const writeKey = 'L65Oymz6KZh8F2rALfQ9rsuLkNZHE64t'; // Replace with your actual write key
    const encodedCredentials = btoa(`${writeKey}:`); // Base64 encode username:colon
    
    const url = 'https://api.segment.io/v1/identify'; // Replace with the actual API endpoint
   

    const data = {
      "userId": "019mr8mf4r",
      "traits": {
        "email": "pgibbons@example.com",
        "name": "Peter Gibbons",
        "industry": "Technology"
      },
      "context": {
        "ip": "24.5.68.47"
      },
      "timestamp": "2012-12-02T00:30:08.276Z"
    }
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json', // Adjust based on your data format
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Successfully sent tracking data:', data);
    })
    .catch(error => {
      console.error('Error sending tracking data:', error);
    });



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


  //   try {
  //     const response = await fetch("https://api.segment.io/v1/track", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json", 
  //             "Authorization" : `Basic L65Oymz6KZh8F2rALfQ9rsuLkNZHE64t:`, 
  //           },
  //           body: JSON.stringify({ name, email, password }),

  //     });
  //     if (response.ok) {
  //         console.log("Registered Successfully");
  //     } else {
  //         console.log("Registration Failed");
  //     }
  // } catch (error) {
  //     console.log(error);
  // }

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
