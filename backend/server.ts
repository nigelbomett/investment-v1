import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import investmentRoutes from './routes/investments';
import authRoutes from './routes/auth';



const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/investments', investmentRoutes);
app.use('/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});