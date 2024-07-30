import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Grid, Title, Container, Loader, Text, Badge, Group } from '@mantine/core';

interface Investment {
    name: string;
    amount: number;
}

const InvestmentList: React.FC = () => {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInvestments = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get('http://localhost:5000/investments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setInvestments(response.data);
            setLoading(false);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized');
                } else {
                    console.error('An error occurred:', error);
                }
            } else if (error instanceof Error) {
                console.error('Error: ', error.message);
            } else {
                console.error('Unknown error:', error);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Title order={2}>Investments</Title>
            <Grid>
                {investments.map((investment, index) => (
                    <Grid.Col key={index} span={4}>
                        <Card shadow="sm" padding="lg">
                            <Group  style={{ marginBottom: 5 }}>
                                <Text fw={500}>{investment.name}</Text>
                                <Badge color="green" variant="light">
                                    ${investment.amount}
                                </Badge>
                            </Group>
                            <Text size="sm" style={{ lineHeight: 1.5 }}>
                                Investment details can be shown here.
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
};

export default InvestmentList;
