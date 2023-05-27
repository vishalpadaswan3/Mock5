const express = require('express');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post("/freelancers", (req, res) => {
    try {

        let s = fs.readFileSync("./db.json");
        let freelancers = JSON.parse(s);
        req.body.id = freelancers.users[freelancers.users.length - 1].id + 1;
        req.body.isBooked = false;
        let newFreelancer = req.body;
        freelancers.users.push(newFreelancer);
        fs.writeFileSync("./db.json", JSON.stringify(freelancers));
        res.send({ message: "Freelancer added" ,freelancers});
    } catch (error) {
        console.log(error);
        res.send({ message: "Error" ,error:error.message});
    }
})


app.get("/freelancers", (req, res) => {
    try {
        let s = fs.readFileSync("./db.json");
        let freelancers = JSON.parse(s);
        res.send(freelancers);
    } catch (error) {
        res.send({ message: "Error" ,error});
    }
})


app.patch("/freelancers/:id", (req, res) => {
    try {
        console.log(req.body);
        let s = fs.readFileSync("./db.json");
        let freelancers = JSON.parse(s);
        console.log(freelancers);
        let id = req.params.id;
        let freelancer = freelancers.users[id - 1];
        console.log(freelancer);
        freelancer.isBooked = req.body.isBooked;
        fs.writeFileSync("./db.json", JSON.stringify(freelancers));
        res.send({ message: "Freelancer updated" ,freelancers});

    } catch (error) {
        res.send({ message: "Error" ,error});
    }
})


app.delete("/freelancers/:id", (req, res) => {
    try {
        let s = fs.readFileSync("./db.json");
        let freelancers = JSON.parse(s);
        let id = req.params.id;
        freelancers.users = freelancers.users.filter((el) => {
            return el.id != id;
        })

        for(let i=0;i<freelancers.users.length;i++){
            freelancers.users[i].id=i+1;
        }
        fs.writeFileSync("./db.json", JSON.stringify(freelancers));
        res.send({ message: "Freelancer deleted" ,freelancers});
    } catch (error) {
        res.send({ message: "Error" ,error});
    }
})


app.put("/freelancers/:id", (req, res) => {
    try {

        let s = fs.readFileSync("./db.json");
        let freelancers = JSON.parse(s);
        let id = req.params.id;
        let freelancer = freelancers.users[id - 1];
        freelancer.name = req.body.name;
        freelancer.skills = req.body.skills;
        freelancer.hourly_rate = req.body.hourly_rate;
        freelancer.profile_picture = req.body.profile_picture;
        freelancer.profession = req.body.profession;
        freelancer.email = req.body.email;
        
        fs.writeFileSync("./db.json", JSON.stringify(freelancers));
        res.send({ message: "Freelancer updated" ,freelancers});

    } catch (error) {
        res.send({ message: "Error" ,error});
    }
})

app.listen(process.env.port, async () => {
    console.log('Server listening on port 3000');
});