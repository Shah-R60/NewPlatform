import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import LandingPage from './calling.components/LandingPage';
import ChatPage from './calling.components/ChatPage';
import Header from './calling.components/Header';
import Logout from './component/logout.jsx';

import './App.css';
import GL from './component/GL.jsx'
import Dashboard from './component/dashboard.jsx'
import Checker from './component/checker.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Display from './component/display.jsx'
import Upload from './component/upload.jsx'
import { SocketProvider } from './context/SocketContext';

function App() {
  const [topic, setTopic] = useState('');

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={'297892001189-s1i8r7cs1cq261mvgc4em2feov7rt9jk.apps.googleusercontent.com'}>
        <GL />
      </GoogleOAuthProvider>
    )
  }

  useEffect(() => {
    fetch('http://localhost:5000/topic')
      .then(res => res.json())
      .then(data => setTopic(data.topic))
      .catch(err => console.error('Failed to fetch topic:', err));
  }, []);

  return (
    <SocketProvider>
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper/>}/>
        <Route path='/' element={<Navigate to="/display" replace/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/checker' element={<Checker/>}/>
        <Route path='/display' element={<Display/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage topic={topic} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
        <Route path = '/logout' element = {<Logout/>}/>
      </Routes>
    </SocketProvider>
  )
}

export default App
