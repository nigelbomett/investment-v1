import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { hasLength, isInRange, useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react'

interface InvestmentFormProps {
    refreshInvestments: () => void;
}



const InvestmentForm: React.FC<InvestmentFormProps> = ({refreshInvestments}) => {
    const [investment, setInvestment] = useState({name:'',amount:0 || '0'});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setInvestment({...investment,[name]:value});
    };

    const handleNumberChange = (value: number | string) => {
        setInvestment({...investment,amount: value || 0 });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/investments',investment);
        refreshInvestments();
        setInvestment({name: '',amount: 0 || '0'});
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            amount: 0,
        },

        validate: {
            name: hasLength({ min: 2 }, 'name must be more than 2 characters long'),
            amount: isInRange({ min: 0 }, 'amount to be invested should be more than Ksh.5'), 
        },
    });

  return (
    <form onSubmit={handleSubmit}>
          <TextInput
              label="Investment Name"
              placeholder="Investment Name"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
              onChange={handleChange}
          />
          <NumberInput
            label="Investment Amount"
            placeholder='Amount'
            withAsterisk
            key={form.key('amount')}
            {...form.getInputProps('amount')}
            onChange={handleNumberChange}
          />
          <Group justify="flex-end" mt="md">
              <Button type="submit">Add Submit</Button>
          </Group>
    </form>
  )
}

export default InvestmentForm