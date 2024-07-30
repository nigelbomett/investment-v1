import express, {Request,Response} from 'express';
import { User } from '../types';
import fs from 'fs-extra';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const usersPath = './data/users.json';
const secretKey = 'your_secret_key';

const readUsers = async (): Promise<User[]> => {
    const data = await fs.readFile(usersPath, 'utf8');
    return JSON.parse(data);
};

const writeUsers = async (data:User[]) => {
    await fs.writeFile(usersPath, JSON.stringify(data,null,2));
};

router.post('/register',async(req:Request,res: Response) => {
    const {username,password} = req.body;
    const users = await readUsers();

    const userExists = users.find(user => user.username === username);
    if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser: User = {username,password:hashedPassword};
    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({message: 'User registered successfully'});
});

router.post('/login',async (req:Request,res: Rresponse) => {
    const {username, password} = req.body;
    const users = await readUsers();

    const user = users.find(user => user.username === username);
    if(!user) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    res.json({token});
})

export default router;