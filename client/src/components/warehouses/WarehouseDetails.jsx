import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as warehouseService from "../../services/warehouseService";
import * as droneService from "../../services/droneService";

import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths";
import DroneList from "../drones/DroneList";
import DroneListItem from "../drones/DroneListItem";

export default function WarehouseDetails() {
    const navigate = useNavigate();
    const [warehouseDetails, setWarehouseDetails] = useState({});
    const { warehouseId } = useParams();


    useEffect(() => {
        warehouseService.getOne(warehouseId)
            .then(setWarehouseDetails);

        
    }, [warehouseId]);
         
    
    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${warehouseId}`);

        if (hasConfirmed) {
            await warehouseService.remove(warehouseId);

            navigate(Path.WarehouseList);
        }
    }
    const editDronesButtonClickHandler = async (warehouseId) => {
        
            await droneService.getDronesFromWarehouse(warehouseId)

            navigate(Path.WarehouseDroneList);
       
    }
    let dronesList = [];
    if (warehouseDetails.drones != undefined) {
        dronesList = JSON.parse(warehouseDetails.drones);
    
    }
    
    return (
        <section id="create-page">
            <div className="container">
                <h1>Warehouse Details</h1>
                <div className="element-wrapper">
                    <div>
                        
                        <p className="type">Warehouse Name: <strong>{warehouseDetails.name}</strong></p>
                        <p className="type">X coordinate: <strong>{warehouseDetails.x}</strong></p>
                        <p className="type">Y coordinate: <strong>{warehouseDetails.y}</strong></p>
                        <h3>Drones List</h3>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id </th>
                                        <th>Type </th>
                                        <th>Warehouse </th>
                                        <th>Actual Capacity (W) </th>
                                        <th>Battery Charged  (%)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                        { dronesList.map(drone => (
                
                            <DroneListItem 
                                key={drone._id}  
                                _id={drone._id} 
                                droneType={drone.droneType}
                                warehouseId={drone.warehouseId}  
                                actualCapacity={drone.actualCapacity} 
                                batCharge={drone.batCharge} 
                                />
                            
                        ))}
                        {/* <p className="type">drones: <strong>{warehouseDetails.drones}</strong></p> */}
                        
                                </tbody>
                            </table>
                            {dronesList.length === 0 && (
                                <h3>No drones</h3>
                            )}
                        </div>
                    </div>
                
                    <Link to={pathToUrl(Path.WarehouseEdit, { warehouseId })} className="button">Edit</Link>
                            
                    <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                
                </div>
            </div>
        </section>
    );
}
