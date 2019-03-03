# Gatsby Starter eCommerce

Gatsby starter for creating an eCommerce site using [Moltin eCommerce Api ](https://moltin.com/).

This starter adapts an [existing](https://github.com/moltin-examples/nextjs-demo-store) NextJS eCommerce starter for [GatsbyJS](https://www.gatsbyjs.org/).

Demo: <https://parmsang.github.io/gatsby-starter-ecommerce/>

This starter originally used Gatsby v1 and has now been updated to v2. The original version can be found in branch "gatsby-v1".

## Warning

This starter is currently work in progress

## Getting started

Install this starter (assuming Gatsby is installed) by running from your CLI:

`gatsby new gatsby-store https://github.com/parmsang/gatsby-starter-ecommerce`

### Running in development

`npm run develop`

### Additional Setup

Both a moltin and Stripe account are needed for this store to run successfully.

Create a `.env.development` and `.env.production` file at the project root with your moltin `client_id` and Stripe test `publishable key`.

```dosini
MOLTIN_CLIENT_ID=
STRIPE_PUBLISHABLE_KEY=
```

## Features

- Moltin eCommerce API
- React 16
- PWA (includes manifest.webmanifest & offline support)
- Eslint & Prettier
- Styled Components
- Google Analytics - (you enter the tracking-id)
- Semantic-UI
- Authentication via Moltin (Login and Register)
- Stripe checkout
