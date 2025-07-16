---
title: 'Server-Side Rendering in NextJS'
date: '2022-11-12'
image: server-side-rendering.png
excerpt: Server-side rendering (SSR) allows pages to be generated on request — giving you fresh content, dynamic data, and SEO all in one.
isFeatured: true
---

NextJS supports Server-Side Rendering (SSR) out of the box.

Unlike Static Site Generation, SSR renders the page **at request time**, which is ideal for content that changes frequently or needs to be personalized.

## When to Use SSR

- Content changes often (e.g. dashboards, user profiles)
- SEO is important
- Authentication is required before rendering

## How to Implement SSR in NextJS

Use `getServerSideProps()` in your page component:

```js
export async function getServerSideProps(context) {
  const data = await fetchData();
  return { props: { data } };
}
