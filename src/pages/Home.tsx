import { Title } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
        <Title>Welcome to Fearless Investments</Title>
        <Link to="/investments">View Investments</Link>
    </div>
  )
}

export default Home