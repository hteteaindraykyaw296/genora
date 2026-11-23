
import {ScienceDrawing} from "./VisualAtlas";
import {sections,descriptions} from "../../lib/content";


const principles = [
  {
    title: "Mission",
    text: "To make complex prenatal and genetic information accessible, scientifically responsible, and understandable to expectant families and caregivers."
  },
  {
    title: "Vision",
    text: "A healthcare information environment where families can explore scientific knowledge, understand uncertainty, and discuss disability and genetic conditions without stigma or blame."
  },
  {
    title: "Goals",
    text: "Translate biomedical concepts into clear explanations, develop interactive educational models, verify technical outputs, and document limitations for future improvement."
  }
];

const approach = [
  {
    number: "01",
    title: "Identify the information problem",
    text: "Define concepts that may be misunderstood, including genetic inheritance, screening probabilities, and the distinction between screening and diagnosis."
  },
  {
    number: "02",
    title: "Select scientific evidence",
    text: "Use credible clinical guidance and scientific literature. Record publication dates, sources, assumptions, and uncertainty."
  },
  {
    number: "03",
    title: "Design the information output",
    text: "Translate complex concepts into interactive diagrams, accessible explanations, and educational simulations."
  },
  {
    number: "04",
    title: "Verify and document",
    text: "Check calculations against independent examples, test functionality and accessibility, and report unresolved limitations."
  }
];

const resources = [
  {
    label: "WHO — Congenital disorders",
    url: "https://www.who.int/news-room/fact-sheets/detail/birth-defects"
  },
  {
    label: "MedlinePlus Genetics",
    url: "https://medlineplus.gov/genetics/"
  },
  {
    label: "ACOG — Prenatal Genetic Screening",
    url: "https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests"
  },
  {
    label: "WCAG 2.2 Accessibility Standard",
    url: "https://www.w3.org/TR/WCAG22/"
  }
];

