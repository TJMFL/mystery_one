import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import GuestPage from './pages/GuestPage';
import AdminPage from './pages/AdminPage';
import { MapPin, Building, Users, Menu, X } from 'lucide-react';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isDevelopment = true; // Set to true for development mode to hide Admin link

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Mobile menu button */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white p-2 rounded-md shadow-md text-gray-700 hover:text-blue-600 transition-colors"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Side navigation */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out md:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-2" />
                Chicago Concierge
              </h1>
              <p className="text-sm text-gray-500 mt-1">Powered by ENSPYR AI</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <MapPin className="h-5 w-5 mr-3" />
                Chat
              </Link>
              <Link
                to="/guest/brock-lang"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Building className="h-5 w-5 mr-3" />
                Guest Page
              </Link>
              {!isDevelopment && (
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Users className="h-5 w-5 mr-3" />
                  Admin
                </Link>
              )}
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                © 2025 ENSPYR AI
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:ml-64 transition-all duration-300">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/guest/:guestSlug" element={<GuestPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>

        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;