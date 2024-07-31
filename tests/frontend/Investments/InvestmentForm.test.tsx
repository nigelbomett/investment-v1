// tests/frontend/InvestmentForm.test.tsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import InvestmentForm from '../../../src/components/InvestmentForm';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('InvestmentForm', () => {
    const refreshInvestments = jest.fn();

    beforeEach(() => {
        localStorage.setItem('token','fake_token');
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    //Render investment form
    it('renders the investment form', () => {
        render(
            <MantineProvider>
                <InvestmentForm refreshInvestments={refreshInvestments} />
            </MantineProvider>
        );

        expect(screen.getByPlaceholderText('Investment Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    });

    //Test adding an investment
    it('submits the form successfully', async () => {
        mockedAxios.post.mockResolvedValue({ data: {} });

        render(
            <MantineProvider>
                <InvestmentForm refreshInvestments={refreshInvestments} />
            </MantineProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Investment Name'), { target: { value: 'Test Investment' } });
        fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '1000' } });
        fireEvent.click(screen.getByText('Add Investment'));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/investments',
                { name: 'Test Investment', amount: 1000 },
                { headers: { 'Authorization': 'Bearer fake_token' } }
            );
            expect(refreshInvestments).toHaveBeenCalled();
            expect(screen.getByPlaceholderText('Investment Name')).toHaveValue('');
            expect(screen.getByPlaceholderText('Amount')).toHaveValue('0');
        });
    });

    //Try adding an investment when unauthorized/token expired
    /* it('displays an error when no token is found', () => {
        localStorage.removeItem('token');

        render(
            <MantineProvider>
                <InvestmentForm refreshInvestments={refreshInvestments} />
            </MantineProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Investment Name'), { target: { value: 'Test Investment' } });
        fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '1000' } });
        fireEvent.click(screen.getByText('Add Investment'));

        expect(() => fireEvent.submit(screen.getByText('Add Investment'))).toThrow('No token found');
    }); */
}); 
