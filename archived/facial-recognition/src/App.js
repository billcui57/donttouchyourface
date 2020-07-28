import React from 'react';

import * as faceapi from 'face-api.js';
import './App.css';
class App extends React.Component {



  //determines whether or not the user's browser supports a webcam or if they even have a webcam
  hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia)
  }

  //first thing to get run after the constructor and after the component is loaded
  async componentDidMount() {


    //if user has a webcam
    if (this.hasGetUserMedia()) {

      //gets the video element
      const video = document.getElementById('video')

      //asyncronojsly loads all the faceapi models
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models/'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(startVideo) //and then starts the webcam footage

      function startVideo() {
        navigator.getUserMedia(
          { video: {} },
          stream => video.srcObject = stream, //makes the video output what the webcam sees
          err => console.error(err)
        )
      }

      //once the video starts playing...
      video.addEventListener('play', () => {
        //creates a canvas over the video element to draw on
        const canvas = faceapi.createCanvasFromMedia(video)
        document.getElementById("result").append(canvas)

        //makes sure the dimensions of the canvas is the same as the video
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        //every 100ms...
        setInterval(async () => {

          //detects the facelandmarks and expressions
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()


          //resizes the detections coords to match the canvas display size
          const resizedDetections = faceapi.resizeResults(detections, displaySize)

          //clears the canvas to draw new detection
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

          //draws
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

          //TODO: export rectangle

        
        }, 100)
      })
    } else {
      alert('Do you have a webcam?');
    }
  }





  render() {
    return (
      <div id = "result">
        <video width="720" height="560"  muted autoPlay id="video"></video>
      </div>
    );
  }

}

export default App;