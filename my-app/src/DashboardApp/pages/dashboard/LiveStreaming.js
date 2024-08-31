import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const StreamingApp = () => {
    const {roomid} = useParams();
    const {userid} = useParams();
    const {username} = useParams();
    useEffect(() => {
        const getUrlParams = (url) => {
            let urlStr = url.split('?')[1];
            const urlSearchParams = new URLSearchParams(urlStr);
            const result = Object.fromEntries(urlSearchParams.entries());
            return result;
        };

        // Use the roomID from URL or fallback to the roomid prop
        const roomID = getUrlParams(window.location.href)['roomID'] || roomid;
        const userID = userid;
        const userName = username;

        const appID = 1744586169;
        const serverSecret = "2de54579b69a049df380fad65c198d79";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: document.querySelector("#root"),
            sharedLinks: [{
                name: 'Personal link',
                url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            turnOnMicrophoneWhenJoining: false,
            turnOnCameraWhenJoining: false,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,  
            layout: "Auto",
            showLayoutButton: true,
        });
    }, [roomid, userid, username]); // Add the props to the dependency array

    return (
        <div id="root" style={{ width: '100vw', height: '100vh' }}></div>
        
    );
};

export default StreamingApp;
