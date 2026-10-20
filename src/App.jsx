import UserList from './UserList.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Gather home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2m0-21.2L9.4 30.6" />
              <circle cx="20" cy="20" r="5.2" />
            </svg>
          </span>
          <span className="brand__name">gather<span>.</span></span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a className="header-nav__link header-nav__link--active" href="#community">Community</a>
          <a className="header-nav__link" href="#about">About</a>
        </nav>
        <a className="header-contact" href="mailto:hello@gather.community">
          Say hello <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="home">
        <section className="welcome" id="about">
          <div className="welcome__copy">
            <p className="eyebrow"><span className="eyebrow__line" /> A place to find your people</p>
            <h1>Good things happen<br />when we <em>gather.</em></h1>
            <p className="welcome__description">
              Meet the people who make this community feel like home. Find a familiar face,
              or get to know someone new.
            </p>
            <a className="welcome__action" href="#community">
              Meet the community <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="welcome-art__sun" />
            <div className="welcome-art__arch">
              <div className="welcome-art__inner">
                <span className="art-person art-person--one" />
                <span className="art-person art-person--two" />
                <span className="art-person art-person--three" />
                <span className="art-person art-person--four" />
                <span className="art-person art-person--five" />
              </div>
            </div>
            <span className="welcome-art__spark welcome-art__spark--one">✳</span>
            <span className="welcome-art__spark welcome-art__spark--two">✳</span>
            <span className="welcome-art__caption">Many stories,<br />one community.</span>
          </div>
          <div className="welcome__bottom">
            <span>PEOPLE MAKE THE PLACE</span>
            <span>01 — 10</span>
          </div>
        </section>

        <UserList />
      </main>

      <footer className="site-footer">
        <a className="brand brand--footer" href="#home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2m0-21.2L9.4 30.6" />
              <circle cx="20" cy="20" r="5.2" />
            </svg>
          </span>
          <span className="brand__name">gather<span>.</span></span>
        </a>
        <p>Made for the moments that bring us together.</p>
        <span className="site-footer__note">A LITTLE MORE CONNECTED, EVERY DAY.</span>
      </footer>
    </div>
  )
}

export default App
