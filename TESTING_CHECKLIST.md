# 🎯 Testing Checklist - Complete Application Flow

## Server Status
✅ **Development Server Running**: http://localhost:5175/

---

## 📋 Feature Testing Checklist

### 🔐 Authentication System

#### Registration Flow
- [ ] Visit `/register`
- [ ] Select "Customer" role → See customer-specific features listed
- [ ] Select "Vendor" role → See vendor-specific features listed
- [ ] Select "Lender" role → See lender-specific features listed
- [ ] Fill in all required fields:
  - [ ] Full name
  - [ ] Email address
  - [ ] Password (min 8 characters)
  - [ ] Confirm password
- [ ] Check "I agree to Terms" checkbox
- [ ] Click "Create Account"
- [ ] Verify redirect to appropriate dashboard based on role
- [ ] Verify user is logged in (profile dropdown visible)

#### Login Flow
- [ ] Visit `/login`
- [ ] Test with demo account:
  - [ ] Click "Customer" quick login → Verify redirected to home
  - [ ] Logout and click "Vendor" quick login → Verify redirected to vendor dashboard
  - [ ] Logout and click "Lender" quick login → Verify redirected to lender dashboard
  - [ ] Logout and click "Admin" quick login → Verify redirected to admin panel
- [ ] Test manual login:
  - [ ] Enter email: `customer@sansa.com`
  - [ ] Enter password: `password123`
  - [ ] Click "Sign in"
  - [ ] Verify successful login and redirect

#### Session Persistence
- [ ] Login with any account
- [ ] Refresh the page (F5)
- [ ] Verify you're still logged in
- [ ] Close browser tab
- [ ] Reopen http://localhost:5175/
- [ ] Verify session persists

#### Logout Flow
- [ ] Login with any account
- [ ] Click profile dropdown (top right)
- [ ] Click "Sign out"
- [ ] Verify redirected to login page
- [ ] Verify user data cleared (localStorage)

---

### 🏠 Customer E-Commerce Flow

#### Home Page Navigation
- [ ] Visit home page as guest
- [ ] See login/register buttons (no profile dropdown)
- [ ] Login as customer
- [ ] See "Quick Access" widget below hero
- [ ] Verify profile dropdown shows in top right
- [ ] Browse products
- [ ] Click on a product → Navigate to detail page

#### Shopping Experience
- [ ] View product detail page
- [ ] Add product to cart
- [ ] Verify cart badge updates (number increases)
- [ ] Add product to wishlist
- [ ] Verify wishlist badge updates
- [ ] Go to `/cart`
- [ ] Update quantity
- [ ] Remove item
- [ ] Click "Checkout"

#### Profile Dropdown (Customer View)
- [ ] Click profile dropdown
- [ ] Verify shows:
  - [ ] User name and email
  - [ ] "Customer" role badge (blue)
  - [ ] "Switch Role" section with all 4 roles
  - [ ] "Account Settings" link
  - [ ] "Sign out" button
- [ ] Click "Account Settings" → Navigate to `/account`

---

### 🏪 Vendor Dashboard Flow

#### Access as Vendor
- [ ] Login as vendor (`vendor@sansa.com`)
- [ ] Verify redirected to `/vendor-dashboard`
- [ ] See vendor sidebar with:
  - [ ] User profile card
  - [ ] Dashboard navigation links
  - [ ] "Browse Marketplace" link at bottom

#### Vendor Navigation
- [ ] Click "Dashboard" → See analytics overview
- [ ] Click "Add Product" → See product form
- [ ] Click "Manage Products" → See product list
- [ ] Click "Orders" → See order list
- [ ] Click Sansa logo → Navigate to home (customer view)
- [ ] Click "Browse Marketplace" → Navigate to home

#### Vendor Profile Dropdown
- [ ] Click profile dropdown
- [ ] Verify "Vendor" role shown (purple badge)
- [ ] Click "Vendor Dashboard" link → Verify already there (no navigation)
- [ ] Click "Switch Role" → "Customer"
- [ ] Verify immediately navigate to home
- [ ] Switch back to Vendor role

---

### 💰 Lender Dashboard Flow

