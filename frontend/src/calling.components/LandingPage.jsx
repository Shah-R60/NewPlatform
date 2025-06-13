import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import styles from './LandingPage.module.css'; // Import as styles object

function LandingPage() {
  const navigate = useNavigate();
  const [liveUsers, setLiveUsers] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handleUserCount = ({ count }) => setLiveUsers(count);
    socket.on('user_count', handleUserCount);
    return () => {
      socket.off('user_count', handleUserCount);
    };
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.LandingMain}>
        <div className={styles.liveUsersCounter}>
          <div className={styles.statusDot}></div>
          <span>{liveUsers} users online</span>
        </div>
        <button className={styles.startButton} onClick={() => navigate('/chat')}>
          Start Talking 
        </button>
      </div>
    </div>
  );
}

export default LandingPage;