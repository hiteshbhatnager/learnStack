import './ProgressBar.css';

/**
 * Reusable ProgressBar component
 * @param {number} progress - Value from 0 to 100
 * @param {boolean} showLabel - Whether to show percentage text
 * @param {string} height - Height of progress bar (e.g. '8px', '6px')
 */
export default function ProgressBar({
  progress = 0,
  showLabel = false,
  height = '8px',
  color = 'var(--primary)',
  className = ''
}) {
  // Clamp between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`progress-container ${className}`}>
      {showLabel && (
        <div className="progress-header">
          <span className="progress-label">Progress</span>
          <span className="progress-value">{normalizedProgress}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color
          }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
