# Setup Vite Project - Asisten Digital Arsip

## 📁 Struktur Folder

```
asisten-digital-arsip/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── NavItem.jsx
│   │   └── pages/
│   │       ├── LoginPage.jsx
│   │       ├── DashboardPage.jsx
│   │       ├── UploadPage.jsx
│   │       ├── AssistantPage.jsx
│   │       ├── UsersPage.jsx
│   │       └── ProfilePage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Langkah-langkah Setup

### 1. Buat Project Vite

```bash
npm create vite@latest asisten-digital-arsip -- --template react
cd asisten-digital-arsip
```

### 2. Install Dependencies

```bash
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Konfigurasi Tailwind CSS

Edit file `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F3F4F6',
        accent: '#10B981',
      }
    },
  },
  plugins: [],
}
```

### 4. Update `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 5. Update `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 6. Buat File Komponen

#### `src/components/NavItem.jsx`
```jsx
import React from 'react';

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default NavItem;
```

#### `src/components/Sidebar.jsx`
```jsx
import React from 'react';
import { Home, Search, MessageSquare, Tag, Clock, User, Users, Bell, FileText } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = ({ sidebarOpen, currentPage, setCurrentPage, isAdmin }) => (
  <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
          <FileText className="text-white" size={24} />
        </div>
        <div className="font-bold text-gray-800">Arsip Digital</div>
      </div>
      
      <nav className="space-y-2">
        <NavItem icon={<Home size={20} />} label="Dokumen Saya" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
        <NavItem icon={<Search size={20} />} label="Cari & Jelajahi" onClick={() => setCurrentPage('search')} />
        <NavItem icon={<MessageSquare size={20} />} label="Asisten Digital" active={currentPage === 'assistant'} onClick={() => setCurrentPage('assistant')} />
        <NavItem icon={<Tag size={20} />} label="Tag Saya" onClick={() => setCurrentPage('tags')} />
        <NavItem icon={<Clock size={20} />} label="Akan Kadaluwarsa" onClick={() => setCurrentPage('expiring')} />
        <NavItem icon={<User size={20} />} label="Profil & Keamanan" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
        {isAdmin && (
          <>
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase">Admin</div>
            <NavItem icon={<Users size={20} />} label="Kelola Pengguna" active={currentPage === 'users'} onClick={() => setCurrentPage('users')} />
            <NavItem icon={<Bell size={20} />} label="Kirim Notifikasi" onClick={() => setCurrentPage('notifications')} />
          </>
        )}
      </nav>
    </div>
  </div>
);

export default Sidebar;
```

#### `src/components/Header.jsx`
```jsx
import React from 'react';
import { Bell, Menu, X, User, Settings, LogOut } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, userName, setCurrentPage, setIsLoggedIn }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Hai, {userName}!</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </button>
        <div className="relative group">
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
              {userName[0]}
            </div>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
            <button onClick={() => setCurrentPage('profile')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
              <User size={16} /> Lihat Profil
            </button>
            <button onClick={() => setCurrentPage('profile')} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2">
              <Settings size={16} /> Ganti Password
            </button>
            <button onClick={() => { setIsLoggedIn(false); setCurrentPage('login'); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600">
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
```

#### `src/components/pages/LoginPage.jsx`
```jsx
import React from 'react';
import { FileText, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ showPassword, setShowPassword, handleLogin }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FileText className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Asisten Digital Arsip</h1>
        <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="nama@perusahaan.com" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="••••••••" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Ingat saya</label>
        </div>
        
        <button onClick={handleLogin} className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
          Masuk
        </button>
        
        <div className="text-center">
          <a href="#" className="text-sm text-blue-900 hover:underline">Lupa password?</a>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2025 Asisten Digital Arsip
      </div>
    </div>
  </div>
);

export default LoginPage;
```

