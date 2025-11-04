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

**Lender Layout**:
- Reuses generic DashboardLayout + DashboardSidebar
- Active Investments metric
- Navigation: Dashboard, Investments, Wallet, Analytics, Documents

**Placeholder Routes** (Not Yet Implemented):
- `/lender-dashboard/investments` - Investment list & management
- `/lender-dashboard/wallet` - Balance & transactions
- `/lender-dashboard/analytics` - Performance charts
- `/lender-dashboard/documents` - Agreements & receipts

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
