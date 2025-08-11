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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      margin: '20px 0',
      padding: '20px'
    }}>
      <button 
        onClick={handleLogout}
        style={{
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          padding: '12px 30px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z"/>
        </svg>
        Logout
      </button>
    </div>
  )
}

export default Logout
