# React Server Components (RSC)

React Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering.

## Why Server Components?

- **Data Fetching:** Server Components allow you to move data fetching to the server, closer to your database.
- **Security:** You can keep sensitive data and logic on the server, such as tokens and API keys.
- **Caching:** By rendering on the server, the result can be cached and reused on subsequent requests.
- **Bundle Size:** Server Components do not add to the client-side JavaScript bundle size.

## Example

```jsx
// This component runs only on the server
export default async function Page() {
  const data = await fetch("https://api.example.com/...");
  return <main>...</main>;
}
```
