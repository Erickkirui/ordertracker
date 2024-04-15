import React from 'react'
import '../Styles/Landingpage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='home-buttons'>
      <h2>ORDER MANAGEMENT </h2>
      <Link to="/addorder" >
        <button className='add-orders'>
          Add Order 
        </button>
      </Link>
        
      <Link to="/orderselection">
        <button className='view-orders'>
          View  Orders
        </button>
      </Link>
     

    </div>
  )
}

export default LandingPage