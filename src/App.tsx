import React from 'react';
import './App.scss';
//Components
import Footer from './components/Footer/Footer';
import PDFViewer from './components/PDFViewer/PDFViewer';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import FileLister from './components/FileLister/FileLister';

function App() {
  return (
    <div className="App">
      <div className="horizontal-flex-container max-size">
        <PDFViewer />
        <div className="vertical-flex-container max-size">
          <AudioPlayer />
          <FileLister />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
