import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs-extra';
import jwt from 'jsonwebtoken';
import { Investment } from '../types';


const router = express.Router();
const dataPath = './backend/data/investments.json';
const secretKey = 'your_secret_key'; //TODO: add to .env

const readData = async (): Promise<Investment[]> => {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
};

const writeData = async (data:Investment[]) => {
    await fs.writeFile(dataPath,JSON.stringify(data,null,2));
};


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token,secretKey, (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.get('/',authenticateToken, async(req:Request, res: Response) => {
    const investments = await readData();
    res.json(investments);
});

router.post('/',authenticateToken, async (req:Request,res:Response) => {
    const investments = await readData();
    const newInvestment = req.body;
    if(!newInvestment.name) return res.status(400).json({error: `Please provide all the required details`});
    if (!newInvestment.amount) return res.status(400).json({ error: `Please provide all the required details` });
    investments.push(newInvestment);
    await writeData(investments);
    res.status(201).json(newInvestment);
});

export default router;
