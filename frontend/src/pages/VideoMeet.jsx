import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
// import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
// import server from '../environment';


const server_url="http://localhost:8080";
var connections={};

const peerConfigConnections={
"iceServers":[
    {"urls":"stun:stun.l.google.com:19302"}
]
}
function VideoMeetComponent() {
    var socketRef=useRef();
    let socketIdRef=useRef();
    let localVideoRef=useRef();
    let [videoAvailable,setVideoAvailable]=useState(true);
    let [audioAvailable,setAudioAvailable]=useState(true);
    let [video,setVideo]=useState();
    let [audio,setAudio]=useState();
    let [screen,setScreen]=useState();
    let [showModal,setModal]=useState();
    let [screenAvailable,setScreenAvailable]=useState();
    let [messages,setMessages]=useState([])
    let [message,setMessage]=useState("");
    let [newMessages,setNewMessages]=useState(0);
    let [askForUsername,setAskForUsername]=useState(true);
    let [username,setUsername]=useState("");

    const videoRef=useRef([])

    let [videos,setVideos]=useState([]);
    
    const getPermissions=async()=>{
        try{
            const videoPermission=await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission){
                setVideoAvailable(true)
            }
            else{
                setVideoAvailable(false);
            }

            const audioPermission=await navigator.mediaDevices.getUserMedia({audio:true});
            if(audioPermission){
                setAudioAvailable(true)
            }
            else{
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true)
            }
            else{
                setScreenAvailable(false);
            }

            if(videoAvailable||audioAvailable){
                const userMediaStream=await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable})
                if(userMediaStream){
                    window.localStream=userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject=userMediaStream;
                    }
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    return ( 
        <div>
            <div>Enter into lobby</div>
            <TextField id="outlined-basic" label="Username" value={username} onChange={e=>setUsername(e.target.value)} variant="outlined" />
            <Button variant="contained">Connect</Button>
            <div>
                <video ref={localVideoRef} autoPlay muted></video>
            </div>
        </div>
    );
}

export default VideoMeetComponent;