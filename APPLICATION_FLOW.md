# Sansa - Multi-Vendor E-commerce & Investment Platform

A complete multi-vendor marketplace with integrated vendor financing. Built with React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## 🏗️ Platform Architecture

Sansa is a three-sided marketplace connecting:

1. **Customers** - Browse and purchase from multiple vendors
2. **Vendors** - Manage stores, products, and orders
3. **Lenders (Capital Partners)** - Invest in vendor growth and earn returns

## 🚀 Application Flow

### Authentication & Onboarding

#### Login Flow
- **Route**: `/login`
- **Features**:
  - Email/password authentication
  - Role-based redirect (customer → home, vendor → dashboard, lender → opportunities)
  - Quick demo accounts for testing
  - "Remember me" functionality
  - Forgot password link

#### Registration Flow
- **Route**: `/register`
- **Features**:
  - Role selection (Customer, Vendor, or Lender)
  - Visual role cards with feature lists
  - Email verification (simulated)
  - Automatic role-based dashboard redirect

### Demo Accounts
```
Customer: customer@sansa.com / password123
Vendor:   vendor@sansa.com / password123
Lender:   lender@sansa.com / password123
Admin:    admin@sansa.com / password123
```

## 📦 Module Breakdown

### 1. Customer-Facing E-Commerce (Public)

**Base Route**: `/`

#### Pages & Features:
- **Home** (`/`)
  - Hero banner with promotions
  - Platform quick access (if authenticated)
  - Product grid with filters
  - Category sidebar
  
- **Product Detail** (`/product/:id`)
  - Product images and description
  - Add to cart/wishlist
  - Vendor store link
  - Related products

- **Category Page** (`/category/:slug`)
  - Filtered product listings
  - Breadcrumb navigation
  
- **Vendor Store** (`/store/:vendorId`)
  - Public vendor profile
  - Vendor's product catalog
  - About vendor information
  
- **Shopping Cart** (`/cart`)
  - Cart management
  - Quantity updates
  - Remove items
  - Checkout button

- **Wishlist** (`/wishlist`)
  - Saved products
  - Quick add to cart
  - Remove from wishlist

- **Checkout** (`/checkout`)
  - Shipping information
  - Payment method
  - Order summary
  - Place order

- **Orders** (`/orders`)
  - Order history
  - Order status tracking
  - Order details

- **Order Detail** (`/orders/:id`)
  - Order items
  - Shipping status
  - Invoice/receipt

- **Account Settings** (`/account`)
  - Profile management
  - Saved addresses
  - Payment methods
  - Password change
  - Notification preferences

### 2. Vendor Dashboard (Protected - Vendor Role)

**Base Route**: `/vendor-dashboard`

**Features**:
- Protected routes (requires vendor role)
- Sidebar navigation with metrics
- Store performance analytics

#### Dashboard Pages:

**Overview** (`/vendor-dashboard`)
- Sales analytics (today, week, month)
- Revenue charts
- Top-selling products
- Recent orders
- Customer reviews
- Quick actions

**Products** 
- **Add Product** (`/vendor-dashboard/add-product`)
  - Product form (name, description, price, images)
  - Inventory management
  - Category selection
  - SKU generation
  
- **Manage Products** (`/vendor-dashboard/manage-products`)
  - Product list with search
  - Edit/delete products
  - Bulk actions
  - Stock status

**Orders** (`/vendor-dashboard/orders`)
- Order management
- Status updates (pending → processing → shipped → delivered)
- Order fulfillment
- Print shipping labels
- Customer communication

**Analytics** (Coming soon)
- Sales trends
- Customer insights
- Product performance
- Revenue forecasts

**Store Settings** (Coming soon)
- Store profile
- Business information
- Payout methods
- Shipping settings

### 3. Lender Dashboard (Protected - Lender Role)

**Base Route**: `/lender-dashboard`

