const express = require('express')
const cors = require('cors')
const { Analytics } = require('@segment/analytics-node');

const app = express()

app.use(cors(
    {
        origin: ["https://mern-app-frontend-navy.vercel.app"],
        headers: ['Content-Type', 'X-Requested-With', 'Authorization', 'Access-Control-Allow-Origin'],
        credentials: true,
    }
));
// app.options('*',cors());


// app.use(allowCrossDomain);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const analytics = new Analytics({ writeKey: 'u4hbGHBJ3a2Rl3oXLem6I5YxsomyFF3l' }); // Replace with your Segment write key


app.get("/", (req, res) => {
    res.json("Hello");
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    console.log(name, email, password);


    // analytics.track({
    //     anonymousId: '553bb-95c3-4f8d-af97-86b2b404dcfe',
    //     event: 'Item Purchased',
    //     properties: {
    //       revenue: 39.95,
    //       shippingMethod: '2-day', 
    //       name: name,
    //       email: email,
    //       password: password,
    //     }
    //   });
      


    // RegisterModel.findOne({email: email})
    // .then(user => {
    //     if(user) {
    //         res.json("Already have an account")
    //     } else {
    //         RegisterModel.create({name: name, email: email, password: password})
    //         .then(result => res.json(result))
    //         .catch(err => res.json(err))
    //     }
    // }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})
