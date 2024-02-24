import { Link } from "react-router-dom";

export default function CustomerListItem({
    _id,
    name, 
    x, 
    y
}) {
    return (
            <tr>
                {/* <td><b>{_id}</b></td> */}
                <td>{name}</td>
                <td>{x} : {y}</td>
                
                <td><Link to={`/customers/${_id}`} className="details-button">Details</Link></td>
            </tr>
    );
}