import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';
import signin from './controllers/signin.js';
import register from './controllers/register.js';
import image from './controllers/image.js';
import profile from './controllers/profile.js'

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Miniman009',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id' , (req, res) => { profile.handleProfile(req, res)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
