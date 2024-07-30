import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, NumberInput, Box } from '@mantine/core';

interface InvestmentFormProps {
    refreshInvestments: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ refreshInvestments }) => {
    const [investment, setInvestment] = useState({ name: '', amount: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvestment({ ...investment, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        await axios.post('http://localhost:5000/investments', investment, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        refreshInvestments();
        setInvestment({ name: '', amount: 0 });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 300 }} mx="auto">
            <TextInput
                label="Investment Name"
                placeholder="Investment Name"
                value={investment.name}
                onChange={handleChange}
                name="name"
                required
            />
            <NumberInput
                label="Amount"
                placeholder="Amount"
                value={investment.amount}
                onChange={(value) => setInvestment({ ...investment, amount: value ?? 0 })}
                name="amount"
                required
                min={0}
            />
            <Button type="submit" mt="md">Add Investment</Button>
        </Box>
    );
};

export default InvestmentForm;
