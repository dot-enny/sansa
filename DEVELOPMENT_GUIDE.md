# Sansa Platform - Development Documentation
## Multi-Tenant E-commerce & Fintech Platform

**Date Created**: November 2024  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui  
**Architecture**: Clean Architecture with Separation of Concerns

---

## 🎯 Project Overview

Sansa is a multi-tenant platform with three main user types:
1. **Vendors** - Sell products, manage inventory, fulfill orders
2. **Lenders** - Provide capital to vendors, track investments
3. **Admins** - Platform management and oversight

---

## 🏗️ Architecture Principles

### Core Development Philosophy

1. **Separation of Concerns** - Always separate UI, data, and logic
2. **Single Responsibility Principle** - Each component/function has one job
3. **DRY (Don't Repeat Yourself)** - Reusable components and utilities
4. **Component Modularity** - Break down UI into small, focused components
5. **Type Safety** - Full TypeScript coverage with proper interfaces

### Folder Structure Convention

```
src/
├── data/
│   ├── vendor/          # Vendor-specific mock data
│   ├── lender/          # Lender-specific mock data
│   └── [module]/        # Module-specific data
├── hooks/
│   ├── vendor/          # Vendor-specific custom hooks
│   ├── lender/          # Lender-specific custom hooks
│   └── [module]/        # Module-specific hooks
├── utils/
│   ├── vendorUtils.ts   # Vendor-specific utilities
│   ├── lenderUtils.ts   # Lender-specific utilities
│   └── [module]Utils.ts # Module-specific utilities
├── components/
│   ├── organisms/
│   │   ├── vendor/      # Vendor-specific components
│   │   ├── lender/      # Lender-specific components
│   │   ├── shared/      # Reusable cross-module components
│   │   └── [module]/    # Module-specific components
│   └── layout/
│       ├── DashboardLayout.tsx      # Generic layout
│       ├── VendorLayout.tsx         # Vendor configuration
│       └── LenderLayout.tsx         # Lender configuration
├── pages/
│   ├── vendor/          # Vendor pages
│   ├── lender/          # Lender pages
│   └── [module]/        # Module-specific pages
```

### File Organization Pattern

For each feature/page, create:
1. **Data Layer** (`data/[module]/`)
   - Type definitions (interfaces)
   - Mock data
   - Calculation functions

2. **Logic Layer** (`hooks/[module]/`, `utils/`)
   - Custom hooks for state management
   - Utility functions for formatting, calculations
   - Business logic

3. **UI Layer** (`components/organisms/[module]/[feature]/`)
   - Break into small components
   - Header, Filters, Table/List, Dialogs, EmptyStates
   - Each component in its own file

4. **Main Page** (`pages/[module]/`)
   - Composition only
   - Uses hook and components
   - Minimal logic (60-100 lines ideal)

---

## 🎨 UI/UX Design Specifications

### Design System Guidelines

#### Visual Hierarchy
- **Strong depth through layered effects**, not flat boxes
- Ambient gradient backgrounds for atmosphere
- Enhanced glassmorphism with `backdrop-blur-xl` (not just `-md`)
- Multiple shadow layers: base `shadow-lg shadow-black/5` + hover `shadow-xl shadow-primary/10`
- Card lift effects with `hover:-translate-y-1`
- Stronger opacity: use `/60` instead of `/40` for better visibility
- Icon containers with gradient backgrounds and colored shadows
- Gradient overlays on hover for subtle depth
- Border visibility: use `border-border/60` instead of `/40`

#### Color Palette
- **Primary**: Blue (#3b82f6) - Main actions, highlights
- **Green**: Success, on-time status (#10b981)
- **Amber**: Warnings, late status (#f59e0b)
- **Orange**: At-risk status (#f97316)
- **Red**: Errors, defaults, destructive (#ef4444)
- **Purple**: Analytics, special features (#a855f7)

#### Typography
- **Headings**: Bold, tracking-tight
- **Body**: Smaller text (text-sm, text-xs)
- **Labels**: text-muted-foreground
- **Values**: font-semibold or font-bold

#### Compact UI Specifications

**Mandatory Compact Design System** (Applied to all new pages):

All new pages MUST follow these compact spacing and sizing guidelines to ensure consistent, modern, and space-efficient UI:

**Spacing Guidelines:**
- **Card Padding**: Use `p-3` or `p-4` instead of `p-6`
- **Section Gaps**: Use `gap-2`, `gap-3`, or `gap-4` instead of `gap-6`
- **Vertical Spacing**: Use `space-y-2`, `space-y-3` instead of `space-y-4` or higher
- **Grid Gaps**: Use `gap-3` or `gap-4` instead of `gap-6`
- **Page Padding**: Use `px-4 sm:px-6` and `py-4` instead of `px-6` and `py-6`

**Component Sizing:**
- **Icons**: Use `w-7 h-7` or `w-8 h-8` instead of `w-10 h-10` or `w-12 h-12`
- **Icon Containers**: Use `w-10 h-10` or `w-12 h-12` instead of `w-14 h-14` or `w-16 h-16`
- **Buttons**: Use `h-9` or `h-10` instead of `h-12` or larger
- **Input Fields**: Standard height `h-10`, compact spacing

**Chart Sizing:**
- **Default Chart Height**: `h-[250px]` to `h-[300px]` (avoid `h-[400px]` or larger)
- **Large Charts**: Maximum `h-[350px]` for emphasis
- **Small Charts**: `h-[200px]` to `h-[250px]` for dashboards
- **Responsive Charts**: Use `h-[250px] sm:h-[300px]` pattern

**Text Sizing:**
- **Page Titles**: Use `text-2xl sm:text-3xl` instead of `text-3xl sm:text-4xl`
- **Section Headings**: Use `text-base sm:text-lg` instead of `text-lg sm:text-xl`
- **Card Titles**: Use `text-sm sm:text-base` or `text-base`
- **Body Text**: Default to `text-sm`
- **Labels**: Use `text-xs` or `text-sm`
- **Values**: Use `text-lg` or `text-xl` instead of `text-2xl` or larger

**Border Radius:**
- **Cards**: Use `rounded-lg` or `rounded-xl` instead of `rounded-2xl`
- **Buttons**: Use `rounded-md` or `rounded-lg`
- **Icon Containers**: Use `rounded-lg` or `rounded-xl`

**Height-Constrained Layouts:**

All dashboard pages should use height-constrained layouts to prevent overflow:

```tsx
// Main page container
<div className="h-[calc(100vh-4rem)] overflow-hidden">
  <div className="relative h-full flex flex-col">
    {/* Fixed Header - doesn't scroll */}
    <div className="shrink-0 px-4 sm:px-6 py-4">
      <h1 className="text-2xl sm:text-3xl font-bold">Page Title</h1>
    </div>
    
    {/* Fixed Stats/Filters - doesn't scroll */}
    <div className="shrink-0 px-4 sm:px-6 py-4">
      <StatsComponent />
    </div>
    
    {/* Scrollable Content - main content area */}
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 custom-scrollbar">
      <ContentComponents />
    </div>
  </div>
</div>
```

**Custom Scrollbar Usage:**

Always apply custom scrollbar classes to scrollable content areas:

```tsx
// Primary scrollbar - for main content areas
className="overflow-y-auto custom-scrollbar"

// Minimal scrollbar - for nested scrollable areas
className="overflow-x-auto custom-scrollbar-minimal"
```

The custom scrollbar classes are defined in `index.css`:
- `.custom-scrollbar`: 6px width, subtle gray color
- `.custom-scrollbar-minimal`: 4px width, very subtle
- Global `html` scrollbar: 8px width

**Tab-Based Navigation Pattern:**

For content-heavy pages, use tab-based navigation to improve accessibility:

```tsx
const [activeTab, setActiveTab] = useState('overview')

// Tab buttons
<div className="flex gap-1 sm:gap-2 overflow-x-auto custom-scrollbar-minimal pb-2">
  <Button
    variant={activeTab === 'overview' ? 'default' : 'ghost'}
    onClick={() => setActiveTab('overview')}
    className="h-9 whitespace-nowrap"
  >
    <Icon className="w-4 h-4 mr-2" />
    Overview
  </Button>
  {/* More tabs... */}
</div>

// Tab content
<div className="flex-1 overflow-y-auto custom-scrollbar">
  {activeTab === 'overview' && <OverviewContent />}
  {activeTab === 'details' && <DetailsContent />}
</div>
```

**Responsive Breakpoints:**

Use consistent responsive patterns:
- **Mobile First**: Base styles for mobile
- **sm (640px)**: Tablet adjustments
- **lg (1024px)**: Desktop layouts
- **xl (1280px)**: Large desktop optimizations

Example:
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
className="text-2xl sm:text-3xl"
className="p-3 sm:p-4"
```

**Empty State Design:**

Consistent empty state pattern:
```tsx
<div className="flex flex-col items-center justify-center py-16 px-4">
  <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No items found</h3>
  <p className="text-sm text-muted-foreground text-center max-w-md">
    Description text here.
  </p>
</div>
```

**Benefits of Compact Design:**
- **Better Information Density**: More content visible without scrolling
- **Modern Aesthetic**: Cleaner, more professional appearance
- **Improved Performance**: Smaller DOM elements, faster rendering
- **Better Mobile Experience**: More content fits on smaller screens
- **Reduced Eye Strain**: Less vertical scrolling required

#### Form Inputs Style
```css
/* Underline Style - Preferred */
- Transparent background (bg-transparent)
- No top/side borders (border-0)
- Bottom border only (border-b)
- Border color: border-border/40
- Focus: border-primary, no ring offset
- No boxes, clean minimal look
```

#### Button Styles
```tsx
// Primary Action
<Button className="shadow-lg shadow-primary/25 hover:shadow-xl 
  hover:shadow-primary/30 hover:scale-105 transition-all duration-300">

// Secondary Action  
<Button variant="outline" className="shadow-md hover:shadow-lg 
  hover:scale-105 transition-all duration-300">
```

#### Card/Container Styles
```tsx
// Enhanced Glassmorphism Card with Strong Depth
className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl 
  border border-border/60 shadow-lg shadow-black/5 
  hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 
  transition-all duration-300 hover:-translate-y-1 group"

// With gradient overlay on hover
<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent 
  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

// Icon containers with depth
className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/25 to-primary/10 
  flex items-center justify-center shadow-md shadow-primary/20"
```

**Key Depth Principles:**
- Use `bg-card/60` instead of `/40` for better opacity
- Add `backdrop-blur-xl` instead of `-md` for stronger blur
- Include `shadow-lg shadow-black/5` as base shadow
- Enhance hover with `shadow-xl shadow-primary/10`
- Add `hover:-translate-y-1` for lift effect
- Use `border-border/60` instead of `/40` for visibility
- Apply gradient overlays for subtle depth layers

#### Ambient Background Layers
```tsx
// Always include on main pages for depth
<div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
  <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] 
    bg-linear-to-br from-primary/8 to-transparent rounded-full 
    blur-[150px] animate-pulse" 
    style={{ animationDuration: '12s' }} />
  <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] 
    bg-linear-to-tr from-secondary/6 to-transparent rounded-full 
    blur-[130px] animate-pulse" 
    style={{ animationDuration: '9s', animationDelay: '2s' }} />
  <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] 
    bg-linear-to-bl from-primary/4 to-transparent rounded-full 
    blur-[100px] animate-pulse" 
    style={{ animationDuration: '15s', animationDelay: '5s' }} />
</div>
```

#### Spacing & Layout
- **Main container**: `max-w-7xl mx-auto pb-12`
- **Section spacing**: `mb-8` or `mb-10`
- **Card spacing**: `space-y-3` or `space-y-4`
- **Grid gaps**: `gap-4` or `gap-6`

#### Focus States
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

#### Hover Effects
- Scale transforms: `hover:scale-105`
- Shadow enhancements: `hover:shadow-xl`
- Color transitions: `transition-all duration-300`
- Icon animations: `group-hover:scale-110`

#### Status Indicators
```tsx
// Color-coded badges with icons
<Badge variant="outline" className={getStatusColor(status)}>
  <StatusIcon className="w-3 h-3" />
  {getStatusLabel(status)}
</Badge>

// Status color patterns
{
  active: 'text-green-600 bg-green-500/10 border-green-500/20',
  warning: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  error: 'text-red-600 bg-red-500/10 border-red-500/20',
}
```

---

## 📦 Component Patterns

### Page Component Structure
```tsx
import React from 'react'
import { useCustomHook } from '@/hooks/[module]/useCustomHook'
import { mockData } from '@/data/[module]/mockData'
import { Header } from '@/components/organisms/[module]/[feature]/Header'
import { Component1 } from '@/components/organisms/[module]/[feature]/Component1'
import { Component2 } from '@/components/organisms/[module]/[feature]/Component2'

const PageName: React.FC = () => {
  const {
    data,
    filteredData,
    handlers,
    state
  } = useCustomHook(mockData)

  return (
    <div className="relative max-w-7xl mx-auto pb-12">
      {/* Ambient backgrounds */}
      
      <Header />
      <Component1 data={data} onAction={handlers.handleAction} />
      {filteredData.length > 0 ? (
        <Component2 items={filteredData} />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default PageName
```

### Custom Hook Pattern
```tsx
export const useFeatureName = (initialData: Type[]) => {
  const [data, setData] = useState<Type[]>(initialData)
  const [filters, setFilters] = useState(defaultFilters)
  
  const filteredData = useMemo(() => {
    // Filtering logic
  }, [data, filters])
  
  const handleAction = () => {
    // Business logic
  }
  
  return {
    data,
    filteredData,
    filters,
    setFilters,
    handleAction,
  }
}
```

### Utility Functions Pattern
```tsx
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const getStatusColor = (status: Status): string => {
  const colors = {
    success: 'text-green-600 bg-green-500/10',
    // ...
  }
  return colors[status]
}
```

---

## 🚀 Implemented Features

### ✅ Vendor Dashboard Module

**Pages Completed**:
1. **VendorDashboard** (`/vendor-dashboard`)
   - 4 KPI stat cards (Revenue, Orders, Products, Customers)
   - Recent Orders & Reviews sections
   - Depth effects, parallax, ambient backgrounds

2. **AddProduct** (`/vendor-dashboard/add-product`)
   - Two-column form layout
   - Underline-style inputs
   - Optional field indicators
   - Image upload placeholder
   - Categories, pricing, inventory

3. **ManageProducts** (`/vendor-dashboard/manage-products`)
   - **Fully Refactored with Separation of Concerns**
   - Data: `mockProducts.ts`
   - Utils: `productUtils.ts` 
   - Hook: `useManageProducts.ts`
   - Components: Header, FiltersAndSearch, ProductListItem, EmptyState, DeleteDialog
   - Main page: 80 lines (composition only)
   - List-style layout with depth effects
   - Search and filters
   - Status management

4. **VendorOrders** (`/vendor-dashboard/orders`)
   - **Fully Refactored with Separation of Concerns**
   - Data: `mockOrders.ts`
   - Utils: `orderUtils.ts`
   - Hook: `useVendorOrders.ts`
   - Components: Header, SearchBar, OrdersTable, OrderDetailsDialog, UpdateStatusDialog, EmptyState
   - Main page: 83 lines
   - Table-based layout
   - Search functionality
   - Order details modal
   - Status updates

**Vendor Layout**:
- Fixed sidebar with navigation
- Trust Score metric with progress bar
- Auto-hide header (commented out for now)
- Responsive design

### ✅ Lender Dashboard Module

**Pages Completed**:
1. **LenderDashboard** (`/lender-dashboard`)
   - **Fully Implemented with Clean Architecture**
   - Data: `mockLenderData.ts` (Investment, KPI interfaces)
   - Utils: `lenderUtils.ts`
   - Hook: `useLenderDashboard.ts`
   - Components: Header, KPICards, PortfolioHealthChart
   - 4 KPI cards (Capital Deployed, Returns, Average APR, Available Capital)
   - Interactive Portfolio Health donut chart (recharts)
   - Trend indicators
   - Ambient backgrounds

2. **Investments** (`/lender-dashboard/investments`)
   - **Fully Implemented with Clean Architecture**
   - Data: `mockInvestments.ts` (investments, transactions, portfolio summary)
   - Utils: `investmentUtils.ts` (30+ utility functions)
   - Hook: `useInvestments.ts` (filters, search, dialogs)
   - Components: InvestmentSummaryCards, InvestmentsTable, InvestmentDetailsDialog
   - Table-based layout with search and filters
   - Investment details modal
   - Transaction history
   - Portfolio metrics

3. **Wallet** (`/lender-dashboard/wallet`)
   - **Fully Implemented with Clean Architecture**
   - Data: `mockWalletData.ts` (balance, transactions, monthly stats)
   - Utils: `walletUtils.ts` (formatting, filtering, grouping)
   - Hook: `useWallet.ts` (filters, period selection, dialogs)
   - Components: BalanceCard, QuickActions, MonthlyOverview, RecentTransactions, TransactionDetailsDialog
   - 4-section layout: Balance, Quick Actions, Monthly Stats, Transactions
   - Transaction filtering and grouping
   - Month-by-month comparison
   - Deposit/Withdraw/Transfer actions

4. **Analytics** (`/lender-dashboard/analytics`)
   - **Fully Implemented with Tab-Based Navigation & Compact Design**
   - Data: `mockAnalyticsData.ts` (12 months trends, portfolio breakdown, risk metrics)
   - Utils: `analyticsUtils.ts` (30+ formatting, calculation, export functions)
   - Hook: `useAnalytics.ts` (date range filtering, chart toggles, export)
   - Components: PerformanceOverview, PortfolioBreakdown, InvestmentTrends, RiskAnalysis, TopPerformers, MonthlyComparisonChart
   - **Height-constrained layout** with tab navigation (Overview, Portfolio, Performance, Risk)
   - **Compact spacing** throughout (p-3/p-4, gap-2/gap-3)
   - **Custom scrollbar** applied
   - Interactive charts with Recharts
   - Period comparison (3M, 6M, 1Y, ALL)
   - Export functionality

5. **Documents** (`/lender-dashboard/documents`)
   - **Fully Implemented with Grid/List Views & Compact Design**
   - Data: `mockDocuments.ts` (15 documents, 8 types, 4 statuses)
   - Utils: `documentsUtils.ts` (30+ utility functions for search, filter, sort, group)
   - Hook: `useDocuments.ts` (search, filters, view mode, sort, preview)
   - Components: DocumentStats, DocumentFilters, DocumentCard
   - **Height-constrained layout** with scrollable grid/list
   - Grid and list view modes
   - Search with type/status filters
   - Sort by date, name, size, type
   - Document preview and download
   - Empty state handling

**Lender Layout**:
- Reuses generic DashboardLayout + DashboardSidebar
- Active Investments metric
- Navigation: Dashboard, Investments, Wallet, Analytics, Documents
- All routes fully implemented

### ✅ Shared/Reusable Components

**DashboardLayout** (`components/layout/DashboardLayout.tsx`)
- Generic layout accepting sidebar as prop
- Fixed sidebar, scrollable content
- Reusable across all modules

**DashboardSidebar** (`components/organisms/shared/DashboardSidebar.tsx`)
- Configurable navigation links
- User/store branding section
- Optional metric display (Trust Score, Investments, etc.)
- Sansa branding header
- Active route highlighting
- Supports vendor, lender, admin types

---

## 🎯 Refactoring Process

### When to Refactor
- Page exceeds 200 lines
- Multiple responsibilities in one file
- Repeated code patterns
- UI, data, and logic are mixed
- Difficult to test or maintain

### Refactoring Steps

1. **Identify Concerns**
   - What data types are needed?
   - What business logic exists?
   - What UI components can be extracted?

2. **Create Data Layer**
   ```tsx
   // data/[module]/mockData.ts
   export interface DataType { }
   export const mockData: DataType[] = [ ]
   export const helperFunction = () => { }
   ```

3. **Create Utility Layer**
   ```tsx
   // utils/[module]Utils.ts
   export const formatValue = () => { }
   export const getStatusColor = () => { }
   export const calculateMetric = () => { }
   ```

4. **Create Custom Hook**
   ```tsx
   // hooks/[module]/useFeature.ts
   export const useFeature = (initialData) => {
     // All state management
     // All business logic
     // Return data and handlers
   }
   ```

5. **Extract UI Components**
   ```tsx
   // components/organisms/[module]/[feature]/
   // - Header.tsx
   // - FilterBar.tsx
   // - ItemList.tsx
   // - ItemCard.tsx
   // - Dialog.tsx
   // - EmptyState.tsx
   ```

6. **Simplify Main Page**
   - Import hook and components
   - Pass props
   - Composition only
   - 60-100 lines ideal

### Example: ManageProducts Refactoring

**Before**: 369 lines, all mixed together

**After**:
- `mockProducts.ts` - 140 lines (data)
- `productUtils.ts` - 40 lines (utilities)
- `useManageProducts.ts` - 68 lines (logic)
- `Header.tsx` - 35 lines
- `FiltersAndSearch.tsx` - 35 lines
- `ProductListItem.tsx` - 140 lines
- `EmptyState.tsx` - 25 lines
- `DeleteDialog.tsx` - 45 lines
- `ManageProducts.tsx` - 80 lines ✨

**Result**: Maintainable, testable, reusable

---

## 🔧 Technical Specifications

### Tailwind CSS v4
- Uses `bg-linear-to-*` instead of `bg-gradient-to-*`
- Custom gradients in theme configuration
- Blur effects for ambient backgrounds

### shadcn/ui Components Used
- Button, Input, Label, Textarea
- Select, Dropdown Menu
- Dialog, Badge
- Table (for orders)
- Card (minimal use, prefer custom)
- Tabs (for future features)

### State Management
- React hooks (useState, useMemo, useCallback)
- Custom hooks for feature state
- Context for cart/wishlist (customer side)
- No external state library needed yet

### Routing
- React Router v6
- Nested routes with layouts
- Protected routes structure ready

### Type Safety
- Full TypeScript coverage
- Interfaces for all data types
- Type exports from data files
- No `any` types allowed

---

## 📋 Development Workflow

### Adding a New Feature

1. **Plan the Structure**
   - What data is needed?
   - What logic is required?
   - What UI components?

2. **Create Files**
   ```bash
   data/[module]/mock[Feature]Data.ts
   utils/[feature]Utils.ts
   hooks/[module]/use[Feature].ts
   components/organisms/[module]/[feature]/
     ├── Header.tsx
     ├── Component1.tsx
     ├── Component2.tsx
     └── EmptyState.tsx
   pages/[module]/[Feature]Page.tsx
   ```

3. **Implement Bottom-Up**
   - Start with data & types
   - Create utilities
   - Build custom hook
   - Create UI components
   - Compose main page

4. **Test & Verify**
   - Check for errors
   - Verify all interactions
   - Test responsive design
   - Ensure proper focus states

5. **Update Routing**
   - Add route to main.tsx
   - Update navigation in sidebar

---

## 🎨 Design Improvement Checklist

When improving UI:
- [ ] Remove box-style layouts
- [ ] Add ambient gradient backgrounds
- [ ] Use underline-style inputs
- [ ] Add proper focus states
- [ ] Implement hover effects
- [ ] Use smaller text sizes
- [ ] Add depth with shadows
- [ ] Implement glassmorphism
- [ ] Add optional field indicators (not "compulsory")
- [ ] Use color-coded status indicators
- [ ] Add icon animations
- [ ] Ensure proper spacing

---

## 🚦 Status Indicators

### Vendor Statuses
- **Products**: active (green), draft (amber), out-of-stock (red)
- **Orders**: pending (amber), processing (blue), shipped (purple), delivered (green), cancelled (red)

### Lender Statuses
- **Investments**: on-time (green), late (amber), at-risk (orange), in-default (red), completed (blue)
- **Payments**: paid (green), pending (amber), failed (red)

---

## 📊 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "tailwindcss": "^4.x",
  "lucide-react": "icons",
  "recharts": "^3.3.0" // For charts
}
```

---

## 🎯 Next Steps / Roadmap

### Lender Module
- [ ] Investments page (list & details)
- [ ] Wallet page (balance & transactions)
- [ ] Analytics page (charts & reports)
- [ ] Documents page (agreements & receipts)
- [ ] New investment flow

### Vendor Module
- [ ] Analytics/reports page
- [ ] Customer management
- [ ] Loan application flow
- [ ] Payment history
- [ ] Settings page

### Admin Module
- [ ] Platform overview dashboard
- [ ] User management (vendors, lenders)
- [ ] Transaction monitoring
- [ ] Dispute resolution
- [ ] Platform settings

### Cross-Cutting
- [ ] Authentication system
- [ ] Real API integration
- [ ] Notification system
- [ ] Search functionality
- [ ] File upload handling
- [ ] Export functionality
- [ ] Mobile responsiveness

---

## 💡 Key Learnings & Patterns

1. **Always separate concerns first** - Save time on refactoring
2. **Break UI into components** - Even if it seems like overkill
3. **Use custom hooks** - Keeps pages clean
4. **Type everything** - Prevents bugs early
5. **Consistent styling** - Use utility classes
6. **Focus on depth** - Not boxes
7. **Underline inputs** - Clean and modern
8. **Ambient backgrounds** - Adds atmosphere
9. **Small text** - More professional
10. **Optional fields** - Never "compulsory"

---

## 📝 Code Style Guide

### Naming Conventions
- Components: PascalCase (e.g., `ProductListItem`)
- Files: PascalCase for components, camelCase for utilities
- Hooks: `use` prefix (e.g., `useManageProducts`)
- Utils: camelCase (e.g., `formatCurrency`)
- Types: PascalCase (e.g., `Product`, `Order`)
- Props interfaces: Component name + `Props` (e.g., `HeaderProps`)

### Import Order
1. React imports
2. Third-party libraries
3. Custom hooks
4. Data & utils
5. Components
6. Types (if needed)

### Component Structure
1. Props interface
2. Component definition
3. State declarations
4. Effects
5. Handlers
6. Computed values
7. Return JSX

---

**Last Updated**: November 4, 2024  
**Version**: 1.0  
**Status**: Active Development
