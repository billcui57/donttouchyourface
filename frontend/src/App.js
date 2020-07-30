import React from 'react';
import './App.scss';

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
      navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream, //makes the video output what the webcam sees
        err => console.error(err)
      )
    } else {
      alert('Do you have a webcam?');
    }
  }

  render() {
    return (
     
       
    <div class = "container-fluid text-center">
      <h1 class = "display-4">Camera Feed</h1>
       <video muted autoPlay class = "brand-video border-primary"  id="video"></video>
    </div>
        
      
      
   
    );
  }

}

export default App;