# Trustpilot in the Age of AI

## Verification, attestation, and the questions a 19-year-old trust institution must now answer

*Strategic prep memo — for internal use ahead of the board conversation. Grounded analysis, not a pitch.*

---

## 1. Why this memo

You are about to sit across from someone who has spent years inside the governance of the world's most visible consumer-trust platform. To get value from that conversation, it helps to model the business the way he does — not as "a reviews website," but as a **verification and attestation institution** with a specific franchise, a specific structural vulnerability, and a specific set of unsolved problems that AI has just made urgent.

This memo does three things: (1) frames what Trustpilot actually is and the job it does in the internet economy; (2) lays out the questions an AI inflection forces onto that business; and (3) reasons about how a long-tenured Trustpilot director is likely to perceive a company like Jackknife when he looks at it through the lens he has spent years developing. The goal is not to find a partnership — it is to let you anticipate his instincts, his reflexes, and his skepticism.

---

## 2. What Trustpilot actually is

Trustpilot, founded in Denmark in 2007 and listed on the London Stock Exchange since March 2021, is usually described as a review site. That description undersells it. Its real product is an **attestation**: a machine- and human-readable claim that *a real person had a real experience with a real business.* Everything else — the star ratings, the TrustScore, the widgets businesses embed on checkout pages — is packaging around that single primitive.

Three design choices define the franchise:

- **It is an open platform.** Any consumer can review any business they've genuinely dealt with, for free. A consumer can even create a business's profile before the business itself shows up. Any business can claim its profile and respond at no cost. Openness is the source of Trustpilot's coverage and its credibility — consumers, not businesses, control the content — and it is simultaneously the source of its single greatest liability: an open intake is an open door for fraud.

- **Verification is a spectrum, not a gate.** A review becomes "verified" when it can be tied to a confirmed transaction — typically when a business sends an invitation to the email on a real order, uploads a customer list, or supplies proof of purchase during a dispute. But the platform deliberately also accepts organic, unverified reviews. This is the central tension of the whole business: the more it insists on verification, the more coverage and openness it sacrifices; the more open it stays, the more authenticity it must police.

