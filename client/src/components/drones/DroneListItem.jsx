import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import * as droneService from "../../services/droneService";

export default function DroneListItem({
    _id,
    droneType, 
    warehouseId, 
    actualCapacity
}) {

    const [droneMoreDetails, setDroneMoreDetails] = useState({});
    // const { droneId } = useParams();


    useEffect(() => {
        droneService.calculateActualCapacity(droneType)
            .then(setDroneMoreDetails);

        
    }, []);
    console.log(JSON.stringify(droneMoreDetails));     
    return (
            <tr>
                <td><b>{_id}</b></td>
                <td>{droneType}</td>
                <td>{warehouseId}</td>
                <td>{actualCapacity}</td>
                
                <td><Link to={`/drones/${_id}`} className="details-button">Details</Link></td>
            </tr>
    );
}