**Features**:
- Protected routes (requires lender role)
- Investment portfolio management
- Capital deployment tools

#### Dashboard Pages:

**Overview** (`/lender-dashboard`)
- Portfolio summary
- Active investments
- Total returns (MTD, YTD)
- Recent activity
- Performance metrics
- Capital allocation chart

**Opportunities Marketplace** (`/lender-dashboard/opportunities`)
- **Search & Filters**:
  - Merchant strength score (300-900 range)
  - Funding amount range
  - Loan terms (3, 6, 9, 12 months)
  - Use of funds (inventory, marketing, equipment, etc.)
  - Vendor categories
  - Time on platform
  - Risk level
  - Status (available, funded, expired)

- **Opportunity Cards**:
  - Vendor information
  - Merchant strength score with grade (A+ to D)
  - APR and terms
  - Requested amount
  - Funding progress
  - Expected return
  - Risk assessment
  - "View Details" and "Invest" actions

- **Marketplace Stats**:
  - Available opportunities count
  - Available capital
  - Total requested
  - Average merchant score
  - New today
  - Expiring this week

- **Auto-Invest** (Foundation ready):
  - Create investment rules
  - Match criteria (score, amount, terms, use of funds)
  - Safety limits
  - Rule management

**Investments** (`/lender-dashboard/investments`)
- Active investments list
- Performance tracking
- Payment schedules
- Returns calculator
- Investment history

**Wallet** (`/lender-dashboard/wallet`)
- Available capital
- Deposit funds
- Withdraw returns
- Transaction history
- Payment methods

**Analytics** (`/lender-dashboard/analytics`)
- Portfolio performance
- Risk distribution
- ROI trends
- Vendor performance
- Diversification metrics
- Sticky header with tabs

**Documents** (`/lender-dashboard/documents`)
- Investment agreements
- Payment schedules
- Tax documents
- Receipts
- Contract management
- Sticky header with filters

### 4. Admin Dashboard (Protected - Admin Role)

**Base Route**: `/admin`

**Features**:
- Platform-wide management
- Vendor approvals
- System configuration

#### Admin Pages:

**Overview** (`/admin`)
- Platform statistics
- User growth
- Revenue overview
- Vendor approvals pending
- System health

**Vendors** (Coming soon)
- Vendor applications
- Approve/reject vendors
- Vendor performance monitoring

**Products** (Coming soon)
- Product moderation
- Flag inappropriate content
- Category management

**Orders** (Coming soon)
- Dispute resolution
- Refund management
- Order oversight

**Users** (Coming soon)
- User management
- Role assignment
- Account status

**Settings** (Coming soon)
- Platform configuration
- Payment gateway settings
- Commission rates
- Email templates

## 🔐 Authentication & Authorization

### AuthContext (`src/context/AuthContext.tsx`)

**Features**:
- User authentication state management
- Role-based access control
- Protected routes
- Role switching (for multi-role users)
- LocalStorage persistence

**User Roles**:
```typescript
type UserRole = 'customer' | 'vendor' | 'lender' | 'admin'
```

**Auth Methods**:
- `login(email, password)` - Authenticate user
- `register(email, password, name, role)` - Create new account
- `logout()` - Clear session
- `switchRole(role)` - Switch active role
- `updateUser(updates)` - Update user profile

**ProtectedRoute Component**:
```typescript
<ProtectedRoute allowedRoles={['vendor']}>
  <VendorLayout />
</ProtectedRoute>
```

### User Profile Dropdown

**Component**: `UserProfileDropdown`
**Location**: Top navigation bar

**Features**:
- User avatar and name
- Current role display
- Role switcher (for multi-role accounts)
- Quick access to dashboards
- Account settings link
- Logout

## 🎨 UI/UX Features

### Navigation

**Customer Navigation** (Top Bar):
- Logo (links to home)
- Search bar with category dropdown
- Wishlist (with count badge)
- Cart (with count badge)
- User profile dropdown

