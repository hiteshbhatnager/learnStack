import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import { ArrowRight, Clock, PlayCircle } from 'lucide-react';
import './ContinueLearning.css';

export default function ContinueLearning({ currentCourse, onResume }) {
  if (!currentCourse) return null;

  const {
    title = 'C Programming',
    category = 'Computer Science',
    topic = 'Switch Statement',
    lessonNumber = 'Module 3 • Lesson 4',
    progress = 68,
    estimatedTimeRemaining = '18 mins remaining',
    buttonText = 'Continue →',
    badge = 'In Progress'
  } = currentCourse;

  return (
    <Card hoverable className="continue-learning-card" padding="lg">
      <div className="continue-learning__header">
        <div className="continue-learning__tag-group">
          <span className="continue-learning__tag">{category}</span>
          <span className="continue-learning__badge">{badge}</span>
        </div>
        <span className="continue-learning__time">
          <Clock size={14} />
          {estimatedTimeRemaining}
        </span>
      </div>

      <div className="continue-learning__main">
        <div className="continue-learning__info">
          <h2 className="continue-learning__course-title">{title}</h2>
          <h3 className="continue-learning__topic">
            <PlayCircle size={20} className="continue-learning__topic-icon" />
            {topic}
          </h3>
          <p className="continue-learning__lesson">{lessonNumber}</p>
        </div>
      </div>

      <div className="continue-learning__progress-section">
        <div className="continue-learning__progress-header">
          <span className="continue-learning__progress-label">Course Completion</span>
          <span className="continue-learning__progress-val">{progress}%</span>
        </div>
        <ProgressBar progress={progress} height="10px" />
      </div>

      <div className="continue-learning__footer">
        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onResume}
          className="continue-learning__btn"
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}
