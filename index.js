import express from 'express';
import mongoose from 'mongoose';

import {registerValidator, loginValidator, postCreateValidator} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import {login, register, getMe} from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.connect('mongodb+srv://VladUst:892015687@mernblogcluster.ch5yd.mongodb.net/mernblog?retryWrites=true&w=majority').then(() => console.log("DB connection success")).catch((err) => console.error(err))
const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, login);
app.post('/auth/register', registerValidator, register);
app.get('/auth/me', checkAuth, getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidator, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server ok')
});