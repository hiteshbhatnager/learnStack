import Card from '../ui/Card';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import './RecentNotes.css';

export default function RecentNotes({ notes = [], onViewAllNotes }) {
  return (
    <Card className="recent-notes-card" padding="default">
      <div className="card-section-header">
        <div className="card-section-header__title-group">
          <div className="card-section-header__icon">
            <FileText size={18} />
          </div>
          <h2 className="card-section-header__title">Recent Notes</h2>
        </div>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-main">
              <h3 className="note-title">{note.title}</h3>
              {note.snippet && (
                <p className="note-snippet">{note.snippet}</p>
              )}
            </div>
            <div className="note-footer">
              <span className="note-subject-tag">{note.subject}</span>
              <span className="note-time">
                <Clock size={11} />
                {note.updatedAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-section-footer">
        <button
          type="button"
          className="card-section-footer__link"
          onClick={onViewAllNotes}
        >
          <span>View all notes</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </Card>
  );
}
