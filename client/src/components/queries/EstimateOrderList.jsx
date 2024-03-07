import { useEffect, useState } from 'react';

import * as queryService from '../../services/queryService';
import * as orderService from '../../services/orderService';
import EstimateOrderListItem from './EstimateOrderListItem';

export default function EstimateOrderList () {
    
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        orderService.getAll()
            .then(
                result => {
                    setOrders(result);
                    
                })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const timePeriod = queryService.timeIntervalInMins;
    
    // console.log("orders from query service:");
    // console.log(timePeriod);
    

    return (
        
        <section id="catalog-page">
            <h1>Order List For the Time Period Of {`${timePeriod}`} min after Program Starts</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer</th>
                            {/* <th>Product List</th> */}
                            <th>Coordinates</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>Path</th>
                            <th>Drone</th>
                            
                        </tr>
                    </thead>
                    <tbody>
            {orders.map(order => (
                
                <EstimateOrderListItem 
                
                    key={order._id}  
                    _id={order._id} 
                    customerId={order.customerId} 
                    status={order.status} 
                    startTime={order.startTime}
                    path={order.path}  
                    drone={order.drone} 
                    // productList={JSON.stringify(order.productList)} 
                    
                    />
                
            ))}
            
            

            
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <h3>No orders yet</h3>
                )}
            </div>
        </section>
    );
    
}
