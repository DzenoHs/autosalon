import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

// Lazy imports with preload hints
const videoSources = [
  { src: '/assets/herovideo1.mp4', name: "AMG GT Black Series" },
  { src: '/assets/herovideo2.mp4', name: "BRABUS Rocket 900" },
  { src: '/assets/herovideo3.mp4', name: "911 GT3 RS" },
  { src: '/assets/herovideo4.mp4', name: "AMG S 63 E Performance" },
  { src: '/assets/herovideo5.mp4', name: "RS6 Avant C8" },
  { src: '/assets/herovideo6.mp4', name: "G-Class 4×4²" },
  { src: '/assets/herovideo7.mp4', name: "GLS 63 AMG" }
]

export default function VideosSection({ car }) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [loadedVideos, setLoadedVideos] = useState(new Set())
  const [preloadedVideos, setPreloadedVideos] = useState(new Set())
  
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const thumbnailRefs = useRef([])
  const scrollContainerRef = useRef(null)
  const observerRef = useRef(null)
  const preloadTimeoutRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Preload next videos after 500ms
          preloadTimeoutRef.current = setTimeout(() => {
            preloadNextVideos()
          }, 500)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' // Start loading earlier
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    observerRef.current = observer
    return () => {
      observer.disconnect()
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current)
      }
    }
  }, [])

  // Preload strategy - load next 2 videos
  const preloadNextVideos = useCallback(() => {
    const videosToPreload = [
      currentVideo,
      (currentVideo + 1) % videoSources.length,
      (currentVideo + 2) % videoSources.length
    ]

    videosToPreload.forEach(index => {
      if (!preloadedVideos.has(index)) {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.src = videoSources[index].src
        video.load()
        
        setPreloadedVideos(prev => new Set([...prev, index]))
      }
    })
  }, [currentVideo, preloadedVideos])

  // Optimized progress handler
  const handleProgress = useCallback(() => {
    if (videoRef.current && videoRef.current.duration) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }, [])

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible) return

    const events = {
      timeupdate: handleProgress,
      loadedmetadata: () => setLoadedVideos(prev => new Set([...prev, currentVideo])),
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      ended: () => switchVideo((currentVideo + 1) % videoSources.length)
    }

    Object.entries(events).forEach(([event, handler]) => {
      video.addEventListener(event, handler)
    })

    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        video.removeEventListener(event, handler)
      })
    }
  }, [currentVideo, isVisible, handleProgress])

  // Switch video with preloading
  const switchVideo = useCallback((index) => {
    if (index === currentVideo) return
    
    setCurrentVideo(index)
    setIsPlaying(true)
    setProgress(0)
    
    // Preload next videos
    setTimeout(preloadNextVideos, 100)
  }, [currentVideo, preloadNextVideos])

  // Optimized control handlers
  const handlePlay = useCallback(() => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(console.error)
    }
  }, [isPlaying])

  const handleMute = useCallback(() => {
    if (!videoRef.current) return
    
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const handleRestart = useCallback(() => {
    if (!videoRef.current) return
    
    videoRef.current.currentTime = 0
    setProgress(0)
  }, [])

  // Optimized thumbnail hover
  const handleThumbnailHover = useCallback((index, isHovering) => {
    const thumbnailVideo = thumbnailRefs.current[index]
    if (!thumbnailVideo) return

    if (isHovering && loadedVideos.has(index)) {
      thumbnailVideo.currentTime = 0
      thumbnailVideo.play().catch(() => {})
    } else {
      thumbnailVideo.pause()
    }
  }, [loadedVideos])

  // Memoized scroll handler
  const scrollThumbnails = useCallback((direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 300
    const currentScroll = container.scrollLeft
    const newPosition = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, currentScroll + scrollAmount)
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' })
  }, [])

  // Memoized current video data
  const currentVideoData = useMemo(() => videoSources[currentVideo], [currentVideo])

  // Don't render until visible
  if (!isVisible) {
    return (
      <div 
        ref={sectionRef}
        className="relative min-h-[600px] flex items-center justify-center bg-black rounded-3xl"
      >
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Car-Impressionen laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative" style={{ isolation: 'isolate' }}>
      {/* Preload hints for current and next videos */}
      {[currentVideo, (currentVideo + 1) % videoSources.length].map(index => (
        <link
          key={index}
          rel="preload"
          as="video"
          href={videoSources[index].src}
          type="video/mp4"
        />
      ))}

      <div 
        className="relative bg-black rounded-3xl p-4 md:p-8"
        style={{
          overflow: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {/* Title - Memoized */}
        <div className="relative mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-red-500 mb-2">
            Car-Impressionen
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            {videoSources.length} Premium Fahrzeuge
          </p>
        </div>

        {/* Optimized Video Player */}
        <div className="relative mb-6 md:mb-8">
          <div 
            className="relative w-full max-w-4xl mx-auto bg-neutral-900 rounded-2xl md:rounded-3xl group shadow-2xl shadow-black/50"
            style={{ overflow: 'hidden', isolation: 'isolate' }}
          >
            <div className="relative aspect-video md:aspect-[18/9]" style={{ overflow: 'hidden' }}>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={currentVideoData.src}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                style={{ borderRadius: 'inherit', objectFit: 'cover' }}
              />

              {/* Loading indicator */}
              {!loadedVideos.has(currentVideo) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Gradient Overlay */}
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
                  disabled={!loadedVideos.has(currentVideo)}
                  className="w-14 h-14 md:w-20 md:h-20 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-300 hover:scale-110 border border-white/30 shadow-xl disabled:opacity-50"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 md:w-10 md:h-10 text-white" />
                  ) : (
                    <Play className="w-6 h-6 md:w-10 md:h-10 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Car Info */}
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg md:text-2xl mb-1 leading-tight drop-shadow-lg">
                      {currentVideoData.name}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                      Video {currentVideo + 1} von {videoSources.length}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3 ml-4">
                    <button
                      onClick={handleRestart}
                      className="w-9 h-9 md:w-11 md:h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/30 shadow-lg"
                    >
                      <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                    <button
                      onClick={handleMute}
                      className="w-9 h-9 md:w-11 md:h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/30 shadow-lg"
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

        {/* Optimized Scrollable Thumbnails */}
        <div className="relative">
          <button
            onClick={() => scrollThumbnails('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 border border-white/20 shadow-lg -ml-2"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={() => scrollThumbnails('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 border border-white/20 shadow-lg -mr-2"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 pb-2 px-8 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videoSources.map((video, index) => (
              <button
                key={index}
                onClick={() => switchVideo(index)}
                onMouseEnter={() => handleThumbnailHover(index, true)}
                onMouseLeave={() => handleThumbnailHover(index, false)}
                className={`relative group transition-all duration-500 flex-shrink-0 ${
                  index === currentVideo ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <div 
                  className={`relative w-48 md:w-56 aspect-video rounded-xl md:rounded-2xl border-2 transition-all duration-500 ${
                    index === currentVideo 
                      ? 'border-red-500 shadow-lg shadow-red-500/40' 
                      : 'border-neutral-700 hover:border-neutral-500'
                  }`}
                  style={{ overflow: 'hidden', isolation: 'isolate' }}
                >
                  <video
                    ref={el => thumbnailRefs.current[index] = el}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={video.src}
                    muted
                    playsInline
                    preload="none"
                    style={{ borderRadius: 'inherit' }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h4 className="text-white font-bold text-xs md:text-sm text-center leading-tight drop-shadow-md">
                      {video.name}
                    </h4>
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-bold">{index + 1}</span>
                  </div>
                  
                  {index === currentVideo && (
                    <div className="absolute top-2 md:top-3 right-2 md:right-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mt-6 md:mt-8">
          <div className="flex items-center gap-3 md:gap-4 bg-neutral-800/70 rounded-full px-4 md:px-6 py-2 md:py-3 border border-neutral-700 shadow-lg">
            <div className="flex gap-1.5 md:gap-2">
              {videoSources.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
                    index === currentVideo 
                      ? 'bg-red-500 w-6 md:w-8 shadow-lg shadow-red-500/50' 
                      : 'bg-neutral-400'
                  }`}
                ></div>
              ))}
            </div>
            <div className="w-px h-3 md:h-4 bg-neutral-600"></div>
            <span className="text-neutral-300 text-xs md:text-sm font-medium">
              {currentVideo + 1}/{videoSources.length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
