import React from 'react'
import { useEffect } from 'react';
import Logout from './logout';
import Upload from './upload';

function Checker() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'GET',
                    credentials:"include",
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("response is ", data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Upload/>
            <h1>hahah</h1>
            <Logout />
        </div>
    )
}

export default Checker