**Dashboard Navigation** (Sidebar):
- Sansa branding (links to marketplace)
- User profile card
- Navigation links with icons
- Active state highlighting
- Metric display (dashboard-specific)
- "Browse Marketplace" link

### Quick Access Component

**Component**: `PlatformQuickAccess`
**Shows on**: Home page, Account page

**Purpose**: Help users discover other modules
- Shows relevant modules based on user role
- Direct links to dashboards
- Icon-based visual design

### Design System

**Framework**: Tailwind CSS v4
**Components**: shadcn/ui
**Icons**: Lucide React, React Icons

**Key Patterns**:
- Sticky headers with natural scrolling
- Auto-hide scrollbars (JavaScript-enhanced)
- Gradient backgrounds
- Glassmorphism effects
- Smooth transitions
- Responsive grid layouts

### Color Coding

**Roles**:
- Customer: Blue (`text-blue-600`)
- Vendor: Purple (`text-purple-600`)
- Lender: Green (`text-green-600`)
- Admin: Red (`text-red-600`)

**Status**:
- Success/Active: Green
- Warning: Amber
- Error/Critical: Red
- Info: Blue
- Neutral: Gray

## 🗂️ Project Structure

```
src/
├── admin/                      # Admin module
│   ├── components/            # Admin-specific components
│   ├── layout/                # Admin layout
│   └── pages/                 # Admin pages
├── components/                 # Shared components
│   ├── layout/                # Layout components (VendorLayout, LenderLayout)
│   ├── molecules/             # Small reusable components (ProductCard)
│   ├── organisms/             # Complex components
│   │   ├── lender/           # Lender-specific organisms
│   │   │   └── opportunities/ # Opportunity components
│   │   └── shared/           # Shared organisms (DashboardSidebar)
│   ├── Nav.tsx               # Main navigation (customer)
│   ├── UserProfileDropdown.tsx
│   └── PlatformQuickAccess.tsx
├── context/                   # React Context
│   ├── AuthContext.tsx       # Authentication & authorization
│   ├── CartContext.tsx       # Shopping cart state
│   └── WishlistContext.tsx   # Wishlist state
├── data/                      # Mock data
│   ├── lender/               # Lender data
│   │   └── mockOpportunities.ts
│   ├── orders.ts
│   ├── products.ts
│   └── vendors.ts
├── hooks/                     # Custom hooks
│   ├── lender/               # Lender hooks
│   │   └── useOpportunities.ts
│   └── useDashboardStats.ts
├── pages/                     # Pages
│   ├── auth/                 # Auth pages
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── lender/               # Lender pages
│   │   ├── Analytics.tsx
│   │   ├── Documents.tsx
│   │   ├── Investments.tsx
│   │   ├── LenderDashboard.tsx
│   │   ├── Opportunities.tsx
│   │   └── Wallet.tsx
│   ├── orders/               # Order pages
│   │   └── OrderPage.tsx
│   ├── products/             # Product pages
│   │   └── ProductPage.tsx
│   ├── vendor/               # Vendor pages
│   │   ├── AddProduct.tsx
│   │   ├── ManageProducts.tsx
│   │   ├── VendorDashboard.tsx
│   │   └── VendorOrders.tsx
│   ├── About.tsx
│   ├── AccountPage.tsx
│   ├── CartPage.tsx
│   ├── CategoryPage.tsx
│   ├── CheckoutPage.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   ├── OrdersPage.tsx
│   ├── StorePage.tsx
│   └── WishlistPage.tsx
├── utils/                     # Utility functions
│   └── lender/               # Lender utilities
│       └── opportunitiesUtils.ts
├── App.tsx                    # Main app layout (customer)
├── main.tsx                   # Entry point with routing
└── index.css                 # Global styles
```

## 🔄 Data Flow

