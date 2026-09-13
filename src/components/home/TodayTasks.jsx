import { useState } from 'react';
import Card from '../ui/Card';
import { Check, CheckSquare, ArrowRight, Clock } from 'lucide-react';
import './TodayTasks.css';

export default function TodayTasks({ initialTasks = [], onViewAll }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <Card className="today-tasks-card" padding="default">
      <div className="card-section-header">
        <div className="card-section-header__title-group">
          <div className="card-section-header__icon">
            <CheckSquare size={18} />
          </div>
          <h2 className="card-section-header__title">Today's Tasks</h2>
        </div>
        <span className="card-section-header__badge">
          {completedCount}/{tasks.length} Done
        </span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'task-item--completed' : ''}`}
            onClick={() => toggleTask(task.id)}
            role="checkbox"
            aria-checked={task.completed}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleTask(task.id);
              }
            }}
          >
            <div className="task-checkbox">
              {task.completed && <Check size={14} strokeWidth={3} />}
            </div>

            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <div className="task-meta">
                <span className="task-tag">{task.category}</span>
                {task.due && (
                  <span className="task-due">
                    <Clock size={12} />
                    {task.due}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-section-footer">
        <button
          type="button"
          className="card-section-footer__link"
          onClick={onViewAll}
        >
          <span>View all tasks</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </Card>
  );
}
