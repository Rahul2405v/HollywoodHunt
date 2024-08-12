import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const StartPage = () => {
  const navigate = useNavigate();
    const handleStartClick = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
        // Redirect or start the hunt logic here
        navigate('./map');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to the Hunt!</h1>
            
            
            <button style={styles.button} onClick={handleStartClick}>
                Start Hunt
            </button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#B22222', // Dark red
        color: '#FFFFFF', // White text
        textAlign: 'center',
        padding: '50px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'100vw',
    },
    heading: {
        fontSize: '3em',
        marginBottom: '20px',
    },
    
    button: {
        padding: '15px 30px',
        fontSize: '1.2em',
        backgroundColor: '#000000', // Black
        color: '#FFFFFF', // White text
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
         position:'absolute',
         top:'80%',right:'4%',
         width:'200px',height:'50px',
        transition: 'background-color 0.3s',
    },
};

export default StartPage;