### Customer Shopping Flow
```
1. Browse products (/) or search
2. View product detail (/product/:id)
3. Add to cart (CartContext)
4. View cart (/cart)
5. Checkout (/checkout)
6. Order confirmation
7. Track order (/orders/:id)
```

### Vendor Flow
```
1. Login as vendor (/login)
2. Redirect to dashboard (/vendor-dashboard)
3. Add products (/vendor-dashboard/add-product)
4. Manage inventory (/vendor-dashboard/manage-products)
5. Process orders (/vendor-dashboard/orders)
6. View analytics
```

### Lender Flow
```
1. Login as lender (/login)
2. Redirect to opportunities (/lender-dashboard/opportunities)
3. Browse investment opportunities
4. Filter by criteria (score, amount, terms, etc.)
5. View opportunity details
6. Make investment
7. Track in portfolio (/lender-dashboard/investments)
8. Receive returns (/lender-dashboard/wallet)
```

## 🧩 Context Providers

### Required Context Wrapping Order
```tsx
<AuthProvider>
  <WishlistProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </WishlistProvider>
</AuthProvider>
```

**Why this order?**
- AuthProvider: Must be outermost (other contexts may need user data)
- WishlistProvider: Wishlist is user-specific
- CartProvider: Cart is user-specific

## 🚦 Route Protection

### Public Routes
- `/` - Home
- `/login` - Login page
- `/register` - Registration page
- `/product/:id` - Product detail
- `/category/:slug` - Category page
- `/store/:vendorId` - Vendor store
- `/about` - About page

### Protected Routes (Authenticated Users)
- `/account` - Account settings
- `/orders` - Order history
- `/orders/:id` - Order detail
- `/checkout` - Checkout

### Role-Specific Routes

**Vendor Only**:
- `/vendor-dashboard/*` - All vendor dashboard routes

**Lender Only**:
- `/lender-dashboard/*` - All lender dashboard routes

**Admin Only**:
- `/admin/*` - All admin routes

**Protection Mechanism**:
```tsx
<ProtectedRoute allowedRoles={['vendor']}>
  <VendorLayout />
</ProtectedRoute>
```

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile-First Approach
- All layouts responsive
- Hamburger menu on mobile
- Drawer navigation
- Touch-friendly buttons
- Optimized images

## 🎯 Key Features

### Implemented ✅
- [x] Complete authentication system
- [x] Role-based access control
- [x] Customer e-commerce flow
- [x] Vendor dashboard
- [x] Lender opportunities marketplace
- [x] Shopping cart & wishlist
- [x] Product management
- [x] Order tracking
- [x] Investment opportunities
- [x] User profile management
- [x] Role switching
- [x] Platform quick access
- [x] Responsive design

### In Development 🚧
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Email system
- [ ] Advanced analytics
- [ ] Auto-invest execution
- [ ] Vendor application flow
- [ ] Admin moderation tools

### Planned 📋
- [ ] Multi-currency support
- [ ] International shipping
- [ ] Vendor subscriptions
- [ ] Loyalty program
- [ ] Product reviews & ratings
- [ ] Live chat support
- [ ] Mobile app

## 🛠️ Development

### Prerequisites
```bash
Node.js 18+
pnpm (or npm/yarn)
```

### Installation
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm tsc --noEmit
```

## 📝 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🧪 Testing Workflow

### 1. Test Authentication
- Visit `/register`
- Create accounts with different roles
- Test role switching

### 2. Test Customer Flow
- Browse products
- Add to cart
- Complete checkout
- View orders

### 3. Test Vendor Flow
- Login as vendor
- Add products
- Manage inventory
- Process orders

### 4. Test Lender Flow
- Login as lender
- Browse opportunities
- Filter investments
- Review portfolio

### 5. Test Navigation
- Use quick access links
- Switch between modules
- Test sidebar navigation
- Verify role-based visibility

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License

## 👥 Team

Built by the Sansa team

---

**Version**: 1.0.0
**Last Updated**: January 2026
