import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import PageContainer from './components/layout/PageContainer';
import Home from './pages/Home';

/**
 * LearnStack Application Root
 * 
 * Scalable architecture ready for future routes (Tasks, Lectures, Notes, Courses)
 * while currently focusing strictly on the Home dashboard.
 */
function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  const handleNavigate = (routeId) => {
    // Only 'home' is active right now as specified in requirements.
    // When other pages are added later, routes can easily be switched here or wired into React Router.
    if (routeId === 'home') {
      setCurrentRoute('home');
    } else {
      console.info(`Route "${routeId}" selected. Separate page will be implemented in future phase.`);
    }
  };

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <Navbar activeRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <PageContainer>
        {currentRoute === 'home' && <Home onNavigate={handleNavigate} />}
      </PageContainer>
    </div>
  );
}

export default App;
