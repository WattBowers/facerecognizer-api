import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import signin from './controllers/signin.js';
import register from './controllers/register.js';
import image from './controllers/image.js';
import profile from './controllers/profile.js';


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
      rejectUnauthorized: false,
      },
      },
    })

const app = express();
app.use(cors({
  credentials: true,
  origin: 'https://face-finding-project.herokuapp.com'
}));
app.options('*', cors());
app.use(express.json());


app.get('/', (req, res)=> {  
  res.send('success');
})

app.get('/test', (req, res)=> {
  res.send('this works')
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id' , (req, res) => { profile.handleProfile(req, res)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000);
