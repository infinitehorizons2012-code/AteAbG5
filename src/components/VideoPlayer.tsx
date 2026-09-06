import React, { useState, useEffect, useRef } from 'react';

interface Word {
  word: string;
  start: number;
  end: number;
}

interface Segment {
  id: number;
  start: number;
  end: number;
  text: string;
  vietnamese: string;
  words: Word[];
}

interface VideoPlayerProps {
  day: string;
  subject: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ day, subject }) => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegment, setActiveSegment] = useState<Segment | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For prototype, we use the copied JSON. In a real app, URL would be dynamic based on day/subject.
  const videoUrl = "./Grade_5_001_Arithmetic_5.mp4"; // Make sure to put the MP4 in public folder
  const jsonUrl = "./Grade_5_001_Arithmetic_5.json";
  // Fallback video for testing if local video is not copied
  const fallbackVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    // Fetch JSON data
    fetch(jsonUrl)
      .then(res => {
        if (!res.ok) throw new Error("Could not load JSON");
        return res.json();
      })
      .then(data => {
        if (data.segments) {
          setSegments(data.segments);
        }
      })
      .catch(err => {
        console.error("Error loading JSON:", err);
      });
  }, [day, subject]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Find active segment
      const current = segments.find(seg => time >= seg.start && time <= seg.end);
      if (current) {
        setActiveSegment(current);
      } else if (activeSegment && time > activeSegment.end) {
        // Keep the previous segment on screen shortly or clear it if it's been too long
        // For simplicity, clear it if we are outside any segment.
        setActiveSegment(null);
      }
    }
  };

  return (
    <div className="player-container">
      <div className="video-wrapper">
        <video 
          ref={videoRef}
          controls 
          onTimeUpdate={handleTimeUpdate}
          src={videoUrl}
          onError={() => {
            console.log("Local video failed to load, trying fallback.");
            if (videoRef.current && videoRef.current.src !== fallbackVideo) {
              videoRef.current.src = fallbackVideo;
            }
          }}
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>

      <div className="subtitle-container">
        {activeSegment ? (
          <div>
            <div className="subtitle-text">
              {activeSegment.words.map((w, idx) => {
                const isActive = currentTime >= w.start && currentTime <= w.end;
                return (
                  <span 
                    key={idx} 
                    className={`karaoke-word ${isActive ? 'active' : ''}`}
                  >
                    {w.word}
                  </span>
                );
              })}
            </div>
            <div style={{ color: '#ccc', fontSize: '18px', marginTop: '10px' }}>
              {activeSegment.vietnamese}
            </div>
          </div>
        ) : (
          <div className="subtitle-text" style={{ opacity: 0.5 }}>
            ...
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
