Multi-vendor ecommerce project — suggested folder structure

This file documents the scaffold created under the project root. It is intentionally lightweight — add files, components and backend code as you start implementing features.

Top-level (created):
- src/                         # Frontend app (React + TypeScript in your project)
  - modules/                   # Feature modules (domain-centric)
    - vendors/                 # Vendor pages, components, hooks, and features
      - components/            # Vendor-specific UI (VendorCard, VendorDashboard)
      - hooks/                 # Vendor hooks (useVendor, useVendorProducts)
      - api.ts                 # Vendor API wrappers
    - products/                # Product listing, product detail, inventory
    - orders/                  # Orders and order history features
    - cart/                    # Shopping cart and checkout flows
    - auth/                    # Login, signup, social auth, permissions
    - admin/                   # Marketplace admin (approvals, reports)
  - components/                # Shared components across the app
    - common/                  # Buttons, inputs, modals, icons
    - layout/                  # Header, Footer, Nav, PageLayout
    - ui/                      # Design-system primitives (Badge, Tooltip)
  - pages/                     # Route-level pages (Home, Vendor pages, Product pages)
    - vendors/
    - products/
    - orders/
  - services/                  # Client-side service layer (api clients)
    - api/                     # Centralized API client, axios/fetch wrappers
  - hooks/                     # Reusable React hooks
  - types/                     # Shared TypeScript types and interfaces
  - utils/                     # Pure helpers and utilities
  - styles/                    # Global styles, theme, variables
  - assets/                    # Static images, vendor-logos, icons
  - tests/                     # Frontend tests (unit / integration)

- server/                       # Optional backend service (Node/Express, Nest, etc.)
  - src/
    - controllers/             # Request handlers
    - models/                  # ORM models or DB schema definitions
    - routes/                  # Express routes / routers
    - services/                # Business logic, vendor/product services
    - config/                  # Environment, db, secrets config
  - tests/                      # Backend tests

- infra/                        # Optional infra-as-code (Terraform, Bicep), deployment scripts
- docs/                         # Design docs, API contract, data models

Suggested initial files to add (examples):
- src/services/api/client.ts     # axios/fetch base client, interceptors (auth handling)
- src/modules/auth/hooks.ts      # useAuth, useSession
- src/types/index.d.ts           # User, Vendor, Product, Order, Pagination types
- server/src/routes/vendors.ts   # REST endpoints: /vendors, /vendors/:id/products
- server/src/models/vendor.ts    # Vendor schema (id, name, email, verified, etc.)

Design notes and recommendations
- Keep modules domain-centric: features dealing with vendors should live under `src/modules/vendors` so code stays grouped by responsibility.
- Centralize API calls in `src/services/api` and expose thin wrappers to modules — easier to swap adapters or add caching.
- Use `src/types` for shared TS types to keep frontend/backends in sync (consider generating types from API schema later).
- Marketplace-specific concepts:
  - Vendor onboarding: separate flows and statuses (pending/approved/rejected).
  - Multi-tenant product visibility: products are associated to vendor ids and owned by them.
  - Commission, payouts and reporting: plan `server/src/services/payments`.

Next steps I can do for you (pick any):
- Scaffold sample files (API client, a VendorCard component, a Vendor page) in `src`.
- Create initial backend endpoints and sample models (Node + Express + SQLite or Prisma schema).
- Add example TypeScript types for Vendor/Product/Order and small tests.

If you want me to scaffold sample files now, tell me which area to start with (frontend vendor page, checkout flow, or backend vendor API).