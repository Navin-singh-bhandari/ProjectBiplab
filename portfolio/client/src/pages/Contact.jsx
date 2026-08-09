import { useState, useRef } from 'react'
import './contact.css'

const API_URL = 'http://localhost:5000/api/contact'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const lastBubbleTime = useRef(0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to send message. Please try again.')
    }
  }

  function handleMouseMove(e) {
    const now = Date.now()
    if (now - lastBubbleTime.current < 40) return
    lastBubbleTime.current = now

    const formEl = e.currentTarget
    const rect = formEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Spawn 1 to 2 small liquid bubbles around cursor position
    const count = Math.floor(Math.random() * 2) + 1
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('span')
      bubble.className = 'mouse-liquid-bubble'

      const size = Math.floor(Math.random() * 14) + 8 // 8px to 22px
      const offsetX = (Math.random() - 0.5) * 24
      const offsetY = (Math.random() - 0.5) * 24

      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
      bubble.style.left = `${x + offsetX - size / 2}px`
      bubble.style.top = `${y + offsetY - size / 2}px`

      bubble.style.setProperty('--float-x', `${(Math.random() - 0.5) * 36}px`)
      bubble.style.setProperty('--float-y', `-${Math.random() * 50 + 25}px`)

      formEl.appendChild(bubble)

      setTimeout(() => {
        bubble.remove()
      }, 900)
    }
  }

  return (
    <section className="contact-section">
      <div className="container contact-grid">
        <div className="contact-left">
          <h1 className="contact-title">GET IN&nbsp;TOUCH</h1>

          <div className="contact-info-block">
            <h4 className="contact-label">[ Inquries ]</h4>
            <p className="contact-value">biplabsaud01@gmail.com</p>
          </div>

          <div className="contact-info-block">
            <h4 className="contact-label">[ Contact ]</h4>
            <p className="contact-value">+977 9741886373</p>
          </div>

          <div className="contact-info-block">
            <h4 className="contact-label">[ Location ]</h4>
            <p className="contact-value">Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="contact-form-wrap">
          {status === 'success' ? (
            <div className="contact-success">
              <p className="timecode">MESSAGE SENT</p>
              <h3>Thanks — got it.</h3>
              <p>I'll get back to you within two business days.</p>
              <button
                className="btn"
                style={{ marginTop: '20px' }}
                onClick={() => setStatus('idle')}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} onMouseMove={handleMouseMove}>
              <h3 className="contact-form-heading">Send Message</h3>

              <div className="contact-form-row">
                <label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                />
              </label>

              <label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write Your Question here."
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </label>

              {status === 'error' && (
                <p className="contact-error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}