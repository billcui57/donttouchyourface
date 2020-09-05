import React, { useState, useEffect } from 'react';
import './App.scss';
import io from 'socket.io-client'


function App() {
  const ws = io('/api/test')


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

      loadSockets()

      navigator.mediaDevices.getUserMedia({ video: true }).then(
        mediaStream => {
          const track = mediaStream.getVideoTracks()[0];
          let imageCapture = new ImageCapture(track);

          setInterval(() => {
            imageCapture.grabFrame()
              .then(imageBitmap => {
                ws.emit("stream-client", imageBitmap.toString('base64'))
              })
              .catch(error => console.log(error));
          }, 10)

        }


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

    ws.on("stream-server", (base64) => {
      console.log(base64)
      var c = document.getElementById("frame");
      var ctx = c.getContext("2d");
     
      ctx.drawImage(base64, 10, 10);
    })


  }


  return (
    <div className="container-fluid text-center">
      <h1 className="display-4">Camera Feed</h1>
      <canvas alt="a frame" id="frame"></canvas>
      <div>{wsStatus ? <h2>Connected</h2> : <h2>Disconnected</h2>}</div>
    </div>
  );


}

export default App;