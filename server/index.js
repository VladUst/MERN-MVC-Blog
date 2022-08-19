import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidator, loginValidator, postCreateValidator} from './validations.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';
import {UserController, PostController} from './controllers/index.js';
mongoose.connect('mongodb+srv://VladUst:892015687@mernblogcluster.ch5yd.mongodb.net/mernblog?retryWrites=true&w=majority').then(() => console.log("DB connection success")).catch((err) => console.error(err))
const app = express();

const storage = multer.diskStorage({
    destination: (_,__,cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req,res) => {
    res.json({
        url: `/uploads/${req.file.filename}`,
    })
});

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server ok')
});