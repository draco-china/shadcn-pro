// @ts-nocheck
import "server-only"
import * as React from "react"

export const Index: Record<string, Record<string, any>> = {
  "base": {
    "accordion": {
      name: "accordion",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/accordion")),
    },
    "alert": {
      name: "alert",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/alert")),
    },
    "alert-dialog": {
      name: "alert-dialog",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/alert-dialog")),
    },
    "aspect-ratio": {
      name: "aspect-ratio",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/aspect-ratio")),
    },
    "avatar": {
      name: "avatar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/avatar")),
    },
    "badge": {
      name: "badge",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/badge")),
    },
    "breadcrumb": {
      name: "breadcrumb",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/breadcrumb")),
    },
    "button": {
      name: "button",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/button")),
    },
    "button-group": {
      name: "button-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/button-group")),
    },
    "calendar": {
      name: "calendar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/calendar")),
    },
    "card": {
      name: "card",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/card")),
    },
    "carousel": {
      name: "carousel",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/carousel")),
    },
    "chart": {
      name: "chart",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/chart")),
    },
    "checkbox": {
      name: "checkbox",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/checkbox")),
    },
    "collapsible": {
      name: "collapsible",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/collapsible")),
    },
    "combobox": {
      name: "combobox",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/combobox")),
    },
    "command": {
      name: "command",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/command")),
    },
    "context-menu": {
      name: "context-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/context-menu")),
    },
    "dialog": {
      name: "dialog",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/dialog")),
    },
    "direction": {
      name: "direction",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/direction")),
    },
    "drawer": {
      name: "drawer",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/drawer")),
    },
    "dropdown-menu": {
      name: "dropdown-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/dropdown-menu")),
    },
    "empty": {
      name: "empty",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/empty")),
    },
    "field": {
      name: "field",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/field")),
    },
    "hover-card": {
      name: "hover-card",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/hover-card")),
    },
    "input": {
      name: "input",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/input")),
    },
    "input-group": {
      name: "input-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/input-group")),
    },
    "input-otp": {
      name: "input-otp",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/input-otp")),
    },
    "item": {
      name: "item",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/item")),
    },
    "kbd": {
      name: "kbd",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/kbd")),
    },
    "label": {
      name: "label",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/label")),
    },
    "menubar": {
      name: "menubar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/menubar")),
    },
    "native-select": {
      name: "native-select",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/native-select")),
    },
    "navigation-menu": {
      name: "navigation-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/navigation-menu")),
    },
    "pagination": {
      name: "pagination",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/pagination")),
    },
    "popover": {
      name: "popover",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/popover")),
    },
    "progress": {
      name: "progress",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/progress")),
    },
    "radio-group": {
      name: "radio-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/radio-group")),
    },
    "resizable": {
      name: "resizable",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/resizable")),
    },
    "scroll-area": {
      name: "scroll-area",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/scroll-area")),
    },
    "select": {
      name: "select",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/select")),
    },
    "separator": {
      name: "separator",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/separator")),
    },
    "sheet": {
      name: "sheet",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/sheet")),
    },
    "sidebar": {
      name: "sidebar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/sidebar")),
    },
    "skeleton": {
      name: "skeleton",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/skeleton")),
    },
    "slider": {
      name: "slider",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/slider")),
    },
    "sonner": {
      name: "sonner",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/sonner")),
    },
    "spinner": {
      name: "spinner",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/spinner")),
    },
    "switch": {
      name: "switch",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/switch")),
    },
    "table": {
      name: "table",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/table")),
    },
    "tabs": {
      name: "tabs",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/tabs")),
    },
    "textarea": {
      name: "textarea",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/textarea")),
    },
    "toggle": {
      name: "toggle",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/toggle")),
    },
    "toggle-group": {
      name: "toggle-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/toggle-group")),
    },
    "tooltip": {
      name: "tooltip",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/base/ui/tooltip")),
    },
  },
  "radix": {
    "accordion": {
      name: "accordion",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/accordion")),
    },
    "alert": {
      name: "alert",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/alert")),
    },
    "alert-dialog": {
      name: "alert-dialog",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/alert-dialog")),
    },
    "aspect-ratio": {
      name: "aspect-ratio",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/aspect-ratio")),
    },
    "avatar": {
      name: "avatar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/avatar")),
    },
    "badge": {
      name: "badge",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/badge")),
    },
    "breadcrumb": {
      name: "breadcrumb",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/breadcrumb")),
    },
    "button": {
      name: "button",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/button")),
    },
    "button-group": {
      name: "button-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/button-group")),
    },
    "calendar": {
      name: "calendar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/calendar")),
    },
    "card": {
      name: "card",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/card")),
    },
    "carousel": {
      name: "carousel",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/carousel")),
    },
    "chart": {
      name: "chart",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/chart")),
    },
    "checkbox": {
      name: "checkbox",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/checkbox")),
    },
    "collapsible": {
      name: "collapsible",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/collapsible")),
    },
    "combobox": {
      name: "combobox",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/combobox")),
    },
    "command": {
      name: "command",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/command")),
    },
    "context-menu": {
      name: "context-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/context-menu")),
    },
    "dialog": {
      name: "dialog",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/dialog")),
    },
    "direction": {
      name: "direction",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/direction")),
    },
    "drawer": {
      name: "drawer",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/drawer")),
    },
    "dropdown-menu": {
      name: "dropdown-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/dropdown-menu")),
    },
    "empty": {
      name: "empty",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/empty")),
    },
    "field": {
      name: "field",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/field")),
    },
    "hover-card": {
      name: "hover-card",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/hover-card")),
    },
    "input": {
      name: "input",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/input")),
    },
    "input-group": {
      name: "input-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/input-group")),
    },
    "input-otp": {
      name: "input-otp",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/input-otp")),
    },
    "item": {
      name: "item",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/item")),
    },
    "kbd": {
      name: "kbd",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/kbd")),
    },
    "label": {
      name: "label",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/label")),
    },
    "menubar": {
      name: "menubar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/menubar")),
    },
    "native-select": {
      name: "native-select",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/native-select")),
    },
    "navigation-menu": {
      name: "navigation-menu",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/navigation-menu")),
    },
    "pagination": {
      name: "pagination",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/pagination")),
    },
    "popover": {
      name: "popover",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/popover")),
    },
    "progress": {
      name: "progress",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/progress")),
    },
    "radio-group": {
      name: "radio-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/radio-group")),
    },
    "resizable": {
      name: "resizable",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/resizable")),
    },
    "scroll-area": {
      name: "scroll-area",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/scroll-area")),
    },
    "select": {
      name: "select",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/select")),
    },
    "separator": {
      name: "separator",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/separator")),
    },
    "sheet": {
      name: "sheet",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/sheet")),
    },
    "sidebar": {
      name: "sidebar",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/sidebar")),
    },
    "skeleton": {
      name: "skeleton",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/skeleton")),
    },
    "slider": {
      name: "slider",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/slider")),
    },
    "sonner": {
      name: "sonner",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/sonner")),
    },
    "spinner": {
      name: "spinner",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/spinner")),
    },
    "switch": {
      name: "switch",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/switch")),
    },
    "table": {
      name: "table",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/table")),
    },
    "tabs": {
      name: "tabs",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/tabs")),
    },
    "textarea": {
      name: "textarea",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/textarea")),
    },
    "toggle": {
      name: "toggle",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/toggle")),
    },
    "toggle-group": {
      name: "toggle-group",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/toggle-group")),
    },
    "tooltip": {
      name: "tooltip",
      type: "registry:ui",
      component: React.lazy(() => import("@/registry/bases/radix/ui/tooltip")),
    },
  },
}