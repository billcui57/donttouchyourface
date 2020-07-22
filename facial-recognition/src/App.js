import React from 'react';

import * as faceapi from 'face-api.js';
class App extends React.Component {




  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia)
  }

  async componentDidMount() {

    if (this.hasGetUserMedia()) {


      const video = document.getElementById('video')

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models/'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(startVideo)

      function startVideo() {
        navigator.getUserMedia(
          { video: {} },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
      }

      video.addEventListener('play', () => {
        const canvas = this.refs.resultCanvas
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }, 100)
      })
    } else {
      alert('getUserMedia() is not supported by your browser');
    }


  }





  render() {
    return (
      
      <div>
        <canvas ref="resultCanvas"></canvas>
        <video width="720" height="560" ref="videoFeed" muted autoPlay id="video"></video>
        

      </div>




    );
  }

}

export default App;