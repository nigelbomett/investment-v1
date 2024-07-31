import { MemoryRouter } from "react-router-dom";
import Login from "../../src/pages/Login";
import React from 'react';
import { render, screen ,fireEvent,waitFor} from "@testing-library/react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import '@testing-library/jest-dom';
import { MantineProvider } from "@mantine/core";

jest.mock('axios');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}))


describe('Login', () => {
    const useNavigateMock = jest.mocked(useNavigate);
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        useNavigateMock.mockReturnValue(mockNavigate);

        //Mock console.error
        jest.spyOn(console,'error').mockImplementation(() => {});
    });

    afterEach(() => {
        //restore console.error
        (console.error as jest.Mock).mockRestore();
    });

    //Check the Login Form has been displayed
    it('renders the login form', () => {
        render(
            <MantineProvider>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </MantineProvider>
        );

        expect(screen.getByPlaceholderText('Your username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    //Test successful login
    it('submits the login form successfully', async () => {
        axios.post = mockNavigate.mockResolvedValue({ data: { token: 'fake_token' } });

        render(
            <MantineProvider >
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </MantineProvider >
        );
        fireEvent.change(screen.getByPlaceholderText('Your username'), {target: {value: 'testuser'}})
        fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: 'password' } })
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token','fake_token');
            expect(mockNavigate).toHaveBeenCalledWith('/investments');
        });
    });

    //Test if error message is displayed on login fail
    it('displays an error message on login failure', async () => {
        axios.post = mockNavigate.mockRejectedValue(new Error('Login failed'));

        render(
            <MantineProvider>
                <MemoryRouter>
                    <Login/>
                </MemoryRouter>
            </MantineProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Your username'), {target: {value: 'testuser'}});
        fireEvent.change(screen.getByPlaceholderText('Your password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Login failed.Please check your credentials and try again.')).toBeInTheDocument();
            expect(console.error).toHaveBeenCalledWith('Login failed',expect.anything());
        });
    });
});