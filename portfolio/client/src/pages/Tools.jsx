import './tools.css'

const toolGroups = [
  {
    n: '01',
    title: 'EDITING',
    items: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Frame.io for review'],
    text: 'Primary offline and online edit, structure, and pacing work happens here — DaVinci Resolve for most projects, Premiere when a client pipeline requires it.',
  },
  {
    n: '02',
    title: 'MOTION & GRAPHICS',
    items: ['After Effects', 'Illustrator', 'Figma for layout planning'],
    text: 'Data visualizations, lower thirds, title systems, and map animations are built and animated here before being composited into the timeline.',
  },
  {
    n: '03',
    title: 'COLOR & FINISHING',
    items: ['DaVinci Resolve (Color page)', 'LUTs built per-project'],
    text: 'Grading pass for tone and consistency, tailored to the mood of the piece — muted and desaturated for analytical work, warmer for narrative documentary.',
  },
  {
    n: '04',
    title: 'AUDIO',
    items: ['Adobe Audition', 'iZotope RX for cleanup'],
    text: 'Dialogue cleanup, mix, and light sound design pass so interviews and voiceover sit clearly against music and ambient bed.',
  },
  {
    n: '05',
    title: 'HARDWARE',
    items: ['Custom PC — RTX-class GPU', '2x calibrated monitors', 'Color-calibrated reference display'],
    text: 'A calibrated monitoring setup so color and contrast decisions hold up consistently across delivery formats.',
  },
]

export default function Tools() {
  return (
    <>
      <section style={{ borderTop: 'none', paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow"><span className="dot" />Tools</div>
          <h1 className="section-title">What I use to get from footage to final cut</h1>
          <p className="section-sub">
            The software and setup behind every project — not because the tools
            matter more than the story, but because a stable pipeline is what lets
            the story stay the focus.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="container">
          <div className="tools-list">
            {toolGroups.map((g) => (
              <div className="tools-row" key={g.n}>
                <span className="timecode tools-num">{g.n} / 05</span>
                <div className="tools-content">
                  <h3>{g.title}</h3>
                  <p className="tools-text">{g.text}</p>
                  <ul className="tools-items">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
