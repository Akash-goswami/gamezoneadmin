
export default function Dashboard() {
  const stats = [
    { label: 'Total Bets', value: '2,450', color: '#3498db' },
    { label: 'Total Bet Amount', value: '₹45,230', color: '#2ecc71' },
    { label: 'Total Winning', value: '₹18,900', color: '#f39c12' },
    { label: 'Profit/Loss', value: '₹26,330', color: '#e74c3c' },
  ];

  return (
    <div className="dashboard">
      <div className="filters">
        <select>
          <option>All Games</option>
          <option>Cricket Betting</option>
          <option>Football Betting</option>
        </select>
        <input type="date" />
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-box">
          <h3>Weekly Performance</h3>
          <div className="chart-placeholder">📊 Chart visualization area</div>
        </div>
      </div>
    </div>
  );
}
