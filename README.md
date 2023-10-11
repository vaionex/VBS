Welcome to the VBS - the Vaionex Base Stack. This repository serves as a foundational blueprint for all our upcoming projects at Vaionex. Please take a moment to familiarize yourself with the guidelines in this document to ensure a consistent and efficient development experience.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

### Prerequisites

- Node.js
- Yarn package manager

### Installation Steps

**1. Install the dependencies:**

```bash
yarn install
```

**2. Obtain the necessary environment variables from the Vercel platform. It will be explained under Pulling .env Variables from Vercel.**

```env
NEXT_PUBLIC_DEV_STRIPE_FREE_PRODUCT_ID=
...
VERCEL_URL=
```

## Learn More Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Main Dependencies

VBS incorporates several popular libraries and tools:

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [HubSpot API Client](https://developers.hubspot.com/)
- [Radix UI](https://radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs/utility-first)
- [Headless UI](https://headlessui.dev/)
- [Axios](https://axios-http.com/)
- [clsx](https://www.npmjs.com/package/clsx)
- And several others focused on development like ESLint configurations and PostCSS.

### Build and Production

To build the application:

```bash
yarn build
```

After building, to run it in production mode:

```bash
yarn start
```

### Linting

To lint your code:

```bash
yarn lint
```

## Pulling .env Variables from Vercel

**1. Install Vercel CLI**
If you haven't already, install the [Vercel CLI](https://vercel.com/docs/cli#using-in-a-ci/cd-environment):

```bash
yarn global add vercel
```

**2. Log into Your Vercel Account**
From the command line, log into your Vercel account:

```bash
vercel login
```

Vercel CLI supports the following login methods:

```bash
GitHub OAuth
GitLab OAuth
Bitbucket OAuth
Email confirmation
SAML Single Sign-On through your Team's identity provider
```

Vercel CLI requires you to log in and authenticate before accessing resources or performing administrative tasks. In a terminal environment, you can use vercel login, which requires manual input.
This will prompt you for your email address and send you a confirmation email. Once you click on the link in the email, the CLI login process will be completed.

**3. Navigate to Your Project**
Navigate to your project's root directory:

```bash
cd path-to/your-project-directory
```

**4. Pull the .env Variables Locally**
Use the following command to pull the environment variables from Vercel to a local .env file:

```bash
vercel env pull
```

This will write the environment variables from Vercel to a .env file in your local environment.

For futher visit [Vercel](https://vercel.com/docs/cli/env).

## Using ShadCn

ShadCn provides a streamlined way to add components to your projects. Here's a comprehensive guide on how to use it.

### Command Line Interface (CLI)

The CLI is your main tool for interacting with ShadCn.

**Adding Components**
To add specific components and their dependencies to your project:

Use the add command.

```bash
npx shadcn-ui@latest add [component]
```

For example, to add a button component:

```bash
npx shadcn-ui@latest add button
```

Once added, you can easily import and use the component in your project:

```bash

import { Button } from "@/components/UI/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

**Project Structure**

Here's a brief on how the project is structured:

**UI Components**: They reside in the components/UI folder.

**Other Components**: Components like <PageHeader /> and <MainNav /> are located in the components directory.

**Utility Functions**: The lib directory holds all utility functions. The cn helper, for instance, is defined in utils.ts.

**Styles**: The styles directory is home to the global CSS. However, it's essential to note that we predominantly use Tailwind classes for styling and theming, keeping direct CSS to a minimum.

## HubSpot Integration

Integrating with HubSpot requires several steps and specific environment variables to be set. Follow the steps below to ensure a seamless connection:

**1. Environment Variables**
Firstly, make sure you add the following keys to your .env file:

HUBSPOT_ACCESS_TOKEN=

HUBSPOT_SUBS_PORTAL_ID=

HUBSPOT_SUBS_FORM_GUID=

**2. Access Token Retrieval**
To get the HUBSPOT_ACCESS_TOKEN:

Navigate to your HubSpot account.
Go to **Settings > Integrations > Account Setup > Private App**.
If you don't have an app already, you'll need to create one. If you have an existing app, select it.
Once you've selected your private app, you'll be directed to a page detailing the app's information.
From this page, copy the authentication (auth) or access token and pair it with the **HUBSPOT_ACCESS_TOKEN** in your .env file.

**3. Form Creation for Newsletter Integration**
Since this integration is centered around newsletters:

Create a form by navigating to **Marketing > Forms** in your HubSpot dashboard.
Ensure the fields in your HubSpot form match the fields in your project's form.
After publishing your form, you'll be provided with a link and an embedded code.
Within the embedded code, locate the **formID** and **portalID**. Copy these values and pair them with **HUBSPOT_SUBS_FORM_GUID** and **HUBSPOT_SUBS_PORTAL_ID** in your .env file respectively.

**4. Verification**
To verify the integration:

Go to **Contacts > List** in your HubSpot dashboard.
From here, you can check the contacts related to your form.

## License

Information about the license.

--
