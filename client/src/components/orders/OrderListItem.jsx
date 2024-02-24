import { Link } from "react-router-dom";
import * as orderService from "../../services/orderService";

export default function OrderListItem({
    _id,
    customerId, 
    productList, 
    
}) {
    return (
            <tr>
                {/* <td><b>{_id}</b></td> */}
                <td>{customerId}</td>
                <td>{productList}</td>
                <td><Link to={`/orders/${_id}`} className="details-button">Details</Link></td>
            </tr>
    );
}