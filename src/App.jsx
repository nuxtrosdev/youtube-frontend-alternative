const videos = [
  {
    id: 1,
    title: 'The Future of Frontend in 2026',
    channel: 'DesignCode',
    views: '2.1M views',
    time: '4 days ago',
    duration: '12:48',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    accent: '#ff5f6d',
  },
  {
    id: 2,
    title: 'Minimal Desk Setup Tour',
    channel: 'The Setup Lab',
    views: '870K views',
    time: '1 week ago',
    duration: '8:32',
    thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    accent: '#5B8DEF',
  },
  {
    id: 3,
    title: 'How I Build Productive Workflows',
    channel: 'Creator Weekly',
    views: '3.4M views',
    time: '2 weeks ago',
    duration: '15:10',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    accent: '#27c6a3',
  },
  {
    id: 4,
    title: 'Street Food Around the World',
    channel: 'Nomad Eats',
    views: '1.6M views',
    time: '3 weeks ago',
    duration: '22:41',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    accent: '#f59e0b',
  },
  {
    id: 5,
    title: 'React Patterns You Should Know',
    channel: 'Code with Ben',
    views: '519K views',
    time: '5 days ago',
    duration: '18:04',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    accent: '#f97316',
  },
  {
    id: 6,
    title: 'Designing Better Mobile Apps',
    channel: 'UX Daily',
    views: '925K views',
    time: '2 months ago',
    duration: '11:13',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    accent: '#8b5cf6',
  },
];

const sideLinks = ['Home', 'Shorts', 'Subscriptions', 'Library', 'History', 'Your videos'];
const categories = ['All', 'Development', 'Design', 'AI', 'Music', 'Travel', 'Gaming'];

function App() {
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
          {sideLinks.map((link, index) => (
            <button key={link} className={index === 0 ? 'nav-item active' : 'nav-item'}>
              {link}
            </button>
          ))}
        </nav>

        <div className="mini-card">
          <p className="mini-title">Explore</p>
          <ul>
            <li>Trending</li>
            <li>Popular creators</li>
            <li>Saved playlists</li>
          </ul>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input type="text" defaultValue="Search videos, creators, topics" aria-label="Search" />
          </div>

          <div className="topbar-actions">
            <button className="ghost-btn">Upload</button>
            <button className="profile-pill">ND</button>
          </div>
        </header>

        <section className="featured-card">
          <div className="featured-copy">
            <span className="eyebrow">Trending now</span>
            <h1>Discover the creators shaping tomorrow.</h1>
            <p>
              Watch the next generation of ideas, tutorials, and stories without the clutter.
            </p>
            <div className="featured-actions">
              <button className="primary-btn">Watch now</button>
              <button className="secondary-btn">Browse</button>
            </div>
          </div>
          <div className="featured-visual">
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="video-badge">
              <span className="dot"></span>
              Live • 24k watching
            </div>
          </div>
        </section>

        <section className="chip-row">
          {categories.map((category, index) => (
            <button key={category} className={index === 0 ? 'chip active' : 'chip'}>
              {category}
            </button>
          ))}
        </section>

        <section className="videos-grid">
          {videos.map((video) => (
            <article key={video.id} className="video-card">
              <div className="thumb" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                <span className="duration">{video.duration}</span>
              </div>
              <div className="card-meta">
                <div className="avatar" style={{ background: video.accent }}>{video.channel[0]}</div>
                <div className="details">
                  <h3>{video.title}</h3>
                  <p>{video.channel}</p>
                  <p>
                    {video.views} • {video.time}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
