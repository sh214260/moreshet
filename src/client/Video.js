import video from '../pictures/video.mp4'

const Video = () => {
    return(
        <video controls autoPlay={true} width="550px"><source src={video} ></source></video>
    )
}

export default Video;