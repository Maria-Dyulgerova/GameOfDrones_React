import { useEffect, useState } from 'react';

import * as droneService from '../../services/droneService';
import DroneListItem from '../drones/DroneListItem';

export default function DroneList () {
        const [drones, setDrones] = useState([]);

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
    return (
        
        <section id="catalog-page">
            <h1>Drones List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id | </th>
                            <th>Type | </th>
                            <th>Warehouse | </th>
                            <th>Actual Capacity |  </th>
                            
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