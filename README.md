## Getting Started

Setup proper node version using nvm (node version manager) `nvm use` or manually install node version provided in .nvmrc.
First install all dependencies with --legacy-peer-deps flag as dnd-kit libraries and many other are not yet fully supporting react 19:

```bash
npm install --legacy-peer-deps
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

It uses shadcn component library: [SHADCN-UI](https://ui.shadcn.com/)

Dnd-kit for drag and drop functionality.

### Drag functionality is 'active' only on Move icon 'four sides arrow'.

React hook forms with zod validation schema.

Jest and Testing library for some simple testing: run `npm run test` for basic functionality testing.

In component/ui we have default shadcn ui components. We use those to build structures like form to add or edit and NavigationItem.
There is a Dndprovider which provides context for drag and droping. Dnd can only be made 'inside' the context i.e. the same subnavigation level by design.
Those structures are then used to create components with their state and children.

The whole 'application' is rendered on root page of the router http://localhost:3000/. Depending on the state it either displays default view or main navigation.
