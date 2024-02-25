import { useEffect, useState } from 'react';

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
    // console.log(orders);
    

        // console.log(this.props.orders);
        
        
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
    console.log(orders);

    return (
        
        <section id="catalog-page">
            <h1>Order List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer</th>
                            {/* <th>Product List</th> */}
                            <th>Coordinates</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
            {orders.map(order => (
                
                <EstimateOrderListItem 
                
                    key={order._id}  
                    _id={order._id} 
                    customerId={order.customerId} 
                    status={order.status} 
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
