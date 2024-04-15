import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import ScrollToTop from './Components/ScrollToTop';
import AddOrders from './Pages/AddOrders';
import OrderPriorityPage from './Pages/OrderPriorityPage';
import ListHighPriority from './Components/ListHighPriority';
import ListAllOrder from './Components/ListAllOrder';
import ListMediumPriority from './Components/ListMediumPriority';
import ListLowPriority from './Components/ListLowPriority';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />

          {/* order pages */}
          <Route path='/all-orders' element ={<ListAllOrder />} />
          <Route path='/highpriority-orders' element ={<ListHighPriority />} />
          <Route path='/mediumpriority-orders' element ={<ListMediumPriority />} />
          <Route path='/lowpriority-orders' element ={<ListLowPriority />} />

          <Route path='/addorder' element={<AddOrders />} />
          <Route path='/orderselection' element={<OrderPriorityPage/>}/>
         </Routes>
      </Router>
      
    </div>
  );
}

export default App;
