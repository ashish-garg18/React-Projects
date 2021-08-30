import React, { useState } from 'react'

export default function TextForm(props) {

   const handleUpClick = () => {
      let newText = text.toUpperCase();
      setText(newText);
      props.showAlert("Converted to Uppercase", "success");
   }

   const handleLoClick = () => {
      let newText = text.toLowerCase();
      setText(newText);
      props.showAlert("Converted to Lowercase", "success");
   }

   const handleExtraSpaces = () => {
      let newText = text.split(/[ ]+/);
      setText(newText.join(" "));
      props.showAlert("Extra Spaces Removed", "success");
   }

   const handleCopy = () => {
      var newText = document.getElementById('myBox')
      newText.select();
      navigator.clipboard.writeText(newText.value);
      props.showAlert("Copied to ClipBoard!", "success");
   }

   
   const handleClear = (e) => {
      setText("");
      props.showAlert("Text Cleared!", "success");
   }

   const handleChange = (e) => {
      setText(e.target.value);
   }

   const [text, setText] = useState("");
   return (
      <>
      <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
         <h1>{props.heading}</h1>
         <div className="mb-3">
            <textarea className="form-control" value={text} placeholder="Enter your text here" onChange={handleChange} name="myBox" id="myBox" cols="0" rows="8" style={{backgroundColor: props.mode==='dark'?'lightgrey':'white', color: props.mode==='dark'?'white':'black', border: ''}}></textarea>
         </div>
         <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
         <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
         <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
         <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button>
         <button className="btn btn-primary mx-1" onClick={handleClear}>Clear Text</button>
      </div>
      <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
         <h2 className="d-inline me-3">Preview</h2>
         <div className="d-inline">word count : {text.split(" ").length} || String Length : {text.length}</div>
         <div>{text}</div>
      </div>
      </>
   )
}
