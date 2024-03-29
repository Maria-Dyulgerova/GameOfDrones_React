import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import * as droneService from '../../services/droneService';
import DroneListItem from './DroneListItem';

export default function DroneList (warehouseId) {
    const [drones, setDrones] = useState([]);

    // const { warehouseId } = useParams();
    console.log(warehouseId);
    
    useEffect(() => {
        droneService.getAll()
            .then(
                result => {
                    setDrones(result);
                    
                })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log("drones");     
    console.log(JSON.stringify(drones));     
    
    return (
        
        <section id="catalog-page">
            <h1>Drones List</h1>
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
            {drones.map(drone => (
                
                <DroneListItem 
                    key={drone._id}  
                    _id={drone._id} 
                    droneType={drone.droneType}
                    warehouseId={drone.warehouseId}  
                    actualCapacity={drone.actualCapacity} 
                    batCharge={drone.batCharge} 
                    />
                
            ))}
            
                    </tbody>
                </table>
                {drones.length === 0 && (
                    <h3>No drones</h3>
                )}
            </div>
        </section>
    );
    
}