import { useEffect, useState } from "react";

import * as orderService from "../../services/orderService";



export default function EstimateOrderListItem({
    _id,
    customerId, 
    productList, 
    status,
    path,
    startTime,
    drone
}) {
    const [orderMoreDetails, setOrderMoreDetails] = useState({});
    
    let statusStr = ((status === undefined) || (status == "")) ? "to be delivered" : status;


    useEffect(() => {
        orderService.getCoordinates(customerId)
            .then(setOrderMoreDetails);

        
    }, []);
    
    
    return (
        <tr>
            <td><b>{_id}</b></td>
            <td>{orderMoreDetails.name}</td>
            <td>{orderMoreDetails.coordinates?.x} : {orderMoreDetails.coordinates?.y}</td>
            <td>{statusStr}</td>
            <td>{startTime}</td>
            <td>{path}</td>
            <td>{drone}</td>
            
        </tr>
    );
}