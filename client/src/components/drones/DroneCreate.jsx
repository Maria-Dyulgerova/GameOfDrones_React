import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect  } from 'react';


import Path from '../../paths';

import * as droneService from "../../services/droneService";


export default function DroneCreate() {
    const navigate = useNavigate();

    
    const createDroneSubmitHandler = async (e) => {
        e.preventDefault();

        const droneData = Object.fromEntries(new FormData(e.currentTarget));
        // console.log(droneData);
        try {
            await droneService.create(droneData);

            navigate(Path.DroneList);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }
    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={createDroneSubmitHandler}>
                <div className="container">
                    <h1>Add Drone</h1>
                    <div className="element-wrapper">
                        <label htmlFor="droneType">Drone Type Id:</label>
                        <input type="text" id="droneType" name="droneType" placeholder="Enter type"/>
                        <br/>
                        <label htmlFor="warehouseId">Warehouse Id:</label>
                        <input type="text" id="warehouseId" name="warehouseId" placeholder="Enter warehouse" />
                        
                        
                    </div>
                    
                    <input className="btn button submit" type="submit" value="Add Drone" />
                </div> 
            </form>
        </section>
    );

}