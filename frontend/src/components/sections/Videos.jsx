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
    { 
      src: herovideo1, 
      name: "AMG GT Black Series"
    },
    { 
      src: herovideo2, 
      name: "BRABUS Rocket 900"
    },
    { 
      src: herovideo3, 
      name: "911 GT3 RS"
    }
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
    <div className="relative bg-black rounded-3xl p-4 md:p-8 overflow-hidden">
      {/* German Title */}
      <div className="relative mb-6 md:mb-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-2">
          Car-Impressionen
        </h2>
      </div>

      {/* Optimized Video Player for Better Quality */}
      <div className="relative mb-6 md:mb-8">
        <div className="relative w-full max-w-4xl mx-auto bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl shadow-black/50">
          {/* Narrower aspect ratio for better quality - 18:9 instead of 21:9 */}
          <div className="relative aspect-video md:aspect-[18/9] overflow-hidden">
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

            {/* Enhanced Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent"></div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300 shadow-lg shadow-red-500/50"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={handlePlay}
                className="w-14 h-14 md:w-20 md:h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-10 md:h-10 text-white" />
                ) : (
                  <Play className="w-6 h-6 md:w-10 md:h-10 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Refined Car Info Layout */}
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-white font-bold text-lg md:text-2xl mb-1 leading-tight drop-shadow-lg">
                      {videos[currentVideo].name}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3 ml-4">
                  <button
                    onClick={handleRestart}
                    className="w-9 h-9 md:w-11 md:h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/30 shadow-lg"
                    title="Neu starten"
                  >
                    <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                  <button
                    onClick={handleMute}
                    className="w-9 h-9 md:w-11 md:h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/30 shadow-lg"
                    title={isMuted ? "Ton einschalten" : "Ton ausschalten"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Video Thumbnails */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
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
                ? 'border-red-500 shadow-lg shadow-red-500/40' 
                : 'border-neutral-700 hover:border-neutral-500'
            }`}>
              
              <video
                ref={el => thumbnailRefs.current[index] = el}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={video.src}
                muted
                playsInline
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent"></div>

              {/* Clean Car Names */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h4 className="text-white font-bold text-xs md:text-sm text-center leading-tight drop-shadow-md">
                  {video.name}
                </h4>
              </div>

              {/* Play Icon on Hover */}
              {hoveredVideo === index && index !== currentVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse shadow-xl">
                    <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Active Indicator */}
              {index === currentVideo && (
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mt-6 md:mt-8">
        <div className="flex items-center gap-3 md:gap-4 bg-neutral-800/70 rounded-full px-4 md:px-6 py-2 md:py-3 border border-neutral-700 shadow-lg">
          <div className="flex gap-1.5 md:gap-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentVideo 
                    ? 'bg-red-500 w-6 md:w-8 shadow-lg shadow-red-500/50' 
                    : 'bg-neutral-400'
                }`}
              ></div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}
