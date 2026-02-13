**Stylesheet**

# OXOT Design System — Style Guide

Quick reference for all pages. The canonical values live in `variables.css`.

---

## Color Palette

### Backgrounds (dark → light)

| Token**                    **| Hex **        **| Use**                        **|

| ------------------------ | ----------- | -------------------------- |

| `--color-bg-primary` **  **| `#0B0B0B` | Page background**            **|

| `--color-bg-secondary` | `#111111` | Sidebar, elevated surfaces |

| `--color-bg-tertiary`**  **| `#1A1A1A` | Cards, panels**              **|

| `--color-bg-elevated`**  **| `#222222` | Hover states, modals **      **|

### Greys

| Token**                **| Hex **        **| Use **                    **|

| -------------------- | ----------- | ----------------------- |

| `--color-grey-800` | `#2A2A2A` | Borders, dividers **      **|

| `--color-grey-700` | `#333333` | Subtle borders**          **|

| `--color-grey-600` | `#4A4A4A` | Disabled elements **      **|

| `--color-grey-500` | `#666666` | Placeholder text**        **|

| `--color-grey-400` | `#888888` | Secondary body text **    **|

| `--color-grey-300` | `#AAAAAA` | Captions, tertiary text |

### Dutch Orange (accent)

| Token **                    **| Hex **                      **| Use**                **|

| ------------------------- | ------------------------- | ------------------ |

| `--color-orange`**        **| `#E8620A` **              **| Primary accent **    **|

| `--color-orange-light`**  **| `#FF7A1A` **              **| Hover / emphasis **  **|

| `--color-orange-dark` **  **| `#C45208` **              **| Pressed / active **  **|

| `--color-orange-subtle` | `#E8620A1A` (10% alpha) | Tinted backgrounds |

---

## Typography

**Primary font**: Inter (400, 500, 600, 700, 800, 900)

**Mono font**: JetBrains Mono (terminal text, code)

### Scale

| Token **          **| Size | Use**                              **|

| --------------- | ---- | -------------------------------- |

| `--text-xs` **  **| 12px | Labels, overlines, terminal text |

| `--text-sm` **  **| 14px | Nav items, buttons, captions **    **|

| `--text-base` | 16px | Body text**                        **|

| `--text-lg` **  **| 18px | h5, lead text**                    **|

| `--text-xl` **  **| 20px | h4, emphasized body**              **|

| `--text-2xl`**  **| 24px | h3 **                              **|

| `--text-3xl`**  **| 30px | Small hero **                      **|

| `--text-4xl`**  **| 36px | h2 **                              **|

| `--text-5xl`**  **| 48px | h1 (tablet)**                      **|

| `--text-6xl`**  **| 60px | h1 (desktop) **                    **|

| `--text-7xl`**  **| 72px | Hero headline**                    **|

### Heading Rules

- **h1**: Black weight (900), tight leading, tighter tracking
- **h2**: Extrabold (800)
- **h3–h5**: Bold/Semibold
- **h6**: Semibold, uppercase, wide tracking, grey-400 color
- **Overlines**: `--text-xs`, uppercase, `--tracking-widest`, orange, preceded by a 40px orange line

### Body Rules

- Default body color: `--color-grey-400`
- `<strong>` renders white
- Max paragraph width: `70ch`
- Line height: `--leading-relaxed` (1.65)

---

## Component Patterns

### Navigation

- Uppercase labels, `--text-sm`, `--tracking-wide`
- Grey-400 default → white on hover/active
- Active item: 3px orange bar on the left edge
- Icons: grey-500 default → orange when active

### Buttons

- **Primary**: Orange bg, white text, full-radius pill shape
- **Ghost**: Transparent bg, grey border, white text
- **Link**: Monospace, uppercase, circle-arrow prefix

### Cards

- Dark surface (`--color-bg-tertiary`), 1px grey-800 border
- `--radius-lg` (12px) corners
- Pillar cards (Energy/Water/Food): icon + title + subtitle, `--radius-xl`

### Hero

- Background image at 30% opacity behind gradient overlay
- Headlines stack: white → grey-400 → orange
- Overline label with orange dash prefix

---

## Usage

Every HTML page:

```html


<link rel="stylesheet" href="/styles/global.css">


```

Access any token in CSS:

```css


.my-component {


**  **background: var(--color-bg-tertiary);


**  **color: var(--color-text-secondary);


**  **border: var(--border-default);


**  **border-radius: var(--radius-lg);


}


```
