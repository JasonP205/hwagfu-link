# JasonCode React Component

A flexible, customizable React component (built with HeroUI and Tailwind CSS) that displays beautifully formatted buttons, links, or standalone icons pointing to external URLs. It automatically fetches and displays the website's favicon and Open Graph title.

## Features
- **Auto-fetching:** Automatically pulls the website's favicon and title from the provided URL using Microlink and Google Favicons.
- **Multiple Display Types:** Display as a `button`, a `link`, or just a standalone favicon `icon`.
- **Easy Customization:** Support for Tailwind CSS classes via `className` and `classNames`.
- **Custom Rendering:** Take full control over the UI by passing a custom `render` function.

## Installation

Ensure you have a React environment set up with Tailwind CSS and [@heroui/react](https://heroui.com/) installed.

```bash
npm install @heroui/react
# And simply import the component into your project
```

## Usage

```tsx
import { JasonCode } from './src/JasonCode';

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Mặc định (Button) */}
      <JasonCode url="https://github.com" label="GitHub" />

      {/* 2. Dạng Link */}
      <JasonCode 
        type="link" 
        url="https://react.dev" 
        label="React Docs" 
      />

      {/* 3. Dạng Icon với nhiều size khác nhau */}
      <div className="flex gap-2">
        <JasonCode type="icon" size="sm" url="https://google.com" />
        <JasonCode type="icon" size="md" url="https://google.com" />
        <JasonCode type="icon" size="lg" url="https://google.com" />
        <JasonCode type="icon" size="xl" url="https://google.com" />
      </div>

      {/* 4. Custom Render */}
      <JasonCode 
        url="https://tailwindcss.com" 
        render={({ title, favicon, isLoading }) => (
          isLoading ? <span>Loading...</span> : (
            <div className="custom-card">
              <img src={favicon} alt="icon" width="24" />
              <h3>{title}</h3>
            </div>
          )
        )}
      />
    </div>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | `"https://hwagfu.dev"` | The destination URL to fetch meta info and link to. |
| `label` | `string` | `"Jason Code Space"` | The fallback label shown before the OG title is loaded. |
| `type` | `'button' \| 'link' \| 'icon'` | `'button'` | The visual display style of the component. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Only applies when `type="icon"`. Controls the icon size. |
| `className` | `string` | `""` | Tailwind CSS classes for the outer wrapper. |
| `classNames` | `{ content?: string, image?: string }`| `{}` | Granular slot styling for the text content and the image element. |
| `render` | `(data: object) => ReactNode` | `undefined` | A custom render function returning your own custom UI. Data contains `{ title, favicon, url, isLoading }`. |
