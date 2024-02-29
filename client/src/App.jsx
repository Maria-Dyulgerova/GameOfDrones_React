// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CalculateEstimate from './components/queries/CalculateEstimate';
import Path from './paths';
import Header from "./components/header/Header";
import Home from './components/home/Home';

import OrderList from './components/orders/OrderList';
import OrderDetails from './components/orders/OrdersDetails';
import OrderCreate from './components/orders/OrderCreate';
import OrderEdit from './components/orders/OrderEdit';
import DroneList from './components/drones/DroneList';
import DroneCreate from './components/drones/DroneCreate';

import WarehouseList from './components/warehouses/WarehouseList';
import WarehouseDetails from './components/warehouses/WarehouseDetails';

import EstimateOrderList from './components/queries/EstimateOrderList';
import CustomerList from './components/customers/CustomerList';


function App() {
  
  return (
    <>
    
      <div id="box">
        <Header />
        <Routes>
          <Route path={Path.OrderList} element={<OrderList />} />
          <Route path={Path.OrderDetails} element={<OrderDetails />}/>
          <Route path={Path.OrderCreate} element={<OrderCreate />}/>
          <Route path={Path.OrderEdit} element={<OrderEdit />}/>

          <Route path={Path.DroneList} element={<DroneList />}/>
          <Route path={Path.DroneCreate} element={<DroneCreate />}/>
                            
          <Route path={Path.WarehouseList} element={<WarehouseList />} />
          <Route path={Path.WarehouseDetails} element={<WarehouseDetails/>}/>

          <Route path={Path.CustomerList} element={<CustomerList/>}/>
          
          <Route path={Path.CalculateEstimate} element={<CalculateEstimate/>}/>
          <Route path={Path.EstimateOrderList} element={<EstimateOrderList/>}/>
        </Routes>
        
      </div>
    
          </> 
  )
}

export default App
