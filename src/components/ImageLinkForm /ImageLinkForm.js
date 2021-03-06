import React from "react";
import './ImageLinkForm.css'; 
// destructur insted of props.onInputChange
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
       <div> 
        <p className="f3">
            {'This magic pirate will detect faces,give it a try!'}
        </p>
        <div className="center">
            <div className="pa4 center form br3 shadow-5">
            <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
            <button 
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
            >Detect</button>
            </div> 
        </div>
       </div>
    );  
}

export default ImageLinkForm;