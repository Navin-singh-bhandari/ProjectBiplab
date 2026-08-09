import { useState } from 'react'
import works from '../data/works.js'
import './works.css'

const categories = ['All', ...new Set(works.map((w) => w.category))]

export default function Works() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? works : works.filter((w) => w.category === filter)

  return (
    <>
      <section style={{ borderTop: 'none', paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow"><span className="dot" />Works</div>
          <h1 className="section-title">Selected projects</h1>
          <p className="section-sub">
            A mix of documentary editing, motion graphics, and video essays —
            most built around dense, analytical subject matter.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="container">
          <div className="works-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={'filter-chip' + (filter === c ? ' active' : '')}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="works-full-grid">
            {filtered.map((w) => (
              <article className="work-full-card" key={w.id}>
                <div className="work-full-thumb">
                  <span>{w.category}</span>
                </div>
                <div className="work-full-meta">
                  <div className="work-full-top">
                    <h3>{w.title}</h3>
                    <span className="timecode">{w.year}</span>
                  </div>
                  <p className="work-full-client">{w.client}</p>
                  <p className="work-full-blurb">{w.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
