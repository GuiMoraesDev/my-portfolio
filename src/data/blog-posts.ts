export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: number;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-stopped-adding-abstractions",
    title: "Why I stopped adding abstractions",
    date: "2025-01-10",
    summary:
      "Three abstraction mistakes I made in the same codebase — and what changed after each one.",
    readingTime: 5,
    content: `
<p>There is a phase in every engineer's growth where abstraction feels like progress. You spot a pattern, you extract it, you feel good. The code is shorter. It looks clean. You move on.</p>

<p>I went through that phase. I added abstractions freely — hooks that wrapped hooks, utilities that wrapped utilities, components that accepted twenty props to handle twenty cases. Each one felt justified at the time. Looking back, most of them were not.</p>

<h2>The first mistake: abstracting before you understand the problem</h2>

<p>Early in a product, I noticed three forms that looked similar. Same layout, similar validation, slightly different fields. I built a generic <code>FormFactory</code> component. It was flexible. It accepted a schema, a submit handler, a set of field configs.</p>

<p>Two months later, each form had diverged significantly. Different UX requirements, different error handling, different edge cases. The <code>FormFactory</code> had grown to 400 lines with enough conditional logic to handle every variation. Changing one form meant understanding how the abstraction affected the other two.</p>

<p>What I should have done: keep three separate forms. Duplicate the layout. When the real shared pattern emerged — and it did, eventually — then extract it.</p>

<h2>The second mistake: abstracting to avoid repetition, not to communicate intent</h2>

<p>I had a set of similar API calls. Each fetched data, handled loading and error states, returned a typed result. I built a <code>useQuery</code>-style hook that wrapped all of them. Clean, consistent, four lines per endpoint.</p>

<p>The problem: the abstraction communicated nothing about what was actually happening. When a new engineer joined and needed to debug a failed request, they had to trace through the generic layer before they understood what was specific to that endpoint. The abstraction saved lines. It cost comprehension.</p>

<p>I kept the pattern but added one rule: every abstraction must make the callsite read like a sentence about the domain, not about the implementation. If your abstraction leaks the implementation, it is just indirection.</p>

<h2>The third mistake: not deleting abstractions that stopped being useful</h2>

<p>This is the quietest failure mode. The abstraction made sense when you wrote it. Then the requirements changed, the codebase evolved, the use cases narrowed to one. But the abstraction stays. It becomes a maintenance obligation with no payoff.</p>

<p>I now treat unused abstractions the same way I treat dead code. If a utility is called from one place and its interface adds no clarity, I inline it. Deletion is a refactor too.</p>

<h2>What I do now</h2>

<p>I let patterns repeat two or three times before I extract anything. When I do extract, I ask: does this make the callsite easier to read, or just shorter? Short and confusing is worse than long and clear.</p>

<p>Abstractions are a bet on the future. Most of the time, the future surprises you. The simplest code is the one that is easiest to change when it does.</p>
    `.trim(),
  },
  {
    slug: "how-i-debugged-a-working-solution",
    title: "How I debugged a working solution",
    date: "2024-08-22",
    summary:
      "Tests passed. The code looked fine. Something was still wrong. A walkthrough of the process I use when the obvious tools fail.",
    readingTime: 6,
    content: `
<p>The bug report said the data was inconsistent. Users were seeing stale values after an update. Tests passed. The API returned the correct data. The frontend rendered what it received. Everything worked — except in production, for some users, intermittently.</p>

<p>That last word — intermittently — is where most debugging sessions get expensive. It means the problem has hidden state. The obvious tools do not work on hidden state.</p>

<h2>Step one: resist the urge to guess</h2>

<p>My first instinct was to look at the cache. We had caching at three layers: the CDN, the server response, and the client-side query cache. Cache invalidation is almost always the answer when you see stale data, so I jumped straight to auditing it.</p>

<p>I spent half a day on this and found nothing. The cache was working correctly. I had wasted time because I skipped the part where I actually observed the failure before forming a hypothesis.</p>

<p>The lesson I keep re-learning: do not debug a hypothesis. Debug what you can see.</p>

<h2>Step two: make the invisible visible</h2>

<p>I added logging to every state transition in the relevant flow. Not console.log — structured logging with timestamps and context: which user, which request, what the state was before and after each operation.</p>

<p>This is slower upfront. It is much faster than guessing.</p>

<p>Within an hour of deploying the logging, I had a reproduction. The pattern was clear: the issue only happened when two requests arrived within a specific window. The second request was completing before the first, but the UI was rendering the first response because of how the state updates were queued.</p>

<p>A race condition. Not a cache bug at all.</p>

<h2>Step three: fix the actual problem, not the symptom</h2>

<p>The easy fix was to add a timestamp to each response and discard responses older than the current render. This would have worked. It also would have hidden the real problem: the requests were not being cancelled when superseded.</p>

<p>I fixed the root cause instead. Each outgoing request now holds a reference, and when a new request starts, the previous one is aborted. The UI never receives a stale response because stale responses are never completed.</p>

<h2>What made this hard</h2>

<p>Race conditions are hard to debug because the failure depends on timing, not logic. You can read the code a hundred times and not see it. The only reliable way to find them is to observe the system under realistic conditions — real concurrency, real network latency — and look for patterns in the failures.</p>

<p>The debugging process I used is not clever. It is just disciplined: observe before hypothesising, add observability before guessing, fix the cause before the symptom. Most bugs yield to this. The ones that do not usually have a simpler solution than you think.</p>
    `.trim(),
  },
  {
    slug: "the-refactor-that-made-things-worse",
    title: "The refactor that made things worse",
    date: "2024-03-15",
    summary:
      "A refactor that looked right on paper but slowed the team down. What I shipped, why it failed, and what I changed.",
    readingTime: 5,
    content: `
<p>I inherited a codebase with a lot of duplicated logic. Similar patterns in multiple places, slightly different implementations, no shared source of truth. The obvious move was to centralise everything. I spent two weeks on a refactor to do exactly that.</p>

<p>Six weeks later, the team was slower than before. New features took longer to ship. Small changes required touching multiple layers. The code was cleaner by some metrics and harder to work with by every practical one.</p>

<h2>What I built</h2>

<p>I extracted the duplicated logic into a set of shared utilities and higher-order components. Consistent interfaces, single implementations, better test coverage. On paper, it was an improvement. The duplicate code was gone. The shared layer was tested. Onboarding new engineers to the patterns would be easier.</p>

<p>What I did not account for: the duplicate code existed for reasons. Each version had small differences that reflected the specific requirements of its context. When I merged them into a shared layer, I had to handle all those cases in one place — with parameters, conditions, and escape hatches. The shared layer grew more complex with each use case it absorbed.</p>

<h2>The problem with premature unification</h2>

<p>Duplication and coupling are both costs. The question is which cost is lower for your specific codebase and team. I optimised for duplication reduction without calculating the coupling cost.</p>

<p>The coupling cost was high. Every change to the shared layer had to be safe for every consumer. Every consumer had to understand the shared layer before they could use it. Every new requirement had to fit the interface I had designed, or the interface had to be extended.</p>

<p>The duplicated code, by contrast, was isolated. You could change one instance without affecting the others. You could read one file and understand one flow completely. The cost was redundancy. The benefit was independence.</p>

<h2>What I changed</h2>

<p>I did not undo the refactor entirely — that would have been disruptive for its own sake. Instead, I identified the cases where the coupling was actively slowing things down and split them back out. Not into the original duplicate form, but into clearly-named, single-purpose modules that did not pretend to be generic.</p>

<p>I kept the shared layer for the cases where the logic was genuinely identical and the interface was stable. I stopped trying to make everything share a single implementation.</p>

<h2>The rule I use now</h2>

<p>Before unifying two pieces of code, I ask: are these actually the same problem, or do they just look similar? Similar-looking code that solves different problems will diverge. Unifying it means you are building an abstraction for a pattern that does not exist yet — and may never exist.</p>

<p>Duplication is not always a problem. Sometimes it is the correct model for two things that happen to look alike today but will not tomorrow.</p>
    `.trim(),
  },
];
