import React, {useState, useEffect} from 'react';
import './App.scss';
import io from 'socket.io-client'


function App() {
  const ws = io('http://localhost:5000')


  useEffect(() => {
    componentDidMount()
  });

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
      navigator.mediaDevices.getUserMedia({ video: true }).then(
        stream => {video.srcObject = stream; ws.emit('stream',stream)}
      ).catch(
        //makes the video output what the webcam sees
        err => console.error(err)
      )
      
    } else {
      alert('Do you have a webcam?');
    }
  }

  

  return (
    <div className="container-fluid text-center">
      <h1 className="display-4">Camera Feed</h1>
      <video muted autoPlay className="brand-video border-primary" id="video"></video>
    </div>
  );


}

export default App;