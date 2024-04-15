import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function CreateOrder() {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [priority, setPriority] = useState('');
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/neworder', {
        customer_name: customerName,
        id: id,
        phone_number: phoneNumber,
        priority: priority.toLowerCase(),
        product_name: productName
      });
      setMessage(response.data.message);
      setId(response.data.id);
      // Clear form fields
      setCustomerName('');
      setPhoneNumber('');
      setPriority('');
      setProductName('');
      // Show success alert
      setSuccessAlertOpen(true);
      // Close error alert if open
      setErrorAlertOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
      setMessage('Error adding order. Please try again.');
      // Show error alert
      setErrorAlertOpen(true);
      // Close success alert if open
      setSuccessAlertOpen(false);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <Alert 
        severity="success" 
        onClose={() => setSuccessAlertOpen(false)} 
        sx={{ 
          display: successAlertOpen ? 'flex' : 'none', 
          backgroundColor: 'green', 
          color: 'white',
          alignItems: 'center', 
          '& .MuiAlert-icon': { color: 'white' }, // Adjust icon color
          '& .MuiAlert-message': { color: 'white' } // Adjust message color
        }}
      >
        Order added successfully
      </Alert>
      <Alert 
        severity="error" 
        onClose={() => setErrorAlertOpen(false)} 
        sx={{ 
          display: errorAlertOpen ? 'flex' : 'none', 
          backgroundColor: 'red', 
          color: 'white',
          alignItems: 'center', 
          '& .MuiAlert-icon': { color: 'white' }, // Adjust icon color
          '& .MuiAlert-message': { color: 'white' } // Adjust message color
        }}
      >
        Error adding order. Please try again.
      </Alert>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>
        <button type="submit" className='creat-order-button'>Submit order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateOrder;
