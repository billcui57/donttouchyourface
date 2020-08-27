import React, { useState, useEffect } from 'react';
import './App.scss';
import io from 'socket.io-client'


function App() {
  const ws = io('http://localhost:5000')


  useEffect(() => {
    componentDidMount()
  });

  const [wsStatus, setConnectionStatus] = useState(false)



  //determines whether or not the user's browser supports a webcam or if they even have a webcam
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia)
  }

  //first thing to get run after the constructor and after the component is loaded
  async function componentDidMount() {
    //if user has a webcam
    if (hasGetUserMedia()) {
      //gets the video element
      const video = document.getElementById('video')

      loadSockets()

      navigator.mediaDevices.getUserMedia({ video: true }).then(
        stream => { video.srcObject = stream; setInterval(() => ws.emit('stream', {'hello': 'yo'}), 0.1) }
      ).catch(
        //makes the video output what the webcam sees
        err => console.error(err)
      )

    } else {
      alert('Do you have a webcam?');
    }
  }


  function loadSockets() {
    ws.on("connect", () => {
      setConnectionStatus(() => true)
    })

    ws.on("disconnect", () => {
      setConnectionStatus(() => false)
    })

    ws.on("stream", (message) => {
      console.log(message)
    })
  }


  return (
    <div className="container-fluid text-center">
      <h1 className="display-4">Camera Feed</h1>
      <video muted autoPlay className="brand-video border-primary" id="video"></video>
      <div>{wsStatus? <h2>Connected</h2> : <h2>Disconnected</h2>}</div>
    </div>
  );


}

export default App;