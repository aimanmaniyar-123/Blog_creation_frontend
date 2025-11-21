import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BlogCreation } from './components/BlogCreation';
import { AgentMonitor } from './components/AgentMonitor';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'blog-creation' | 'agent-monitor' | 'analytics' | 'settings'>('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'blog-creation' && <BlogCreation />}
              {currentPage === 'agent-monitor' && <AgentMonitor />}
              {currentPage === 'analytics' && <Analytics />}
              {currentPage === 'settings' && <Settings />}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <motion.footer 
            className="mt-16 pt-8 pb-4 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center text-gray-600">
              <p className="mb-2">
                🤖 Powered by AI | Built with React, Motion & Modern Web Technologies
              </p>
              <p className="text-sm">
                📝 Blog Creation | 🎨 Image Generation | 📄 Multi-format Export
              </p>
            </div>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}