#### `src/components/pages/DashboardPage.jsx`
```jsx
import React from 'react';
import { Upload, Search, FileText, Share2, Eye, Check } from 'lucide-react';

const DashboardPage = ({ documents, filter, setFilter, setCurrentPage }) => {
  const filteredDocs = documents.filter(doc => {
    if (filter === 'augmented') return doc.augmented;
    if (filter === 'shared') return doc.shared;
    if (filter === 'expiring') return new Date(doc.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dokumen Saya</h2>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Semua
          </button>
          <button onClick={() => setFilter('augmented')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'augmented' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Di-augmentasi
          </button>
          <button onClick={() => setFilter('shared')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'shared' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Dibagikan
          </button>
          <button onClick={() => setFilter('expiring')} className={`px-4 py-2 rounded-lg font-medium ${filter === 'expiring' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Kadaluwarsa dalam 30 hari
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari dokumen..." 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <button onClick={() => setCurrentPage('upload')} className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
          <Upload size={20} />
          Unggah Dokumen Baru
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-900" size={24} />
                <h3 className="font-semibold text-gray-800 text-sm">{doc.name}</h3>
              </div>
              {doc.augmented && <Check className="text-green-500 flex-shrink-0" size={20} />}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {doc.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-900 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              <div>Diunggah: {doc.date}</div>
              <div>Berlaku hingga: {doc.expiry}</div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center gap-1">
                <Share2 size={16} /> Bagikan
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 text-sm font-medium flex items-center justify-center gap-1">
                <Eye size={16} /> Lihat
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada dokumen</h3>
          <p className="text-gray-500">Yuk, unggah yang pertama!</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
```

#### `src/components/pages/UploadPage.jsx`
```jsx
import React from 'react';
import { Upload } from 'lucide-react';

const UploadPage = ({ setCurrentPage }) => (
  <div className="p-6">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Unggah Dokumen Baru</h2>
      
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
        <Upload className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-lg text-gray-700 mb-2">Tarik file ke sini, atau klik untuk memilih</p>
        <p className="text-sm text-gray-500">Format: PDF, DOCX, TXT, PPTX, XLSX (Max 10MB)</p>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Dokumen (opsional)</label>
          <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Misal: Kebijakan Cuti 2025" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
          <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ketik dan tekan Enter..." />
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <input type="checkbox" id="augment" className="w-5 h-5 text-blue-900 border-gray-300 rounded focus:ring-blue-500 mt-0.5" />
          <div>
            <label htmlFor="augment" className="font-medium text-gray-800 cursor-pointer">Jadikan Referensi AI</label>
            <p className="text-sm text-gray-600 mt-1">Dokumen ini bisa ditanyakan ke Asisten Digital</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => setCurrentPage('dashboard')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
            Batal
          </button>
          <button className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Unggah Dokumen
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default UploadPage;
```

#### `src/components/pages/AssistantPage.jsx`
```jsx
import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';

const AssistantPage = ({ chatMessages, chatInput, setChatInput, handleSendMessage }) => (
  <div className="flex h-full">
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-blue-900" size={24} />
          <div>
            <h2 className="font-bold text-gray-800">Asisten Digital Arsip</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Aktif
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg ${msg.sender === 'user' ? 'bg-blue-900 text-white' : 'bg-white border-l-4 border-blue-500'} rounded-lg p-4`}>
                <p className={msg.sender === 'user' ? 'text-white' : 'text-gray-800'}>{msg.message}</p>
                {msg.doc && (
                  <a href="#" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline">
                    Lihat Dokumen <ChevronRight size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input 
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="Tanyakan apa saja tentang dokumen yang telah di-augmentasi..."
          />
          <button onClick={handleSendMessage} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AssistantPage;
```

#### `src/components/pages/UsersPage.jsx`
```jsx
import React from 'react';
import { Users } from 'lucide-react';

const UsersPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h2>
      <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 flex items-center gap-2">
        <Users size={20} />
        Tambah Pengguna
      </button>
    </div>
    
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Peran</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 text-gray-800">Budi Santoso</td>
            <td className="px-6 py-4 text-gray-600">budi@perusahaan.com</td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">Admin</span></td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Aktif</span></td>
            <td className="px-6 py-4">
              <button className="text-blue-600 hover:underline text-sm mr-3">Edit</button>
              <button className="text-red-600 hover:underline text-sm">Hapus</button>
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 text-gray-800">Siti Aminah</td>
            <td className="px-6 py-4 text-gray-600">siti@perusahaan.com</td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Standar</span></td>
            <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Aktif</span></td>
            <td className="px-6 py-4">
              <button className="text-blue-600 hover:underline text-sm mr-3">Edit</button>
              <button className="text-red-600 hover:underline text-sm">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersPage;
```

#### `src/components/pages/ProfilePage.jsx`
```jsx
import React from 'react';
import { Check } from 'lucide-react';

const ProfilePage = ({ userName }) => (
  <div className="p-6">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil & Keamanan</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Profil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
            <input type="text" value={userName} disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value="budi@perusahaan.com" disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Keamanan</h3>
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Check className="text-green-600" size={24} />
            <div>
              <p className="font-medium text-gray-800">Status Keamanan Aman</p>
              <p className="text-sm text-gray-600">Terakhir ganti password: 15 Sep 2024</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800">
          Ganti Password
        </button>
      </div>
    </div>
  </div>
);

export default ProfilePage;
```

#### `src/App.jsx`
```jsx
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
  { id: 2, sender: 'ai', message: 'Berdasarkan dokumen **Kebijakan SDM 2024.pdf** (diunggah oleh HRD, 12 Jan 2024): Cuti tahunan diberikan 12 hari kerja per tahun untuk karyawan tetap. Cuti dapat diambil setelah masa percobaan 6 bulan.', doc: 'Kebijakan SDM 2024.pdf' },
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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: 'user', message: chatInput }]);
      setChatInput('');
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          id: prev.length + 1, 
          sender: 'ai', 
          message: 'Saya sedang memproses pertanyaan Anda berdasarkan dokumen yang tersedia...' 
        }]);
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
```

---

### 7. Update `package.json`

```json
{
  "name": "asisten-digital-arsip",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
```

### 8. Create `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 9. Update `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### 10. Create `.gitignore`

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### 11. Create `README.md`

```markdown
# Asisten Digital Arsip

Website manajemen arsip digital dengan fitur AI Assistant menggunakan React + Vite + Tailwind CSS.

## ✨ Fitur

- 🔐 Login & Authentication
- 📁 Manajemen Dokumen
- 🤖 Asisten Digital (AI Chat)
- 👥 Manajemen Pengguna (Admin)
- 🏷️ Tag & Filter Dokumen
- ⏰ Notifikasi Kadaluwarsa
- 📤 Upload Dokumen
- 🔍 Pencarian Global

## 🚀 Instalasi & Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Setup Project

1. Clone atau buat folder project:
```bash
mkdir asisten-digital-arsip
cd asisten-digital-arsip
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:3000`

## 🛠️ Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## 📦 Preview Production Build

```bash
npm run preview
```

## 🎨 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon Library

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── NavItem.jsx
│   └── pages/
│       ├── LoginPage.jsx
│       ├── DashboardPage.jsx
│       ├── UploadPage.jsx
│       ├── AssistantPage.jsx
│       ├── UsersPage.jsx
│       └── ProfilePage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🔑 Login Default

Untuk login, cukup klik tombol "Masuk" (belum ada validasi backend).

## 📝 Catatan

- Project ini adalah frontend demo
- Belum ada integrasi dengan backend/API
- Data menggunakan mock data (hardcoded)
- Untuk production, perlu ditambahkan:
  - Backend API integration
  - Real authentication
  - Database connection
  - File upload handling
  - Real AI integration (GPT-4o)

## 📄 License

MIT License

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk Asisten Digital Arsip
```

---

## 🎯 Cara Cepat Setup

Copy semua file di atas, lalu jalankan:

```bash
# Setup project
npm create vite@latest asisten-digital-arsip -- --template react
cd asisten-digital-arsip

# Install dependencies
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Copy semua file komponen ke folder src/
# Lalu jalankan
npm run dev
```

---

## 📸 Screenshot

Setelah dijalankan, Anda akan melihat:
- ✅ Halaman Login yang elegant
- ✅ Dashboard dengan sidebar navigasi
- ✅ Daftar dokumen dengan filter
- ✅ Chat interface untuk AI Assistant
- ✅ Halaman manajemen user (admin)
- ✅ Profil & keamanan pengguna

---

## 🔧 Troubleshooting

Jika ada error:

1. **Module not found**: Pastikan sudah `npm install`
2. **Tailwind tidak jalan**: Periksa `tailwind.config.js` dan `index.css`
3. **Port sudah dipakai**: Ubah port di `vite.config.js`
 