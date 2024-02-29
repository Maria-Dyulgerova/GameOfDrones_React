import { Link } from "react-router-dom";
import * as orderService from "../../services/orderService";

export default function OrderListItem({
    _id,
    customerId, 
    productList, 
    status,
    startTime,
    path, 
    drone 
    
}) {
    return (
            <tr>
                {/* <td><b>{_id}</b></td> */}
                <td>{customerId}</td>
                <td>{productList}</td>
                <td>{status}</td>
                <td>{startTime}</td>
                <td>{path}</td>
                <td>{drone}</td>
                <td><Link to={`/orders/${_id}`} className="details-button">Details</Link></td>
            </tr>
    );
}