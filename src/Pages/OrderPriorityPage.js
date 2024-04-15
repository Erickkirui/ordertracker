import React from 'react'
import '../Styles/orderspage.css'
import { Link } from 'react-router-dom'

function OrderPriorityPage() {
  return (
    <div className='order-priority'>
        <h2>Select The type of orders you want to see</h2>

        <Link to="/highpriority-orders"> <button>High Priority</button> </Link>

        <Link to="/mediumpriority-orders"><button>Medium Priority</button></Link>

        <Link to="/lowpriority-orders"><button>Low Priority</button></Link>

        <Link to="/all-orders"><button> All Orders </button></Link>
    </div>
  )
}

export default OrderPriorityPage