import Card from '../ui/Card';
import { CalendarDays, Clock, MapPin, User } from 'lucide-react';
import './UpcomingLectures.css';

export default function UpcomingLectures({ lectures = [] }) {
  return (
    <Card className="upcoming-lectures-card" padding="default">
      <div className="card-section-header">
        <div className="card-section-header__title-group">
          <div className="card-section-header__icon">
            <CalendarDays size={18} />
          </div>
          <h2 className="card-section-header__title">Upcoming Lectures</h2>
        </div>
        <span className="card-section-header__badge">
          {lectures.length} Today
        </span>
      </div>

      <div className="lectures-list">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="lecture-item">
            <div className="lecture-time-badge">
              <Clock size={13} className="lecture-time-icon" />
              <span>{lecture.time}</span>
            </div>

            <div className="lecture-details">
              <h3 className="lecture-subject">{lecture.subject}</h3>
              <div className="lecture-meta">
                {lecture.professor && (
                  <span className="lecture-professor">
                    <User size={13} />
                    {lecture.professor}
                  </span>
                )}
                {lecture.room && (
                  <span className="lecture-room">
                    <MapPin size={13} />
                    {lecture.room}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
