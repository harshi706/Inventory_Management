import React from 'react'
import Inventory from './components/Inventory'

const App = () => {
  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Dynamic Inventory Management
      </h1>
      <Inventory/>
    </div>
  )
}

export default App
