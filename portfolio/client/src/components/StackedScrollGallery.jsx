import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  easeInOut,
} from 'framer-motion'

import './stacked-scroll-gallery.css'


// ============================================================
// DATA
// ============================================================

const images = [
  {
    id: 1,
    number: '01',
    src: '/Images/image-one.png',
    alt: 'Concept & Art Direction',
    title: 'CONCEPT & ART DIRECTION',
    description:
      'Great visuals start with a solid foundation. Drawing from my background in art and design, I help you craft stronger concepts before we even touch a camera. We shape the story, build visual treatments and rough ideas into a clear, compelling creative direction.',
  },

  {
    id: 2,
    number: '02',
    src: '/Images/image-two.png',
    alt: 'Cinematography & Production',
    title: 'CINEMATOGRAPHY & PRODUCTION',
    description:
      'Bring cinematic quality to your vision. With dedicated experience in filmmaking and cinematography, I manage the visual logistics of the shoot. From lighting design to framing the perfect shot, I ensure every frame is captured with intention and professional precision.',
  },

  {
    id: 3,
    number: '03',
    src: '/Images/image-three.png',
    alt: 'Editing & Motion Design',
    title: 'EDITING & MOTION DESIGN',
    description:
      "This is where the story comes alive. Backed by three years of deep experience, I handle pacing, narrative structure, and dynamic motion design. Whether it is complex visual effects or seamless transitions, I build engaging content that holds your audience's attention from start to finish.",
  },

  {
    id: 4,
    number: '04',
    src: '/Images/image-four.jpg',
    alt: 'Color Grading & Finishing',
    title: 'COLOR GRADING & FINISHING',
    description:
      'Understand how great work gets finished. I utilize professional color grading techniques to give your project a distinct, high-end cinematic look. Coupled with careful sound design and final polish, these are the critical finishing decisions that take your work to the next level.',
  },

  {
    id: 5,
    number: '05',
    src: '/Images/image-five.png',
    alt: 'Business & Asset Delivery',
    title: 'BUSINESS & ASSET DELIVERY',
    description:
      'Creative work needs a professional structure. I pride myself on clear communication, transparent project pricing, and reliable delivery. You get access to a streamlined workflow, ensuring your final assets are organized, optimized, and ready to drive results for your business.',
  },
]


const TOTAL = images.length


// ============================================================
// CARD
// ============================================================

function Card({
  item,
  index,
  progress,
}) {

  const zone = 1 / TOTAL


  // ==========================================================
  // CARD 01
  // ==========================================================
  //
  // Card 01 is visible immediately.
  //
  // It stays in place while the page starts scrolling.
  //
  // When Card 02 arrives, Card 01 moves upward by 10%.
  //
  // This leaves approximately 10% of Card 01 visible.
  // ==========================================================

  if (index === 0) {

    const y = useTransform(
      progress,

      [
        0,
        zone,
        zone * 2,
      ],

      [
        '0%',
        '0%',
        '-10%',
      ],

      {
        ease: easeInOut,
      }
    )


    return (
      <motion.article
        className="outline-card"
        style={{
          y,

          zIndex: 10,

          opacity: 1,

          scale: 1,
        }}
      >

        <CardContent item={item} />

      </motion.article>
    )
  }


  // ==========================================================
  // CARDS 02 → 05
  // ==========================================================
  //
  // Each card has three states:
  //
  // 1. Before its turn
  //
  //       card is below the viewport
  //
  // 2. During its turn
  //
  //       card moves upward
  //
  // 3. After its turn
  //
  //       card remains in place until the next card
  //       pushes it upward by 10%.
  //
  // ==========================================================

  const start = index * zone

  const arriveEnd = start + zone

  const exitEnd = start + zone * 2


  const y = useTransform(
    progress,

    [
      start,
      arriveEnd,
      exitEnd,
    ],

    [
      '105%',
      '0%',
      '-10%',
    ],

    {
      ease: easeInOut,
    }
  )


  return (
    <motion.article
      className="outline-card"
      style={{
        y,

        /*
         * Every newer card is above
         * the previous card.
         */
        zIndex: 10 + index,

        opacity: 1,

        scale: 1,
      }}
    >

      <CardContent item={item} />

    </motion.article>
  )
}


// ============================================================
// CARD CONTENT
// ============================================================

function CardContent({
  item,
}) {

  return (
    <>

      {/* ======================================================
          IMAGE
          ====================================================== */}

      <div className="outline-card-image">

        <img
          src={item.src}
          alt={item.alt}
          draggable="false"
          loading="eager"
        />

      </div>


      {/* ======================================================
          DARK GRADIENT
          ====================================================== */}

      <div className="outline-card-gradient" />


      {/* ======================================================
          CONTENT
          ====================================================== */}

      <div className="outline-card-content">


        {/* ====================================================
            GIANT NUMBER
            ==================================================== */}

        <div className="outline-card-number">
          {item.number}
        </div>


        {/* ====================================================
            MAIN CONTENT
            ==================================================== */}

        <div className="outline-card-main">

          <h3>
            {item.title}
          </h3>

          <p>
            {item.description}
          </p>

        </div>


        {/* ====================================================
            COUNTER
            ==================================================== */}

        <div className="outline-card-footer">

          <span>
            {item.number}
          </span>

          <span className="outline-slash">
            //
          </span>

          <span>
            0{TOTAL}
          </span>

        </div>

      </div>

    </>
  )
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function StackedScrollGallery() {

  const sectionRef = useRef(null)


  // ==========================================================
  // SCROLL PROGRESS
  // ==========================================================

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      'start start',
      'end end',
    ],
  })


  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="outline-scroll-section"
    >

      {/* ======================================================
          STICKY VIEWPORT
          ====================================================== */}

      <div className="outline-scroll-sticky">

        <div className="outline-gallery">


          {/* ==================================================
              HEADER
              ================================================== */}

          <header className="outline-heading">

            
            <h2>
              What I Bring to Your Project
            </h2>

          </header>


          {/* ==================================================
              CARD WINDOW
              ================================================== */}

          <div className="outline-cards-window">

            <div className="outline-cards">

              {images.map(
                (item, index) => (

                  <Card
                    key={item.id}
                    item={item}
                    index={index}
                    progress={scrollYProgress}
                  />

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
