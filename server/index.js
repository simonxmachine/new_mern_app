const express = require('express')

const { Analytics } = require('@segment/analytics-node');
const analytics = new Analytics({ writeKey: 'u4hbGHBJ3a2Rl3oXLem6I5YxsomyFF3l' }); // Replace with your Segment write key

const cors = require('cors')
const app = express()

app.use(cors(
    {
        origin: "https://mern-app-frontend-navy.vercel.app",
        // headers: ['Content-Type', 'X-Requested-With', 'Authorization', 'Access-Control-Allow-Origin'],
        credentials: true,
    }
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello");
})


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);


    await analytics.track({
        anonymousId: '553bb-95c3-4f8d-af97-86b2b404dcfe',
        event: 'Item Purchased',
        properties: {
          revenue: 39.95,
          shippingMethod: '2-day', 
          name: name,
          email: email,
          password: password,
        }
      });

    res.status(200).json({ message: 'Registration successful' });


});
    


app.listen(3001, () => {
    console.log("Server is Running")
})
