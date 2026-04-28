**How I debugged a working solution**

A teammate asked for a review on a PR.
Everything looked fine at first glance—tests were passing, the fix “worked”, and the error was gone.

But something felt off.

---

### The “working” solution

The issue was failing unit tests with:

```ts id="c1"
TypeError: Invalid URL: /api
```

The proposed fix was to add a fallback:

```ts id="c2"
process.env.NEXT_PUBLIC_API_URL ??= "http://localhost:3000";
```

And it worked. Tests passed.

---

### Why I didn’t trust it

If the problem was really a missing environment variable, then **e2e tests should also be failing**—they rely on the same API layer.

They weren’t.

So either:

- unit tests were behaving differently
- or the fix was masking the real issue

---

### Step 1 — Reproduce locally

I ran the tests locally.

Same error:

```ts id="c3"
TypeError: Invalid URL: /api
```

But the `.env` file was correctly set.

So the problem wasn’t simply “missing env”.

---

### Step 2 — What actually broke first

The original failure came from this mock:

```ts id="c4"
jest.mock("@/services/api/api.user", () => ({
  UserRole: {
    User: "User",
  },
  UserStatus: {
    ACTIVE: "active",
  },
}));
```

There was no `getUser` implementation.

So the test setup itself was incomplete.

---

### Step 3 — A convincing but wrong fix

To fix that, `getUser` was added—and the tests started passing.

At the same time, another idea emerged:

> the problem might be caused by importing API-related code (like URL construction) too early

So the solution was to **extract types into a separate file** and import them from there.

This also made the tests pass.

But look at what happened:

- we changed the module structure
- we separated types from their source
- we introduced a new pattern in the codebase

All to fix a problem we didn’t fully understand.

At that point:

- tests were green
- but the system was drifting

Because the fix was based on an assumption—not on the actual root cause.

---

### Step 4 — Inspect the boundary

The real issue started here:

```ts id="c5"
jest.mock("@/services/api/api.user", () => ({
  getUser: jest.fn(),
}));
```

Jest doesn’t partially mock modules.

It **replaces the entire module**.

And this module exports:

- functions
- enums
- types

So anything not explicitly redefined becomes `undefined`.

---

### Step 5 — Fix the actual problem

Once that was clear, the fix was simple:

```ts id="c6"
jest.mock("@/services/api/api.user", () => ({
  UserRole,
  UserStatus,
  getUser: jest.fn(),
}));
```

Now:

- the module contract is preserved
- no duplication is introduced
- no architectural changes are needed
- and no fake environment fallback is required

---

### Takeaway

A passing solution isn’t always a correct solution.

In this case, the tests passed multiple times—for different wrong reasons:

- incomplete mocks
- architectural workarounds
- environment fallbacks

But none of them explained the system.

Debugging isn’t about making errors disappear.

It’s about finding a solution that:

- explains the behavior
- respects the system design
- and doesn’t introduce hidden inconsistencies
