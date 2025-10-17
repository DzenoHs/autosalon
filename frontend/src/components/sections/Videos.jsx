import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'

// Direct video sources
import video1 from '/assets/video1.mov'
import video2 from '/assets/video2.mov'
import video3 from '/assets/video3.mp4'
import video4 from '/assets/video4.mov'
import video5 from '/assets/video5.mov'

export default function VideosSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)
  const scrollContainerRef = useRef(null)

  const videos = [
    { src: video1, name: "Mercedes" },
    { src: video2, name: "Audi" },
    { src: video3, name: "Audi" },
    { src: video4, name: "Mercedes" },
    { src: video5, name: "Mercedes" }
  ]

  // Simple progress update
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('play', () => setIsPlaying(true))
    video.addEventListener('pause', () => setIsPlaying(false))

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('play', () => setIsPlaying(true))
      video.removeEventListener('pause', () => setIsPlaying(false))
    }
  }, [currentVideo])

  // Auto-play when video changes
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play()
    }
  }, [currentVideo])

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
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



  return (
    <div className="bg-black rounded-3xl p-6 md:p-8">
      {/* Simple Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Car-Impressionen
        </h2>
        <p className="text-neutral-400 text-sm md:text-base">
          {videos.length} Premium Fahrzeuge
        </p>
      </div>

      {/* Main Video Player */}
      <div className="relative mb-6">
        <div className="relative w-full max-w-4xl mx-auto bg-neutral-900 rounded-2xl overflow-hidden group">
          <div className="relative aspect-video md:aspect-[18/9]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videos[currentVideo].src}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              poster=""
              style={{ objectPosition: 'center' }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePlay}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                    {videos[currentVideo].name}
                  </h3>
                
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRestart}
                    className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={handleMute}
                    className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center">
        {/* Desktop - Centered Grid, Mobile - Horizontal Scroll */}
        <div className="hidden md:flex gap-4 justify-center flex-wrap max-w-6xl px-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => switchVideo(index)}
              className={`relative flex-shrink-0 transition-transform ${
                index === currentVideo ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              <div className={`relative w-48 aspect-video rounded-xl overflow-hidden border-2 ${
                index === currentVideo 
                  ? 'border-red-500 shadow-lg shadow-red-500/30' 
                  : 'border-neutral-700 hover:border-neutral-500'
              }`}>
                <video
                  className="w-full h-full object-cover"
                  src={video.src}
                  muted
                  playsInline
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-white font-bold text-xs text-center">
                    {video.name}
                  </h4>
                </div>
                
                <div className="absolute top-2 left-2 bg-black/60 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                

              </div>
            </button>
          ))}
        </div>
        
        {/* Mobile - Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex gap-4 px-4 pb-4">
            {videos.map((video, index) => (
              <button
                key={`mobile-${index}`}
                onClick={() => switchVideo(index)}
                className={`relative flex-shrink-0 transition-transform ${
                  index === currentVideo ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <div className={`relative w-48 aspect-video rounded-xl overflow-hidden border-2 ${
                  index === currentVideo 
                    ? 'border-red-500 shadow-lg shadow-red-500/30' 
                    : 'border-neutral-700 hover:border-neutral-500'
                }`}>
                  <video
                    className="w-full h-full object-cover"
                    src={video.src}
                    muted
                    playsInline
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-bold text-xs text-center">
                      {video.name}
                    </h4>
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-black/60 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-4 bg-neutral-800/70 rounded-full px-6 py-3">
          <div className="flex gap-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentVideo 
                    ? 'bg-red-500 w-6' 
                    : 'bg-neutral-400'
                }`}
              ></div>
            ))}
          </div>
          <div className="w-px h-4 bg-neutral-600"></div>
          <span className="text-neutral-300 text-sm font-medium">
            {currentVideo + 1}/{videos.length}
          </span>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
