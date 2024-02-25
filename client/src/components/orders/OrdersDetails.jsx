import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as orderService from "../../services/orderService";

import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths";

export default function OrderDetails() {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({});
    const [orderCustomerDetails, setOrderCustomersDetails] = useState({});
    const { orderId } = useParams();


    useEffect(() => {
        orderService.getOne(orderId)
            .then(setOrderDetails);

        
    }, [orderId]);
         
    useEffect(() => {
        orderService.getDetails(orderId)
            .then(setOrderCustomersDetails);
            
    }, [orderId]);
    
    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${orderDetails._id}`);

        if (hasConfirmed) {
            await orderService.remove(orderId);

            navigate(Path.OrderList);
        }
    }

    return (
        <section id="create-page" className="auth">
            <div className="container">
                <h1>Order Details</h1>
                <div className="element-wrapper">
                    <div>
                        <div>
                        
                            <p className="type">Customer Name: <strong>{JSON.stringify(orderCustomerDetails.name)}</strong></p>
                            <p className="type">Product List: <strong>{JSON.stringify(orderDetails.productList)}</strong></p>
                            <p className="type">Coordinates: <strong>{JSON.stringify(orderCustomerDetails.coordinates)}</strong></p>
                        
                        <br/>
                        </div>
                    </div>
               

                    <Link to={pathToUrl(Path.OrderEdit, { orderId })} className="button">Edit</Link>
                        
                    <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                </div>
            </div>
        </section>
    );
}
