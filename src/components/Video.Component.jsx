import React from 'react'

const Video = ({ video }) => {

    return (
        <>
            {video === '' || !video.id.videoId ? (
                <div className='w-100 text-center justify-content-center align-items-center' style={{ height: '380px' }}>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className='w-100 justify-content-center align-items-center'>
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        className='w-100 shadow'
                        style={{ height: '380px' }}
                        title='Youtube video'
                        allowFullScreen
                    ></iframe>
                    <div className='shadow my-3 p-2'>
                        <h4>{video.snippet.title}</h4>
                        <p>{video.snippet.description}</p>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Video