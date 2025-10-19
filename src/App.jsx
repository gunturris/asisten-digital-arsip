import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import UploadPage from './components/pages/UploadPage';
import AssistantPage from './components/pages/AssistantPage';
import UsersPage from './components/pages/UsersPage';
import ProfilePage from './components/pages/ProfilePage';

const mockDocuments = [
  { id: 1, name: 'Kebijakan SDM 2024.pdf', tags: ['HR', 'Kebijakan'], date: '12 Jan 2024', expiry: '12 Jan 2026', augmented: true, shared: false },
  { id: 2, name: 'Laporan Keuangan Q1.xlsx', tags: ['Keuangan', 'Laporan'], date: '15 Feb 2024', expiry: '15 Feb 2025', augmented: false, shared: true },
  { id: 3, name: 'Panduan Onboarding.docx', tags: ['HR', 'Training'], date: '20 Mar 2024', expiry: '20 Mar 2026', augmented: true, shared: false },
];

const mockChatHistory = [
  { id: 1, sender: 'user', message: 'Apa isi kebijakan cuti tahunan?' },
  { id: 2, sender: 'ai', message: 'Berdasarkan dokumen Kebijakan SDM 2024.pdf (diunggah oleh HRD, 12 Jan 2024): Cuti tahunan diberikan 12 hari kerja per tahun untuk karyawan tetap. Cuti dapat diambil dengan persetujuan atasan dan harus diajukan minimal 7 hari kerja sebelumnya.' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName] = useState('Budi');
  const [isAdmin] = useState(true);
  const [documents] = useState(mockDocuments);
  const [chatMessages, setChatMessages] = useState(mockChatHistory);
  const [chatInput, setChatInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const userMsg = { id: chatMessages.length + 1, sender: 'user', message: chatInput };
      setChatMessages(prev => [...prev, userMsg]);
      setChatInput('');

      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'ai',
            message: 'Saya sedang memproses pertanyaan Anda berdasarkan dokumen yang tersedia...'
          }
        ]);
      }, 1000);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage showPassword={showPassword} setShowPassword={setShowPassword} handleLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userName={userName}
          setCurrentPage={setCurrentPage}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage documents={documents} filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />}
          {currentPage === 'upload' && <UploadPage setCurrentPage={setCurrentPage} />}
          {currentPage === 'assistant' && <AssistantPage chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleSendMessage={handleSendMessage} />}
          {currentPage === 'users' && <UsersPage />}
          {currentPage === 'profile' && <ProfilePage userName={userName} />}
        </div>
      </div>
    </div>
  );
}

export default App;