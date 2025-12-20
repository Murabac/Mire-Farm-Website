# Figma AI Prompt: Backend Admin Dashboard Design

Design a comprehensive admin dashboard and content management system for managing the Mire Farms website content. The dashboard supports multi-language content (English, Somali, Arabic) and will be used by content managers and administrators.

## Design Requirements

### 1. Dashboard Overview Page
- Statistics cards: Total products, active news articles, unread contact submissions, newsletter subscribers
- Recent activity: Latest submissions, recent content updates
- Quick actions: Add product, create article, view pending submissions
- Translation status: Language completeness indicators
- System status: Connection status, last backup

### 2. Content Management Pages

#### Hero Section Management
- Form with language tabs (EN/SO/AR)
- Fields: Badge text, heading (prefix/highlight/suffix), description, button texts, stats (3 items with number + label), hero image, bottom badge
- Features: Live preview, image upload, language tabs

#### Benefits Section Management
- List view: Add/edit/delete/reorder benefits
- Fields: Text (3 languages), display order, active status
- Features: Drag-and-drop reordering, bulk actions

#### Mission, Vision & Values Management
- Three sections:
  1. Section Header: Title/description (3 languages)
  2. Main Cards: Mission/Vision/Values (3 cards) - emoji, title, description, color classes (3 languages)
  3. Core Values: 4 cards - title, description, icon type, color class (3 languages)
- Features: Card preview, icon selector, color picker

#### Products Management
- List view: Product catalog with filters
- Detail view: Name/description (3 languages), image upload, price, category, stock, display order, active status
- Features: Image upload, bulk edit, category filter, search

#### Contact Information Management
- Single form: Location (3 languages), phone, email, hours (3 languages)
- Features: Multi-line text for hours, validation

#### News Articles Management
- List view: Articles table with status
- Editor: Title, date, author, image, excerpt, content, emoji, badge
- Features: Rich text editor, image upload, publish/unpublish, preview

#### Gallery Management
- Grid view: Image gallery
- Fields: Title, image upload, description, category
- Features: Drag-and-drop upload, bulk operations, category filter

### 3. Submissions & Subscriptions Management

#### Contact Form Submissions
- Table view: Name, email, message preview, date, read status
- Features: Mark read/unread, filter, search, export, detail modal

#### Newsletter Subscriptions
- Table view: Email, date, active status
- Features: Export CSV, bulk unsubscribe, search, filter

### 4. User Management

#### Users List
- Table view: Name, email, role, last login, status
- Features: Search, role filter, bulk actions

#### User Create/Edit
- Form: Name, email, password (create only), role (Admin/Editor/Viewer), status
- Features: Permissions preview, password strength

#### Roles & Permissions
- Roles: Super Admin (full access), Content Manager (edit content + view submissions), Editor (edit content only), Viewer (read-only)
- Features: Permission matrix, role assignment

### 5. Settings & Configuration

#### General Settings
- Fields: Site name, logo upload, default language, timezone, maintenance mode
- Features: Image upload, language selector

#### Language Management
- Features: Enable/disable languages, translation completeness, missing translation alerts

#### API & Integration Settings
- Fields: Supabase connection, API keys (masked), webhooks
- Features: Test connection, key rotation

### 6. Design Specifications

#### Layout Structure
- **Sidebar**: Collapsible navigation with icons
  - Dashboard
  - Content (Hero, Benefits, Mission/Vision, Products, Contact Info, News, Gallery)
  - Submissions (Contact Forms, Newsletter)
  - Users & Permissions
  - Settings
- **Top Bar**: User profile, notifications, language switcher, logout
- **Main Area**: Responsive, clean white background
- **Breadcrumbs**: Navigation path

#### Color Scheme
- Primary: Green (#6B9E3E, #2C5F2D) - brand colors
- Secondary: Blue (actions), Gray (neutral)
- Status: Green (success), Red (error), Yellow (pending)
- Background: Light gray (#F5F5F5), white cards

#### Typography
- Headers: Bold hierarchy (H1: 32px, H2: 24px, H3: 20px)
- Body: 16px (Inter or similar)
- Labels: 14px, medium weight

#### Components Needed
- Form Inputs: Text fields, textareas, selects, file uploads, date pickers
- Buttons: Primary (green), Secondary (outline), Danger (red), Disabled
- Cards: Statistics, previews, info display
- Tables: Sortable, filterable, pagination
- Modals: Confirmations, detail views, quick edits
- Tabs: Language switching
- Toast Notifications: Success, error, warning
- Loading: Skeletons, spinners
- Empty States: No data placeholders

#### Responsive Design
- Desktop: Full sidebar, multi-column
- Tablet: Collapsible sidebar, adjusted columns
- Mobile: Hamburger menu, single column, stacked cards

### 7. User Experience Considerations

#### Workflow Optimizations
- Bulk actions, auto-save drafts, undo/redo
- Keyboard shortcuts (Ctrl+S to save)
- Global search, advanced filters, multi-column sorting

#### Accessibility
- WCAG 2.1 AA: Proper contrast, keyboard navigation
- Screen reader support, clear focus indicators

#### Performance
- Loading states, optimistic updates, pagination (20-50 items/page)

### 8. Future Considerations

#### Scalability Features
- Content versioning & rollback
- Scheduled publishing
- Analytics dashboard (page views, popular content)
- Multi-site support
- Content templates
- Media library (centralized)
- SEO management (meta tags)
- Backup & restore

#### Advanced Features (Future)
- Workflow approval process
- Activity logs (audit trail)
- Email notifications
- Export/import functionality
- API documentation

### 9. Design Style
- Modern & clean: Minimalist, white space
- Professional: Business-appropriate
- Consistent: Reusable components, 8px grid spacing
- Intuitive: Clear labels, tooltips, logical grouping
- Brand aligned: Complement farm website aesthetic

### 10. Pages to Design

1. Dashboard - Stats and quick actions
2. Hero Section Editor - Form with language tabs
3. Benefits Manager - List with drag-and-drop
4. Mission/Vision Editor - Three-section form
5. Products List - Table with filters
6. Product Editor - Form with image upload
7. Contact Info Editor - Simple form
8. News Articles List - Table with status
9. News Article Editor - Rich text editor
10. Gallery Manager - Grid with upload
11. Contact Submissions - Table with modal
12. Newsletter Subscribers - Table with export
13. Users List - Table with roles
14. User Editor - Form with permissions
15. Settings - Tabbed page

## Output Requirements
- Complete design system (colors, typography, spacing)
- All 15 page layouts
- Reusable component library
- Mobile responsive versions
- Interactive prototypes for key workflows
- Developer specifications

**Note**: Built with React/Next.js. Prioritize ease of use for non-technical content managers while providing powerful admin features.

