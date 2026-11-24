import { HeartHandshake } from 'lucide-react';
import { ScienceDrawing } from './VisualAtlas';

const principles = [
  ['Mission', 'Make prenatal and genetic science accessible through clear explanations, diagrams, and interactive tools.'],
  ['Vision', 'Help families explore biomedical information with confidence and discuss disability without stigma or blame.'],
  ['Goals', 'Design accessible learning tools, verify their calculations, and explain what the models can show.'],
];

const pathways = [
  { title: 'Genetics and inheritance', kind: 'dna', description: 'Explore DNA, genes, chromosomes, inheritance patterns, and genetic variation.', links: [[2, 'Understand inheritance'], [6, 'Explore epigenetics']] },
  { title: 'Prenatal screening and information', kind: 'sample', description: 'Compare screening and diagnosis, then see how prevalence and test performance change the meaning of a result.', links: [[3, 'Understand testing'], [11, 'Watch animated lessons']] },
  { title: 'Biomedical imaging and development', kind: 'brain', description: 'Follow prenatal development and see how ultrasound, MRI, and microscopy generate different kinds of information.', links: [[1, 'Explore development'], [5, 'Explore neuroimaging'], [4, 'Explore microscopy']] },
] as const;

export default function GenoraHome({go}:{go:(page:number,focus?:string)=>void}) {
  return (
    <div className="genora-home">
      <section className="genora-hero">
        <div className="genora-container genora-hero-grid">
          <div>
            <p className="genora-eyebrow">Biomedical science education</p>
            <h1>Making genetic science easier to <span>understand</span>.</h1>
            <p className="genora-lead">Explore prenatal development, inheritance, and screening through diagrams, interactive lessons, and hypothetical examples.</p>
            <div className="genora-actions">
              <a className="genora-button" href="#home?focus=explore">Explore the Science</a>
              <a className="genora-button genora-secondary" href="#home?focus=why-genora">Why GENORA Exists</a>
            </div>
            <p className="genora-disclaimer">Educational content only. GENORA does not provide diagnosis, personalized medical advice, or clinical risk assessment.</p>
          </div>
          <figure className="genora-hero-figure">
            <ScienceDrawing kind="dna" id="home-hero" />
            <figcaption>DNA’s paired bases carry hereditary information. Educational schematic.</figcaption>
          </figure>
        </div>
      </section>

      <section className="genora-section genora-soft" id="why-genora" tabIndex={-1} aria-labelledby="why-genora-heading">
        <div className="genora-container">
          <h2 id="why-genora-heading">Why GENORA exists</h2>
          <div className="genora-grid three">
            <article className="genora-card genora-problem">
              <ScienceDrawing kind="chromosome" id="home-problem-dna" />
              <h3>Complex biomedical information</h3>
              <p>Words like chromosome, gene variant, and inheritance can be unfamiliar. A diagram gives learners something concrete to connect with each term before they encounter it in a report or conversation.</p>
              <button className="textlink" onClick={()=>go(2)}>Learn the genetics basics</button>
            </article>
            <article className="genora-card genora-problem">
              <figure className="genora-mini-figure">
                <div className="genora-two-outcomes"><span>Condition present</span><span>Condition absent</span></div>
                <figcaption>Two possible groups among positive screens. Box sizes are illustrative.</figcaption>
              </figure>
              <h3>Understanding screening uncertainty</h3>
              <p>People with and without a condition can both receive a positive screen. A population example shows how these results can occur together and what the result leaves uncertain.</p>
              <button className="textlink" onClick={()=>go(3,'simulator-controls')}>Open the population model</button>
            </article>
            <article className="genora-card genora-problem">
              <figure className="genora-mini-figure">
                <HeartHandshake size={54} strokeWidth={1.4} aria-hidden="true" />
                <figcaption>Ask, listen, and make room for individual choices.</figcaption>
              </figure>
              <h3>Misunderstanding and stigma</h3>
              <p>Misconceptions about disability and genetic conditions can lead to blame. Clear information can support respectful conversations that make room for people’s experiences, preferences, and questions.</p>
              <button className="textlink" onClick={()=>go(7,'family-faq-7')}>Explore family support</button>
            </article>
          </div>
        </div>
      </section>

      <section className="genora-section" id="explore" tabIndex={-1} aria-labelledby="explore-heading">
        <div className="genora-container">
          <h2 id="explore-heading">Explore GENORA</h2>
          <div className="genora-grid three">
            {pathways.map(({title, kind, description, links}, index)=>(
              <article className="genora-card genora-pathway" key={title}>
                <ScienceDrawing kind={kind} id={'home-pathway-'+index} labels={false} />
                <h3>{title}</h3><p>{description}</p>
                <div className="genora-pathway-links">
                  {links.map(([topic,label])=><button className="textlink" key={topic} onClick={()=>go(topic)}>{label}</button>)}
                </div>
              </article>
            ))}
          </div>
          <div className="genora-actions"><button className="genora-button" onClick={()=>go(3,'simulator-controls')}>Try the screening simulator</button></div>
        </div>
      </section>

      <section className="genora-section genora-soft" id="methodology" aria-labelledby="engineering-heading">
        <div className="genora-container">
          <h2 id="engineering-heading">The Engineering Behind GENORA</h2>
          <p>Trace how published evidence becomes a computational model, how its outputs are checked, and how diagrams and labels help people interpret them.</p>
          <div className="genora-actions">
            <button className="genora-button" onClick={()=>go(12)}>Engineering Lab &amp; Verification</button>
            <button className="genora-button genora-secondary" onClick={()=>go(10)}>Scientific references</button>
          </div>
        </div>
      </section>

      <section className="genora-section" aria-labelledby="purpose-heading">
        <div className="genora-container">
          <h2 id="purpose-heading">Our purpose</h2>
          <div className="genora-grid three">
            {principles.map(([title,text])=><article className="genora-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <p>GENORA grew from my interest in making biological differences easier to understand and in addressing the misconceptions that can lead to fear or blame.</p>
          <button className="textlink" onClick={()=>go(9)}>Read the founder’s story</button>
        </div>
      </section>
    </div>
  );
}