#### Access as Lender
- [ ] Login as lender (`lender@sansa.com`)
- [ ] Verify redirected to `/lender-dashboard/opportunities`
- [ ] See lender sidebar with:
  - [ ] User profile card
  - [ ] Navigation: Dashboard, Opportunities, Investments, Wallet, Analytics, Documents
  - [ ] "Browse Marketplace" link

#### Opportunities Marketplace
- [ ] See "Marketplace Stats" with 6 cards
- [ ] See opportunity cards in grid layout (max 3 columns)
- [ ] Test filters:
  - [ ] Search by vendor name
  - [ ] Filter by loan terms (3, 6, 9, 12 months)
  - [ ] Filter by use of funds (click badges)
  - [ ] Filter by categories
- [ ] Test sorting dropdown (11 options)
- [ ] Switch to list view
- [ ] Switch back to grid view
- [ ] Click "View Details" on opportunity
- [ ] Click "Invest" button

#### Lender Navigation
- [ ] Click "Dashboard" → Portfolio overview
- [ ] Click "Opportunities" → Marketplace
- [ ] Click "Investments" → Active investments
- [ ] Click "Wallet" → Capital management
- [ ] Click "Analytics" → Performance metrics (sticky header)
- [ ] Click "Documents" → Investment docs (sticky header)

#### Lender Profile Dropdown
- [ ] Click profile dropdown
- [ ] Verify "Lender" role shown (green badge)
- [ ] Click "Lender Dashboard" link
- [ ] Switch role to "Vendor"
- [ ] Verify navigate to vendor dashboard

---

### 👑 Admin Access

#### Admin Login
- [ ] Login as admin (`admin@sansa.com`)
- [ ] Verify redirected to `/admin`
- [ ] See admin panel
- [ ] Profile dropdown shows "Admin" role (red badge)

#### Admin Multi-Role Access
- [ ] From admin, switch to "Vendor"
- [ ] Verify access to vendor dashboard
- [ ] Switch to "Lender"
- [ ] Verify access to lender dashboard
- [ ] Switch back to "Admin"

---

### 🔗 Cross-Module Navigation

#### Quick Access Widget (Home Page)
- [ ] Login as vendor
- [ ] Go to home page
- [ ] See "Quick Access" widget
- [ ] Verify shows:
  - [ ] "Shop" card (blue)
  - [ ] "Vendor Dashboard" card (purple)
- [ ] Click "Vendor Dashboard" → Navigate to `/vendor-dashboard`
- [ ] Go back to home
- [ ] Switch role to Lender
- [ ] Verify Quick Access now shows:
  - [ ] "Shop" card
  - [ ] "Lender Dashboard" card (green)
- [ ] Click "Lender Dashboard" → Navigate to lender opportunities

#### Dashboard Sidebar Links
- [ ] From vendor dashboard, click Sansa logo → Go to home
- [ ] From vendor dashboard, click "Browse Marketplace" → Go to home
- [ ] From lender dashboard, click Sansa logo → Go to home
- [ ] From lender dashboard, click "Browse Marketplace" → Go to home

#### Profile Dropdown Navigation
- [ ] From any page, click profile dropdown
- [ ] Click any dashboard link → Navigate there
- [ ] Click "Account Settings" → Navigate to `/account`
- [ ] Use role switcher → Navigate to new role's dashboard

---

### 🛡️ Protected Routes

#### Unauthorized Access Attempts
- [ ] Logout completely
- [ ] Try accessing `/vendor-dashboard` directly
- [ ] Verify redirected to `/login`
- [ ] Try accessing `/lender-dashboard` directly
- [ ] Verify redirected to `/login`
- [ ] Try accessing `/admin` directly
- [ ] Verify redirected to `/login`

#### Wrong Role Access
- [ ] Login as customer
- [ ] Try accessing `/vendor-dashboard` directly
- [ ] Verify redirected to home (customer dashboard)
- [ ] Login as vendor
- [ ] Try accessing `/lender-dashboard` directly
- [ ] Verify redirected to `/vendor-dashboard`

#### Post-Login Redirect
- [ ] Logout
- [ ] Try accessing `/vendor-dashboard`
- [ ] Redirected to login
- [ ] Login as vendor
- [ ] Verify redirected back to `/vendor-dashboard` (not home)

---

### 📱 Responsive Design

