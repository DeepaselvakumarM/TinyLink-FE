
import React, { useEffect, useState } from "react";
import { createLink, getLinks, deleteLink } from "../api/api";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [linksLoading, setLinksLoading] = useState(true);

  const loadLinks = async () => {
    try {
      setLinksLoading(true);
      const data = await getLinks();
      setLinks(data);
    } catch (error) {
      console.error("Error loading links:", error);
    } finally {
      setLinksLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("URL is required");
      return;
    }

    try {
      setLoading(true);
      const res = await createLink({ url, code });

      if (res.status === 409) {
        setError("Short code already exists");
        return;
      }

      if (!res.ok) {
        setError("Something went wrong");
        return;
      }

      setUrl("");
      setCode("");
      await loadLinks();
    } catch (error) {
      setError("Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (linkCode) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await deleteLink(linkCode);
        await loadLinks();
      } catch (error) {
        setError("Failed to delete link");
      }
    }
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>🔗 TinyLink</h1>
        <p className="subtitle">Create and manage short links with powerful analytics</p>
      </header>

      <form onSubmit={handleSubmit} className="card">
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Enter long URL (https://example.com/very-long-url)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? <div className="loading"></div> : null}
            {loading ? "Creating..." : "Create Short Link"}
          </button>
        </div>
      </form>
       <section>
        <h2>Your Links ({links.length})</h2>

        {linksLoading ? (
          <div className="loading-text">Loading your links...</div>
        ) : links.length === 0 ? (
          <div className="card empty-state">
            <div>📭</div>
            <h3>No links yet</h3>
            <p>Create your first short link above to get started!</p>
          </div>
        ) : (
          <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
            <table>
              <thead>
                <tr>
                  <th>Short Code</th>
                  <th>URL</th>
                  <th>Clicks</th>
                  <th>Last Clicked</th>
                  <th>Actions</th>
                </tr>
              </thead>

<tbody>
  {links.map((item) => (
    <tr key={item.code}>
      
      <td data-label="Short Code">
        <a
         href={`http://localhost:5000/${item.code}`}


          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: "600" }}
        >
          {item.code}
        </a>
      </td>

      <td className="url" data-label="URL" title={item.url}>
        {item.url}
      </td>

      <td data-label="Clicks" style={{ fontWeight: "600", color: "var(--primary)" }}>
        {item.clicks}
      </td>

      <td data-label="Last Clicked" style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>
        {item.last_clicked ? item.last_clicked : "-"}
      </td>

      <td data-label="Actions">
        <button className="delete-btn" onClick={() => handleDelete(item.code)}>
          🗑️ Delete
        </button>

        <a className="stats-btn" href={`/code/${item.code}`}>
          📊 Stats
        </a>
      </td>

    </tr>
  ))}
</tbody>











            </table>
          </div>
        )}
      </section> 

             
             
          




    </div>
  );
};

export default Dashboard;


