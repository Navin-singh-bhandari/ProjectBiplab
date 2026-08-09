import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">ALEX RIVERA</p>
          <p className="footer-role">Video Editor &amp; Motion Designer</p>
        </div>

        <div className="footer-col">
          <span className="footer-label">Sitemap</span>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/works">Works</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <span className="footer-label">Inquiries</span>
          <a href="mailto:hello@alexrivera.com">hello@alexrivera.com</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="container">
        <p className="footer-bottom">© {new Date().getFullYear()} Alex Rivera. All rights reserved.</p>
      </div>
    </footer>
  )
}