export default function GenoraHome({go}:{go:(page:number,focus?:string)=>void}) {
  return (
    <div className="genora-home">
      <section className="genora-hero">
        <div className="genora-container">
          <p className="genora-eyebrow">
            GENORA / Biomedical Science Education
          </p>
          <h1>
            Making complex prenatal science <span>understandable</span>.
          </h1>
          <p className="genora-lead">
            An evidence-informed educational platform for
            expectant families, caregivers, and curious learners
            exploring genetics, prenatal health, and biomedical
            technology.
          </p>
          <p className="genora-mission">
            GENORA aims to reduce barriers to understanding genetic conditions,
            support informed healthcare conversations, and encourage respectful,
            stigma-free perspectives on disability.
          </p>
          <div className="genora-actions">
            <a className="genora-button" href="#home?focus=explore">
              Explore GENORA
            </a>
            <a
              className="genora-button genora-secondary"
              href="#how-genora-was-built"
            >
              Our Methodology
            </a>
          </div>
          <p className="genora-disclaimer">
            Educational content only. GENORA does not provide
            diagnosis, personalized medical advice, or clinical
            risk assessment.
          </p>
        </div>
      </section>

      <section
        className="genora-section"
        aria-labelledby="purpose-heading"
      >
        <div className="genora-container">
          <p className="genora-eyebrow">Our Purpose</p>
          <h2 id="purpose-heading">
            Science should inform, not intimidate.
          </h2>
          <div className="genora-grid three">
            {principles.map((item) => (
              <article className="genora-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="genora-section genora-soft">
        <div className="genora-container genora-grid two">
          <article>
            <p className="genora-eyebrow">The Problem</p>
            <h2>When medical information becomes a barrier</h2>
            <p>
              Prenatal screening information involves uncertainty,
              probability, and technical terminology. Without
              clear explanations, screening results may be
              confused with definitive diagnoses.
            </p>
            <p>
              Misunderstandings about genetic conditions and
              disability can also contribute to stigma.
              GENORA addresses these information challenges
              through accessible scientific education.
            </p>
          </article>

          <article>
            <p className="genora-eyebrow">Our Proposed Solution</p>
            <h2>From scientific information to understanding</h2>
            <p>
              GENORA combines referenced educational content,
              biomedical visualizations, and interactive models
              to demonstrate scientific principles.
            </p>
            <p>
              Its tools are designed to support learning and
              informed conversations, not to replace healthcare
              professionals or predict individual outcomes.
            </p>
          </article>
        </div>
      </section>

      <section className="genora-section" id="explore" tabIndex={-1}>
        <div className="genora-container">
          <p className="genora-eyebrow">Explore the Science</p>
          <h2>Learn through evidence and interaction</h2>
          <p>
            Explore prenatal development, genetics, molecular
            concepts, imaging, and screening mathematics.
          </p>
          <div className="genora-modules">{[1,2,3,4,5,6,7,11].map((n,i)=><button className="genora-module" key={n} onClick={()=>go(n)}><ScienceDrawing kind={(['placenta','dna','sample','chromosome','brain','nucleosome','dna','sample'] as const)[i]} id={'welcome-'+i} labels={false}/><span><strong>{sections[n]}</strong><small>{descriptions[n]}</small></span></button>)}</div>
          <div className="genora-actions"><button className="genora-button" onClick={()=>go(3,'simulator-controls')}>Try the screening simulator</button><button className="genora-button genora-secondary" onClick={()=>go(11)}>Watch animated lessons</button></div>
          <div className="genora-family-links"><h3>Start with your questions</h3>{[[2,'Understand inheritance'],[3,'Understand testing'],[7,'Explore family support']].map(([n,label])=><button className="genora-button genora-secondary" key={n} onClick={()=>go(Number(n),'family-faq-'+n)}>{label}</button>)}</div>
        </div>
      </section>

      <section
        className="genora-section genora-soft"
        id="methodology"
      >
        <div className="genora-container">
          <p className="genora-eyebrow">
            Healthcare Information Technology
          </p>
          <h2>Our design and verification approach</h2>
          <div className="genora-grid two">
            {approach.map((step) => (
              <article className="genora-card" key={step.number}>
                <span className="genora-step">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="genora-actions"><button className="genora-button genora-secondary" onClick={()=>go(12)}>See how Genora was built</button></div>
          <p className="genora-note">
            These steps describe the project methodology.
            Verification outcomes must be reported separately
            and only after the corresponding tests are run.
          </p>
        </div>
      </section>

      <section className="genora-section">
        <div className="genora-container">
          <p className="genora-eyebrow">Scientific Foundation</p>
          <h2>Evidence before interpretation</h2>
          <p>
            GENORA uses established educational and clinical
            references to guide content development. Numerical
            claims should identify their source, population,
            timeframe, and limitations.
          </p>
          <ul className="genora-resources">
            {resources.map((resource) => (
              <li key={resource.url}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="genora-section genora-soft">
        <div className="genora-container">
          <p className="genora-eyebrow">
            Engineering Transparency
          </p>
          <h2>What we can and cannot demonstrate</h2>
          <div className="genora-grid two">
            <article className="genora-card">
              <h3>Technical verification</h3>
              <p>
                The screening simulator can be evaluated using
                independently calculated examples, boundary
                cases, input validation, and automated tests.
              </p>
            </article>
            <article className="genora-card">
              <h3>Current limitations</h3>
              <p>
                The platform has not established clinical
                effectiveness or demonstrated improvements
                in real-world user outcomes. Formal external
                usability evaluation remains future work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="genora-section">
        <div className="genora-container">
          <p className="genora-eyebrow">Why GENORA Exists</p>
          <h2>Biomedical knowledge should be accessible.</h2>
          <p>
            GENORA reflects an interest in inclusive healthcare,
            biomedical engineering, and the responsible
            communication of scientific information.
          </p>
          <p>
            The project explores how healthcare information
            technology can help translate complex concepts
            into educational experiences that are easier
            to understand and engage with.
          </p>
          <div className="genora-actions"><button className="genora-button" onClick={()=>go(9)}>Read the story, scope and limitations</button><button className="genora-button genora-secondary" onClick={()=>go(12)}>Explore my engineering curiosity</button></div>
        </div>
      </section>
    </div>
  );
}
