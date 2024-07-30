import InvestmentForm from '../components/InvestmentForm';
import InvestmentList from '../components/InvestmentList';
import { useState } from 'react';
import { Container, Title } from '@mantine/core';

const Investments = () => {
  const [key, setKey] = useState(0);

  const refreshInvestments = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <Container mt={100}>
      <Title order={2}>Investments</Title>
      <InvestmentForm refreshInvestments={refreshInvestments} />
      <InvestmentList key={key} />
    </Container>
  );
};

export default Investments;
