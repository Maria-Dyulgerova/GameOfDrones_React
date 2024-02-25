import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import * as orderService from "../../services/orderService";

import Path from '../../paths';




export default function EstimateOrderListItem({
    _id,
    customerId, 
    productList, 
    status
}) {

    const navigate = useNavigate();
    const [orderMoreDetails, setOrderMoreDetails] = useState({});
    
    let statusStr = (status === undefined) ? "to be delivered" : status;


    useEffect(() => {
        orderService.getDetails(customerId)
            .then(setOrderMoreDetails);

        
    }, []);
    console.log(JSON.stringify(orderMoreDetails)); 

    
    return (
        <tr>
            <td><b>{_id}</b></td>
            <td>{orderMoreDetails.name}</td>
            <td>{orderMoreDetails.coordinates?.x} : {orderMoreDetails.coordinates?.y}</td>
            <td>{statusStr}</td>
            
        </tr>
    );
}