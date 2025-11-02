import HistoryNavigation from './HistoryNavigation-CKW3YKnT.mjs';
import HistoryItem from './HistoryItem-CtJB_pWO.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/VueMarkdown.mjs';
import 'markdown-it';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'consola/core';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue3-toastify';
import '@iconify/utils/lib/css/icon';

const historyData = [
  {
    title: "Introduction",
    isTimeline: false,
    content: `35 years of working together for full rights and inclusion of people with intellectual disabilities and their families

The year is 1988. One of the most popular songs is Faith by George Michael. Movie fans are treated to Die Hard or Rain Man. The World Wide Web is the topic of some conversations among experts. Russia's Soviet empire rules over much of Europe, even though its cold fingers <a target="_blank" href="https://en.wikipedia.org/wiki/Solidarity_(Polish_trade_union)">have started</a> to <a target="_blank" href="https://en.wikipedia.org/wiki/Singing_Revolution">lose</a> their grip. The European Union, then called the European Communities, recently welcomed Spain and Portugal among its members. <a target="_blank" href="https://erasmus-plus.ec.europa.eu/about-erasmus/what-is-erasmus">Erasmus</a> is 1 year old. We have <a target="_blank" href="https://en.wikipedia.org/wiki/A_Brief_History_of_Time">A Brief History of Time</a>.

The year is 1988, and 9 national organisations representing families of people with intellectual disabilities come together to form an organisation that would carry their work for full rights and inclusion on to the European level. They know that working together makes tackling the issues they face easier. Stereotypes, discrimination, segregation don't stop at national borders, nor do they hurt differently in different countries. Let's join forces then, they say. We can all benefit from learning about each other, sharing what works, and finding common ground around things that are hard to overcome.

That's how Inclusion Europe came to be.`
  },
  {
    title: "35 years of progress",
    isTimeline: false,
    content: `The past 35 years have seen some significant, sometimes radical progress for the estimated more than 20 million people with intellectual disabilities and their family members in Europe.
A child with intellectual disabilities born in 1988 faced very different prospects compared to one born in 2023. Now, the child's family is much likelier to get support when the child is born. The child is likely to go to school, often to a mainstream school with non-disabled children. In many countries in 1988, this child would be taken away from their family and placed into an institution. The political and social change that allowed <a target="_blank" href="https://www.inclusion-europe.eu/parents-no-longer-have-to-hide-their-children/">many mothers to say</a> "No, I want to take care of my child and bring her up the best I can, just like any other parent", was still something most people couldn't even imagine.`
  },
  {
    title: "Many still left behind",
    isTimeline: false,
    content: `This isn't to say today is perfect. Far from it.

For all the progress achieved, there are still painfully many who don't get to enjoy it.

<ul><li>Hundreds of thousands of people with intellectual disabilities are forced to live in segregated "care" institutions.</li><li>Families being isolated, left to be "care providers", or care administrators, managers\u2026 Far from just living as a family.</li><li>Lack of education prospects for many, and even less opportunities to contribute and to earn own money on a good job.</li><li>Exclusion from places, organisations, events where important decisions about people with intellectual disabilities and their families are made.</li></ul>That's what life in Europe looks like for many people with intellectual disabilities and their families.

That's what fuels the relentless advocacy of people with intellectual disabilities, family members, and all kinds of friends to the movement - the desire to overcome injustice, to ensure that every-one gets to enjoy their full rights and inclusion.`
  },
  {
    title: "Missing voices",
    isTimeline: false,
    content: `We learn of injustice and of overcoming it by listening to stories of people with intellectual disabilities and family members. Of people who tell about how they suffered segregation, and how they found their way out of it. How they deal with their isolation and exhaustion, how they create the best possible life for their children.

Listening to such stories, learning from them - and most importantly giving them a platform to sound as loud as possible is one of the most important jobs we have at Inclusion Europe.

But, there are also many people whose stories we don't hear. Nobody does. The people living these stories never get a chance to tell anyone.<ul><li>Stories of people left in "care" institutions, without any connection to the world outside, while public authorities and service providers come up with yet another excuse for perpetuating their segregation.</li><li>Stories of people who do not get to join and participate in self-advocacy and connecting with others, because this is somehow always at the bottom of any funding list</li><li>Stories of family members too exhausted trying to manage daily demands of child-care, disability support management, constant need to fight for whatever it is that day that must be fought for.</li></ul>We know there are many stories like this out there, and they need to be heard.

Because these are the stories that will finally lead Europe from its dreadful habit of segregating people with intellectual disabilities.

And that's what we do next:<ol><li>Making sure every possible self-advocate and family member can tell their story face to face with those who need to hear it.</li><li>Bringing the best advocacy and research into European decision-making to influence where it matters with expertise that makes a difference.</li><li>Working together to change peoples' lives: From self-advocacy, through deinstitutionalisation, to anything else that'll end segregation.</li></ol>We have a good background to build on. Over the past 35 years we've played a role in establishing self-advocacy presence at European level; In developing easy-to-read as a way of making information accessible for all; In advocating for transition from institutions to support in the community. As a movement of people with intellectual disabilities, family members, and friends, we are in a position to make #EndSegregation happen.

There's no doubt why it needs to happen, and we know how to do it too. What needs to be done is to match our approach with our ambition.

Full rights and inclusion for every person with intellectual disabilities in Europe. No isolation of their families.

Those are big asks - we need to be big and to act big to achieve them..

We need the best lawyers, the loudest campaigners, and the shrewdest lobbyists. If you want to help us finally end segregation in Europe, donate here.`
  },
  {
    title: "Inclusion Europe",
    isTimeline: true,
    content: `## 1988: Inclusion Europe established

OK, the original name was different (we'll become Inclusion Europe in 2000), but we need to keep this short and catchy, which the original name surely wasn't (and that's not its only problem): ILSMH-EA, short for "International League of Societies for the Mentally Handicapped - European Association".

The organisation was established during a meeting in Gourock, Scotland, in May 1988.

Our founding members are (current names):<ul><li>ANAHM, Belgium;</li><li>Plena inclusi\xF3n, Spain;</li><li>Unapei, France;</li><li>Mencap, UK;</li><li>Enable, Scotland;</li><li>Inclusion Ireland;</li><li>Ligue HMK, Luxembourg;</li><li>FvO, Netherlands;</li><li>Lebenshilfe, Germany.</li></ul>**Tom Mutters** was elected as the first president of the organisation.
## Prequel - 1960: The European League of Societies for Persons with Mental Handicap was founded in London.

All right, we might be a touch older than we like to admit. The fact is, in 1960 several European organisations came together for the first time to form a European organisation representing families of people with intellectual disabilities.

Soon after, countries from other continents requested to join, and in 1962 the organisation became The International League of Societies for Persons with Mental Handicap (ILSMH).

The ILSMH had a 'Committee on European Affairs.'  And with the growing significance of European level policies, which was and remains a quite unique situation compared to other regions of the World, it made a lot of sense to create a separate organisation focused solely on Europe. Inclusion International and Inclusion Europe became two separate, but closely related and collaborating organisations in 1988.

Back to early 1990s Europe then, where <a target="_blank" href="https://www.inclusion-europe.eu/parents-no-longer-have-to-hide-their-children/">things</a> are <a target="_blank" href="https://www.inclusion-europe.eu/parents-no-longer-have-to-hide-their-children/">happening</a>; some of them <a target="_blank" href="https://www.inclusion-europe.eu/parents-no-longer-have-to-hide-their-children/">tragic</a>.

Inclusion Europe is busy bringing people and organisations together to change Europe for the better for people with intellectual disabilities.

**Iain McMurray** from Scotland elected president in 1992.

**John O'Gorman** from Ireland elected president in 1995.

**Th\xE9r\xE8se Kempeneers-Foulon** from Belgium elected president in 1998.
## 2000: ILSMH-EA. Inclusion Europe!

Told you.

This year saw also the first issue of our Include newsletter. Informing about news within the movement, and about all kinds of developments relevant to people with intellectual disabilities and their families, this newsletter keeps on providing value both to those who subscribe to read it in their inbox, or online as Include News.

**Francoise Jan** from France elected president in 2001.

**Ingrid K\xF6rner** from Germany becomes president in 2006.

**Ivo Vykydal** from Czechia becomes president in 2010.

**Maureen Piggot** from the UK elected president in 2011.

**Jyrki Pinomaa** from Finland becomes president in 2018.`
  },
  {
    title: "Self-advocacy",
    isTimeline: true,
    content: '## 1997: The first European Meeting of Self-Advocates takes place in Durdent Court, UK.\n\nAfter a period when parents lead and decided about things in the international organisations, it became clear such way of doing things is not fair not sustainable. At a European conference of Inclusion International in 1985 in Hamburg, self-advocates protested the way they were being treated in the programme, and demanded equal participation. Further developments culminated in a first meeting by and for self-advocates at European level, in Durdent Court, UK, in 1997.\n\nDuring this meeting, a Steering Group of self-advocates was created to discuss establishment of a European Platform with a democratic structure. This would come true in 2000 when the European Platform of Self-Advocates was established as part of Inclusion Europe.\n## 2000: The European Platform of Self-Advocates is established as part of Inclusion Europe.\n\nInclusion Europe changes from strictly family-based organisation to a mixed organisation where both the voices of people with intellectual disabilities and of families are represented.\n\nEPSA, the European Platform of Self-Advocates, ensures our work is inclusive and accessible. EPSA also creates opportunities for self-advocates to work together and be heard at European level.\n\nEPSA appoints 3 board members of Inclusion Europe, and the chair of EPSA is vice-president of the organisation.\n\nToday, EPSA has 20 member organisations and groups from 17 countries.\n\n**Ulla Topi** from Finland becomes EPSA chairperson in 2001.\n> We want to be treated as independent human beings.\nWe want people to take our hopes and needs seriously.\nWe want our rights.\n\nUlla Topi\n## 2000: Gianina Gendelon is the first self-advocate to speak in the European Parliament.\n\nGianina spoke about what life looked like in institutions in Romania.\n## 2003: First conference of the European Platform of Self-Advocates\n\nIt was called "Empowerment. Together against Discrimination!"\n\nMore than 80 self-advocates and supporters from all over Europe participated at this conference in Brussels, Belgium.\n## 2005: Several new self-advocacy groups\n\nInclusion Europe worked with other organisations to support self-advocacy in Czechia, Estonia, Hungary, Latvia, Lithuania, Poland, Slovakia, and Slovenia. Many people with intellectual disabilities received training to become self-advocates. Self-advocacy groups were created based on this work.\n## 2006: Andrew Doyle from Scotland becomes EPSA chairperson.\n> Having control over our own life is very important.\n> We must have a say about support provided to us.\n\nAndrew Doyle\n## 2007: Self-advocate tells the UN about legal capacity\n\nEPSA steering group member Zdenka Petrovik from Croatia speaks about legal capacity in the United Nations, Geneva.\n## 2007: Europe for Us\n\nEasy-to-read newsletter for self-advocates was created by EPSA.\n\nToday, Europe for us easy-to-read magazine is available in 8 languages, with 4 issues every year.\n## 2010: Self-advocate tells the UN about Inclusion and living in the community\n\nEPSA steering group member Senada Halil\u010Devi\u0107 from Croatia <a href="https://press.un.org/en/2010/hr5031.doc.htm" target="_blank">speaks</a> about moving out of an institution and living in the community at the UN General Assembly.\n## 2011: Hear our voices self-advocacy conference\n\nThe second conference of the European Platform of Self-Advocates took place in Peniche, Portugal. It was called Hear our voices.\n\nFollowing the success of this conference, EPSA decided to call all its meetings "Hear our Voices".\n## 2012: Senada Halil\u010Devi\u0107 becomes EPSA chairperson.\n> Independent living means...<ul><li>to choose your own way of living;</li><li>to make decisions;</li><li>to freely say your opinion;</li><li>good education and paid work;</li><li>to be protected from violence.</li></ul>\n\nSenada Halil\u010Devi\u0107\n## 2013: Hear our voices in Zagreb - Citizens First!\n\nThe 3rd European conference of self-advocates was held 2013 in Zagreb, Croatia. Marking the European Year of Citizens, people with intellectual disabilities took this opportunity to claim their right to participate in the European society as full and equal citizens.\n## 2015: Hear our voices in Madrid - My Life, My Decisions!\n\nThe 4th Hear our Voices in Madrid, Spain was the largest self-advocacy conference in Europe. There were more than 350 participants from 27 countries.\n## Trainings for self-advocates\n\nSince 2015, Inclusion Europe organised annual trainings of European leaders of the self-advocacy movement. Self-advocates and family members can deepen their knowledge and acquire skills that help them to better advocate for their rights. These trainings were organised in Brussels, and usually connected to meetings with members of the European Parliament or other representatives of the EU.\n\nFrom 2021, trainings for self-advocates are organised at national level to support the work of self-advocates in their countries, and to strengthen their participation in national decision-making.\n## 2017: Hear our voices: Strong, Loud and Clear!\n\nThe self-advocacy conference was held alongside the European Parliament of People with Disabilities and took place in Brussels, Belgium.\n## 2019: Hear our voices in Graz - My Voice Counts!\n\n150 self-advocates from 18 countries came to the conference in Graz, Austria. They come together to talk about how to be active in politics.\n\n**L\xE1szl\xF3 Bercse** becomes EPSA chairperson in 2019.\n> Segregation means people with disabilities are excluded from the community and cannot take part in everyday activities.\nI want us to live freely, like everyone else.\n\nL\xE1szl\xF3 Bercse\n## 2021: Hear our voices conference goes national\n\nBecause of restrictions of the Covid pandemic, the conference was held as a series of events organised either online or in person by Inclusion Europe members and partners in their countries.\n\n9 countries participated, with more than 300 participants in total.\n## 2023: Hear our voices in Tallinn - Make it Real!\n\nMake it real! manifesto was the result of this conference, which also featured self-advocate from Ukraine, who spoke about the situation during the Russian war.\n> We believe everyone has the right to enjoy life.\nWe believe everyone must have their rights respected.\nWe are not asking.\nWe are claiming our rights.\nHear our voices!\n## 2023: European Disability Parliament\n\n"I want people to treat me as an equal member of society," Tamara Byrne from Ireland said during the European Disability Parliament.'
  },
  {
    title: "Living independently and being included",
    isTimeline: true,
    content: `Our work on this topic started in 1991 with a visit to psychiatric hospital in Leros, Greece, where about 3,000 people (among them 1,100 people with intellectual disabilities) were incarcerated and maltreated. Many people died there under the harsh conditions. European Commission funded a project to change this situation, in which experts from Inclusion Europe members took part. This led to the adoption of Recommendations for Community-based Housing in 1991.
## 1991: Inclusion Europe recommendations for community-based housing

In this document, our members commit to work towards community-based living for people with intellectual disabilities.

The language was different at the time, but the goal and approach has always been to support people with intellectual disabilities to have a good life included in the community.

Our members received training on topics such as personal budgets or direct payments as a means to support person-centred services.
## 2000: Defending human rights of people with intellectual disabilities

8 Central and Eastern European countries build their capacity to better represent and defend the rights of people with intellectual disabilities thanks to our project which also covered the situation of people in institutions. As part of this work, Gianina Gendelon's testified in the European Parliament in Strasbourg about her life in Romanian institutions.

In 2002, we published 8 national reports on human rights of people with intellectual disability to reveal the situation in institutions. Ultimately, this work contributed to further advocacy and research (for example "Included in Society") about institutions, and the recognition of deinstitutionalisation as European issue.
## 2004: European Coalition of Community Living

Several European organisations started working together to promote the change from institutions to community-based support. Inclusion Europe was one of these organisations.

European research initiative "Included in Society" proved the extend of institutionalisation in almost all European countries. It gave indications about the conditions and human rights violations prevailing in institutions. The project was also the starting point for a close cooperation between many European and national disability NGOs with the aim to promote community-based services: The European Coalition for Community Living (ECCL) which was hosted during its first years in Inclusion Europe's offices.

This work would later continue within the EEG, contributing to the European Union recognising institutionalisation of people with disabilities and of children as serious issue, and changing some of its policies and funding rules.
## 2005:  International conference on deinstitutionalisation and community living

The conference focused on the question how quality community-based services can be created, run and monitored with the strongest possible involvement of the users of these services. It took place in Prague, Czechia.

The European Commission financed project "Deinstitutionalisation and Community Living: Outcomes and costs" (DECLOC) run by the Tizard Centre, University of Kent; Inclusion Europe was a partner.
## 2017: VAW report and methodology

Research on violence against women with intellectual disabilities, especially in institutions. And a methodology for addressing this issue.
## 2009-2023: Transition from institutions to community-based care

Our collaboration with disability organisations, service providers, and others led to several reports and tools advancing the topic in Europe.<ul><li>Report of the Ad Hoc Expert Group on the Transition from Institutional to Community-based Care (\u0160pidla Report), 2009</li><li>Common European Guidelines on the Transition from Institutional to Community-based Care, 2012</li><li>Toolkit on the Use of European Union Funds for the Transition from Institutional to Community-based Care, 2014</li><li>Report on the Transition from Institutional Care to Community-Based Services in 27 EU Member States, 2020</li><li>EU funds Checklist to promote independent living and deinstitutionalisation, 2021</li></ul>We continue to work within the EEG to advocate for transition from institutional to community-based care.`
  },
  {
    title: "Easy to read, and accessibility",
    isTimeline: true,
    content: '## 1998: Easy-to-read guidelines to make information accessible for all.\n\nEuropean guidelines of easy-to-read serve as the baseline for accessible information to this day. Many organisations have developed their own versions, incorporating various languages, and different ways of producing easy-to-read. Many, many people with intellectual disabilities have a job producing and reviewing accessible documents. How many have benefited from having easy-to-read information about important things?\n## 2001: Accessible events\n\nInclusion Europe publishes tools to make meetings and conferences accessible.\n## 2002: Easy-to-read logo by Inclusion Europe\n\nThe logo makes it easier to identify which documents are easy-to-read, created in line with the European guidelines.\n## 2020: Easy to read used by EU\n\n<a href="https://european-union.europa.eu/easy-read_en" target="_blank">What is the EU?</a>\n\n<a href="https://elections.europa.eu/en/easy-to-read/" target="_blank">European Elections</a>\n\n2023: Soufiane El Amrani talks in the <a href="https://www.facebook.com/IsraelinGeneva/videos/world-down-syndrome-day-un-geneva/1282895619241165" target="_blank">World Down Syndrome Day</a>, at the UN in Geneve, about the importance of Easy-to-Read.'
  },
  {
    title: "Right to decide and right to vote",
    isTimeline: true,
    content: `## 2003: Reports about justice and legal capacity

"Justice, Rights and Inclusion for People with Intellectual Disability" reports on access to rights and justice, the right to services and support and legal capacity and guardianship in 9 European countries.
## 2007: Citizen's rights for all

Europe in Action conference in Warsaw, Poland discussed legal capacity and best practice in supporting people in decision-making.
## 2014: Right to vote

Inclusion Europe campaigns to raise awareness of the fact that more than five million Europeans with intellectual disabilities at risk of not being able to vote or stand for election in the European elections.
## 2017: "What if everyone had to do a test to vote?!"

Inclusion Europe's board member Harry Roche speaks at the European Parliament for Persons with Disabilities.
## 2019: Progress on the right to vote, and visibility of people with intellectual disabilities

It is the year of European elections, and France, Spain, and Germany stop denying people under guardianship their right to vote.

Inclusion Europe election campaign video featuring people with intellectual disabilities is broadcast on the European Parliament during election night.`
  },
  {
    title: "Europe in Action conferences",
    isTimeline: true,
    content: "## 2003: First Europe in Action conference\n\nThe conference took place in Tallinn, Estonia, and was the first of what would become a regular meeting of families, self-advocates, professionals, academics and others interested in the topics important to people with intellectual disabilities.\n\nSo far, there have been 19 Europe in Action conferences, which always bring together self-advocates, family members, professionals, researchers and others interested in topics important to people with intellectual disabilities and their families. Europe in Action is the perfect occasion to learn about others, to share your own work, to recharge your commitment to inclusion, and to meet colleagues and friends.\n\nThe 20th Europe in Action takes place in Glasgow, Scotland in May 2024."
  },
  {
    title: "Highlights",
    isTimeline: true,
    content: `## 2003: "Me, Blue and You \u2026 against discrimination" exhibition tours Europe

The exhibition featured paintings by people with intellectual disabilities, focused on discrimination. It was on display in Greece, Slovenia, Germany, Sweden, Estonia, Finland, England, Scotland, France, Portugal, Spain, Belgium, the Netherlands, and Ireland. It was shown in quite prominent places, such as the Louvre in Paris, the Foreign Ministry in Germany, and the national Parliament in Slovenia and Portugal.
## 2009: Children's Rights for All!

Reports looking into the implementation of the UN Convention on the Rights of the Child and the rights of children with intellectual disabilities. The project highlighted the denial of rights of children with intellectual disabilities, as well as a lack of support, inclusion, and participation.
## 2014 & 2015: Awards for accessible information, and for accessible elections

Inclusion Europe receives the "Zero Project" awards for "promoting Europe-wide quality standards for accessible information for persons with intellectual disabilities" and for its guidelines for accessible elections.
## 2020: Successful complaint against Belgium

Segregation in schools is against the rights as protected by Social Charter of Council of Europe.
## 2020: European Parliament resolution on rights of people with intellectual disabilities

The Covid pandemic brought a lot of harm and distress to many people. People with intellectual disabilities faced lack of accessible information, problematic treatment in access to health care. Families were often left alone to provide care and support on their own as services closed. People living in institutions were placed in isolation, and at extra risk of Covid infection.

The European Parliament responded to Inclusion Europe campaigning with a resolution calling for protection of the rights of people with intellectual disabilities.
## 2022: Help in Ukraine

Inclusion Europe members, and the whole global community of organisations and people in Inclusion movement, showed strong solidarity with those who could not leave the country and the war-affected areas. Our emergency fundraiser provided 660,000 euros during the year, with first money being available to families in Ukraine just weeks after the invasion started.
## 2022: European Citizen's Award

My Talents. For Diversity project by Inclusion Europe, Plena inclusi\xF3n, Evpit, and Antwerp Management School received an award from the European Parliament.
## 2023: Complaint against France

Several aspects of the situation of people with disabilities in France contravene their rights protected by the Social Charter of the Council of Europe.
## 2023: Inclusion indicators

Half of EU countries don't allow some people to vote. 700,000 people are forced to live in harmful segregated institutional "care". Families are isolated and left to provide all support to family members with disability.

"This is the reality for millions of people," says Jyrki Pinomaa. "Despite the EU and all countries legally committing to rights and inclusion persons with disabilities, they deny them a good life and their basic rights.

"Governments don't even care enough to collect and provide data about the situation. But now, we have this information, and it is not a good look."

This new report shows information about 29 countries, 23 of them in the EU.`
  },
  {
    title: "European Union",
    isTimeline: true,
    content: `## 1957: The Treaty of Rome creates the European Economic Community

This would eventually become the European Union.
## 1979: First direct elections to the European Parliament

European citizens directly elect the members of the European Parliament for the first time. Previously members were delegated by national parliaments.
## 1993: The EU become the EU

The Treaty on European Union was signed in Maastricht, Netherlands in 1992. The Maastricht Treaty sets rules for the future single currency (euro), for foreign and security policy, and closer cooperation in justice and home affairs.

The 'European Union' is officially created by the treaty, which enters into force on 1 November 1993.
## 1993: The First European Disabled People's Parliament

Participants identify 3 types of discrimination: "direct discrimination, indirect discrimination and 'unequal burdens' imposed by socially constructed barriers."
## 1997: Amsterdam Treaty is the first European treaty to reference "disability"

Article 13 allows the EU to combat discrimination on various grounds, including disability.
## 2000: Directive for equal treatment in employment and occupation

Article 1: "The purpose of this Directive is to lay down a general framework for combating discrimination on the grounds of religion or belief, disability, age or sexual orientation as regards employment and occupation, with a view to putting into effect in the Member States the principle of equal treatment."
## 2009: EU Charter of Fundamental Rights

EU institutions, and national governments need to respect the Charter when drafting EU law and policy. National policymakers should respect the Charter when implementing EU law.

Article 21: "Any discrimination based on any ground such as sex, race, colour, ethnic or social origin, genetic features, language, religion or belief, political or any other opinion, membership of a national minority, property, birth, disability, age or sexual orientation shall be prohibited. Within the scope of application of the Treaties and without prejudice to any of their specific provisions, any discrimination on grounds of nationality shall be prohibited."
## 2010: EU becomes party to the UN Convention on the Rights of Persons with Disabilities

In 2007 the EU signed the UN CRPD, which is the first international human rights treaty ratified by the EU. From 2010 the EU is obliged to respect and fulfil the rights of people with disabilities as ratified in the CRPD.

EU member states must also fulfil the rights of people with disabilities, as they themselves ratified the CRPD too. In 2018, all EU members states have ratified the CRPD.
## 2010: European Disability Strategy 2010-2020

The strategy sets a framework for implementing the UN Convention and advancing the rights of persons with disabilities in the EU.
## 2016: Web Accessibility Directive

This Directive applies to public sector organizations of member states of the European Union. Its goals is to ensure that public sector website are accessible for people with disabilities in the EU.
## 2017: Pillar of Social Rights

The European Pillar of Social Rights defines 20 principles for the European Union to become more inclusive and fair. It was jointly approved by the European Parliament, the European Council, and the European Commission in November 2017 which means all institutions of the European Union and all of its member states support the principles and rights expressed in the declaration.
## 2019: European Accessibility Act

This directive aims to improve accessibility of products and services by removing country specific rules.
## 2021: European Disability Rights Strategy

The ten-year strategy sets out key initiatives around 3 main themes: EU rights; Independent living and autonomy; Non-discrimination and equal opportunities.
## 2021: EU Child Guarantee

The European Child Guarantee aims to ensure that every child in Europe who is at risk of poverty has access to essential services. Children with disabilities, and children in institutions are among the priority groups.
## 2023: EU joins Istanbul Convention

The Council of Europe document sets out to prevent violence against women and girls.`
  },
  {
    title: "Council of Europe",
    isTimeline: true,
    content: "## 1953: The European Convention on Human Rights.\n\nThe convention was the first instrument to implement some of the rights stated in the Universal Declaration of Human Rights and make them binding.\n## 2012: The European Court of Human Rights rules on right to liberty\n\nIn 2012 the Court ruled that the right to be free from torture and ill-treatment had been violated in the case of a person with a disability. It was also the first time the Court found the right to liberty had been violated in a social care case.\n## 2012: Accessible elections\n\nInclusion Europe prepared an easy-to-read document requested by the Council of Europe: Recommendations from the Council of Europe to European governments: How to make sure people with disabilities can take part in political and public life.\n## 2020: Complaint against Belgium because of segregation in education\n\nBy failing to make sufficient efforts to promote the inclusion of children with intellectual disabilities in ordinary primary and secondary education in French Community schools (Wallonia-Brussels Federation), Belgium is in breach of the Social Charter.\n## 2023: Complaint against France because of situation of people with disabilities\n\nSituation in France is not in conformity with provisions of the Social Charter to the lack of effective access for persons with disabilities to an autonomous and socially included life and the resulting impact on their families."
  }
];
const _sfc_main = {
  name: "HistoryPage",
  components: {
    HistoryNavigation,
    HistoryItem
  },
  data: () => ({
    shownItem: 0
  }),
  computed: {
    historyItems() {
      return [...historyData];
    }
  },
  methods: {
    showItem(i) {
      this.shownItem = i;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_history_navigation = resolveComponent("history-navigation");
  const _component_history_item = resolveComponent("history-item");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "history_page post_page" }, _attrs))} data-v-29115198><article data-v-29115198><header data-v-29115198><div class="header_texts" data-v-29115198><h1 data-v-29115198>History</h1></div></header><div class="history_container" data-v-29115198><div data-v-29115198>`);
  _push(ssrRenderComponent(_component_history_navigation, {
    items: $options.historyItems,
    onShowItem: $options.showItem,
    selected: _ctx.shownItem
  }, null, _parent));
  _push(`</div><div data-v-29115198><!--[-->`);
  ssrRenderList($options.historyItems, (item, i) => {
    _push(ssrRenderComponent(_component_history_item, {
      key: "history_item-" + i,
      title: item.title,
      content: item.content,
      style: _ctx.shownItem === i ? null : { display: "none" }
    }, null, _parent));
  });
  _push(`<!--]--></div></div></article></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/History/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-29115198"]]);

export { index as default };
//# sourceMappingURL=index-DBxijL-6.mjs.map
