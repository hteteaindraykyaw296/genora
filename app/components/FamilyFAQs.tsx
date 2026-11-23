const sources={
  inheritance:'https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/',
  variants:'https://medlineplus.gov/genetics/understanding/mutationsanddisorders/genemutation/',
  screening:'https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests',
  diagnosis:'https://www.acog.org/womens-health/faqs/prenatal-genetic-diagnostic-tests',
  choice:'https://www.acog.org/advocacy/policy-priorities/non-invasive-prenatal-testing/current-acog-guidance',
};
const groups={
  genetics:[
    ['What does it mean for a condition to be inherited?','A genetic variant associated with a condition can pass from a biological parent to a child. Inheritance patterns differ, and carrying a variant does not always mean someone will develop symptoms.',sources.inheritance],
    ['Can someone have a genetic condition without a known family history?','Yes. A new variant can arise, and a condition can also be present in a family without having been recognized. Family history alone cannot rule out a genetic condition.',sources.variants],
    ['Does an inherited condition mean someone in the family is to blame?','No. Inheriting a variant is a biological process. It does not assign responsibility to a parent or child. A genetics professional can explain a specific pattern without making assumptions about the family.',sources.inheritance],
  ],
  testing:[
    ['What is the difference between a screening test and a diagnostic test?','Screening estimates the chance of selected conditions. Diagnostic testing examines whether a particular condition is present. The scope and limits depend on the specific test.',sources.diagnosis],
    ['Does a positive screening result mean my baby definitely has the condition?','No. False positives occur. A clinician or genetic counselor can explain the finding and discuss diagnostic options in the context of your preferences.',sources.screening],
    ['Does a low-risk screening result rule out every condition?','No. It lowers the estimated chance of the conditions the screen targets. Conditions outside its scope and false negative results remain possible.',sources.choice],
    ['What can prenatal tests tell us about a child’s future support needs?','Some findings can help families plan care, but tests cannot fully predict a person’s abilities, experiences, or support needs. Effects vary between conditions and between people with the same condition.',sources.diagnosis],
    ['What can I ask a clinician or genetic counselor after receiving a result?','Ask what the test looked for, what remains uncertain, and which options you can discuss next. The answer depends on the test, clinical context, and your preferences.',sources.diagnosis],
    ['What if I decide I do not want prenatal testing?','You can choose to decline testing after discussing its benefits and limits. Your care team can explain how prenatal care will continue and revisit questions if you wish.',sources.choice],
  ],
  support:[
    ['How can I support my child or family member in a way that respects their preferences?','Ask what support they want and how they prefer to communicate. Include them in decisions, adapt routines and environments with them, and seek appropriate professional or community support. Preferences and support needs can change over time.','https://www.who.int/news-room/fact-sheets/detail/disability-and-health'],
  ],
};
export default function FamilyFAQs({topic}:{topic:keyof typeof groups}){
  return <section className="panel family-faqs"><h2>Questions families ask</h2>{groups[topic].map(([question,answer,source])=><details key={question}><summary>{question}</summary><p>{answer}</p><a href={source}>Read the source</a></details>)}</section>;
}
