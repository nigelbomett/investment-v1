import { Title } from '@mantine/core';
import axios from 'axios';
import React, { useEffect } from 'react'

interface Investment {
    name: string;
    amount: number;
}


const InvestmentList:React.FC = () => {
    const [investments, setInvestments] = useState<Investment[]>([]);

    const fetchInvestments = async () => {
        const response = await axios.get('http://localhost:5000/investments');
        setInvestments(response.data);
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

  return (
    <div>
        <Title order={2}>Investments</Title>
        <ul>
            {investments.map((investment, index) => (
                <li key={index}>{investment.name}: ${investment.amount}</li>
            ))}
        </ul>
    </div>
  );
};

export default InvestmentList