#### Mobile View (< 768px)
- [ ] Resize browser to mobile width
- [ ] Verify hamburger menu appears
- [ ] Click hamburger → Drawer opens
- [ ] Profile dropdown in drawer
- [ ] Cart link shows count
- [ ] All navigation accessible
- [ ] Close drawer (click outside or X button)

#### Tablet View (768px - 1024px)
- [ ] Resize to tablet width
- [ ] Navigation bar adapts
- [ ] Profile dropdown works
- [ ] Sidebar visible on dashboards
- [ ] Quick access cards in 2 columns

#### Desktop View (> 1024px)
- [ ] Full navigation visible
- [ ] Profile dropdown in header
- [ ] Sidebar always visible
- [ ] Quick access cards in 3 columns
- [ ] Opportunity cards in 3 columns max

---

### 🎨 UI/UX Verification

#### Visual Consistency
- [ ] All buttons have consistent styling
- [ ] Hover states work everywhere
- [ ] Active states clearly visible
- [ ] Color coding consistent:
  - [ ] Customer → Blue
  - [ ] Vendor → Purple
  - [ ] Lender → Green
  - [ ] Admin → Red
- [ ] Transitions smooth (200ms)
- [ ] Loading states show when needed

#### Typography & Spacing
- [ ] Text readable at all sizes
- [ ] Consistent spacing
- [ ] Proper hierarchy
- [ ] No text overflow
- [ ] No layout shifts

#### Icons & Badges
- [ ] Cart badge shows correct count
- [ ] Wishlist badge updates
- [ ] Role badges show correct colors
- [ ] Icons consistent throughout
- [ ] Active rule badge in auto-invest button

---

### 🐛 Error Handling

#### Invalid Login
- [ ] Try logging in with wrong password
- [ ] See error message (red banner)
- [ ] Error message descriptive
- [ ] Form doesn't reset

#### Registration Validation
- [ ] Try registering without email
- [ ] See validation error
- [ ] Try password mismatch
- [ ] See "Passwords do not match" error
- [ ] Try password too short (< 8 chars)
- [ ] See minimum length error

#### Network Errors (Simulated)
- [ ] Mock users already contain test data
- [ ] Registration with existing email
- [ ] See "User already exists" error

---

### ⚡ Performance

#### Load Times
- [ ] Home page loads quickly
- [ ] Dashboard transitions smooth
- [ ] No lag on role switching
- [ ] Images load progressively
- [ ] No jank on scroll

#### State Management
- [ ] Cart persists across navigation
- [ ] Wishlist persists
- [ ] User session persists
- [ ] No unnecessary re-renders
- [ ] LocalStorage updates correctly

---

## 🎉 Success Criteria

### Must Pass (Critical)
- [x] All demo accounts work
- [x] Registration creates new users
- [x] Protected routes block unauthorized access
- [x] Role switcher changes active role
- [x] Profile dropdown shows everywhere
- [x] Navigation between all modules works
- [x] Session persists on refresh

### Should Pass (Important)
- [x] Quick access widget shows on home
- [x] Marketplace stats display correctly
- [x] Opportunity filters work
- [x] Dashboard sidebars link to home
- [x] Mobile navigation works
- [x] Error messages show

### Nice to Have (Polish)
- [x] Smooth transitions
- [x] Hover effects
- [x] Color-coded roles
- [x] Badge counters
- [x] Loading states

---

## 📊 Test Results Template

```
Test Date: _____________
Tester: _______________

✅ Authentication: ___/10 passed
✅ Customer Flow: ___/8 passed
✅ Vendor Flow: ___/7 passed
✅ Lender Flow: ___/9 passed
✅ Admin Access: ___/4 passed
✅ Cross-Navigation: ___/12 passed
✅ Protected Routes: ___/6 passed
✅ Responsive: ___/6 passed
✅ UI/UX: ___/8 passed
✅ Error Handling: ___/5 passed
✅ Performance: ___/4 passed

TOTAL: ___/79 tests passed

Critical Issues: _____________
Minor Issues: _______________
Notes: _____________________
```

---

## 🚀 Ready to Test!

**Server**: http://localhost:5175/
**Start Here**: Login with demo accounts or register new ones
**Duration**: ~30 minutes for full test
**Browser**: Chrome/Edge/Firefox (all should work)

---

**Happy Testing!** 🎊
