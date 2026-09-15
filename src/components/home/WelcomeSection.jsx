import Button from '../ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';
import './WelcomeSection.css';

export default function WelcomeSection({ user, onContinue }) {
  // Format current readable date
  const todayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <section className="welcome-section" aria-label="Welcome and Overview">
      <div className="welcome-content">
        <div className="welcome-badge">
          <Calendar size={14} className="welcome-badge-icon" />
          <span>{todayDate}</span>
          <span className="welcome-badge-sep">•</span>
          <span className="welcome-badge-accent">Semester 1</span>
        </div>
        
        <h1 className="welcome-title">
          {user?.greeting || 'Good morning 👋'}
        </h1>
        
        <p className="welcome-subtitle">
          {user?.subtitle || 'Ready to continue learning? Keep your streak alive today.'}
        </p>
      </div>

      <div className="welcome-action">
        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onContinue}
        >
          {user?.continueActionText || 'Continue Learning'}
        </Button>
      </div>
    </section>
  );
}
