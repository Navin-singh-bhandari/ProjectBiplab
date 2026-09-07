import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* =====================================
          FOOTER CONTENT
      ====================================== */}
      <div className="footer-inner">

        {/* Sitemap */}
        <div className="footer-column footer-sitemap">
          <h3 className="footer-title">Sitemap</h3>

          <Link to="/">Home</Link>
          <Link to="/why-me">Why Me</Link>
          <Link to="/works">Assets</Link>
          <Link to="/works">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>


        {/* Legal */}
        <div className="footer-column footer-legal">
          <h3 className="footer-title">Legal</h3>

          <a href="#">Terms of Services</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Refund Policy</a>
        </div>


        {/* Inquiries */}
        <div className="footer-column footer-inquiries">
          <h3 className="footer-title">Inquiries</h3>

          <a
            className="footer-email"
            href="mailto:biplabsaud01@gmail.com"
          >
            biplabsaud01@gmail.com
          </a>

          <div className="footer-socials">

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="5"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>


            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-link linkedin"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="3"
                />

                <path d="M8 10v7" />
                <path d="M8 7v.01" />

                <path d="M12 17v-4.5c0-1.7 1-2.5 2.2-2.5 1.4 0 2.3.9 2.3 2.7V17" />
              </svg>
            </a>

          </div>
        </div>

      </div>


      {/* =====================================
          GIANT NAME
      ====================================== */}
      <div className="footer-name">
        <span>BIPLAB</span>
      </div>

    </footer>
  );
}