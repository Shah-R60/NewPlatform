import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {googleAuth} from '../api.js';
import {useNavigate} from 'react-router-dom';

function GL() {
     const navigate = useNavigate();
     const handleGoogleResult = async (result) => {
          try {
               console.log("Google Login Result:", result);
               if(result['code']){
                    console.log("Google Login Code:", result['code']);
                    const response = await googleAuth(result['code']); // Changed variable name
                    console.log("API Response:", response);
                    
                    const {email, name, picture} = response.data.data.user;
                    console.log(email);
                    console.log(name);
                    console.log(picture);
                    console.log("Token:", response.data.data.Accesstoken);
                    // console.log("User Info:", response.data.user);
                    // console.log("Token:", response.data.token);
                    // const obj = {email, name, picture, token: response.data.token};
                    // localStorage.setItem("userInfo",JSON.stringify(obj));
                    navigate('/upload'); // Navigate to the upload page after successful login
               }
          } catch (err) {
               console.error("Error handling Google login result:", err);
          }
     }

     const googleLogin = useGoogleLogin({
          onSuccess: handleGoogleResult,
          onError: handleGoogleResult,
          flow: 'auth-code',
     })

     return (
          <>
               <button onClick={googleLogin} >
                    Login with Google
               </button>

          </>
     )
}

export default GL;