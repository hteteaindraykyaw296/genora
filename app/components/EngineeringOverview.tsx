const informationFlow = [
  ['Biomedical information', 'Published evidence defines the concepts and limits.'],
  ['Data and model inputs', 'Learners enter hypothetical population and test values.'],
  ['Computational processing', 'The model applies conditional probability.'],
  ['Verified outputs', 'Reference cases check expected counts and predictive values.'],
  ['Accessible visual explanation', 'Labels, text, and a bar chart explain the same results.'],
];

const modalities = [
  {
    title: 'Ultrasound',
    steps: ['A probe sends sound pulses and receives returning echoes.', 'The scanner uses echo timing and strength to estimate location and brightness.', 'The display shows a cross-section or a reconstructed volume.', 'Image quality depends on the available acoustic window and the position of the structure.'],
    source: 'https://www.nibib.nih.gov/sites/default/files/Ultrasound%20Fact%20Sheet%20508.pdf',
    publisher: 'NIH ultrasound fact sheet',
  },
  {
    title: 'MRI',
    steps: ['A strong magnetic field and radiofrequency pulses are used to generate measurable signals.', 'Magnetic field gradients encode spatial information.', 'A computer reconstructs the signals as an image with tissue-dependent contrast.', 'Motion and finite spatial resolution can obscure details.'],
    source: 'https://www.nibib.nih.gov/sites/default/files/2022-05/Fact-Sheet-Magnetic-Resonance-Imaging-MRI.pdf',
    publisher: 'NIH MRI fact sheet',
  },
  {
    title: 'Light microscopy',
    steps: ['Light from a specimen passes through the objective lens.', 'The optics and detector capture differences in brightness or fluorescence.', 'Magnification enlarges the view. Resolution determines whether nearby structures remain distinguishable.', 'Poor contrast or overlap can hide boundaries and cause counting errors.'],
    source: '#chromosome-microscopy',
    publisher: 'Microscopy gallery and synthetic viewer',
  },
];

export default function EngineeringOverview() {
  return <>
    <section className="panel">
      <h2>Engineering Lab &amp; Verification</h2>
      <p>GENORA helps families, caregivers, and students distinguish a screening result from a diagnosis. Its requirements include labeled controls, reproducible calculations, explicit uncertainty, and a static site that works without accounts or patient records.</p>
      <h3>Healthcare information technology</h3>
      <ol className="engineering-flow">{informationFlow.map(([label,description])=><li key={label}><strong>{label}</strong><span>{description}</span></li>)}</ol>
      <h3>Human-centered information design</h3>
      <p>The screening lab presents expected counts before percentages so readers can see which groups form each denominator. The bar and its text summary carry the same information. Keyboard-accessible controls allow learners to change one assumption at a time, and a disclosure holds the equations for readers who want to inspect the model.</p>
    </section>

    <section className="panel">
      <h2>Biomedical imaging</h2>
      <p>These diagrams describe how instruments produce images. GENORA presents examples and simulations for learning.</p>
      <div className="engineering-modalities">{modalities.map(({title,steps,source,publisher})=><article key={title}>
        <h3>{title}</h3>
        <ol className="engineering-flow">{steps.map((step,index)=><li key={step}><strong>{['Signal acquisition','Processing','Image formation','Interpretation and limits'][index]}</strong><span>{step}</span></li>)}</ol>
        <a href={source}>{publisher}</a>
      </article>)}</div>
    </section>

    <section className="panel">
      <h2>Reproduce the screening checks</h2>
      <p>Run <code>npm test</code> from the project folder. The table gives independent reference inputs and outputs. All rates are hypothetical percentages.</p>
      <table className="verification-table">
        <caption>Reference cases for the screening calculation</caption>
        <thead><tr><th scope="col">Case</th><th scope="col">Inputs</th><th scope="col">Expected result</th></tr></thead>
        <tbody>
          <tr><th scope="row">Low prevalence</th><td>10,000 people, 0.1% prevalence, 99% sensitivity, 99.9% specificity</td><td>9.9 true positives, 9.99 false positives, 9,980.01 true negatives, 0.1 false negatives. PPV 49.77%.</td></tr>
          <tr><th scope="row">Higher prevalence</th><td>10,000 people, 1% prevalence, same test</td><td>99 true positives and 9.9 false positives. PPV 90.91%.</td></tr>
          <tr><th scope="row">Exact-count reference</th><td>1,000 people, 20% prevalence, 75% sensitivity, 87.5% specificity</td><td>150 true positives, 100 false positives, 700 true negatives, 50 false negatives. PPV 60%. NPV approximately 93.33%.</td></tr>
          <tr><th scope="row">Empty result group</th><td>100 people, a perfect test, 0% or 100% prevalence</td><td>PPV is undefined at 0% prevalence. NPV is undefined at 100%.</td></tr>
          <tr><th scope="row">Invalid input</th><td>Prevalence below 0% or above 100%</td><td>The calculation rejects out-of-range values.</td></tr>
        </tbody>
      </table>
      <p>PPV is the share of expected positive results that are true positives. In proportions, it is <em>s × p ÷ (s × p + (1 − c) × (1 − p))</em>, where <em>s</em> is sensitivity, <em>p</em> is prevalence, and <em>c</em> is specificity. The worked examples and CSV consistency checks use the same documented assumptions.</p>
    </section>
  </>;
}
