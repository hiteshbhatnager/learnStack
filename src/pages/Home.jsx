import WelcomeSection from '../components/home/WelcomeSection';
import QuickStats from '../components/home/QuickStats';
import ContinueLearning from '../components/home/ContinueLearning';
import TodayTasks from '../components/home/TodayTasks';
import UpcomingLectures from '../components/home/UpcomingLectures';
import RecentNotes from '../components/home/RecentNotes';
import LearningProgress from '../components/home/LearningProgress';
import { homeData } from '../data/homeData';
import './Home.css';

export default function Home({ onNavigate }) {
  const {
    user,
    stats,
    currentCourse,
    tasks,
    lectures,
    recentNotes,
    learningProgress
  } = homeData;

  const handleContinueCourse = () => {
    // Scaffolded action handler for continuing current course
    console.log('Navigating to course:', currentCourse.title, currentCourse.topic);
    if (onNavigate) onNavigate('courses');
  };

  const handleViewAllTasks = () => {
    if (onNavigate) onNavigate('tasks');
  };

  const handleViewAllNotes = () => {
    if (onNavigate) onNavigate('notes');
  };

  return (
    <div className="home-dashboard">
      {/* 1. Welcome & Greeting Hero */}
      <WelcomeSection
        user={user}
        onContinue={handleContinueCourse}
      />

      {/* 2. Key Metric Stat Cards */}
      <QuickStats stats={stats} />

      {/* 3. Main Dashboard Responsive Grid */}
      <div className="home-grid">
        {/* Left / Primary Column */}
        <div className="home-grid__primary">
          <ContinueLearning
            currentCourse={currentCourse}
            onResume={handleContinueCourse}
          />
          <TodayTasks
            initialTasks={tasks}
            onViewAll={handleViewAllTasks}
          />
        </div>

        {/* Right / Secondary Column */}
        <aside className="home-grid__sidebar">
          <LearningProgress
            progressData={learningProgress}
          />
          <UpcomingLectures
            lectures={lectures}
          />
          <RecentNotes
            notes={recentNotes}
            onViewAllNotes={handleViewAllNotes}
          />
        </aside>
      </div>
    </div>
  );
}
