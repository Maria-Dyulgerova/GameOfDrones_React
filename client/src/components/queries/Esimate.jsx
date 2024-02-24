import { useEffect, useState } from 'react';
import * as queryService from '../../services/queryService';

export default function Estimate() {

    const [estimate, setEstimate] = useState([]);
    
    useEffect(() => {
        queryService.makeEstimate()
            .then(
                result => {
                    setEstimate(result);
                    
                })
            .catch(err => {
                console.log(err);
            });
    }, []);
    // console.log(typeof(estimate));
    
       

    try {
        return (

            <>
            {/* <p>{JSON.stringify(estimate)}</p> */}
            <p>order Number: {estimate[0]._id}</p>
            <p>with Load: {estimate[0].load}</p>
            <p>coordinates: {estimate[0].hCoordinate} : {estimate[0].vCoordinate}</p>
            <hr/>
            <p>Can be purseed from warehouse: {estimate[1].whName}</p>
            <p>coordinates: {estimate[1].location.hCoordinate} - {estimate[1].location.vCoordinate}</p>
            <br/>
            <p>with Drone: {estimate[2].droneName}</p>
            <hr/>

            <p>Drone {estimate[2].droneName} is with status : {estimate[2].status} </p>
            
            
            </>
        );
    } catch (error) {
        
    }
        
        

}