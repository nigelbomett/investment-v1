import { Title } from '@mantine/core'
import React from 'react'
import InvestmentForm from '../components/InvestmentForm'
import InvestmentList from '../components/InvestmentList'

const Investments = () => {
  return (
    <div>
      <Title>Investments</Title>
      <InvestmentForm refreshInvestments={() => window.location.reload}/>
      <InvestmentList/>
    </div>
  )
}

export default Investments