import React ,{useEffect}from 'react'

import {useNavigate} from 'react-router-dom';
import Display from './display';
import Upload from './upload';
import './component.css'; // Assuming you have a CSS file for styling

function Dashboard() {

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/topic/getNewestTopic', {
          method: 'GET',
          credentials: 'include'
        });

        console.log("Response from server:", response);
        console.log("Response status:", response.status);
        if (response.status===401) {
          console.log("you are not logIn");
          navigate('/login'); 
          return; // Redirect to login page if not authenticated
        }

        // navigate('/upload'); // Navigate to upload page if authenticated
        const obj = await response.json();
        console.log('Fetched data:', obj);
        // navigate('/upload'); // Navigate to upload page after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])


  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
        <div className='container'>
        
        </div>

    </div>
  )
}

export default Dashboard
