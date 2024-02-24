import { useEffect, useState } from 'react';

import * as orderService from '../../services/orderService';
import OrderListItem from './OrderListItem';

function OrderList () {
    
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
    console.log(orders);

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

export default OrderList;