- **TrustScore is a synthesized signal, not a raw average.** The score weighs volume, recency, and a Bayesian-style prior (new businesses are seeded toward the middle so a handful of reviews can't manufacture a perfect score). In other words, Trustpilot is already in the business of *manufacturing a trust signal from noisy inputs* — which is exactly the capability that becomes contested when the inputs can be synthesized at zero cost.

- **The money comes from the supply side.** Consumers pay nothing. Revenue is overwhelmingly B2B SaaS: tiered subscriptions that unlock invitation scaling, analytics, comparison tools, widgets, and API access. This is worth holding in mind, because it creates the franchise's permanent reputational hazard: the businesses being rated are the ones writing the checks. Trustpilot's entire brand equity rests on the market believing that this funding does not buy favorable treatment.

---

## 3. Trustpilot's role in the internet age

Commerce runs on trust, and trust historically rode on mechanisms that the internet quietly destroyed: repeat local relationships, physical reputation, word of mouth inside a bounded community. When transactions went online — disembodied, one-shot, between strangers separated by geography — those mechanisms stopped working. The result was a structural **trust gap**, and a class of intermediaries emerged to fill it: payment escrows, marketplace ratings, and independent review platforms like Trustpilot.

Trustpilot's particular bet was to be a *horizontal, independent* trust layer — not the captive rating system of a single marketplace (Amazon's reviews, an App Store's stars), but a cross-industry institution whose value depended precisely on its perceived independence from any one seller. That independence is the moat. It is also why every fake-review scandal is existential rather than cosmetic: the asset being protected is not content, it is *credibility of attestation.*

Two forces now shape that role:

- **Regulation is codifying Trustpilot's job into law.** The U.S. FTC's final rule banning fake reviews and testimonials took effect in October 2024, with civil penalties reaching tens of thousands of dollars per violation. The UK's Digital Markets, Competition and Consumers Act brought its fake-review prohibitions into force in April 2025, and — critically — imposed a *positive duty* on anyone publishing consumer reviews to take reasonable and proportionate steps to prevent and remove fakes. This is both a tailwind (the law now mandates the thing Trustpilot sells) and a threat (the law now holds the platform liable for failures it cannot fully prevent).

- **The authenticity war is the permanent state of the business.** Trustpilot's own 2025 Trust Report disclosed that it removed roughly 4.5 million fake reviews in 2024 — about 7% of all submissions — with around 90% caught automatically by machine-learning, neural-network, and graph-based detection models screening on the order of 200,000 reviews a day. Read that number two ways. It is a genuine achievement. It is also a confession: fraud at industrial scale is not an edge case on this platform, it is the weather. And that figure describes the world *before* generative models made fabrication trivial.

---

## 4. The AI inflection — what actually changes

AI does not gently disrupt a verification business; it attacks both sides of it at once.

**On the supply side, the cost of plausible fabrication collapses.** A fake review used to require a human to write something convincing. Generative models produce unlimited, idiomatic, individually varied, demographically plausible reviews for nothing. The detection signals Trustpilot has relied on — repetition, templated language, behavioral patterns — degrade as the fakes stop looking fake. The 4.5-million number is a floor, not a ceiling, and the arms race becomes AI-versus-AI, with the defender structurally disadvantaged because it must be right every time and the attacker only needs to win sometimes.

**On the demand side, the consumer of the trust signal is changing from a human to an agent.** When people researched a purchase, they read prose, weighed star ratings, formed a gut feel — and they visited Trustpilot's website to do it, which is how Trustpilot captured attention and value. As AI agents and answer-engines increasingly mediate purchasing, two things happen. First, agents don't want paragraphs; they want a structured, queryable, verifiable trust *primitive* they can act on. Second, if an LLM summarizes "is this business reputable?" inside a chat interface, the destination visit — and the associated value capture — may never happen. Trustpilot risks being *read* by the machine but not *visited* by the human.

The deepest implication: the **unit of trust may be shifting** — from the *review* (human-authored prose, abundant, now cheaply faked) to the *attestation* (a verified, provenance-backed, machine-readable claim about a real event). A business built on the first unit has to ask whether its future is in the second.

---

## 5. The questions Trustpilot must be asking itself

These are the questions your counterpart has almost certainly wrestled with in board sessions. Knowing them lets you meet him where he already lives.

1. **Detection or provenance?** For 19 years the strategy has been *detect the fakes.* When fakes become indistinguishable from real, does the franchise have to invert — from *proving things are false* to *proving things are real*? That is a pivot from content moderation to identity and provenance, and it is a different company.

2. **Should verified reviews displace open ones?** Verification anchored to a real transaction is the one signal that holds up against synthetic content. But tightening toward verified-only erodes the openness and coverage that built the network. How much of the moat are they willing to trade for integrity they can defend?

3. **What is Trustpilot's primitive for an agent?** If the consumer is increasingly a machine, what does Trustpilot expose — an API, a signed credential, a trust score an agent can query and rely on? Is the company a destination website or a trust oracle? Those imply very different roadmaps and very different valuations.

4. **Disintermediation by the answer layer.** If ChatGPT, Gemini, and shopping agents answer the reputation question inside their own surfaces, where does Trustpilot capture value — licensing data into the models, becoming the cited source of record, or losing the consumer touchpoint entirely?

5. **Liability as cost or as wedge.** Now that the FTC and the CMA make platforms accountable for fake reviews, compliance is no longer optional overhead. Does that asymmetry favor the incumbent with the best detection — turning regulation into a moat — or does it expose the platform to liability for a problem AI is making unwinnable?

6. **The independence problem, intensified.** The supply side pays the bills. In an environment of rising fraud and rising regulatory scrutiny, can the perception of independence survive — and does AI-driven enforcement help (objective, consistent) or hurt (opaque, contestable) that perception?

7. **The scope of trust.** Trustpilot verifies *businesses* — the counterparty to a transaction. Is that the boundary of the franchise, or is there a wider trust graph (identities, transactions, *outcomes*, assets) that the same core competence could attest? Every verification company eventually faces the question of what else it is allowed to vouch for.

---

## 6. How a long-tenured Trustpilot director will likely see Jackknife

He will not evaluate Jackknife as a homeowner app. He will reflexively map it onto the framework he knows best: *a trust intermediary in a low-trust market.* Home services is a textbook case — high stakes, infrequent transactions, acute information asymmetry, strangers in your house — exactly the conditions under which reputation systems create value. He will grasp the category instantly. The interesting part is the specific axes on which his experience will make him lean in, and the ones on which it will make him skeptical.

**Where his instincts will make him nod (similarities he respects):**

- Both are trust infrastructure that fights information asymmetry, not media businesses.
- Both monetize the supply side (businesses / contractors) while keeping the consumer free — a model he understands in his bones.
- Both live or die on **data integrity**, and both face the cold-start / coverage problem that every network-effect trust business confronts early.

**Where his experience becomes a sharp lens (differences he will probe):**

- **Self-reported vs. evidence-grounded.** This is the point most likely to make him sit up. He has spent years fighting fakeable, self-asserted prose. Jackknife's core data starts from a *photo*, reconciled against authoritative sources (manufacturer specs, warranty terms, the federal CPSC recall database). That is provenance — the very property he wishes reviews had. Expect genuine interest here, *immediately followed* by the reflex question: how much is truly evidence-anchored versus still user-asserted, and how do you stop it from being gamed?

- **Verified outcome vs. verified purchase.** Trustpilot's strongest signal is "this was a real purchase." Jackknife tracking a repair from diagnosis to completion is a *verified outcome on a verified asset* — a level he has only ever been able to proxy for. He will recognize it as the holy grail and, in the same breath, interrogate how completion is actually confirmed and who could fake it.

- **Open ubiquity vs. narrow depth.** His platform's power is being everywhere and open to everyone. Jackknife is deliberately narrow — one asset class, one workflow, one region today. He will ask the network-effects question directly: *is this a data utility with compounding advantage, or a vertical feature an incumbent could clone?* Have a crisp answer about where the defensibility accrues (proprietary, evidence-grounded data that gets richer per home over time).

- **The independence hazard — turned on you.** This is his most predictable and most pointed reflex. He has lived the reputational knife-edge of *the rated party pays the platform.* The instant he hears "contractors pay for matches," he will apply the same scrutiny he applies to paid review placement: does the payment bias the recommendation, and does the *perception* of bias corrode consumer trust? Be ready to defend Jackknife's independence story the way he defends Trustpilot's.

- **Data sensitivity and regulation.** He has lived through review regulation; he will instinctively think about liability, data ownership, and privacy. He will note that home data is far more sensitive than a public business review, and he will read Jackknife's "we don't sell your data" stance as *both* principled and a deliberate constraint on monetization — a tradeoff he will want to hear you reason about, not gloss over.

**The net of his lens:** he will judge Jackknife on the same four axes he judges his own company — integrity of the data, defensibility of the network, independence of the monetization, and machine-readability of the trust signal. On the first axis Jackknife arguably scores *better* than Trustpilot (evidence beats prose); on the others he will press hardest, because those are the places his own company has bled.

---

## 7. What to carry into the room

- **Lead with provenance.** Open on the thing he privately wishes he had — evidence-grounded, source-reconciled data — because it speaks directly to the problem that has defined his tenure.
- **Pre-empt the independence question.** Don't wait for him to raise the "contractors pay you" hazard. Name it first and show you've thought about it more rigorously than the platforms he's watched stumble.
- **Speak his AI anxiety.** Frame the shift from *review* to *verified attestation* as the industry-level move; it signals you understand that the unit of trust itself is changing, which is the conversation he's actually having internally.
- **Ask him his own questions.** The seven in Section 5 are his questions. Putting two or three of them to him — genuinely, not rhetorically — is the fastest way to be treated as a peer who understands the trust business rather than a founder pitching an app.

---

*Sources: Trustpilot corporate "How Trustpilot Works" and Trust Report 2025 (4.5M fake reviews removed in 2024; ~90% via automated detection; ~200k reviews/day); Trustpilot Wikipedia and IPO coverage (founded 2007, Denmark; LSE listing March 2021); U.S. FTC final rule on consumer reviews and testimonials (effective Oct 21, 2024); UK Digital Markets, Competition and Consumers Act 2024 fake-review provisions (in force April 6, 2025). Figures are as disclosed by Trustpilot and contemporaneous reporting; treat platform self-reported numbers as directional.*
