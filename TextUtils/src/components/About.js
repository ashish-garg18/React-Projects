import React from 'react'

export default function About(props) {
   let myStyle = {
      color: props.mode === 'light'?'black':'white',
      backgroundColor: props.mode === 'light'? 'white' : '#406b8f',
   } 
   return (
      <div className="container my-3" style={{color: props.mode === 'light'?'black':'white'}}>
         <h1 className="my-3">About Us</h1>
         <div className="accordion" id="accordionExample">
            <div className="accordion-item">
               <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
                     <strong>Analyze Your Text</strong> 
                  </button>
               </h2>
               <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body" style={myStyle}>
                     TextUtils provides you a way to analyse your text quickly and efficiently. Be it word count, character count or manipulating the text the way you want
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
                     <strong>Free to use</strong> 
                  </button>
               </h2>
               <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body" style={myStyle}>
                     TextUtils is a free character counter tool that provides instant character count and word count statistics for a given text. TextUtils reports the number of words and characters. Thus it is suitable for your work related to writing.
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyle}>
                     <strong>Browser Compatible</strong> 
                  </button>
               </h2>
               <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body" style={myStyle}>
                     This software works in every Browser such as Chrome, Firefox, Interet Explorer, Safari, Opera. It suits to count characters in Facebook, blogs, books, pdfs, excel documents, essays etc.
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
