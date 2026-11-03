import { useMemo, useState } from 'react'
import './App.css'

const portfolio = {
  name: 'Chhay Khy Lim',
  initials: 'CL',
  role: 'AI Software Engineering Student',
  location: 'Toronto, Ontario',
  email: 'Lchhaykhy@gmail.com',
  phone: '(437) 858-5504',
  github: 'https://github.com/Lim-Chhay-Khy',
  resumeUrl: '/resume.pdf',
  portraitUrl: '/headshot.jpg',
  mission:
    'I build accessible, responsive web applications that turn practical ideas into clean digital experiences.',
  about:
    'I am an AI Software Engineering student focused on front-end engineering, React development, and practical problem solving. I enjoy creating interfaces that are clear, reliable, and easy for people to use.',
}

const pages = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact Me' },
]

const projects = [
  {
    title: 'Car Rental Database',
    subtitle: 'Oracle SQL',
    context: 'Centennial College Academic Project',
    date: '2026',
    image: '/project-database.jpg',
    tags: ['Oracle SQL', 'Joins', 'Aggregates'],
    highlights: [
      'Designed relational tables with primary/foreign key constraints and sample data for a car rental database.',
      'Developed business queries using joins, filtering, grouping, and aggregate functions to retrieve decision-support information.',
    ],
  },
  {
    title: 'Windows Forms Applications',
    subtitle: 'C#',
    context: 'Centennial College Lab Projects',
    date: '2026',
    image: '/project-winforms.jpg',
    tags: ['C#', 'Windows Forms', 'OOP'],
    highlights: [
      'Built a Fractions Calculator using classes, operator overloading, radio-button events, input validation, and divide-by-zero handling.',
      'Developed an Ontario Premiers Viewer using a Dictionary, object-oriented classes, GUI event handling, and image-based record display.',
    ],
  },
  {
    title: 'Programming Applications',
    subtitle: 'Python and Java',
    context: 'Centennial College Lab Projects',
    date: '2026',
    image: '/project-python-java.jpg',
    tags: ['Python', 'Java', 'File Handling'],
    highlights: [
      'Created a Python sales-tax application with user input, calculations, timestamps, file handling, and transaction logging.',
      'Implemented a Java Vehicle class with constructors, setters/getters, range and fuel calculations, and an overridden toString() method.',
    ],
  },
]

const education = [
  {
    date: '2026',
    credential: 'Diploma in Software Engineering Technology',
    institution: 'Centennial College',
    details:
      'Coursework includes web application development, JavaScript, React, database concepts, and user interface design.',
  },
  {
    date: '2026',
    credential: 'Responsive Web Design Certification',
    institution: 'Professional Development',
    details:
      'Focused on semantic HTML, modern CSS, accessibility basics, and mobile-first page layouts.',
  },
  {
    date: '2022',
    credential: 'High School Diploma',
    institution: 'Previous School',
    details:
      'Completed foundational studies with an interest in computing, design, and applied technology.',
  },
]

const services = [
  {
    title: 'Database Design & SQL',
    image: '/service-ui.jpg',
    description:
      'Relational database design in Oracle SQL, including tables, primary/foreign key constraints, sample data, and queries using joins, grouping, and aggregates.',
  },
  {
    title: 'Windows Forms Applications',
    image: '/service-web.jpg',
    description:
      'Desktop applications in C# with object-oriented classes, GUI event handling, input validation, and clear error handling.',
  },
  {
    title: 'Python & Java Programming',
    image: '/service-code.jpg',
    description:
      'Console and file-based programs in Python and Java, including calculations, transaction logging, and well-structured classes.',
  },
  {
    title: 'Web Development',
    image: '/service-app.jpg',
    description:
      'Responsive websites and React interfaces built with clean structure, reusable components, and accessible markup.',
  },
]

const emptyForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [submittedContact, setSubmittedContact] = useState(null)
  const [contactError, setContactError] = useState('')
  const [contactLoading, setContactLoading] = useState(false)

  const currentPageLabel = useMemo(
    () => pages.find((page) => page.id === activePage)?.label ?? 'Home',
    [activePage],
  )

  function changePage(pageId) {
    setActivePage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  async function handleContactSubmit(event) {
    event.preventDefault()
    setContactError('')
    setContactLoading(true)
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
        }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.error || 'Unable to save contact. Try again.')
      }
      setSubmittedContact(formData)
      setFormData(emptyForm)
      changePage('home')
    } catch (error) {
      setContactError(error.message)
    } finally {
      setContactLoading(false)
    }
  }

  function renderPage() {
    switch (activePage) {
      case 'about':
        return <AboutPage onNavigate={changePage} />
      case 'projects':
        return <ProjectsPage />
      case 'education':
        return <EducationPage />
      case 'services':
        return <ServicesPage onNavigate={changePage} />
      case 'contact':
        return (
          <ContactPage
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleContactSubmit}
            error={contactError}
            loading={contactLoading}
          />
        )
      default:
        return <HomePage submittedContact={submittedContact} onNavigate={changePage} />
    }
  }

  return (
    <div className="site-shell">
      <Header
        activePage={activePage}
        currentPageLabel={currentPageLabel}
        mobileMenuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((isOpen) => !isOpen)}
        onNavigate={changePage}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  )
}

