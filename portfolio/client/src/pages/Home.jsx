import { Link } from 'react-router-dom'
import VideoFrame from '../components/VideoFrame.jsx'
import works from '../data/works.js'
import './home.css'

const clients = ['MERIDIAN', 'NORTHLINE', 'ARCLIGHT', 'VANTAGE', 'OUTPOST', 'FIELDNOTE']

const capabilities = [
  {
    n: '01',
    title: 'STORY-FIRST EDITING',
    text: "Every cut serves the argument. Footage, interviews, and archival material are structured into a clear narrative spine before a single transition is chosen.",
  },
  {
    n: '02',
    title: 'MOTION & DATA GRAPHICS',
    text: 'Dense reports, statistics, and policy detail translated into legible, well-timed motion graphics that hold a viewer\u2019s attention.',
  },
  {
    n: '03',
    title: 'COLOR & SOUND FINISHING',
    text: 'Grading, mixing, and sound design pass that gives long-form analytical content a cinematic, broadcast-ready finish.',
  },
  {
    n: '04',
    title: 'SYSTEMS FOR SERIES WORK',
    text: 'Reusable title cards, lower thirds, and templates built so recurring commentary series stay consistent episode to episode.',
  },
]

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero" style={{ borderTop: 'none' }}>
        <div className="container hero-inner">
          {/* <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="dot" />
            AVAILABLE FOR PROJECTS — 2026
          </div> */}
          <h1 className="hero-name">Biplab Saud</h1>
          <p className="hero-role">Video Editor &amp; Motion Designer</p>

          <div className="hero-video-wrap">
            <VideoFrame src="/showreel.mp4" />
          </div>

          <p className="hero-description">
            Specialized motion design and video editing that brings deep analytical
            commentary, geopolitics, and complex narratives to life.
          </p>

          <div className="hero-ctas">
            <Link to="/works" className="btn">VIEW WORKS</Link>
            <Link to="/contact" className="btn ghost">START A PROJECT</Link>
          </div>
        </div>
      </section>

      {/* ---------------- TRUSTED BY ---------------- */}
      <section className="logos">
        <div className="container">
          <p className="logos-label">Trusted by teams &amp; independent creators</p>
          <div className="logos-row">
            {clients.map((c) => (
              <span key={c} className="logo-item">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <section className="capabilities">
        <div className="container">
          <div className="eyebrow"><span className="dot" />What I bring to a project</div>
          <h2 className="section-title">From raw footage to a finished argument</h2>
          <p className="section-sub">
            Four disciplines working together on every project — narrative structure,
            graphics, finishing, and systems built to hold up across an entire series.
          </p>

          <div className="capabilities-grid">
            {capabilities.map((c) => (
              <div className="capability-card" key={c.n}>
                <span className="timecode">{c.n} / 04</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED WORKS ---------------- */}
      <section className="featured-works">
        <div className="container">
          <div className="featured-head">
            <div>
              <div className="eyebrow"><span className="dot" />Selected work</div>
              <h2 className="section-title">Recent projects</h2>
            </div>
            <Link to="/works" className="btn ghost">ALL WORKS</Link>
          </div>

          <div className="works-grid">
            {works.slice(0, 3).map((w) => (
              <div className="work-card" key={w.id}>
                <div className="work-thumb">
                  <span>{w.category}</span>
                </div>
                <div className="work-meta">
                  <h3>{w.title}</h3>
                  <p className="timecode">{w.client} — {w.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h2 className="section-title">Have a story that needs cutting into shape?</h2>
          <p className="section-sub">
            Currently taking on a limited number of documentary, essay, and commentary
            projects for the second half of 2026.
          </p>
          <Link to="/contact" className="btn">GET IN TOUCH</Link>
        </div>
      </section>
    </>
  )
}
