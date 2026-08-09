import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from any localhost port (Vite may pick different ports)
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify transporter connection on startup
transporter.verify()
  .then(() => console.log('✅ SMTP connection verified — ready to send emails'))
  .catch((err) => console.error('❌ SMTP connection failed:', err.message))

// POST /api/contact — handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    })
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    })
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: subject
        ? `Portfolio Contact: ${subject}`
        : `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 100px;">Name:</td>
              <td style="padding: 10px; color: #333;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; color: #333;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 10px; color: #333;">${subject}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    console.log(`📧 Email sent successfully from ${name} (${email})`)

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    console.error('❌ Failed to send email:', error.message)

    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
