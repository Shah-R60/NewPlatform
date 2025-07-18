import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {

     const navigate = useNavigate();
     const handleLogout = async() => {
          try{
               await fetch('http://localhost:5000/api/users/logout', {
               method: 'POST',
               credentials: 'include', // Include cookies in the request
               })

               navigate('/login'); // Redirect to login page after logout

          }
          catch (error) {
               console.error("Logout error:", error);
          }
     }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
