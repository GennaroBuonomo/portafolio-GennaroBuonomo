import { useState, useEffect, useRef } from 'react';
import './App.css';

// 1. IL COMPONENTE CHE GESTISCE L'ANIMAZIONE
function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Quando l'elemento entra nello schermo
        if (entry.isIntersecting) {
          setVisible(true);
          // Ferma l'osservazione, così l'animazione accade una sola volta
          observer.unobserve(domRef.current);
        }
      });
    });
    
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

// 2. IL COMPONENTE PRINCIPALE DELL'APP
function App() {
  // --- LOGICA DEL CURSORE PERSONALIZZATO ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Aggiorna le coordinate del mouse
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Capisce se sei sopra un link o una riga dell'arsenale
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.closest('a') || 
        e.target.classList.contains('arsenal-row')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  // --- FINE LOGICA CURSORE ---

  return (
    <div className="portfolio-container">
      
      {/* 🎯 IL NOSTRO CURSORE PERSONALIZZATO */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      {/* ==================================================== */}
      {/* 1. SEZIONE HERO (La schermata iniziale) */}
      {/* ==================================================== */}
      <div className="hero-background"></div>

      <main className="hero-content">
        
        <header className="hero-header">
        <div className="brand-container">
            <img src="/gennaro_logo.png" alt="Gennaro Buonomo Logo" className="nav-logo" />
            <p className="subtitle">
              Gennaro Buonomo <span className="accent">//</span> Front-End Developer
            </p>
         </div>
          <nav className="minimal-nav">
            <a href="#progetti">Progetti</a>
            <a href="#info">Info</a>
            <a href="#arsenale">Arsenale</a>
          </nav>
        </header>

        <div className="title-grid">
          <h1 className="giant-text">
            CODE<br />
            <span className="outline-text">SHINOBI</span>
            <span className="accent-dot">.</span>
          </h1>
          
          <div className="intro-text">
            <p>
              Trasformo design complessi in interfacce performanti. 
              Niente framework CSS, solo manipolazione pura dei pixel e ingegneria frontend.
            </p>
          </div>
        </div>
        
      </main>

      {/* ==================================================== */}
      {/* 2. SEZIONE PROGETTI */}
      {/* ==================================================== */}
      <FadeInSection>
        <section id="progetti" className="projects-section">
          
          <h2 className="section-title">
            01. ARCHIVIO <span className="accent">LAVORI</span>
          </h2>

          <div className="project-grid">
            
            {/* Progetto 1 */}
            <article className="project-card">
              <div className="project-info">
               <h3 className="project-name">
                  <a href="https://github.com/GennaroBuonomo/tokyo-website" target="_blank" rel="noreferrer">Tokyo Explorer</a>
                </h3>
                <p className="project-tech">React // CSS Grid // Vite</p>
                <p className="project-desc">
                  Una Single Page Application interattiva sviluppata in React per esplorare i quartieri iconici e lo street food tradizionale di Tokyo. Interfaccia con filtri di ricerca e routing avanzato.
                </p>
              </div>
              <div className="project-visual">
                <img src="/Tokyo.jpeg" alt="Schermata di Tokyo Explorer" />
              </div>
            </article>

            {/* Progetto 2 */}
            <article className="project-card reverse">
              <div className="project-info">
                <h3 className="project-name">
                  <a href="https://github.com/GennaroBuonomo/findash" target="_blank" rel="noreferrer">FinDash</a>
                </h3>
                <p className="project-tech">JavaScript // CSS Puro // MySQL</p>
                <p className="project-desc">
                  Single Page Application interattiva per il monitoraggio del portafoglio e il tracciamento dinamico delle spese. I grafici a torta e le dashboard sono stati ingegnerizzati da zero in puro CSS, senza librerie esterne.
                </p>
              </div>
              <div className="project-visual">
                <img src="findash.jpeg" alt="Schermata di FinDash" />
              </div>
            </article>

            {/* Progetto 3 */}
            <article className="project-card">
              <div className="project-info">
               <h3 className="project-name">
                  <a href="https://github.com/GennaroBuonomo/medicare-dashboard" target="_blank" rel="noreferrer">MediCare Pro</a>
                </h3>
                <p className="project-tech">React // Pure CSS // Clinical Data Visualization</p>
                <p className="project-desc">
                  Una dashboard Single Page Application per la gestione del rischio clinico, sviluppata analizzando i modelli infermieristici reali. Ho progettato un'interfaccia complessa ma intuitiva usando React e CSS puro, per permettere al personale sanitario di visualizzare dati critici senza sovraccarico cognitivo.
                </p>
              </div>
              <div className="project-visual">
                <img src="/medicarepro.jpeg" alt="Schermata di MediCare Pro" />
              </div>
            </article>

          </div>
        </section>
      </FadeInSection>

      {/* ==================================================== */}
      {/* 3. SEZIONE INFO & FOTO BRUTALISTA (02. IL CODICE) */}
      {/* ==================================================== */}
      <FadeInSection>
        <section id="info" className="about-section">
          
          <div className="about-bio-grid">
            
            <div className="about-header">
              <h2 className="section-title">02. IL <span className="accent">CODICE</span></h2>
              
              <div className="portrait-container">
                <img 
                  src="/Gennaro_Buonomo_foto.jpg" 
                  alt="Gennaro Buonomo" 
                  className="brutalist-portrait" 
                />
                <div className="blood-overlay"></div>
              </div>
            </div>

            <div className="about-biography">
              <p className="bio-lead">
                L'arte del Front-end è come quella di uno Shinobi:<br />
                le interfacce migliori sono quelle che non richiedono sforzo per essere comprese.
              </p>
              <p>
                Dopo aver dominato l'infrastruttura con 4 anni di supporto IT,<br />
                ho concentrato il mio addestramento sullo sviluppo web moderno.<br />
                Costruisco architetture solide in React e TypeScript,<br />
                ed espando costantemente il mio arsenale studiando Next.js 15.
              </p>
              <p>
                Unisco la mente analitica ereditata dagli studi finanziari<br />
                a una disciplina ferrea, forgiata dallo sport e dal lavoro di squadra.<br />
                Che si tratti di un gestionale vitale per il settore sanitario<br />
                o di un'esperienza web interattiva, il mio obiettivo è uno:<br />
                codice pulito, esecuzione rapida, zero distrazioni.
              </p>
            </div>

          </div>
        </section>
      </FadeInSection>

      {/* ==================================================== */}
      {/* 4. SEZIONE ARSENALE (03. L'ARSENALE) */}
      {/* ==================================================== */}
      <FadeInSection>
        <section id="arsenale" className="arsenal-section">
          
          <h2 className="section-title">03. L'<span className="accent">ARSENALE</span></h2>
          
          <div className="arsenal-list">
            
            <div className="arsenal-row">
              <span className="arsenal-category">FRONT-END</span>
              <span className="arsenal-techs">HTML // JavaScript // React (Advanced) // TypeScript // Next.js 15</span>
            </div>
            
            <div className="arsenal-row">
              <span className="arsenal-category">BACK-END</span>
              <span className="arsenal-techs">Node.js // Express // MySQL</span>
            </div>
            
            <div className="arsenal-row">
              <span className="arsenal-category">STYLING</span>
              <span className="arsenal-techs">CSS // Grid & Flexbox // UI-UX Design</span>
            </div>
            
            <div className="arsenal-row">
              <span className="arsenal-category">TOOLS</span>
              <span className="arsenal-techs">Git // GitHub // Postman</span>
            </div>

          </div>

        </section>
      </FadeInSection>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}
      <footer className="terminal-footer">
        <h2 className="giant-text outline-text">WORK_WITH_ME<span className="accent-dot">.</span></h2>
        <div className="footer-links">

          <a href="/gennaro_buonomo_cv.pdf" download="Gennaro_Buonomo_CV" className="cv-button">
            SCARICA_CV
          </a>
          
          <a href="mailto:gennarobuonomo94@gmail.com" className="contact-link">
            EMAIL
          </a>
          
          <a href="https://github.com/GennaroBuonomo" target="_blank" rel="noreferrer" className="contact-link">
            GITHUB
          </a>
          
          <a href="https://www.linkedin.com/in/-gennarobuonomo-/" target="_blank" rel="noreferrer" className="contact-link">
            LINKEDIN
          </a>
          
        </div>
      </footer>

    </div> 
  );
}

export default App;