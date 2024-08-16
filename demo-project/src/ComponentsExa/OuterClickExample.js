// import React from 'react';
// class OuterClickExample extends React.Component {
//           constructor(props) {
//             super(props);
        
//             this.state = { isOpen: false };
//             this.toggleContainer = React.createRef();
        
//             this.onClickHandler = this.onClickHandler.bind(this);
//             this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
//           }
        
//           componentDidMount() {
//             window.addEventListener('click', this.onClickOutsideHandler);
//           }
        
//           componentWillUnmount() {
//             window.removeEventListener('click', this.onClickOutsideHandler);
//           }
        
//           onClickHandler() {
//             this.setState(currentState => ({
//               isOpen: !currentState.isOpen
//             }));
//           }
        
//           onClickOutsideHandler(event) {
//             if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
//               this.setState({ isOpen: false });
//             }
//           }
        
//           render() {
//             return (
//               <div ref={this.toggleContainer} className="bg-black text-white w-25">
//                 <button onClick={this.onClickHandler}>Select an option</button>
//                 {this.state.isOpen && (
//                   <ul>
//                     <li>Option 1</li>
//                     <li>Option 2</li>
//                     <li>Option 3</li>
//                   </ul>
//                 )}
//               </div>
//             );
//           }
//         }
// export default OuterClickExample;

import React, { useState } from "react";
import { RWebShare } from "react-web-share";

const OuterClickExample = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
};

export default OuterClickExample;