import { Link } from 'react-router-dom'
import VideoFrame from '../components/VideoFrame.jsx'
import StackedScrollGallery from '../components/StackedScrollGallery.jsx'
import works from '../data/works.js'
import LogoMarquee from '../components/LogoMarquee.jsx'
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
    text: 'Dense reports, statistics, and policy detail translated into legible, well-timed motion graphics that hold a viewer’s attention.',
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
          <h1 className="hero-name">Biplab Saud</h1>
          <p className="hero-role">Video Editor &amp; Motion Designer</p>

          <div className="hero-video-wrap">
            <VideoFrame src="/showreel.mp4" />

          </div>
          <LogoMarquee />
          
          <p className="hero-description">
            Specialized motion design and video editing that brings deep analytical
            commentary, geopolitics, and complex narratives to life.
          </p>
          <br></br><br></br>
        </div>
        
        {/* ---------------- STACKED SCROLL GALLERY ---------------- */}
      <StackedScrollGallery />
      </section>
      
    </>
  )
}

