import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect  } from 'react';


import Path from '../../paths';

import * as orderService from "../../services/orderService";


export default function OrderCreate() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    
    const createOrderSubmitHandler = async (e) => {
        e.preventDefault();

        const orderData = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await orderService.create(orderData);

            navigate(Path.OrderList);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }
    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={createOrderSubmitHandler}>
                <div className="container">
                    <h1>Add New Order</h1>
                    <div className="element-wrapper">
                        <label htmlFor="customerId">Customer Id:</label>
                        <input type="text" id="customerId" name="customerId" placeholder="Enter customer"/>
<br/>
                        <label htmlFor="productList">Product List:</label>
                        <input type="text" id="productList" name="productList" placeholder="Enter product list" />

                        
                    </div>
                    
                    <input className="btn button submit" type="submit" value="Add Order" />
                </div> 
            </form>
        </section>
    );

}