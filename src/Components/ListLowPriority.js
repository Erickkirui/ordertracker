import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/orderlist.css'

function ListLowPriority() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/lowpriority`);
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error, show message to the user, etc.
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async () => {
    try {
      // Delete selected orders
      await Promise.all(selectedOrders.map(orderId => axios.delete(`/api/orders/${orderId}`)));
      // After successful deletion, fetch the updated orders
      fetchOrders();
      // Clear selected orders
      setSelectedOrders([]);
    } catch (error) {
      console.error('Error deleting order:', error);
      // Handle error, show message to the user, etc.
    }
  };

  const toggleSelectOrder = (orderId) => {
    setSelectedOrders(prevSelectedOrders => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter(id => id !== orderId);
      } else {
        return [...prevSelectedOrders, orderId];
      }
    });
  };

  return (
    <div className='orderlist-container'>
      <h2>Low priority orders</h2>
      <div className='quick-navigation'>
      <Link to="/"><p>Home | </p> </Link> <Link to ="/orderselection"><p>Orders | </p></Link> <Link to ="/addorder"><p>Add Orders</p></Link>
      </div>
      
      <table className="order-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Product</th>
            
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleSelectOrder(order.id)}
                  checked={selectedOrders.includes(order.id)}
                />
              </td>
              <td>{order.customer_name}</td>
              <td>{order.phone_number}</td>
              <td>{order.product_name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <button className="delete-button"  onClick={handleDelete}>Delete Selected</button>

      <div className="pagination">
        <p>Page {currentPage} of {totalPages}</p>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
     
    </div>
  );
}

export default ListLowPriority;
