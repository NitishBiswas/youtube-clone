import { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header.Component';
import SearchBar from './components/SearchBar.Component';
import VideoList from './components/VideoList.Component';
import Video from './components/Video.Component';

function App() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState('');

  const getVideos = text => {

    fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpMkTsh9ijCT0oYWtR7RDzqZg10jnZ5wc&maxResults=6&q=${text}&type=video&part=snippet&videoEmbeddable=true`)
      .then(res => res.json())
      .then(res => {
        setVideos(res.items);
        setVideo(res.items[0]);
      }).catch(err => console.log(err));
  }

  const onSubmitText = text => {
    getVideos(text);
  }

  useEffect(() => {
    getVideos('react js videos');
  }, [])

  return (
    <div className="App container">
      <Header />
      <div className='row mt-4'>
        <div className='col-md-8'>
          <div className='col-md-12'>
            <SearchBar onSubmitText={onSubmitText} />
          </div>
          <div className='col-md-12 mt-4'>
            <Video video={video} />
          </div>
        </div>
        <div className='col-md-4'>
          <VideoList videos={videos} onClick={(clickedVideo) => setVideo(clickedVideo)} />
        </div>
      </div>
    </div>
  );
}

export default App;
