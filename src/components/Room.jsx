import React, { useRef, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const isHost = location.state?.isHost || false;

    useEffect(() => {
        const liveStream = async () => {
          console.log(import.meta.env.VITE_APP_ID, import.meta.env.VITE_SERVER_SECRET);

            const appID = Number(import.meta.env.VITE_APP_ID);
            const serverSecret = import.meta.env.VITE_SERVER_SECRET; 
            
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                isHost ? 'Host' : 'Audience'
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.LiveStreaming,
                    config: {
                        role: isHost 
                            ? ZegoUIKitPrebuilt.Host 
                            : ZegoUIKitPrebuilt.Audience
                    }
                },
                turnOnMicrophoneWhenJoining: isHost,
                turnOnCameraWhenJoining: isHost,
                showMyCameraToggleButton: isHost,
                showMyMicrophoneToggleButton: isHost,
                showAudioOutputButton: true,
                branding: {
                    logoURL: "https://www.zegocloud.com/favicon.ico"
                },
                sharedLinks: [
                    {
                        name: 'Copy Room Link',
                        url: `http://localhost:5173/room/${roomId}`
                    }
                ]
            });

            zp.on('leaveRoom', () => {
                navigate('/');
            });
        };

        liveStream();
    }, [roomId, isHost, navigate]);

    return (
      <div
      ref={containerRef}
      className="relative w-full h-screen"
    >
      <div
        className="absolute inset-0 flex justify-center items-center"
      >
        <div
          className="relative w-full h-full overflow-hidden"
        >
          <video
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
    );
};

export default Room