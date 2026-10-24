# Security Policy

## Supported versions

Only the latest release line receives security fixes.

## Reporting a vulnerability

Please report vulnerabilities privately: open a GitHub Security Advisory
("Security" tab → "Report a vulnerability") or email the maintainers listed
in the repository profile. Do **not** open a public issue for security
problems.

We aim to acknowledge reports within 72 hours and will coordinate a fix and
disclosure timeline with you.

## Scope notes

- The library renders caller-supplied data. `label`/`sublabel` text is
  HTML-escaped by the library; `detail` and custom `tooltip` output are
  inserted as trusted HTML **by design** — integrators must sanitize any
  untrusted input before returning it from those accessors.
- File a vulnerability only for issues in this project's code, not for
  integrator misuse of trusted-HTML accessors.
