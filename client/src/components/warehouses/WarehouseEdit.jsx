import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Path from '../../paths';

import * as warehouseService from "../../services/warehouseService";

export default function WarehouseEdit() {
    const navigate = useNavigate();
    const { warehouseId } = useParams();
    const jsonBody = warehouseService.body_json;
    // console.log(jsonBody);
    const [warehouse, setWarehouse] = useState({jsonBody});

    // in case somebody changes id in the address bar
    useEffect(() => {
        warehouseService.getOne(warehouseId)
            .then(result => {
                setWarehouse(result);
            });
    }, [warehouseId]);


   const editWarehouseSubmitHandler = async (e) => {
        e.preventDefault();

        const warehouseData = Object.fromEntries(new FormData(e.currentTarget));
        
        try {
            await warehouseService.edit(warehouseId, warehouseData);

            navigate(Path.WarehouseList);
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setWarehouse(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e.target.name);
    };

    

    return (
        <>
        <section id="edit-page">
            <form id="edit" onSubmit={editWarehouseSubmitHandler}>
                <div className="container">
                    <h1>Edit Warehouse</h1>
                    <input type="hidden" id="_id" name="_id" value={warehouse._id}/>
                    <div className="element-wrapper">
                        <label htmlFor="name">Warehouse Name: </label>
                        <input type="text" id="name" name="name" value={warehouse.name} onChange={onChange} placeholder="Enter warehouse name" />
<br/>
                        <label htmlFor="x">X coordinate: </label>
                        <input type="text" id="x" name="x" value={warehouse.x} onChange={onChange} placeholder="Enter X coordinate" />
                        <label htmlFor="y">Y coordinate: </label>
                        <input type="text" id="y" name="y" value={warehouse.y} onChange={onChange} placeholder="Enter Y coordinate" />

                    </div>
                    <input className="btn button submit" type="submit" value="Edit Warehouse" />
                </div> 
            </form>
        </section>
        </>
    );
}
