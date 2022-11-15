import { useEffect, useState } from 'react';
import '../App.css';

import SearchBar from '../components/SearchBar.Component';
import VideoList from '../components/VideoList.Component';
import Video from '../components/Video.Component';
import Swal from 'sweetalert2';

function Home({ user }) {
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState('');

    const getVideos = text => {

        fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBe22T4tpggmEGafIJ8XgEyfDD6brupB1g&maxResults=6&q=${text}&type=video&part=snippet&videoEmbeddable=true`)
            .then(res => res.json())
            .then(res => {
                setVideos(res.items);
                setVideo(res.items[0]);
            }).catch(err => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 3000
                })
            });
    }

    const onSubmitText = text => {
        getVideos(text);
    }

    useEffect(() => {
        getVideos('react js videos');
    }, [])

    return (
        <div className="App">
            <div className='row mt-4'>
                <div className='col-md-8'>
                    <div className='col-md-12'>
                        <SearchBar onSubmitText={onSubmitText} user={user} />
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

export default Home;
