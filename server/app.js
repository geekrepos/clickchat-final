const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io')
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// create
app.post('/userinfo', (request, response) => {
    const { userid } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.getUserInfo(userid);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/messages', (request, response) => {
    const { userid } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.messages(userid);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/getAllUsers', (request, response) => {
    const { userid } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.getAllUsers(userid);

    result
    .then(data => response.json({ data: {users: data}}))
    .catch(err => console.log(err));
});

// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/createUser', (request, response) => {
    const { fullname, username, password } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.createUser(fullname, username, password);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/makeFriend', (request, response) => {
    const { userid, friendid } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.makeFriend(userid, friendid);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// app.get('/getAllUsers', (request, response) => {
//     const db = dbService.getDbServiceInstance();
//
//     const result = db.getUsersList();
//
//     result
//     .then(data => response.json({data : data}))
//     .catch(err => console.log(err));
// })

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
})

io.on("connection", (socket)=>{
    console.log(socket.id);

    socket.on('disconnect',  ()=>{
        console.log("USER disconnected: ", socket.id);
    })
})

console.log("ENV: ", process.env.PORT);

server.listen(process.env.PORT, () => console.log('app is running'));
// app.listen(process.env.PORT, () => console.log('app is running'));
