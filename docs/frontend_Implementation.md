# Frontend Implementation Plan
## Feedback Management System — Comprehensive Guide

**Project:** Feedback / Complaint Management System  
**Stack:** React 18 + React Router v6 + Bootstrap 5 + Chart.js  
**Estimated Frontend Hours:** ~60–80 hours  
**Total Pages:** 14 unique pages  
**Total Components:** 40+ reusable components

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Design System](#design-system)
3. [Page Inventory](#page-inventory)
4. [Component Library](#component-library)
5. [Page-by-Page Breakdown](#page-by-page-breakdown)
6. [State Management](#state-management)
7. [API Service Layer](#api-service-layer)
8. [Form Handling & Validation](#form-handling--validation)
9. [Animations & Micro-interactions](#animations--micro-interactions)
10. [Charts & Data Visualization](#charts--data-visualization)
11. [Responsive Design Strategy](#responsive-design-strategy)
12. [Error Handling & UX](#error-handling--ux)
13. [Accessibility](#accessibility)
14. [Performance](#performance)

---

## 1. Project Structure

```
client/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── logo.svg
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   └── ToastNotification.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── complaints/
│   │   │   ├── ComplaintForm.jsx
│   │   │   ├── ComplaintCard.jsx
│   │   │   ├── ComplaintTable.jsx
│   │   │   ├── ComplaintDetail.jsx
│   │   │   ├── ComplaintTimeline.jsx
│   │   │   ├── ComplaintBadge.jsx
│   │   │   ├── ComplaintFilters.jsx
│   │   │   ├── ComplaintSearch.jsx
│   │   │   ├── CommentThread.jsx
│   │   │   └── ImageUpload.jsx
│   │   ├── dashboard/
│   │   │   ├── StatsCard.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   ├── WelcomeBanner.jsx
│   │   │   └── NotificationPanel.jsx
│   │   ├── charts/
│   │   │   ├── ComplaintsByCategory.jsx
│   │   │   ├── ComplaintsByStatus.jsx
│   │   │   ├── ComplaintTrend.jsx
│   │   │   ├── PriorityBreakdown.jsx
│   │   │   └── ResolutionTimeChart.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       ├── TextArea.jsx
│   │       ├── Badge.jsx
│   │       ├── Modal.jsx
│   │       ├── Tooltip.jsx
│   │       └── Pagination.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── SubmitComplaint.jsx
│   │   ├── MyComplaints.jsx
│   │   ├── ComplaintDetail.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminComplaints.jsx
│   │   ├── AdminComplaintDetail.jsx
│   │   ├── AdminAnalytics.jsx
│   │   ├── Profile.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useComplaints.js
│   │   ├── useLocalStorage.js
│   │   ├── usePagination.js
│   │   ├── useForm.js
│   │   └── useDebounce.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── complaintService.js
│   │   └── adminService.js
│   ├── utils/
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

---

## 2. Design System

### 2.1 CSS Variables (variables.css)

```css
:root {
  /* Brand Colors */
  --primary:        #2563EB;
  --primary-light:  #3B82F6;
  --primary-dark:   #1D4ED8;
  --secondary:      #7C3AED;
  --accent:         #F59E0B;

  /* Status Colors */
  --status-pending:    #F59E0B;
  --status-inprogress: #3B82F6;
  --status-resolved:   #10B981;

  /* Priority Colors */
  --priority-high:   #EF4444;
  --priority-medium: #F59E0B;
  --priority-low:    #6B7280;

  /* Neutral Palette */
  --bg-base:     #F8FAFC;
  --bg-surface:  #FFFFFF;
  --bg-elevated: #F1F5F9;
  --border:      #E2E8F0;
  --text-primary:   #0F172A;
  --text-secondary: #64748B;
  --text-muted:     #94A3B8;

  /* Typography */
  --font-sans:    'Inter', sans-serif;
  --font-display: 'Poppins', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);

  /* Transitions */
  --transition-fast:   0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow:   0.4s ease;
}
```

### 2.2 Typography Scale

| Token        | Size  | Weight | Usage                  |
|--------------|-------|--------|------------------------|
| `--text-xs`  | 12px  | 400    | Labels, captions       |
| `--text-sm`  | 14px  | 400    | Body small, table data |
| `--text-base`| 16px  | 400    | Body, default          |
| `--text-lg`  | 18px  | 500    | Section leads          |
| `--text-xl`  | 20px  | 600    | Card titles            |
| `--text-2xl` | 24px  | 700    | Page sub-titles        |
| `--text-3xl` | 30px  | 700    | Page headings          |
| `--text-4xl` | 36px  | 800    | Hero headings          |

### 2.3 Color Application Rules

- **Primary blue** → buttons, links, active states, progress indicators
- **Amber** → pending status, medium priority, warnings
- **Green** → resolved status, success states, positive metrics
- **Red** → high priority, errors, delete actions
- **Purple** → admin-only areas, role indicators

---

## 3. Page Inventory

| # | Route                        | Access  | Purpose                             |
|---|------------------------------|---------|-------------------------------------|
| 1 | `/`                          | Public  | Landing page / marketing            |
| 2 | `/login`                     | Public  | User & admin login                  |
| 3 | `/register`                  | Public  | New user registration               |
| 4 | `/dashboard`                 | User    | User overview & quick actions       |
| 5 | `/submit`                    | User    | Submit a new complaint              |
| 6 | `/my-complaints`             | User    | View & filter own complaints        |
| 7 | `/complaints/:id`            | User    | Complaint detail & comments         |
| 8 | `/profile`                   | User    | Edit profile, change password       |
| 9 | `/admin`                     | Admin   | Admin overview & metrics            |
| 10| `/admin/complaints`          | Admin   | Manage all complaints               |
| 11| `/admin/complaints/:id`      | Admin   | Full detail, status/priority update |
| 12| `/admin/analytics`           | Admin   | Charts, trends, reports             |
| 13| `/about`                     | Public  | Project info, tech stack            |
| 14| `/contact`                   | Public  | Contact form                        |

---

## 4. Component Library

### 4.1 Common Components

#### `<Navbar />`

```jsx
// Props: none (reads from AuthContext)
// Features:
// - Logo with brand name
// - Dynamic nav links based on role (user vs admin)
// - Profile dropdown: "My Profile", "Dashboard", "Logout"
// - Notification bell badge (unread count)
// - Mobile hamburger menu with slide-in drawer
// - Active link highlighting with underline animation
// - Sticky with backdrop blur on scroll
```

**Navbar Layout:**
```
[Logo + Brand]   [Dashboard] [My Complaints] [Submit]   [🔔3] [👤 User ▼]
                                                          ↓
                                                     Profile | Logout
```

#### `<Sidebar />` (Admin Layout)

```jsx
// Used only in admin pages
// Features:
// - Collapsible (icon-only mode)
// - Sections: Overview, Complaints, Analytics, Settings
// - Active route indicator (left border + bg tint)
// - Complaint count badges per section
// - Keyboard shortcut hints
// - Toggle button with smooth animation
```

**Sidebar Items:**
```
📊  Dashboard          [24]
📋  All Complaints     [12 pending]
🔍  Analytics
⚙️  Settings
```

#### `<StatsCard />`

```jsx
// Props: title, value, icon, trend, color, link
// Features:
// - Large number with count-up animation on mount
// - Trend arrow (↑ up or ↓ down) with % change vs last week
// - Colored left border or icon background
// - Click navigates to relevant filtered list
// - Hover: slight lift with deeper shadow
```

**4 Admin Dashboard Cards:**
```
┌─────────────────┐  ┌─────────────────┐
│ 📋 Total        │  │ 🕐 Pending      │
│   124           │  │   38            │
│ ↑ 12% this week │  │ ↑ 5 today       │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│ 🔄 In Progress  │  │ ✅ Resolved     │
│   21            │  │   65            │
│ Steady          │  │ ↑ 8 this week   │
└─────────────────┘  └─────────────────┘
```

#### `<ComplaintCard />`

```jsx
// Props: complaint object, onView, onDelete (admin only)
// Features:
// - Title + truncated description (2 lines)
// - Category icon (⚡ Electrical, 🌐 Network, 🔧 Maintenance, 📂 Others)
// - Priority badge (color-coded pill)
// - Status badge with dot indicator
// - "Submitted X days ago" relative timestamp
// - Hover: card lifts, "View Details →" appears
// - Quick action buttons on hover (admin: Edit, Delete)
```

**Card Layout:**
```
┌──────────────────────────────────────────┐
│  🌐 Network          [High] [Pending]    │
│  WiFi Not Working in Lab 3               │
│  Internet connection drops every 15...   │
│                                           │
│  👤 Ravi Kumar · 2 days ago              │
│                             [View →]     │
└──────────────────────────────────────────┘
```

#### `<ComplaintBadge />`

```jsx
// Props: type ('status'|'priority'|'category'), value
// Status variants:
//   Pending    → amber bg, amber text, ● dot
//   In Progress→ blue bg, blue text, ◉ pulse dot
//   Resolved   → green bg, green text, ✓ icon
// Priority variants:
//   High   → red pill
//   Medium → amber pill
//   Low    → gray pill
```

#### `<ComplaintFilters />`

```jsx
// Props: filters, onFilterChange
// Features:
// - Category filter (All | Electrical | Network | Maintenance | Others)
// - Status filter (All | Pending | In Progress | Resolved)
// - Priority filter (All | High | Medium | Low)
// - Date range picker (From - To)
// - Sort by (Newest | Oldest | Priority | Status)
// - "Clear Filters" button (appears only when filters active)
// - Filter count indicator (e.g., "2 filters active")
// - Collapsible on mobile
```

#### `<ComplaintSearch />`

```jsx
// Props: onSearch, placeholder
// Features:
// - Full-width search bar with 🔍 icon
// - Debounced input (300ms) — no search on every keypress
// - Clear button (×) appears when text entered
// - Search history dropdown (last 5 searches, saved to localStorage)
// - Keyboard: Enter to search, Escape to clear
```

#### `<Pagination />`

```jsx
// Props: currentPage, totalPages, onPageChange
// Features:
// - First, Prev, [1] [2] [3] ..., Next, Last
// - Shows page range: "Showing 21–40 of 124 complaints"
// - Disabled states for First/Prev on page 1
// - Active page highlighted
// - Keyboard accessible (arrow keys)
```

#### `<ToastNotification />`

```jsx
// Globally accessible via useToast() hook
// Variants: success, error, info, warning
// Features:
// - Slides in from top-right
// - Auto-dismiss after 4 seconds
// - Progress bar countdown
// - Manual dismiss (×)
// - Multiple toasts stack vertically
// - Toast queue: max 3 visible at once

// Usage:
const { toast } = useToast();
toast.success('Complaint submitted!');
toast.error('Failed to update status.');
```

#### `<ConfirmModal />`

```jsx
// Props: isOpen, title, message, onConfirm, onCancel, danger
// Features:
// - Centered modal overlay with backdrop blur
// - Title + description text
// - Cancel (gray) + Confirm (red if danger, blue otherwise)
// - Keyboard: Enter to confirm, Escape to cancel
// - Fade in / scale up animation
```

#### `<EmptyState />`

```jsx
// Props: icon, title, description, actionLabel, onAction
// Used when lists have no results
// Examples:
//   "No complaints yet" + Submit Complaint button
//   "No results found" + Clear Filters button
//   "Nothing to show for this filter" + info text
```

---

## 5. Page-by-Page Breakdown

### 5.1 Landing Page (`/`)

**Purpose:** Introduce the system to visitors, drive registration.

**Sections:**

```
1. HERO SECTION
   ──────────────────────────────────
   Full-width with gradient background (blue → purple)
   
   H1: "Manage Complaints. Track Progress."
       "Get Results."
   
   P: "A transparent, digital complaint management system
       for students and staff."
   
   [Get Started →]  [Learn More ↓]
   
   Floating dashboard screenshot mockup (right side)

2. PROBLEM / SOLUTION SECTION
   ──────────────────────────────────
   3 columns with icons:
   
   ❌ Before (Manual)    →    ✅ After (Our System)
   - Lost paperwork           - Digital submission
   - No updates               - Real-time tracking
   - No accountability        - Admin dashboard

3. FEATURES SECTION
   ──────────────────────────────────
   Grid of 6 feature cards:
   
   [📤 Submit Easily]   [📊 Track Status]  [🔐 Secure Auth]
   [👤 Role-Based]      [📈 Analytics]     [📱 Responsive]
   
   Each card: icon, title, 2-line description, hover lift

4. HOW IT WORKS SECTION
   ──────────────────────────────────
   Numbered steps with connecting line:
   
   1 → Register / Login
   2 → Submit your complaint
   3 → Admin reviews it
   4 → Get notified on resolution

5. CATEGORIES SECTION
   ──────────────────────────────────
   4 category tiles:
   ⚡ Electrical   🌐 Network
   🔧 Maintenance  📂 Others

6. CTA SECTION
   ──────────────────────────────────
   Centered with gradient bg:
   "Ready to get started?"
   [Register Now →]  [Admin Login]

7. FOOTER
   ──────────────────────────────────
   Logo | Links | Made with ❤️ by [Name]
```

**Implementation notes:**
- CSS animations: hero fades in, stats count up when scrolled into view
- No backend calls needed (static page)
- Scroll-to-anchor for "Learn More" button
- Mobile: single column, stacked sections

---

### 5.2 Register Page (`/register`)

**Layout:** Centered card (max-width: 460px), split layout on desktop (form left, visual right).

**Form Fields:**

| Field        | Type     | Validation                          |
|--------------|----------|-------------------------------------|
| Full Name    | text     | Required, 2–100 chars               |
| Email        | email    | Required, valid email format        |
| Password     | password | Min 8 chars, uppercase + number     |
| Confirm Pwd  | password | Must match Password                 |
| Role         | hidden   | Always 'user' (admin created by DB) |

**Features:**
- Password strength meter (Weak / Fair / Strong / Very Strong) with color bar
- Show/hide password toggle (👁)
- Real-time inline validation (error shows after field is touched)
- Submit button disabled until all fields valid
- After success: redirect to `/dashboard` with welcome toast
- "Already have an account? Login →" link
- Social/demo login note: "Demo: user@demo.com / password123"

**Right side visual (desktop):**
- Illustration or animated bullets of benefits
- "Join 500+ users managing their complaints digitally"

---

### 5.3 Login Page (`/login`)

**Layout:** Same centered card, slightly shorter.

**Form Fields:**

| Field    | Type     | Validation              |
|----------|----------|-------------------------|
| Email    | email    | Required, valid format  |
| Password | password | Required                |

**Features:**
- "Remember me" checkbox (saves email to localStorage)
- Show/hide password toggle
- Animated error message for wrong credentials (shake animation)
- Admin / User role auto-detected from JWT response
  - Role 'admin' → redirect to `/admin`
  - Role 'user' → redirect to `/dashboard`
- "Don't have an account? Register →" link
- Forgot password placeholder (shows "Contact administrator" info)

---

### 5.4 User Dashboard (`/dashboard`)

**Layout:** Top stats row + two columns (recent complaints left, quick actions right)

**Sections:**

```
┌──────────────────────────────────────────────────────────┐
│  👋 Welcome back, Ravi!   Today is Monday, 12 Apr 2026   │
└──────────────────────────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Total    │ │ Pending  │ │In Progres│ │ Resolved │
│   8      │ │   3      │ │   2      │ │   3      │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

LEFT COLUMN (70%)                RIGHT COLUMN (30%)
─────────────────                ─────────────────
Recent Complaints                Quick Actions
[3 most recent cards]            [+ Submit New]
[View All →]                     [📋 My Complaints]
                                 [👤 Profile]

Activity Timeline                Complaint Tips
[Status change history]          "Use specific titles
                                  for faster resolution"
```

**Stats cards:** same style as admin but filtered to current user only.

**Activity Timeline:**
- Shows last 5 status changes across all user's complaints
- Format: "Your complaint 'WiFi Issue' moved to In Progress · 2 hrs ago"
- Color-coded by new status

---

### 5.5 Submit Complaint Page (`/submit`)

**Layout:** Full-width form, max 700px centered, card style.

**Form Fields:**

| Field       | Type       | Notes                                    |
|-------------|------------|------------------------------------------|
| Title       | text       | Required, 5–200 chars, character counter |
| Description | textarea   | Required, min 10 chars, 5 rows, counter  |
| Category    | select     | Electrical / Network / Maintenance / Others |
| Priority    | radio/card | Low / Medium / High (visual card select) |
| Image       | file       | Optional, JPG/PNG, max 5MB, preview      |

**Priority Selector (card style, not plain radio):**
```
┌────────────┐  ┌────────────┐  ┌────────────┐
│  🟢 Low    │  │ 🟡 Medium  │  │  🔴 High   │
│ Non-urgent │  │ Noticeable │  │ Critical   │
│            │  │            │  │ impact     │
└────────────┘  └────────────┘  └────────────┘
```
Selected card gets colored border + checkmark.

**Image Upload:**
- Drag-and-drop area with dashed border
- Click to browse
- Preview thumbnail after selection
- Remove (×) button on preview
- Accepts: jpg, jpeg, png, gif
- Shows file name + size

**Form behavior:**
- All validation inline, on blur
- Progress indicator: 3 steps (Details → Priority → Review)
- Review step: shows summary before final submit
- On success: show success page with complaint ID + "View My Complaints" button

---

### 5.6 My Complaints Page (`/my-complaints`)

**Layout:** Filters top bar + complaint list/grid below.

**Features:**

```
[🔍 Search complaints...]         [⊞ Grid] [≡ List]  [Sort ▼]

Filters:
[All Status ▼] [All Category ▼] [All Priority ▼] [Date Range]
                                              [Clear Filters]

Results: "Showing 8 complaints"

┌──────────────────────┐  ┌──────────────────────┐
│ ComplaintCard        │  │ ComplaintCard        │
└──────────────────────┘  └──────────────────────┘
... (grid or list mode toggled by user)

[Pagination: 1 2 3 ... Next]
```

**View modes:**
- **Grid mode:** 2 or 3 columns, cards with image preview if available
- **List mode:** Table-like rows with compact info + action buttons

**Status quick-view:**
- Visual status progression bar on each card:
  `[● Submitted] → [● In Review] → [● In Progress] → [● Resolved]`
  Completed steps are filled, current step pulses.

---

### 5.7 Complaint Detail Page (`/complaints/:id`)

**Layout:** Two-column (detail left, sidebar right)

```
LEFT COLUMN (65%)                  RIGHT COLUMN (35%)
─────────────────────              ─────────────────────
[← Back to My Complaints]         STATUS CARD
                                   Current: In Progress
Title: WiFi Not Working            Updated: 2 days ago

Category: 🌐 Network               PRIORITY CARD
Priority: 🔴 High                  High

Submitted: April 10, 2026          TIMELINE
                                   ● Apr 10 - Submitted
DESCRIPTION                        ● Apr 11 - In Progress
Full description text here...
                                   ATTACHMENTS
IMAGE (if uploaded)                [image thumbnail]
[Click to expand full image]

COMMENTS SECTION
─────────────────
[Admin] "We are looking into this..." · 1 day ago
[You] "Please resolve ASAP" · 20 hours ago

┌─────────────────────────────────────────────┐
│  Add a comment...                           │
│                                    [Post →] │
└─────────────────────────────────────────────┘
```

**Comment features:**
- Threaded comments (user ↔ admin)
- Timestamps with relative format ("2 hours ago")
- Admin comments visually distinguished (purple badge "Admin")
- Empty state: "No comments yet. Be the first to add one."

---

### 5.8 Admin Dashboard (`/admin`)

**Layout:** Sidebar left + main content right (full admin layout)

```
HEADER ROW
─────────────────────────────────────────────────────
"Admin Dashboard"    [Today: Mon, 12 Apr 2026]   [Export Report ▼]

STATS ROW
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 124 Total│ │38 Pending│ │21 Active │ │65 Resolved│
│ ↑12% wk  │ │ ↑5 today │ │ Steady   │ │ ↑8 wk    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

CHARTS ROW (2 charts side by side)
[Donut: Complaints by Status]   [Bar: Complaints by Category]

RECENT ACTIVITY (full width)
Table of last 10 complaints with: ID, Title, User, Status, Priority, Date, [Manage]

QUICK FILTERS (below table)
[View All Pending →]  [View High Priority →]  [View Today's →]
```

---

### 5.9 Admin Complaints Page (`/admin/complaints`)

**Layout:** Full-width table with top controls

**Features:**

```
[🔍 Search...]     [Category ▼] [Status ▼] [Priority ▼] [Date ▼]
                                              [Clear] [Export CSV]

Showing 1–20 of 124 complaints              [⊞ Cards] [≡ Table]

TABLE VIEW:
┌────┬──────────────────┬──────────┬──────────┬────────────┬──────────┬──────────┐
│ ID │ Title            │ User     │ Category │ Priority   │ Status   │ Actions  │
├────┼──────────────────┼──────────┼──────────┼────────────┼──────────┼──────────┤
│  1 │ WiFi Not Working │ Ravi K.  │ Network  │ 🔴 High    │ Pending  │ [👁][✏️][🗑]│
│  2 │ Light Flickering │ Priya S. │ Electrical│ 🟡 Medium │ Progress │ [👁][✏️][🗑]│
└────┴──────────────────┴──────────┴──────────┴────────────┴──────────┴──────────┘

[Bulk Actions ▼: Mark Resolved | Mark In Progress | Delete Selected]
Checkboxes on rows for bulk select.

[← Prev]  1  2  3  ...  7  [Next →]
```

**Bulk Actions:**
- Checkbox on each row + "Select All" in header
- Bulk status change dropdown
- Confirm dialog before bulk delete

**Export CSV:**
- Exports current filtered/sorted view to CSV
- Columns: ID, Title, User, Category, Priority, Status, Created At, Updated At

---

### 5.10 Admin Complaint Detail (`/admin/complaints/:id`)

**Layout:** Same as user detail but with admin edit controls

**Admin-only extras:**

```
ADMIN ACTIONS PANEL (right sidebar, top)
──────────────────────────────────────
Update Status:
[Pending] [In Progress] [Resolved]  ← Toggle buttons

Change Priority:
[Low]  [Medium]  [High]  ← Toggle buttons

[Save Changes]  [← Back to List]

Delete Complaint:
[🗑 Delete (irreversible)]  ← Red, confirm dialog

HISTORY / AUDIT TRAIL
──────────────────────────────────────
● Apr 12 - Status changed: Pending → In Progress (by Admin)
● Apr 11 - Priority changed: Low → High (by Admin)
● Apr 10 - Complaint created (by Ravi Kumar)
```

---

### 5.11 Admin Analytics Page (`/admin/analytics`)

**Layout:** Dashboard grid with 5 chart panels

**Charts:**

```
ROW 1: (2 charts)
┌────────────────────────────┐  ┌────────────────────────────┐
│ Complaints Over Time       │  │ Resolution Rate            │
│ Line chart, last 30 days   │  │ Gauge / progress ring      │
│ Shows daily submissions    │  │ 52% resolved this month    │
└────────────────────────────┘  └────────────────────────────┘

ROW 2: (3 charts)
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ By Category  │  │ By Status    │  │ By Priority  │
│ Doughnut     │  │ Pie chart    │  │ Horizontal   │
│              │  │              │  │ bar chart    │
└──────────────┘  └──────────────┘  └──────────────┘

ROW 3: (full width)
┌────────────────────────────────────────────────────┐
│ Average Resolution Time by Category                │
│ Bar chart: Electrical(3d) Network(2d) Maint.(5d)   │
└────────────────────────────────────────────────────┘

ROW 4: Summary metrics cards
Total Submitted: 124 | Avg Resolution: 3.2 days | Fastest: 4 hrs
```

**Filter controls above charts:**
```
Date Range: [Last 7 days ▼]   Category: [All ▼]   [Apply] [Reset]
```

---

### 5.12 Profile Page (`/profile`)

**Layout:** Two sections — profile info (left), password change (right)

```
LEFT: Profile Information
─────────────────────────
[Avatar circle: initials]
[Change Photo (optional)]

Full Name: [Ravi Kumar    ]  [Edit]
Email:     [ravi@email.com]  (read-only)
Role:      [User          ]  (read-only)
Joined:    April 8, 2026

[Save Changes]

RIGHT: Change Password
──────────────────────
Current Password: [          ] 👁
New Password:     [          ] 👁
Confirm New Pwd:  [          ] 👁

Password strength meter
[Update Password]

BOTTOM: Account Stats
──────────────────────
Total Complaints: 8 | Pending: 3 | Resolved: 3
```

---

### 5.13 About Page (`/about`)

**Sections:**
```
1. Project Overview
   - System name, purpose, academic context
   - Web Technologies Lab | April 2026

2. Technology Stack Cards
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ React    │ │ Node.js  │ │ MySQL    │
   │ Frontend │ │ Backend  │ │ Database │
   └──────────┘ └──────────┘ └──────────┘
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │ Express  │ │   JWT    │ │Bootstrap │
   │   API    │ │  Auth    │ │   CSS    │
   └──────────┘ └──────────┘ └──────────┘

3. Features List
   Visual checkmarks, grouped by User / Admin

4. Team / Developer Info
   Name, Roll Number, Course, Institution

5. Academic Context
   Syllabus mapping summary (Cycle 1 & 2 coverage)

6. GitHub Link
   [View on GitHub →]
```

---

### 5.14 Contact Page (`/contact`)

**Layout:** Split — contact form (left 60%) + contact info (right 40%)

**Form Fields:**

| Field   | Type     | Validation                |
|---------|----------|---------------------------|
| Name    | text     | Required                  |
| Email   | email    | Required, valid format    |
| Subject | select   | Bug Report / Feedback / Enquiry / Other |
| Message | textarea | Required, min 10 chars    |

**Right panel:**
```
📍 Location:    Computer Science Dept., [College Name]
📧 Email:       admin@feedback.com
🕐 Response:    Within 24 hours

Common Issues:
→ Forgot password → Contact admin
→ Account deleted → Re-register
→ Technical bug → Use Bug Report
```

**After submit:** Show success card "Message sent! We'll get back to you within 24 hours."

---

## 6. State Management

### AuthContext

```jsx
// Provides:
{
  user: { id, name, email, role },
  token: string,
  isAuthenticated: boolean,
  isAdmin: boolean,
  login(email, password) → Promise,
  logout() → void,
  updateProfile(data) → Promise
}
```

### ToastContext

```jsx
// Provides useToast() hook:
const { toast } = useToast();
toast.success('Done!');
toast.error('Failed!');
toast.info('Note');
toast.warning('Watch out');
```

### Custom Hooks

#### `useComplaints(filters)`
```js
// Returns: { complaints, loading, error, pagination, refetch }
// Handles API call + state for complaint lists
// Accepts filters object: { status, category, priority, page, search }
```

#### `useForm(initialValues, validationSchema)`
```js
// Returns: { values, errors, touched, handleChange, handleBlur, handleSubmit, reset }
// Generic form hook used by all forms
// Validation runs on blur, full validation on submit
```

#### `usePagination(totalItems, pageSize)`
```js
// Returns: { currentPage, totalPages, goToPage, nextPage, prevPage, pageRange }
```

#### `useDebounce(value, delay)`
```js
// Used in search inputs to prevent API call on every keystroke
// delay: 300ms default
```

---

## 7. API Service Layer

### `services/api.js`

```js
// Base axios instance
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor: attach JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401 → auto logout
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### `services/complaintService.js`

```js
export const complaintService = {
  // User
  submit: (data)         => api.post('/complaints', data),
  getMine: (params)      => api.get('/complaints/my', { params }),
  getById: (id)          => api.get(`/complaints/${id}`),
  addComment: (id, text) => api.post(`/complaints/${id}/comments`, { comment: text }),
  getComments: (id)      => api.get(`/complaints/${id}/comments`),
  getHistory: (id)       => api.get(`/complaints/${id}/history`),

  // Admin
  getAll: (params)       => api.get('/admin/complaints', { params }),
  update: (id, data)     => api.put(`/admin/complaints/${id}`, data),
  delete: (id)           => api.delete(`/admin/complaints/${id}`),
  getStats: ()           => api.get('/admin/stats'),
};
```

---

## 8. Form Handling & Validation

### `utils/validation.js`

```js
export const validators = {
  required: (val) => val?.trim() ? null : 'This field is required',
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Invalid email address',
  minLength: (n) => (val) => val?.length >= n ? null : `Minimum ${n} characters required`,
  maxLength: (n) => (val) => val?.length <= n ? null : `Maximum ${n} characters allowed`,
  passwordStrength: (val) => {
    if (!val || val.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(val))    return 'Must include an uppercase letter';
    if (!/[0-9]/.test(val))    return 'Must include a number';
    return null;
  },
  passwordMatch: (original) => (val) => val === original ? null : 'Passwords do not match',
};
```

### Password Strength Meter

```jsx
// Visual indicator: 4 segments, colored by strength score
// Score 1: Weak (red, 1/4 filled)
// Score 2: Fair (orange, 2/4 filled)
// Score 3: Strong (yellow-green, 3/4 filled)
// Score 4: Very Strong (green, full)

// Scoring:
// +1 for >= 8 chars
// +1 for uppercase
// +1 for number
// +1 for special character
```

---

## 9. Animations & Micro-interactions

### CSS Animation Definitions (`animations.css`)

```css
/* Fade in from below */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Count up (via JS, CSS provides transition) */
.stat-number { transition: all 0.5s ease-out; }

/* Pulse dot for "In Progress" status */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.7; }
}

/* Skeleton loading shimmer */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Card hover lift */
.complaint-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.complaint-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}

/* Shake on login error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-6px); }
  80%       { transform: translateX(6px); }
}
.error-shake { animation: shake 0.4s ease; }

/* Slide-in toast */
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
```

### Stagger Animation on List Load

```jsx
// Complaint cards stagger in with 50ms delay each
{complaints.map((c, i) => (
  <ComplaintCard
    key={c.id}
    complaint={c}
    style={{ animationDelay: `${i * 50}ms` }}
    className="animate-fade-in-up"
  />
))}
```

### Count-up Animation for Stats

```jsx
// useCountUp hook: animates number from 0 to target over 1.5s
const count = useCountUp(targetValue, 1500);
return <span className="stat-number">{count}</span>;
```

---

## 10. Charts & Data Visualization

### Setup

```bash
npm install chart.js react-chartjs-2
```

### Chart Components

#### `ComplaintsByCategory` (Doughnut Chart)

```jsx
// Data: { labels: ['Electrical','Network','Maintenance','Others'],
//         datasets: [{ data: [30, 45, 18, 7], backgroundColor: [...] }] }
// Options: legend bottom, tooltips with count + %
// Animated on mount with drawTime: afterDatasetsDraw
```

#### `ComplaintsByStatus` (Pie Chart)

```jsx
// Data: { labels: ['Pending','In Progress','Resolved'],
//         datasets: [{ data: [38, 21, 65], backgroundColor: ['#F59E0B','#3B82F6','#10B981'] }] }
```

#### `ComplaintTrend` (Line Chart)

```jsx
// Data: daily submissions for last 30 days
// X-axis: dates (formatted as "Apr 1", "Apr 2", ...)
// Y-axis: count
// Two lines: Submitted vs Resolved
// Area fill with low opacity under each line
// Smooth curve: tension: 0.4
```

#### `PriorityBreakdown` (Horizontal Bar)

```jsx
// Data: { labels: ['High','Medium','Low'], datasets: [{ data: [40, 55, 29] }] }
// indexAxis: 'y' for horizontal
// Color per bar: red, amber, gray
```

#### `ResolutionTimeChart` (Bar by Category)

```jsx
// Data: average days to resolve per category
// X-axis: categories
// Y-axis: days
// Helps identify bottlenecks
```

### Chart Theme Integration

```js
// All charts use CSS variable colors via Chart.js custom theme
Chart.defaults.color = '#64748B';
Chart.defaults.borderColor = '#E2E8F0';
Chart.defaults.font.family = "'Inter', sans-serif";
```

---

## 11. Responsive Design Strategy

### Breakpoints (Bootstrap 5 + custom)

| Name | Width   | Target Device         |
|------|---------|-----------------------|
| xs   | < 576px | Mobile portrait       |
| sm   | ≥ 576px | Mobile landscape      |
| md   | ≥ 768px | Tablet portrait       |
| lg   | ≥ 992px | Tablet landscape / laptop |
| xl   | ≥ 1200px| Desktop               |
| xxl  | ≥ 1400px| Wide desktop          |

### Mobile-Specific Adaptations

| Component             | Desktop            | Mobile                |
|-----------------------|--------------------|-----------------------|
| Navbar                | Horizontal links   | Hamburger + drawer    |
| Admin Sidebar         | Visible, expanded  | Hidden, slide-in      |
| Stats Cards           | 4 in a row         | 2×2 grid              |
| Charts Row            | Side by side       | Stacked vertically    |
| Complaint Table       | Full columns       | Key columns only + expand row |
| Filters Bar           | Horizontal row     | Collapsible accordion |
| Submit Form           | Single column, wide| Full width, scrollable|
| ComplaintCard grid    | 2–3 columns        | Single column         |

### Mobile Navigation

```jsx
// Hamburger toggles a slide-in drawer from left
// Drawer: logo, user info, all nav links, logout
// Backdrop overlay closes drawer on click
// Transitions: translateX(-100%) → translateX(0) at 300ms ease
```

---

## 12. Error Handling & UX

### Error Boundary

```jsx
// Wraps entire App — catches unhandled React errors
// Shows friendly error page instead of white screen
// "Something went wrong. Try refreshing the page."
// Sentry integration point (Phase 4)
```

### Loading States

- **Full page load:** Centered spinner with brand color
- **Component data load:** Skeleton cards (shimmer animation) matching layout
- **Button submit:** Button shows spinner + "Submitting..." disables click
- **Table load:** 5 skeleton rows

### Error States

- **API error (network):** "Could not connect to server. Check your connection."
- **API error (500):** "Something went wrong on our end. Try again."
- **404 not found:** Dedicated 404 page with "Go Home" button
- **Auth error (403):** Redirect to login with "Session expired" toast

### Empty States

| Context              | Icon | Message                          | CTA                  |
|----------------------|------|----------------------------------|----------------------|
| No complaints (user) | 📭   | "You haven't filed any yet"     | "Submit First One →" |
| No results (search)  | 🔍   | "No complaints match your search"| "Clear Filters"      |
| No comments          | 💬   | "No comments yet"               | (none)               |
| Admin: all resolved  | 🎉   | "All caught up!"                | (celebration)        |

---

## 13. Accessibility

### Requirements

- All interactive elements have `aria-label` or visible label
- Color is never the **only** indicator (always paired with text/icon)
- Status badges include `role="status"` and aria description
- Forms: `<label htmlFor>` linked to every `<input>`
- Error messages: `aria-live="polite"` for screen reader announcement
- Modal: focus trap while open; restore focus on close
- Skip to main content link for keyboard users
- Tab order follows visual reading order
- Images: `alt` text on all `<img>` tags
- Min contrast ratio: 4.5:1 for body text, 3:1 for large text

---

## 14. Performance

### Optimizations

- **Code splitting:** React.lazy() + Suspense for each page route
- **Image optimization:** Compress uploads server-side; use `loading="lazy"` on img
- **Debounced search:** 300ms delay prevents API flood
- **Pagination:** Never load all records at once; default 20 per page
- **Memoization:** `React.memo()` on `ComplaintCard`, `StatsCard`; `useMemo()` for chart data
- **LocalStorage caching:** Cache user info + token; cache last search filters
- **Axios caching:** Cache GET responses for 60s where appropriate

### Bundle Size Tips

```bash
# Tree-shaking: import only what's needed from Chart.js
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

# Not: import Chart from 'chart.js/auto'; // imports everything
```

---

## Dependencies Summary

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "axios": "^1.5.0",
    "bootstrap": "^5.3.2",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  }
}
```

No additional heavy libraries needed. All features built with these + custom CSS.

---

## Implementation Order (Recommended)

| Day | What to Build                                      |
|-----|----------------------------------------------------|
| 1   | Design system (variables.css), base layout, Navbar |
| 2   | Register + Login pages with full validation         |
| 3   | AuthContext, API service layer, PrivateRoute        |
| 4   | User Dashboard + StatsCard + WelcomeBanner          |
| 5   | Submit Complaint form (multi-step)                  |
| 6   | My Complaints page (grid + list + filters)          |
| 7   | Complaint Detail page + Comments                    |
| 8   | Admin Dashboard + admin layout with Sidebar         |
| 9   | Admin Complaints table (bulk actions, export)       |
| 10  | Admin Complaint Detail (status/priority update)     |
| 11  | Analytics page + all 5 Chart.js charts              |
| 12  | Profile, About, Contact pages                       |
| 13  | Landing page (hero, features, how it works)         |
| 14  | Animations, skeleton loaders, toasts, polish        |
| 15  | Mobile responsiveness pass, accessibility audit     |

---

*This document covers 14 pages, 40+ components, a full design system, data visualization, form validation, animations, error handling, accessibility, and performance — providing comprehensive frontend coverage for a production-quality Feedback Management System.*