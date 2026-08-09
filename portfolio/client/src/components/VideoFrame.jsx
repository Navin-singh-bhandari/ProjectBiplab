import { useState, useRef } from 'react'
import './video-frame.css'

export default function VideoFrame({ label = 'SHOWREEL / VIDEO GOES HERE', src, poster }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const togglePlay = (e) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const skipTime = (seconds, e) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.min(
      Math.max(videoRef.current.currentTime + seconds, 0),
      videoRef.current.duration || 0
    )
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const cur = videoRef.current.currentTime
    const dur = videoRef.current.duration || 1
    setProgress((cur / dur) * 100)
    setCurrentTime(formatTime(cur))
    setDuration(formatTime(dur))
  }

  const handleScrub = (e) => {
    e.stopPropagation()
    if (!videoRef.current || !videoRef.current.duration) return
    const newProgress = parseFloat(e.target.value)
    const newTime = (newProgress / 100) * videoRef.current.duration
    videoRef.current.currentTime = newTime
    setProgress(newProgress)
  }

  const toggleFullscreen = (e) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      }
    }
  }

  return (
    <div className="video-frame">
      {src ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          >
            <source src={src} type="video/mp4" />
          </video>

          <div className="video-controls-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="video-progress-bar-wrap">
              <input
                type="range"
                className="video-progress-bar"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleScrub}
              />
            </div>

            <div className="video-controls-row">
              <div className="video-controls-left">
                <button
                  type="button"
                  className="video-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className="video-ctrl-btn"
                  onClick={(e) => skipTime(-10, e)}
                  aria-label="Rewind 10s"
                  title="Rewind 10 seconds"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="video-ctrl-btn"
                  onClick={(e) => skipTime(10, e)}
                  aria-label="Forward 10s"
                  title="Forward 10 seconds"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                  </svg>
                </button>

                <span className="video-time-display">{currentTime} / {duration}</span>
              </div>

              <div className="video-controls-right">
                <button
                  type="button"
                  className="video-ctrl-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className="video-ctrl-btn"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  title="Fullscreen"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="video-frame-placeholder">
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
