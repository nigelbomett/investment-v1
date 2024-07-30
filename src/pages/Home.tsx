import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Button, Text, Center, Stack } from '@mantine/core';

const Home: React.FC = () => {
  return (
    <Container>
      <Center style={{ height: '100vh' }}>
        <Stack align="center">
          <Title order={1} ta="center">Welcome to Fearless Investments</Title>
          <Text ta="center" size="lg" color="dimmed">
            Manage and track your investments effortlessly.
          </Text>
          <Button component={Link} to="/investments" size="lg">
            View Investments
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

export default Home;
