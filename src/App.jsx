import { useMemo, useState } from 'react';

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
    category: 'Development',
    likes: '24K',
    comments: '1.3K',
    tags: ['AI', 'React', 'UX'],
    description:
      'A practical look at the tools, workflows, and design systems shaping frontend work in the next wave of product development.',
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
    category: 'Design',
    likes: '18K',
    comments: '912',
    tags: ['Workspace', 'Minimal', 'Products'],
    description:
      'See how a tiny, efficient desk layout keeps focus high and distractions low without feeling sterile or over-engineered.',
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
    category: 'AI',
    likes: '41K',
    comments: '2.4K',
    tags: ['Workflow', 'Automation', 'Focus'],
    description:
      'A breakdown of the process, routines, and automation habits that help creators stay productive without burning out.',
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
    category: 'Travel',
    likes: '12K',
    comments: '844',
    tags: ['Food', 'Culture', 'Travel'],
    description:
      'A vibrant travel-food documentary exploring how local snacks and street markets tell the story of a city.',
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
    category: 'Development',
    likes: '22K',
    comments: '1.1K',
    tags: ['JavaScript', 'Patterns', 'React'],
    description:
      'Patterns for composition, state management, and reusable UI design that make real-world React apps easier to maintain.',
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
    category: 'Design',
    likes: '27K',
    comments: '1.8K',
    tags: ['Mobile', 'UX', 'Research'],
    description:
      'A guide to building flow, hierarchy, and interaction patterns that help product teams create more intuitive mobile experiences.',
  },
  {
    id: 7,
    title: 'Music Production Setup Under $500',
    channel: 'Signal Studio',
    views: '640K views',
    time: '1 month ago',
    duration: '14:02',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
    accent: '#ec4899',
    category: 'Music',
    likes: '16K',
    comments: '740',
    tags: ['Audio', 'Studio', 'Music'],
    description:
      'A beginner-friendly studio tour covering recording, mixing, and the best affordable gear for producing clean tracks at home.',
  },
  {
    id: 8,
    title: 'Build a Calm Morning Routine',
    channel: 'Wellness Daily',
    views: '1.2M views',
    time: '6 days ago',
    duration: '9:44',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    accent: '#22c55e',
    category: 'AI',
    likes: '19K',
    comments: '1.2K',
    tags: ['Health', 'Mindset', 'Habits'],
    description:
      'A mindful routine designed to improve focus, calm, and consistency without adding pressure to an already busy day.',
  },
];

const sideLinks = ['Home', 'Shorts', 'Subscriptions', 'Library', 'History', 'Your videos'];
const categories = ['All', 'Development', 'Design', 'AI', 'Music', 'Travel'];
const featuredChannels = [
  { name: 'DesignCode', accent: '#ff5f6d' },
  { name: 'Code with Ben', accent: '#f97316' },
  { name: 'Signal Studio', accent: '#ec4899' },
  { name: 'UX Daily', accent: '#8b5cf6' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [screen, setScreen] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        video.title.toLowerCase().includes(term) ||
        video.channel.toLowerCase().includes(term) ||
        video.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setScreen('watch');
  };

  const backHome = () => {
    setScreen('home');
  };

  const recommendedVideos = videos.filter((video) => video.id !== selectedVideo.id).slice(0, 4);

  if (screen === 'watch') {
    return (
      <div className="watch-shell">
        <header className="watch-header">
          <button type="button" className="back-btn" onClick={backHome}>
            ← Back to home
          </button>
          <div className="watch-header-actions">
            <button type="button" className="ghost-btn">
              Save
            </button>
            <button type="button" className="profile-pill">
              ND
            </button>
          </div>
        </header>

        <div className="watch-layout">
          <main className="watch-main">
            <div
              className="player-panel"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8)), url(${selectedVideo.thumbnail})`,
              }}
            >
              <div className="player-overlay">
                <span className="live-pill">Now playing</span>
                <h1>{selectedVideo.title}</h1>
              </div>
            </div>

            <section className="video-info">
              <div className="channel-row">
                <div className="avatar" style={{ background: selectedVideo.accent }}>
                  {selectedVideo.channel[0]}
                </div>
                <div>
                  <h2>{selectedVideo.channel}</h2>
                  <p>{selectedVideo.views}</p>
                </div>
              </div>

              <div className="stats-row">
                <span>{selectedVideo.likes} likes</span>
                <span>{selectedVideo.comments} comments</span>
                <span>{selectedVideo.duration}</span>
              </div>

              <div className="tag-row">
                {selectedVideo.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="description">{selectedVideo.description}</p>

              <div className="action-row">
                <button type="button" className="primary-btn">
                  Like
                </button>
                <button type="button" className="secondary-btn">
                  Share
                </button>
                <button type="button" className="secondary-btn">
                  Subscribe
                </button>
              </div>
            </section>
          </main>

          <aside className="suggestions-panel">
            <h3>Up next</h3>
            {recommendedVideos.map((video) => (
              <button type="button" key={video.id} className="suggestion-card" onClick={() => openVideo(video)}>
                <div className="suggestion-thumb" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                  <span>{video.duration}</span>
                </div>
                <div className="suggestion-copy">
                  <strong>{video.title}</strong>
                  <span>{video.channel}</span>
                  <small>
                    {video.views} • {video.time}
                  </small>
                </div>
              </button>
            ))}
          </aside>
        </div>
      </div>
    );
  }

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
            <button type="button" key={link} className={index === 0 ? 'nav-item active' : 'nav-item'}>
              {link}
            </button>
          ))}
        </nav>

        <div className="mini-card">
          <p className="mini-title">Trending creators</p>
          <div className="creator-list">
            {featuredChannels.map((channel) => (
              <div key={channel.name} className="creator-item">
                <span className="channel-dot" style={{ background: channel.accent }}></span>
                {channel.name}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search videos, creators, topics"
              aria-label="Search"
            />
          </div>

          <div className="topbar-actions">
            <button type="button" className="ghost-btn">
              Upload
            </button>
            <button type="button" className="profile-pill">
              ND
            </button>
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
              <button type="button" className="primary-btn" onClick={() => openVideo(videos[2])}>
                Watch now
              </button>
              <button type="button" className="secondary-btn">
                Browse
              </button>
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
            <button
              type="button"
              key={category}
              className={index === 0 && selectedCategory === 'All' ? 'chip active' : selectedCategory === category ? 'chip active' : 'chip'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="quick-grid">
          <div className="info-card">
            <span>Videos</span>
            <strong>{filteredVideos.length}</strong>
          </div>
          <div className="info-card">
            <span>Creators</span>
            <strong>32</strong>
          </div>
          <div className="info-card">
            <span>Watchlist</span>
            <strong>14</strong>
          </div>
        </section>

        <section className="videos-grid">
          {filteredVideos.map((video) => (
            <article key={video.id} className="video-card">
              <button type="button" className="card-button" onClick={() => openVideo(video)}>
                <div className="thumb" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                  <span className="duration">{video.duration}</span>
                </div>
                <div className="card-meta">
                  <div className="avatar" style={{ background: video.accent }}>
                    {video.channel[0]}
                  </div>
                  <div className="details">
                    <h3>{video.title}</h3>
                    <p>{video.channel}</p>
                    <p>
                      {video.views} • {video.time}
                    </p>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
