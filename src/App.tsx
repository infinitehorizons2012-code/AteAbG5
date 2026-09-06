import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [activeTab, setActiveTab] = useState('Video');
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState('Arithmetic 5');

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <div className="content-card">
          {activeTab === 'Video' ? (
            <div className="video-section">
              <div className="controls-row">
                <div className="control-group">
                  <label htmlFor="day-select">Chọn Ngày:</label>
                  <select 
                    id="day-select" 
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    {Array.from({ length: 170 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>Ngày {day}</option>
                    ))}
                  </select>
                </div>
                
                <div className="control-group">
                  <label htmlFor="subject-select">Chọn Môn Học:</label>
                  <select
                    id="subject-select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="Arithmetic 5">Arithmetic 5</option>
                    <option value="Language 5">Language 5</option>
                    <option value="Science 5">Science 5</option>
                    <option value="History 5">History 5</option>
                  </select>
                </div>
              </div>

              <VideoPlayer day={selectedDay} subject={selectedSubject} />
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nội dung đang được cập nhật</h2>
              <p>Vui lòng chọn tab Video để xem bài học.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
