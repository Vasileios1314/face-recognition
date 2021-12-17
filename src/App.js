import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm /ImageLinkForm';
import Rank from './components/Rank/Rank'; 
import './App.css';

const app = new Clarifai.App({
  apiKey: ''
})
 
const particlesOptions = {
  particles: {
    number: {
    value: 30,
    density: {
      enable: true,
      value_area: 210
      }
    }
  }
}


class App extends Component {
  // value that the user put
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
// this is from the input
  onInputChange = (event) => {
    // getting the value of the input
    this.setState({input: event.target.value} );
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
     this.state.input)
     .then(
    function (response) {
      console.log(response.outputs[0].data)
    }
    )
}

  render() {
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions} 
                />
      <Navigation />
      <Logo />
      <Rank />
      {/* we need to pass this. cause is property of the class App, props */}
      <ImageLinkForm onInputChange = {this.onInputChange} 
                      onButtonSubmit= {this.onButtonSubmit}/>
      <FaceRecognition imageUrl = {this.state.imageUrl}/> 
    </div>
  );
  }  
}

export default App;