function Header({
  activePage,
  currentPageLabel,
  mobileMenuOpen,
  onMenuToggle,
  onNavigate,
}) {
  return (
    <header className="site-header">
      <button
        className="brand"
        type="button"
        onClick={() => onNavigate('home')}
        aria-label="Go to Home page"
      >
        <span className="brand-mark" aria-hidden="true">
          {portfolio.initials}
        </span>
        <span>
          <strong>{portfolio.name}</strong>
          <small>{portfolio.role}</small>
        </span>
      </button>

      <button
        className="menu-button"
        type="button"
        aria-expanded={mobileMenuOpen}
        aria-controls="site-navigation"
        onClick={onMenuToggle}
      >
        <span aria-hidden="true">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
      </button>

      <nav
        id="site-navigation"
        className={mobileMenuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label={`Portfolio navigation, current page is ${currentPageLabel}`}
      >
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={activePage === page.id ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

function HomePage({ submittedContact, onNavigate }) {
  return (
    <section className="hero-section page-panel">
      <div className="hero-copy">
        {submittedContact && (
          <p className="success-message" role="status">
            Thank you, {submittedContact.firstName}. Your message was captured.
          </p>
        )}
        <p className="eyebrow">{portfolio.location}</p>
        <h1>Welcome to my React portfolio.</h1>
        <p className="hero-text">{portfolio.mission}</p>
        <div className="action-row">
          <button className="primary-action" type="button" onClick={() => onNavigate('about')}>
            About Me
          </button>
          <button className="secondary-action" type="button" onClick={() => onNavigate('projects')}>
            View Projects
          </button>
        </div>
      </div>
      <div className="hero-visual" aria-label="Portfolio highlights">
        <div className="metric">
          <strong>6</strong>
          <span>portfolio pages</span>
        </div>
        <div className="metric">
          <strong>3</strong>
          <span>featured projects</span>
        </div>
        <div className="metric wide">
          <strong>React</strong>
          <span>component-based site</span>
        </div>
      </div>
    </section>
  )
}

function AboutPage({ onNavigate }) {
  return (
    <section className="split-page page-panel">
      <div className="portrait-frame">
        <img src={portfolio.portraitUrl} alt={`Portrait of ${portfolio.name}`} />
      </div>
      <div className="page-copy">
        <p className="eyebrow">About Me</p>
        <h1>{portfolio.name}</h1>
        <p>{portfolio.about}</p>
        <div className="detail-list">
          <span>{portfolio.role}</span>
          <span>{portfolio.location}</span>
          <span>{portfolio.email}</span>
        </div>
        <div className="action-row">
          <a className="primary-action" href={portfolio.resumeUrl} target="_blank">
            Resume PDF
          </a>
          <button className="secondary-action" type="button" onClick={() => onNavigate('contact')}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <section className="page-panel">
      <PageIntro
        eyebrow="Projects"
        title="Selected work I want to highlight."
        text="Academic projects from my Software Engineering Technology program, covering databases, desktop applications, and core programming."
      />
      <div className="card-grid three-column">
        {projects.map((project) => (
          <article className="feature-card project-card" key={project.title}>
            <img src={project.image} alt="" />
            <div>
              <h2>{project.title}</h2>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-meta">
                {project.context} <span aria-hidden="true">|</span> Toronto, ON{' '}
                <span aria-hidden="true">|</span> {project.date}
              </p>
              <ul className="project-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="tag-list" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function EducationPage() {
  return (
    <section className="page-panel">
      <PageIntro
        eyebrow="Education"
        title="Academic and professional qualifications."
        text="This timeline lists the dates, credentials, and learning areas that support my software development work."
      />
      <div className="timeline">
        {education.map((item) => (
          <article className="timeline-item" key={`${item.date}-${item.credential}`}>
            <span>{item.date}</span>
            <div>
              <h2>{item.credential}</h2>
              <h3>{item.institution}</h3>
              <p>{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServicesPage({ onNavigate }) {
  return (
    <section className="page-panel">
      <PageIntro
        eyebrow="Services"
        title="Ways I can help with digital projects."
        text="These services reflect the practical skills I am developing through my coursework in databases, desktop applications, and programming."
      />
      <div className="card-grid two-column">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <img src={service.image} alt="" />
            <div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
      <button className="primary-action section-action" type="button" onClick={() => onNavigate('contact')}>
        Start a Conversation
      </button>
    </section>
  )
}

function ContactPage({ formData, onChange, onSubmit, error, loading }) {
  return (
    <section className="contact-layout page-panel">
      <div className="contact-panel">
        <p className="eyebrow">Contact Me</p>
        <h1>Let&apos;s connect.</h1>
        <p>
          Use the form to send a message. Your name and email will be saved to the Portfolio database.
          You can also include a phone number and message for this form.
        </p>
        <div className="contact-details" aria-label="Contact information">
          <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
          <a href={`tel:${portfolio.phone.replace(/\D/g, '')}`}>{portfolio.phone}</a>
          <span>{portfolio.location}</span>
          <a href={portfolio.github} target="_blank">
            GitHub
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit}>
        <label>
          First Name
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            autoComplete="given-name"
            required
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            autoComplete="family-name"
            required
          />
        </label>
        <label>
          Contact Number
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            autoComplete="tel"
            required
          />
        </label>
        <label>
          Email Address
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            autoComplete="email"
            required
          />
        </label>
        <label className="full-field">
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            rows="6"
            required
          />
        </label>
        {error && <p className="full-field" role="alert" style={{ color: '#b42318' }}>{error}</p>}
        <button className="primary-action full-field" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 {portfolio.name}. Built with React for COMP229 Assignment 1.</p>
    </footer>
  )
}

export default App
