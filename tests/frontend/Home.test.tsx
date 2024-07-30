import React from 'react';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';
import '@testing-library/jest-dom';

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MantineProvider>
            <MemoryRouter>{ui}</MemoryRouter>
        </MantineProvider>
    );
};

test('renders Home component', () => {
    const { getByText } = renderWithProviders(<Home />);
    expect(getByText('Welcome to Fearless Investments')).toBeInTheDocument();
});
