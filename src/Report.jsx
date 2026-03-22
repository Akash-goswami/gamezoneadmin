export default function Report() {
  const metrics = [
    { label: 'Total Users', value: '8,540', icon: '👥' },
    { label: 'Active Games', value: '24', icon: '🎮' },
    { label: 'Total Bets', value: '45,230', icon: '💰' },
    { label: 'Total Winnings', value: '₹18,900', icon: '🏆' },
    { label: 'Total Loss', value: '₹26,330', icon: '📉' },
    { label: 'Avg Bet Amount', value: '₹984', icon: '📊' },
  ];

  return (
    <div className="report-container">
      <h2>Reports & Analytics</h2>

      <div className="metrics-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h3>Weekly Performance</h3>
        <div className="chart-placeholder">
          📊 Performance chart visualization
        </div>
      </div>

      <div className="summary-section">
        <h3>Summary Statistics</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <span>Week Over Week Growth:</span>
            <strong>+12.5%</strong>
          </div>
          <div className="summary-item">
            <span>Monthly Revenue:</span>
            <strong>₹2,45,000</strong>
          </div>
          <div className="summary-item">
            <span>Avg Daily Active Users:</span>
            <strong>2,145</strong>
          </div>
        </div>
      </div>

      <button className="export-btn">📥 Export Report</button>
    </div>
  );
}
