import React from 'react'
import '../App.css'

const VideoList = ({ videos, onClick }) => {

    const clickedVideo = video => {
        onClick(video);
    }

    return (
        <>
            {videos.map((video, index) => {
                return (
                    <div className='col-md-12' key={index} style={{ cursor: 'pointer' }} onClick={() => clickedVideo(video)}>
                        <div className='row py-2 mb-4 mx-1 shadow align-items-center'>
                            <div className='col-3 col-md-3'>
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    height='60px'
                                    width='80px'
                                />
                            </div>
                            <div className='col-9 col-md-9 video-list-text'>
                                <p>{video.snippet.title}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default VideoList