---
title: 'Understanding Static Site Generation (SSG)'
date: '2022-11-05'
image: static-site-generation.png
excerpt: Static Site Generation is one of the main rendering methods supported by NextJS — offering fast load times and great SEO benefits.
isFeatured: true
---

Static Site Generation (SSG) is a way of pre-rendering pages **at build time**.

This means HTML is generated in advance and served directly from a CDN or edge location when a user requests it.

## Why SSG Matters

SSG offers key benefits:

- Ultra-fast page loads
- Reduced server load
- Better SEO
- Scalability

NextJS makes it incredibly easy to implement SSG with the `getStaticProps()` and `getStaticPaths()` functions.

## How It Works

When you build your app with `next build`, NextJS runs all pages using `getStaticProps()` and generates static HTML + JSON for each page.

You can also generate dynamic routes statically with `getStaticPaths()`.

We'll explore these functions and real use cases in the full post.
