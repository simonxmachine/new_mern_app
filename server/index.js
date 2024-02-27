
require('dotenv').config();
const express = require('express')
var snowflake = require('snowflake-sdk');
// const cookieParser = require('cookie-parser');

// import { Analytics } from '@segment/analytics-node'
// const analytics = new Analytics({ writeKey: 'YBdHaB2iSFODnXzNWHUpymQYvhijm7pH' }); // Replace with your Segment write key

const cors = require('cors')
const app = express()

// Enable CORS with appropriate configuration

// Live Server
app.use(cors({
    origin: 'https://new-mern-app-frontend.vercel.app', // Replace with your frontend's origin
    credentials: true, // Allow sending of credentials if required
  }));

// Local Server
// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend's origin
//     credentials: true, // Allow sending of credentials if required
// }));


    
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


// Set cookie with cookie-parser
// app.get('/set-cookie', (req, res) => {
//     res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
//     res.send('Cookie has been set');
//   });


app.post('/register', async (req, res) => {
    const { startTime, name, email, address, city, state, country, ip, currentSite, screen, orientation, isMobile, navigator } = req.body;
    console.log(startTime, name, email, address, city, state, country, ip, currentSite, screen, orientation, isMobile, navigator);

    const isConnectionValid = await connection.isValidAsync();
    console.log("is connection valid", isConnectionValid);

    const sql = `INSERT INTO public.full_table2 (start_time, name, email, address, city, state, country, ip, origin_site, screen_size, orientation, is_mobile, browser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const bindings = [startTime, name, email, address, city, state, country, ip, currentSite, screen, orientation, isMobile, navigator]; 

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
