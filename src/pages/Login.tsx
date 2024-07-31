import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Container, Paper, Title, Alert } from '@mantine/core';

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            navigate('/investments');
        } catch (error) {
            setError('Login failed.Please check your credentials and try again.');
            console.error('Login failed', error);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta={'center'}>Welcome</Title>
            {error && (
                <Alert title="Error" color="red" mt="md">
                    {error}
                </Alert>
            )}
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="Your username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        mt="md"
                    />
                    <Button fullWidth mt="xl" type="submit">
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
