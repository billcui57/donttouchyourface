import React from 'react';

import * as faceapi from 'face-api.js';

class App extends React.Component {


  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia)
  }

  async componentDidMount() {

    if (this.hasGetUserMedia()) {
      const constraints = {
        video: true
      };

      const video = document.getElementById('videoStream');

      navigator.mediaDevices.getUserMedia(constraints).
        then((stream) => { video.srcObject = stream });

      const detections = await faceapi.detectSingleFace(video)

      console.log(detections)
    } else {
      alert('getUserMedia() is not supported by your browser');
    }


  }






  render() {
    return (
      <div>
        <h1>You look sexc</h1>
      <video autoPlay id="videoStream"></video>
      </div>
      
    );
  }

}

export default App;