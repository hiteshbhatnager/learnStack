import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { TrendingUp, Target, Award } from 'lucide-react';
import './LearningProgress.css';

export default function LearningProgress({ progressData }) {
  if (!progressData) return null;

  const {
    overallPercentage = 72,
    completedTopics = 18,
    totalTopics = 25,
    weeklyGoal = { targetHours: 15, currentHours: 11.5 }
  } = progressData;

  return (
    <Card className="learning-progress-card" padding="default">
      <div className="card-section-header">
        <div className="card-section-header__title-group">
          <div className="card-section-header__icon">
            <TrendingUp size={18} />
          </div>
          <h2 className="card-section-header__title">Overall Progress</h2>
        </div>
        <span className="learning-progress__score-badge">
          {overallPercentage}%
        </span>
      </div>

      <div className="learning-progress__bar-wrap">
        <ProgressBar progress={overallPercentage} height="9px" />
      </div>

      <div className="learning-progress__metrics">
        <div className="learning-progress__metric-box">
          <div className="metric-box__label">
            <Target size={14} className="metric-box__icon" />
            <span>Topics Completed</span>
          </div>
          <div className="metric-box__value">
            <span className="metric-highlight">{completedTopics}</span>
            <span className="metric-total"> / {totalTopics}</span>
          </div>
        </div>

        <div className="learning-progress__metric-box">
          <div className="metric-box__label">
            <Award size={14} className="metric-box__icon" />
            <span>Weekly Study Goal</span>
          </div>
          <div className="metric-box__value">
            <span className="metric-highlight">{weeklyGoal.currentHours}h</span>
            <span className="metric-total"> / {weeklyGoal.targetHours}h</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
