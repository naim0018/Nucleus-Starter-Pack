# ⚛️ Nucleus Starter Pack

> **The Ultimate React 19 Core Package** focused on Dynamic Architecture.
> Simplify your implementation of Routes, Navigation, Forms, and Tables with configuration-driven components.

[![npm version](https://img.shields.io/npm/v/nucleus-starter-pack.svg?style=flat-square)](https://www.npmjs.com/package/nucleus-starter-pack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🚀 Core Features & Documentation

Click a module below to jump directly to its documentation:

| Module | Description |
| :--- | :--- |
| **[🔀 Dynamic Route Setup](#-1-dynamic-route-setup)** | Centralized route configuration that drives your entire app. |
| **[🧭 Dynamic Sidebar/Navbar](#-2-dynamic-sidebarnavbar)** | Automatically generated navigation menus from your route config. |
| **[🍞 Dynamic Breadcrumbs](#-3-dynamic-breadcrumbs)** | Breadcrumbs that auto-generate based on your route hierarchy. |
| **[📝 Dynamic Form](#-4-dynamic-form)** | Build complex, validated forms using just a JSON array. |
| **[📊 Dynamic Table](#-5-dynamic-table)** | A powerful data grid with built-in sorting, filtering, and pagination. |

---

## 📦 Installation
```bash
npx nucleus-starter-pack my-app
```

---

## 📖 Feature Guides

### 🔗 1. Dynamic Route Setup

**Goal**: Stop declaring `<Route>` components manually. Define your application structure in **one single JS/TS object**.

**How it Works**:
The `adminRoutes` array acts as the single source of truth. It defines paths, component mappings, icons, and hierarchy. This config is then consumed by the Sidebar, Breadcrumbs, and Router.

**Usage**:
Edit `src/routes/AdminRoutes.tsx`:

```tsx
export const adminRoutes = [
  {
    group: "Main Menu", // Group header in Sidebar
    items: [
      {
        icon: <LayoutGrid />,
        name: "Dashboard",
        path: "dashboard",
        element: <DashboardPage />,
        children: [ // Recursive nested routes
          {
             name: "Analytics",
             path: "analytics",
             element: <AnalyticsPage /> 
          }
        ]
      }
    ]
  }
];
```

---

### 🧭 2. Dynamic Sidebar/Navbar

**Goal**: Never update your Sidebar manually again. It "reacts" to your definitions in `AdminRoutes.tsx`.

**How it Works**:
The `Sidebar` component imports `adminRoutes`, processes it through a `menuGenerator` utility, and renders a recursive multi-level menu. It handles:
- **Grouping**: Renders section headers (e.g., "Main Menu", "Settings").
- **Nesting**: Renders standard links or foldable sub-menus (using `MenuItem` recursive component).
- **Active State**: Automatically highlights the current page and expands parent menus.

**Usage**:
Just add a new entry to `src/routes/AdminRoutes.tsx`, and it **instantly** appears in the Sidebar.

---

### 🍞 3. Dynamic Breadcrumbs

**Goal**: Automatic breadcrumb navigation without manual path tracking.

**How it Works**:
The `Breadcrumbs` component accepts the same `adminRoutes` config. It uses a `flattenRoutes` utility to map the current URL (e.g., `/admin/overview/user-profile`) back to the readable names defined in your config (e.g., "Main Menu > Overview > User Profile").

**Key Features**:
- **Auto-Flattening**: Converts nested route trees into a linear lookup map.
- **Auto-Icons**: Injects the icons defined in your route config directly into the breadcrumb items.
- **Smart Linking**: Last item is text (current page), previous items are clickable links.

**Usage**:
Already integrated into `DashboardLayout`. To customize labels, just rename the `name` property in `AdminRoutes.tsx`.

---

### 📝 4. Dynamic Form

**Goal**: Create complex, validated forms with Zod schemas and a simple configuration array.

**Key Features**:
- **Field Types**: Text, Select, MultiSelect, Checkbox, Radio, Date, File Upload (with preview), Tags Input, Rich Text, etc.
- **Zod Validation**: Seamless integration with Zod schemas.
- **Conditional Logic**: Show/Hide fields based on other field values (e.g., `showWhen: { field: "role", value: "admin" }`).

**Usage**:

```tsx
import CommonForm from "@/common/DynamicForm/CommonForm";
import { z } from "zod";

// 1. Define Schema
const schema = z.object({
  username: z.string().min(2),
  role: z.enum(["admin", "user"]),
  secretCode: z.string().optional()
});

// 2. Define Field Config
const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter user name",
    required: true
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: ["admin", "user"]
  },
  {
    name: "secretCode",
    label: "Admin Secret",
    type: "password",
    // 🪄 Conditional Rendering: Only show if role is 'admin'
    showWhen: { field: "role", operator: "equals", value: "admin" } 
  }
];

// 3. Render
<CommonForm 
  schema={schema} 
  fields={fields} 
  onSubmit={(data) => console.log(data)} 
/>
```

---

### 📊 5. Dynamic Table

**Goal**: A highly reusable data grid that handles sorting, filtering, selection, and custom rendering with zero boilerplate.

**Key Features**:
- **Sorting**: Click column headers to sort ASC/DESC.
- **Pagination**: Built-in simple pagination logic.
- **Selection**: Checkbox support for multi-row selection.
- **Custom Search**: Filter data locally or via custom search callback.
- **Custom Render**: Render specific cells (like status badges or images) using a `render` function.

**Usage**:

```tsx
import DynamicTable from "@/common/DynamicTable/DynamicTable";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { 
    key: "status", 
    label: "Status", 
    // 🎨 Custom render
    render: (row) => (
      <span className={row.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
        {row.status}
      </span>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: (row) => <button onClick={() => edit(row)}>Edit</button>
  }
];

const data = [
  { id: 1, name: "John Doe", status: "Active" },
  { id: 2, name: "Jane Smith", status: "Inactive" }
];

<DynamicTable 
  data={data} 
  columns={columns} 
  searchable 
  pagination 
  pageSize={5} 
/>
```

---

## 🤝 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License
MIT © [mdkazinaim](LICENSE)
# Nucleus-Starter-Pack
