import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'

// Simple direct imports
import herovideo1 from '/assets/herovideo1.mp4'
import herovideo2 from '/assets/herovideo2.mp4'
import herovideo3 from '/assets/herovideo3.mp4'

export default function VideosSection({ car }) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const videoRef = useRef(null)
  const thumbnailRefs = useRef([])

  const videos = [
    { src: herovideo1 },
    { src: herovideo2 },
    { src: herovideo3 }
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      if (isPlaying) {
        videoRef.current.play().catch(() => {})
      }
    }
  }, [currentVideo])

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(progress)
      }
    }

    const video = videoRef.current
    if (video) {
      video.addEventListener('timeupdate', updateProgress)
      return () => video.removeEventListener('timeupdate', updateProgress)
    }
  }, [])

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setProgress(0)
    }
  }

  const switchVideo = (index) => {
    setCurrentVideo(index)
    setIsPlaying(true)
    setProgress(0)
  }

  const handleThumbnailHover = (index, isHovering) => {
    setHoveredVideo(isHovering ? index : null)
    const thumbnailVideo = thumbnailRefs.current[index]
    if (thumbnailVideo) {
      if (isHovering) {
        thumbnailVideo.currentTime = 0
        thumbnailVideo.play().catch(() => {})
      } else {
        thumbnailVideo.pause()
      }
    }
  }

  return (
    <div className="relative bg-black rounded-3xl p-4 md:p-8">
      {/* Red Title */}
      <div className="relative mb-6 md:mb-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-2">
          Fahrzeug-Videogalerie
        </h2>
      </div>

      {/* Wide Desktop Video Player */}
      <div className="relative mb-6 md:mb-8">
        <div className="relative w-full max-w-5xl mx-auto bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
          {/* Custom wide aspect ratio for desktop, standard for mobile */}
          <div className="relative aspect-video md:aspect-[21/9]">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={videos[currentVideo].src}
              muted={isMuted}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={handlePlay}
                className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-10 md:h-10 text-white" />
                ) : (
                  <Play className="w-6 h-6 md:w-10 md:h-10 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Clean Controls */}
            <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-white font-medium text-sm md:text-base">
                    Video {currentVideo + 1}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={handleRestart}
                    className="w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 border border-white/20"
                    title="Neu starten"
                  >
                    <RotateCcw className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </button>
                  <button
                    onClick={handleMute}
                    className="w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 border border-white/20"
                    title={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    ) : (
                      <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Video Thumbnails */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => switchVideo(index)}
            onMouseEnter={() => handleThumbnailHover(index, true)}
            onMouseLeave={() => handleThumbnailHover(index, false)}
            className={`relative group transition-all duration-500 ${
              index === currentVideo 
                ? 'scale-105' 
                : 'hover:scale-102'
            }`}
          >
            <div className={`relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
              index === currentVideo 
                ? 'border-red-500 shadow-lg shadow-red-500/30' 
                : 'border-neutral-700 hover:border-neutral-500'
            }`}>
              
              <video
                ref={el => thumbnailRefs.current[index] = el}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={video.src}
                muted
                playsInline
              />
              
              {/* Simple Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Play Icon on Hover */}
              {hoveredVideo === index && index !== currentVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                    <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Active Indicator */}
              {index === currentVideo && (
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mt-6 md:mt-8">
        <div className="flex items-center gap-3 md:gap-4 bg-neutral-800/60 rounded-full px-4 md:px-6 py-2 md:py-3 border border-neutral-700">
          <div className="flex gap-1.5 md:gap-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentVideo 
                    ? 'bg-red-500 w-6 md:w-8' 
                    : 'bg-neutral-400'
                }`}
              ></div>
            ))}
          </div>
          <div className="w-px h-3 md:h-4 bg-neutral-600"></div>
          <span className="text-neutral-300 text-xs md:text-sm font-medium">
            {currentVideo + 1}/{videos.length}
          </span>
        </div>
      </div>
    </div>
  )
}
