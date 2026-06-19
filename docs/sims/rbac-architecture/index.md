---
title: RBAC Architecture
description: Mermaid layered diagram of role-based access control, showing users, roles with inheritance, permissions, and the authorization flow when a chatbot processes a query.
image: rbac-architecture.png
og:image: rbac-architecture.png
status: draft
library: Mermaid
---

# RBAC Architecture

**Role-Based Access Control (RBAC)** decides what a user is allowed to do by
assigning them *roles*, and granting *permissions* to those roles. This diagram
shows the three RBAC tiers — **users**, **roles** (with inheritance), and
**permissions** — and the eight-step **authorization check flow** a chatbot runs
when Alice asks *"Show me team sales for Q4"*. Hover over any user, role, or
permission for details.

## Interactive Demo

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

You can embed this MicroSim in your own page with the following iframe:

```html
<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>
```

## Overview

The diagram has three horizontal tiers and two kinds of connections:

1. **User layer** (blue) — Alice, Bob, Carol, and Dan, each an employee.
2. **Role layer** (green) — Employee (the base role), Sales Rep, Sales Manager,
   HR Specialist, Finance, and standalone Admin. **Dashed arrows** show
   *inheritance*: Sales Manager inherits from Sales Rep, which inherits from
   Employee.
3. **Permission layer** (orange) — fine-grained rights like `read_team_sales`,
   `read_pii`, `approve_discounts`, and the `*` wildcard held only by Admin.

**Solid arrows** are direct user→role *assignments* and role→permission *grants*;
**dashed arrows** are role→role *inheritance*. Because permissions flow down the
inheritance chain, a Sales Manager automatically gets everything a Sales Rep and
an Employee can do, plus their own.

The **Authorization Check Flow** in the right panel walks the runtime decision:
the system identifies Alice, gathers her roles, resolves the full permission set
through inheritance, checks that `read_team_sales` is present, and grants the
query.

## Lesson Plan

- **Resolve a permission set:** Have students list every permission Alice has by
  following her inheritance chain.
- **Trace a denial:** Ask whether Bob (Sales Rep) could run "approve a discount"
  and explain why or why not.
- **Compare inheritance vs. direct grant:** Why is inheritance useful instead of
  granting each permission to each role directly?
- **Reason about Admin:** What are the risks of the `*` wildcard, and how should
  it be protected?

## References

- [Chapter 13: Security, Privacy, and Users](../../chapters/13-security-privacy-users/index.md)
- [Role-based access control (Wikipedia)](https://en.wikipedia.org/wiki/Role-based_access_control)
- [Principle of least privilege (Wikipedia)](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
