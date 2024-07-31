import React from 'react';
import {render,screen} from '@testing-library/react';
import Investments from '../../../src/pages/Investments';
import {MantineProvider} from '@mantine/core';
import '@testing-library/jest-dom';

jest.mock('../../../src/components/InvestmentForm', () => () => <div>InvestmentForm</div>);
jest.mock('../../../src/components/InvestmentList', () => () => <div>InvestmentForm</div>);

describe('Investments', () => {
    it('renders the investment page', () => {
        render(
            <MantineProvider>
                <Investments/>
            </MantineProvider>
        );

        expect(screen.getByText('Investments')).toBeInTheDocument();
        //expect(screen.getByText('InvestmentForm')).toBeInTheDocument();
        //expect(screen.getByText('InvestmentList')).toBeInTheDocument();
    });
});
