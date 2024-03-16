import { Button, Paper } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
export default function ClientAPI(){
    const createClient = async () => {
        
        const apiEndpoint = 'https://app.invoice-maven.co.il/api/customers/addCustomer';
        const apiKey = 'yl2ltd6w5bvl9gk98ofjsccgf02nef'
    
        const requestData = {
            test: 1,
            api_key: apiKey,
            contact_email:'sh214260@gmail.com',
            contact_phone:'0556763845',
            name:'לקוח חדש',
            cell_phone:'0556763845'
        };
    
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": 'application/json'
                },
                body: JSON.stringify(requestData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Client created successfully:', data);
            } else {
                const errorData = await response.json();
                console.error('Error creating client:', errorData);
            }
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };
    
    return (
        <Paper><Button onClick={createClient}>
            יצירתלקוח</Button></Paper>
    );
}