import { useEffect, useState } from 'react';

import * as orderService from '../../services/orderService';
import OrderListItem from './OrderListItem';

export default function OrderList () {
    
        // console.log(this.props.orders);
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
    return (
        
        <section id="catalog-page">
            <h1>Order List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Product List</th>
                            {/* <th>Coordinates</th> */}
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>Path</th>
                            <th>Drone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            {orders.map(order => (
                
                <OrderListItem 
                
                    key={order._id}  
                    _id={order._id} 
                    customerId={order.customerId}  
                    productList={JSON.stringify(order.productList)} 
                    status={order.status} 
                    startTime={order.startTime}
                    path={order.path}  
                    drone={order.drone} 
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
