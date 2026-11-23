import Image from 'next/image';
export default function PortfolioCase(){
  return <>
    <section className="panel"><h2>Turning a screening result into understandable information</h2>
      <h3>The user need</h3><p>In the fictional case, a family reads a positive screen as confirmation. The experience aims to explain screening uncertainty and help them identify a question for their care team.</p>
      <h3>The calculation</h3><p>The existing probability function takes population, prevalence, sensitivity, and specificity. For populations of 10,000 with 99% sensitivity and 99.9% specificity, prevalence of 0.1% yields 9.9 true positives and 9.99 false positives, with PPV approximately 49.77%. At 1% prevalence, the expected counts are 99 and 9.9, with PPV approximately 90.91%.</p>
      <h3>The interface decision</h3><p>The display introduces true and false positives before naming positive predictive value. Text labels and numbers carry the comparison, and a disclosure makes the equations available. The example ends with neutral questions and the appointment checklist.</p>
      <h3>Healthcare Information Technology in practice</h3><p>Genora takes structured screening inputs, processes them into expected counts, and presents interpretable outputs with their uncertainty. This connects information processing with a family’s next conversation.</p>
      <h3>Verification and limitations</h3><p>The review branch includes independent worked-example checks, zero-denominator cases, input boundaries, population conservation, and CSV consistency checks. The accompanying review notes record the executed results. The model assumes fixed performance and prevalence and omits assay-specific failure modes. It cannot interpret an individual report.</p>
      <a href="#prenatal-testing-lab?focus=simulator-controls">Try the screening simulator</a>
    </section>
    <section className="panel"><h2>A second example — when software merges objects</h2><p>In the archived synthetic overlap example, 18 intended objects produced 9 connected components. A nearly matching foreground mask can still conceal a counting error.</p>
      <div className="research-triptych">{[['input','Synthetic input'],['mask','Thresholded output'],['overlay','Detected components']].map(([file,label])=><figure key={file}><Image src={'/research-overlap-'+file+'.png'} width={600} height={400} alt={label+' for the synthetic seed 42 overlap example'}/><figcaption>{label}</figcaption></figure>)}</div>
      <p>These are generated shapes with documented reference counts. Real microscopy in the gallery has a separate source and purpose. Clinical performance remains unvalidated.</p>
      <p><a href="/research-results.csv" download>Measured results</a> · <a href="/methodology.md">Methods</a> · <a href="#research-lab">Research Lab</a></p>
    </section>
    <section className="panel"><h2>Contribution and review</h2><p>The repository contains a React interface, probability calculations, original educational diagrams, attributed image examples, and a Python image-analysis pipeline. The founder supplied the mission and the personal account of living with cerebral palsy. Code and writing have been developed with AI assistance in this project.</p><p><strong>Founder review required.</strong> Confirm which design, programming, research, illustration, and testing tasks you personally completed before using contribution claims in an application. No independent authorship of all implementation is claimed here.</p>
      <h3>Proposed usability test — planned</h3><p>Invite a prospective parent, caregiver, and learner to use the fictional case without entering personal information. Ask each person to find the simulator, explain whether a positive screen confirms a diagnosis, describe the difference between the two populations, and name one question for a clinician. Record success, confusion, and time taken with consent. This participant study has not been conducted.</p>
    </section>
  </>;
}
