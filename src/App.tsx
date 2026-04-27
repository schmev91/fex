import React, { useEffect } from 'react';
import { MainNavigation } from './components/layout/MainNavigation';
import { ThemeSwitcher } from './components/shared/ThemeSwitcher';
import { usePreferencesStore } from './store/usePreferencesStore';
import { Calculator } from 'lucide-react';

function App() {
  const { theme } = usePreferencesStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 font-sans text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-accent p-1.5 rounded-lg shadow-sm">
              <Calculator className="w-6 h-6 text-gray-900" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">FEX</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/schmev91" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://github.com/schmev91.png" 
                alt="GitHub Avatar" 
                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-accent transition-colors"
              />
            </a>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainNavigation />
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400 text-sm border-t dark:border-gray-800 mt-8">
        <p className="font-bold mb-2">FEX &bull; The Trader's Companion</p>
        <p>&copy; {new Date().getFullYear()} All calculations are for educational purposes.</p>
      </footer>
    </div>
  );
}

export default App;
