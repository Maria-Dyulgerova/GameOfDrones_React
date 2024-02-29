import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect  } from 'react';


import Path from '../../paths';

import * as queryService from "../../services/queryService";


export default function CalculateEstimate() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    
    const createEstimateSubmitHandler = async (e) => {
        e.preventDefault();

        const timeInMinutes = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await queryService.startProgramFlow(timeInMinutes);

            navigate(Path.EstimateOrderList);
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }
    return (
        <section id="create-page">
            <form id="create" onSubmit={createEstimateSubmitHandler}>
                <div className="container">
                    <h1>Make Estimate fot Time Period</h1>
                    <div className="element-wrapper">
                        <label htmlFor="timePeriod">Time in minutes:</label>
                        <input type="text" id="timePeriod" name="timePeriod" placeholder="Enter how many minutes the system should work"/>
                  
                    </div>
                    
                    <input className="btn button submit" type="submit" value="Calculate Order's Statuses" />
                </div> 
            </form>
        </section>
    );

}