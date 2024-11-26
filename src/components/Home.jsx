import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [roomId, setRoomId] = useState('');
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate()

    const navigateToRoom = () => {
        // Pass both roomId and host status
        navigate(`/room/${roomId}`, { state: { isHost } })
    }

    return (
        <>
        <div className="container">
            <input 
                type="text" 
                placeholder="Enter Room ID"
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)}
            />

            <div className="role-selection">
                <label>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={!isHost}
                        onChange={() => setIsHost(false)}
                    />
                    Viewer
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="role" 
                        checked={isHost}
                        onChange={() => setIsHost(true)}
                    />
                    Host
                </label>
            </div>

            <button 
                onClick={navigateToRoom} 
                disabled={!roomId}
            >
                Join Room
            </button>
        </div>
        </>
    )
}

export default Home