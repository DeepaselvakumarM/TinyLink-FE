
import React, { useEffect, useState } from "react";
import { getStats } from "../api/api";

const StatsPage = ({ match }) => {
  const code = window.location.pathname.split("/")[2];
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await getStats(code);
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [code]);

  if (loading) return (
    <div className="container">
      <div className="loading-text">Loading statistics...</div>
    </div>
  );

  if (!stats) return (
    <div className="container">
      <div className="error">Failed to load statistics</div>
    </div>
  );

  return (
    <div className="container">
      <h1>Analytics for {code}</h1>
      <p className="subtitle">Track your link performance</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Short Code</div>
          <div className="stat-value">{stats.code}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Total Clicks</div>
          <div className="stat-value">{stats.clicks}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Last Clicked</div>
          <div className="stat-value">
            {stats.last_clicked ? new Date(stats.last_clicked).toLocaleDateString() : "-"}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Link Details</h3>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <strong>Original URL:</strong>
            <div style={{ 
              wordBreak: 'break-all', 
              color: 'var(--text-light)',
              marginTop: '0.25rem'
            }}>
              {stats.url}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StatsPage;