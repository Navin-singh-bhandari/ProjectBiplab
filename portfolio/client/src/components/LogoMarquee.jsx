
import './logo-marquee.css'
const logos = [
  { src: '/brand-logos/glow-production.png', alt: 'Glow Production' },
  { src: '/brand-logos/IDS Logo.png', alt: 'IDS' },
  { src: '/brand-logos/Mr-junior-logo.png', alt: 'Mr Junior' },
  { src: '/brand-logos/pathak-fps.png', alt: 'Pathak FPS' },
  { src: '/brand-logos/1.png', alt: 'Brand Partner' },
]
export default function LogoMarquee() {
  return (
    <div className="logo-marquee" role="region" aria-label="Brands and collaborators">
      <div className="logo-marquee-track">
        {/* Render 4 identical groups so track seamlessly spans wide screens
            and translates exactly -100% for an infinite loop with zero jump */}
        {[0, 1, 2, 3].map((groupIndex) => (
          <div
            key={groupIndex}
            className="logo-marquee-group"
            aria-hidden={groupIndex > 0}
          >
            {logos.map((logo, i) => (
              <div key={`${groupIndex}-${i}`} className="logo-marquee-item-wrap">
                <img
                  src={logo.src}
                  alt={groupIndex === 0 ? logo.alt : ''}
                  className="logo-marquee-item"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
