import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm /ImageLinkForm';
import Rank from './components/Rank/Rank'; 
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      // keeps truck where are we in the page
      route: 'signin',
      isSignedIn: false
    }
  }
calculateFaceLocation = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage')
const width = Number(image.width)
const height = Number(image.height)
return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
}
}

displayFaceBox = (box) => {
  this.setState({box: box});
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
     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch (err => console.log(err))
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  }else if (route ===  'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

  render() {
    // clean up
    const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions} 
                />
                {/* nested ternary */}
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
      ? <div>
      <Logo />
      <Rank />
      {/* we need to pass this. cause is property of the class App, props */}
      <ImageLinkForm onInputChange = {this.onInputChange} 
                      onButtonSubmit= {this.onButtonSubmit}/>
      <FaceRecognition box={box} imageUrl = {imageUrl}/> 
      </div>
      : (
        route === 'signin' 
        ? <Signin onRouteChange = {this.onRouteChange} />
        : <Register onRouteChange = {this.onRouteChange} />
      )
     
  }
    </div>
  );
  }  
}

export default App;
