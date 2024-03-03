import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Path from '../../paths';

import * as droneService from "../../services/droneService";

export default function DroneEdit() {
    const navigate = useNavigate();
    const { droneId } = useParams();
    const jsonBody = droneService.body_json;
    // console.log(jsonBody);
    const [drone, setDrone] = useState({jsonBody});

    // in case somebody changes id in the address bar
    useEffect(() => {
        droneService.getOne(droneId)
            .then(result => {
                setDrone(result);
            });
    }, [droneId]);

   const editDroneSubmitHandler = async (e) => {
        e.preventDefault();

        const droneData = Object.fromEntries(new FormData(e.currentTarget));
        
        try {
            await droneService.edit(droneId, droneData);

            navigate(Path.DroneList);
        } catch (err) {
            
            console.log(err);
        }
    }

    const onChange = (e) => {
        setDrone(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e.target.name);
    };

    

    return (
        <>
        <section id="edit-page">
            <form id="edit" onSubmit={editDroneSubmitHandler}>
                <div className="container">
                    <h1>Edit Drone</h1>
                    <input type="hidden" id="_id" name="_id" value={drone._id}/>
                    <div className="element-wrapper">
                        <label htmlFor="droneType">Drone Type:</label>
                        <input type="text" id="droneType" name="droneType" value={drone.droneType} onChange={onChange} placeholder="Enter drone type id" />
<br/>
                        <label htmlFor="warehouseId">Warehouse Id:</label>
                        <input type="text" id="warehouseId" name="warehouseId" value={drone.warehouseId} onChange={onChange} placeholder="Enter warehouse id" />

                       
                    </div>
                    <input className="btn button submit" type="submit" value="Edit Drone" />
                </div> 
            </form>
        </section>
        </>
    );
}
