import { useMemo, useState } from 'react';
import { projects } from './data/projects.js';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const heroStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(23, 32, 38, 0.82), rgba(23, 32, 38, 0.36)), url("${import.meta.env.BASE_URL}images/hero-portfolio.png")`,
  };

  const errors = useMemo(() => {
    const nextErrors = {};

    if (submitted && form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    if (submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (submitted && form.message.trim().length < 10) {
      nextErrors.message = 'Please write at least 10 characters.';
    }

    return nextErrors;
  }, [form, submitted]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const valid =
      form.name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.message.trim().length >= 10;

    if (valid) {
      alert(`Thanks, ${form.name}! Your message is ready to send.`);
      setForm({ name: '', email: '', message: '' });
      setSubmitted(false);
    }
  };

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Gabija Siel home">
          GS
        </a>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero section" style={heroStyle}>
          <div className="hero-content reveal">
            <p className="eyebrow">React Developer Portfolio</p>
            <h1>Hi, I&apos;m Gabija Siel.</h1>
            <p className="hero-copy">
              I build clean, responsive web experiences with React, thoughtful design, and interactive features
              that make projects feel complete.
            </p>
            <div className="hero-actions" aria-label="Portfolio actions">
              <a className="button button-primary" href="#projects">
                View Projects
              </a>
              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading reveal">
            <p className="eyebrow">About</p>
            <h2>Creative, organized, and always learning.</h2>
          </div>
          <div className="about-grid">
            <article className="about-card reveal">
              <h3>Bio</h3>
              <p>
                I am a student developer focused on React, front-end design, and building projects that are easy
                to use. I enjoy turning class assignments into polished portfolio work that can keep growing.
              </p>
            </article>
            <article className="about-card reveal">
              <h3>Skills</h3>
              <div className="skill-list" aria-label="Skills">
                {['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design', 'GitHub Pages'].map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
            <article className="about-card reveal">
              <h3>Interests</h3>
              <p>
                I like projects that combine visuals, interaction, and practical user flows, especially apps that
                help people track goals, learn something, or explore a story.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Projects</p>
            <h2>Recent work</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <img src={project.image} alt={`${project.title} preview`} />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      Repository
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Link
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s connect.</h2>
          </div>
          <div className="contact-grid">
            <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <span className="error">{errors.message}</span>}
              </label>
              <button className="button button-primary" type="submit">
                Send Message
              </button>
            </form>
            <aside className="contact-details reveal">
              <h3>Find me online</h3>
              <a href="https://github.com/gabijasiel1" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="mailto:gabijasiel1@example.com">gabijasiel1@example.com</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built with React by Gabija Siel.</p>
        <a href="#home">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
