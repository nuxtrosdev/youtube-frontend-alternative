import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchVideos } from '../api';

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    let isMounted = true;

    const loadResults = async () => {
      if (!query) {
        setVideos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { videos: data } = await searchVideos(query, null, 20);

      if (isMounted) {
        setVideos(data);
        setLoading(false);
      }
    };

    loadResults();
    setQueryInput(query);

    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const term = queryInput.trim();
      if (term) {
        navigate(`/search?q=${encodeURIComponent(term)}`);
      }
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-name">SkyTube</p>
            <span className="brand-tag">Alternative</span>
          </div>
        </div>

        <nav className="nav">
          <button type="button" className="nav-item" onClick={() => navigate('/')}>
            Home
          </button>
          <button type="button" className="nav-item">Shorts</button>
          <button type="button" className="nav-item">Subscriptions</button>
          <button type="button" className="nav-item">Library</button>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search videos, creators, topics"
              aria-label="Search"
            />
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-btn">Upload</button>
            <button type="button" className="profile-pill">ND</button>
          </div>
        </header>

        <section style={{ padding: '20px 0' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Search results for "{query || 'all videos'}"</h2>
          <p style={{ margin: '8px 0 0', color: 'var(--muted)' }}>
            {loading ? 'Searching...' : `${videos.length} results found`}
          </p>
        </section>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
            Searching...
          </div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
            No videos found. Try another search.
          </div>
        ) : (
          <section className="videos-grid">
            {videos.map((video) => (
              <article key={video.id} className="video-card">
                <button type="button" className="card-button" onClick={() => navigate(`/watch/${video.id}`)}>
                  <div className="thumb" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                    <span className="duration">{video.duration}</span>
                  </div>

                  <div className="card-meta">
                    <div className="avatar" style={{ background: '#3b82f6' }}>
                      {video.channel[0] || 'A'}
                    </div>
                    <div className="details">
                      <h3>{video.title}</h3>
                      <p>{video.channel}</p>
                      <p>
                        {video.views} views • {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Search;
