# Agent instructions

Project files for this work are in `C:\Users\taylo\Documents\github\vue-wordpress-pwa`.

## Approach

- Prefer simple approaches. Use the least code and the fewest new dependencies that solve the problem.
- Write unit tests for new features that are reasonably easy to test (pure functions, store getters, utilities, build-script logic). Put them in `tests/unit/*.spec.js` and run `npm test`.
- Do not add tests for code that is impractical to unit test (visual layout, service worker behavior); verify those manually instead and say so in the PR.

## Pull requests

- Describe the overall approach in the PR body: what problem is being solved, the chosen approach and why, and any alternatives rejected.
- List what was verified (for example `npm test`, `npm run lint`, `npm run build`, manual checks).
- Include `Closes #N` when resolving an issue.
