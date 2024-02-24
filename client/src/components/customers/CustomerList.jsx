import { useEffect, useState } from 'react';

import * as customerService from '../../services/customersService';
import CustomenListItem from '../customers/CustomerListItem';

export default function CustomerList () {
        const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerService.getAll()
            .then(
                result => {
                    setCustomers(result);
                    
                })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        
        <section id="catalog-page">
            <h1>Customers List</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location (x : y)</th>
                            
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            {customers.map(customer => (
                
                <CustomenListItem 
                    key={customer._id}  
                    _id={customer._id} 
                    name={customer.name}
                    x={customer.coordinates?.x}  
                    y={customer.coordinates?.y} 
                    
                    />
                
            ))}
            
            

            
                    </tbody>
                </table>
                {customers.length === 0 && (
                    <h3>No customers</h3>
                )}
            </div>
        </section>
    );
    
}