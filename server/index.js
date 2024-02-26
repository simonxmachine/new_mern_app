
require('dotenv').config();
const express = require('express')
var snowflake = require('snowflake-sdk');

// import { Analytics } from '@segment/analytics-node'
// const analytics = new Analytics({ writeKey: 'YBdHaB2iSFODnXzNWHUpymQYvhijm7pH' }); // Replace with your Segment write key

const cors = require('cors')
const app = express()

// Enable CORS with appropriate configuration
app.use(cors({
    origin: 'https://mern-app-frontend-navy.vercel.app', // Replace with your frontend's origin
    credentials: true, // Allow sending of credentials if required
  }));

const data = {
    name: "fsgsgs lee",
    email: "www.5235325.com", 
    address: "2222 Main St",
      };
    
var connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    region: "us-east-1",
    application: 'Website', 
    database: 'SEGMENT_EVENTS' 
  });


  connection.connect( 
    function(err, conn) {
    if (err) {
        console.error('Unable to connect: ' + err);
        } 
    else {
        console.log('Successfully connected to Snowflake.');
        // Optional: store the connection ID.
        connection_ID = conn.getId();
        }
    }
);



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.get("/", (req, res) => {
    res.json("Hello");
})

app.post('/register', async (req, res) => {
    const { name, email, address } = req.body;
    console.log(name, email, address);

    const isConnectionValid = await connection.isValidAsync();
    console.log("is connection valid", isConnectionValid);

    const sql = `INSERT INTO public.segment_table (name, email, address) VALUES (?, ?, ?);`;
    const bindings = [name, email, address]; 

    connection.execute({
        sqlText: sql,
        binds: bindings,
        complete: function(err, stmt, rows) {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
            } else {
                console.log('Successfully executed statement: ' + stmt.getSqlText());
            }
        }
    });

    res.status(200).json({ message: 'Registration successful' });
});
        

// connection.destroy(function(err, conn) {
//     if (err) {
//         console.error('Unable to disconnect: ' + err.message);
//     } else {
//         console.log('Disconnected connection with id: ' + connection.getId());
//     }
//     });



app.listen(3001, () => {
    console.log("Server is Running")
})
