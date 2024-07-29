import { Button, Container, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { hasLength,isNotEmpty, useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react'
import  {useNavigate}  from 'react-router-dom';


const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({username: '',password:''});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setCredentials({...credentials,[name]: value});
  }

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:5173/auth/login',credentials);
        localStorage.setItem('token',response.data.token);
        navigate('/investments');
    } catch (error) {
        console.error('Login failed',error);
    }
  };


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: hasLength({ min: 2, max: 10 }, 'Username must be 2-10 characters long'),
            password: isNotEmpty('Enter your password'),
        },
    });

  return (
      <Container size="xs" mt="150">
        <Title>Login</Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                  label="Username"
                  placeholder="Username"                  
                  withAsterisk
                  key={form.key('username')}
                  {...form.getInputProps('username')}
                  //onChange={handleChange}
              />
              <PasswordInput
                  label="Password"
                  placeholder="Password"
                  withAsterisk
                  mt="md"
                  key={form.key('password')}
                  {...form.getInputProps('password')}
                  //onChange={handleChange}
              />
              <Group justify="flex-end" mt="md">
                  <Button type="submit">Submit</Button>
              </Group>
          </form> 
      </Container>
  )
}

export default Login;