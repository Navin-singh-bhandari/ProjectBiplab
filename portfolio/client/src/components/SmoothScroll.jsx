// import { useEffect } from 'react'
// import Lenis from 'lenis'
// import 'lenis/dist/lenis.css'

// // Wrap your whole app with this ONCE, at the root (e.g. in App.jsx or
// // your layout), not inside individual sections. Lenis intercepts wheel
// // and touch scroll input for the entire page and eases it, so every
// // scroll-linked animation on the page — including StackedScrollGallery's
// // useScroll — automatically picks up the smoothed position with no
// // extra wiring needed.
// export default function SmoothScroll({ children }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.4, // higher = more glide before it settles; try 1.0-2.0
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
//       smoothWheel: true,
//       wheelMultiplier: 0.7, // lower = each wheel tick moves less distance; try 0.5-1
//       touchMultiplier: 1.2,
//     })

//     function raf(time) {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }
//     const rafId = requestAnimationFrame(raf)

//     return () => {
//       cancelAnimationFrame(rafId)
//       lenis.destroy()
//     }
//   }, [])

//   return children
// }

// Passthrough fallback while Lenis is disabled
export default function SmoothScroll({ children }) {
  return children
}