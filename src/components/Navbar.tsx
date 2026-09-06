import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    'Video', 
    'Tổng hợp', 
    'Quy tắc biến điệu', 
    'Ma trận âm điệu', 
    'Luyện Ghép', 
    'Trắc nghiệm', 
    'Khu Vườn'
  ];

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-box">拼</div>
        <div className="brand-text">
          <h1>Bảng Pinyin</h1>
          <p>BẢNG GHÉP PINYIN TIẾNG TRUNG</p>
        </div>
      </div>
      
      <div className="nav-center">
        {tabs.map(tab => (
          <div 
            key={tab} 
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {/* Simple placeholder icon depending on tab name, to mimic the image */}
            {tab === 'Video' && <span>📺</span>}
            {tab === 'Tổng hợp' && <span>📖</span>}
            {tab === 'Quy tắc biến điệu' && <span>⚡</span>}
            {tab === 'Ma trận âm điệu' && <span>🔠</span>}
            {tab === 'Luyện Ghép' && <span>🔊</span>}
            {tab === 'Trắc nghiệm' && <span>🎧</span>}
            {tab === 'Khu Vườn' && <span>🌲</span>}
            {tab}
          </div>
        ))}
      </div>

      <div className="nav-right">
        <button className="btn-login">👤 Đăng nhập</button>
      </div>
    </nav>
  );
};

export default Navbar;
