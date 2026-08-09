import { Link } from 'react-router-dom'
import './about.css'

const timeline = [
  { year: '2018', text: 'Started editing short-form news recaps, drawn to how a cut could reframe an entire argument.' },
  { year: '2020', text: 'Moved into long-form documentary editing, working on regional current-affairs pieces.' },
  { year: '2022', text: 'Began pairing motion graphics with editing to translate policy and data into visual narrative.' },
  { year: '2024', text: 'Focused fully on geopolitics and analytical commentary work for independent creators and studios.' },
  { year: '2026', text: 'Building a small, selective slate of documentary and video-essay collaborations.' },
]

export default function About() {
  return (
    <>
      <section style={{ borderTop: 'none', paddingBottom: 60 }}>
        <div className="container about-hero">
          <div className="eyebrow"><span className="dot" />About</div>
          <h1 className="section-title">
            I edit for people who need complicated things to make sense.
          </h1>
          <p className="section-sub" style={{ maxWidth: 680 }}>
            I'm Alex Rivera, a video editor and motion designer working mostly in
            geopolitics, policy, and long-form analytical commentary — the kind of
            content where the cut has to carry an argument, not just a mood.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div className="about-photo" aria-hidden="true">
            <span>PORTRAIT / PHOTO GOES HERE</span>
          </div>
          <div className="about-text">
            <h2 className="section-title" style={{ fontSize: '32px' }}>How I work</h2>
            <p>
              Most of what lands on my timeline starts messy — hours of interview
              footage, dense source material, half-formed arguments. My job is to
              find the actual shape of the story inside all of that, then build the
              structure, pacing, and graphics that let an audience follow it without
              losing the thread.
            </p>
            <p>
              I care about accuracy as much as rhythm. When a project touches policy,
              trade, or conflict, I treat the edit as an extension of the reporting —
              graphics need to be legible and correct, not just good-looking, and
              pacing needs to respect how much a viewer can actually absorb.
            </p>
            <p>
              Outside of the technical side, I'm the person clients come back to
              because deadlines are treated as real, and because I'll tell you when
              a cut isn't working yet, instead of shipping something I don't believe in.
            </p>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <div className="container">
          <div className="eyebrow"><span className="dot" />Timeline</div>
          <h2 className="section-title">A few key moments</h2>

          <div className="timeline-list">
            {timeline.map((t) => (
              <div className="timeline-row" key={t.year}>
                <span className="timecode timeline-year">{t.year}</span>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container cta-inner">
          <h2 className="section-title">Want to see the work behind this?</h2>
          <Link to="/works" className="btn" style={{ marginTop: 24 }}>VIEW WORKS</Link>
        </div>
      </section>
    </>
  )
}
