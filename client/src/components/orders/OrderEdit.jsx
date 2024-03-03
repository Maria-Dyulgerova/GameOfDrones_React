import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Path from '../../paths';

import * as orderService from "../../services/orderService";

export default function OrderEdit() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const jsonBody = orderService.body_json;
    // console.log(jsonBody);
    const [order, setOrder] = useState({jsonBody});

    // in case somebody changes id in the address bar
    useEffect(() => {
        orderService.getOne(orderId)
            .then(result => {
                setOrder(result);
            });
    }, [orderId]);

   const editOrderSubmitHandler = async (e) => {
        e.preventDefault();

        const orderData = Object.fromEntries(new FormData(e.currentTarget));
        
        try {
            await orderService.edit(orderId, orderData);

            navigate(Path.OrderList);
        } catch (err) {
            
            console.log(err);
        }
    }

    const onChange = (e) => {
        setOrder(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e.target.name);
    };

    

    return (
        <section id="edit-page">
            <form id="edit" onSubmit={editOrderSubmitHandler}>
                <div className="container">
                    <h1>Edit Order</h1>
                    <input type="hidden" id="_id" name="_id" value={order._id}/>
                    <div className="element-wrapper">
                        <label htmlFor="customerId">Customer Id:</label>
                        <input type="text" id="customerId" name="customerId" value={order.customerId} onChange={onChange} placeholder="Enter customer Id" />
<br/>
                        <label htmlFor="productList">Product List:</label>
                        <input type="text" id="productList" name="productList" value={JSON.stringify(order.productList)} onChange={onChange} placeholder="Enter product list" />

                    </div>
                    <input className="btn button submit" type="submit" value="Edit Order" />
                </div> 
            </form>
        </section>
    );
}
