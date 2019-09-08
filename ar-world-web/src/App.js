import React from 'react';
import UploadContainer from './UploadContainer';
import Earth from './earth.png';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <img src={Earth} className="logo" />
        <h1><b>AR</b> world</h1>
      </div>
      <UploadContainer />
    </div>
  );
}

export default App;
