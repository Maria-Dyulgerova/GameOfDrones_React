import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as warehouseService from "../../services/warehouseService";

import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths";

export default function WarehouseDetails() {
    const navigate = useNavigate();
    const [warehouseDetails, setWarehouseDetails] = useState({});
    const { warehouseId } = useParams();


    useEffect(() => {
        warehouseService.getOne(warehouseId)
            .then(setWarehouseDetails);

        
    }, [warehouseId]);
         
    
    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${orderDetails._id}`);

        if (hasConfirmed) {
            await orderService.remove(orderId);

            navigate(Path.OrderList);
        }
    }

    return (
        <section id="create-page" className="auth">
            <div className="container">
                <h1>Warehouse Details</h1>
                <div className="element-wrapper">
                    <div>
                        <div>
                            <p className="type">Warehouse Name: <strong>{warehouseDetails.name}</strong></p>
                            <p className="type">X coordinate: <strong>{warehouseDetails.x}</strong></p>
                            <p className="type">Y coordinate: <strong>{warehouseDetails.y}</strong></p>
                            
                            <br/>
                            
                        </div>
                    </div>
                

                    <Link to={pathToUrl(Path.WarehouseDetails, { warehouseId })} className="button">Edit</Link>
                            
                    <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                
                </div>
            </div>
        </section>
    );
}
