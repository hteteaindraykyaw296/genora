# Free static hosting
Build command: `npm ci && npm run build`. Output: `out`. Node 22 or later. No environment secrets or APIs required.

## Netlify
Import the source repository, use the included netlify.toml, and deploy. Or upload out/ manually via Netlify Drop. Check current free-plan limits. No Python function is needed.

## Cloudflare Pages
Connect a source repository, choose Next.js static export, set build `npm run build`, output `out`, Node version 22. Alternatively upload out/ through Pages direct upload. Do not choose a server-rendered adapter. No account credentials are stored in this repository.

Before public release, review medical copy, audit references, obtain licensed real images if desired, and run browser accessibility/keyboard QA. A provider account is required to deploy to these providers and has not been configured here. No deployment to Netlify or Cloudflare Pages is claimed.
