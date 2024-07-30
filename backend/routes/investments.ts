import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs-extra';
import jwt from 'jsonwebtoken';
import { Investment } from '../types';

const router = express.Router();
const dataPath = './data/investments.json';
const secretKey = 'your_secret_key';

const readData = async (): Promise<Investment[]> => {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
};

const writeData = async (data:Investment[]) => {
    await fs.writeFile(dataPath,JSON.stringify(data,null,2));
};


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
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
    investments.push(newInvestment);
    await writeData(investments);
    res.status(201).json(newInvestment);
});

export default router;
