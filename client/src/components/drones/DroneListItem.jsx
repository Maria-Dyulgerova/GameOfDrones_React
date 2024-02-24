import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import * as droneService from "../../services/droneService";

import Path from '../../paths';

export default function DroneListItem({
    _id,
    droneType, 
    warehouseId, 
    actualCapacity,
    batCharge
}) {

    const navigate = useNavigate();
    const [droneMoreDetails, setDroneMoreDetails] = useState({});
    // const { droneId } = useParams();


    useEffect(() => {
        droneService.getDroneDetails(droneType)
            .then(setDroneMoreDetails);

        
    }, []);
    console.log(JSON.stringify(droneMoreDetails)); 

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${_id}`);

        if (hasConfirmed) {
            await droneService.remove(_id);

            navigate(Path.DroneList);
        }
    }  
    return (
            <tr>
                <td><b>{_id}</b></td>
                <td>{droneType}</td>
                <td>{warehouseId}</td>
                <td>{actualCapacity}</td>
                <td>{batCharge}</td>
                <td><Link to={`/drones/${_id}`} className="details-button">Details</Link>
                <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                </td>
            </tr>
    );
}