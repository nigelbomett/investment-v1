// tests/frontend/InvestmentList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import InvestmentList from '../../../src/components/InvestmentList';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('InvestmentList', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake_token');

        //Mock console.error
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        //restore console.error
        (console.error as jest.Mock).mockRestore();
    });

    //Render investment list
    it('renders the investment list', async () => {
        const investments = [
            { name: 'Investment 1', amount: 100 },
            { name: 'Investment 2', amount: 200 }
        ];

        mockedAxios.get.mockResolvedValue({ data: investments });

        render(
            <MantineProvider>
                <InvestmentList />
            </MantineProvider>
        );

        await waitFor(() => {
            investments.forEach(investment => {
                expect(screen.getByText(investment.name)).toBeInTheDocument();
                expect(screen.getByText(`$${investment.amount}`)).toBeInTheDocument();
            });
        });
    });

    //Confirm error is displayed when user is not authorized/token expired
    it('displays an error when no token is found', async () => {
        localStorage.removeItem('token');

        mockedAxios.get.mockRejectedValue(new Error('No token found'));

        render(
            <MantineProvider>
                <InvestmentList />
            </MantineProvider>
        );

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error: ', 'No token found');
        });
    });
});
