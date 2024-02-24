import { useEffect, useState } from 'react';

import * as warehouseService from '../../services/warehouseService';
import WarehouseListItem from './warehouseListItem';

export default function WarehouseList () {
    
        // console.log(this.props.orders);
        const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        warehouseService.getAll()
            .then(
                result => {
                    setWarehouses(result);
                    
                })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log(warehouses);
    return (
        
        <section id="catalog-page">
            <h1>Warehouses List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Location (x:y)</th>
                            
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            {warehouses.map(warehouse => (
                
                <WarehouseListItem 
                    key={warehouse._id}  
                    _id={warehouse._id} 
                    name={warehouse.name}
                    x={warehouse.x}  
                    y={warehouse.y} 
                    
                    />
                
            ))}
            
            

            
                    </tbody>
                </table>
                {warehouses.length === 0 && (
                    <h3>No warehouses</h3>
                )}
            </div>
        </section>
    );
    
}
