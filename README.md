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

# Stripe Configuration

## Create Product on Stripe dashboard

**1. Log In to Your Stripe Account**
Go to the Stripe dashboard [Stripe](https://dashboard.stripe.com) and log in to your Stripe account. If you don't have a Stripe account, you'll need to sign up for one first.
**2. Navigate to the Products Section**
In the left-hand sidebar of the Stripe dashboard, click on "Products."
**3. Create a New Product**
Click the "Add Product" button to create a new product.
**4. Add Product Details**
Enter Detail of the Product(Name, Description, Image).
**5. Pricing**
Set the pricing details for your product. You can specify a one-time purchase price or recurring subscription pricing
**6. Types of Pricing**

- For one-time purchase
  Enter the price in your desired currency.
- For Subscription
  You can set the subscription price, billing interval (e.g., monthly or annually), and other subscription details.

**7. Other Settings**
Depending on your product, you may have additional settings such as SKU (Stock Keeping Unit), product type, tax settings, etc. You can configure these according to your needs.
**8. Save the Product**
Once you've entered all the necessary details, click the "Save Product" button to create your product.
**9. View and Manage Your Products**
After creating the product, you can view and manage it in the "Products" section of your Stripe dashboard. You can edit, delete, or make changes to your products as needed
**10. Integration**
If you are integrating Stripe with your website or application, you will use the product information to set up the payment flow

## Install stripe extension in Firebase

- Create stripe account before integration
- Go to Firebase and click on `Extensions`
- Search "Run Payment with Stripe" and install this extension
- There will be require the `admin` card details to perform payment method before extension installation
- After successful installation Configure the extension with these settings:
  ```bash
  - Change the feild default collection name of "Products and pricing plans collection" to "plans"
  - Change the another field default collection name of "Customer details and subscriptions collection" to "customers"
  - Change the field default collection name of "Sync new users to Stripe customers and Cloud Firestore" to "sync"
  - Change the another field default collection name of "Automatically delete Stripe customer objects" to "do not delete"
  ```
- Navigate to `Developers > API Keys` in Stripe Dashboard
- Generate a new Restricted Key with the following permissions:
  ```bash
    - Write access to `Customers`
    - Write access to `CheckoutSessions`
    - Write access to `Customerportal`
    - Read access to `Subscriptions`
    - Read access to `Plans`
  ```
- Copy the keys as `Stripe API Key with Restricted Access` and paste it into firebase extension form
- Copy the url from the Firebase Extension `How this extension works` tab and paste this url as a new `Endpoint` in `Stripe webhooks`.

## Fetch it on Frontend from Firebase

- Created a custom function for it
- Fetching stripe plans from firebase "plans" collection by giving vercel env keys(ids).
- These env keys should exist on Vercel for security reasons and should have pulled the env file locally by command.`vercel env pull`
- Displaying these plans dynamically on the frontend.

## Stripe Checkout and Subscription Integration

- Integrate Stripe's checkout and subscription functionalities into your application.

**1. Initialization**
**Stripe Installation:** Ensure Stripe is installed. Refer to Stripe's official documentation.
**Initializing Stripe:** Use loadStripe to retrieve a checkout session.
**Checkout Session:** Obtain a checkout URL from the session.
**Routing:** Direct users to the checkout URL.
**Payment Interface:** Users will see Stripe's default payment page upon redirection.

**2. Fetching and Live Data Handling**
**Plan Retrieval:** Fetch plans from Firebase using static IDs.
**Selecting a Plan:** Get the price ID of the chosen plan.
**Initiating Subscription:** Send the price ID to Stripe to start the subscription.
**Creating a Checkout Session:** Generate a checkout session for the subscription using loadStripe.

## Webhook Integration

**1. Webhook Secret:** Add webhook secret environment variable with the name `STRIPE_WEBHOOK_SECRET`

**2. Handle Events:** Handle all necessary stripe events in the `src/app/api/stripe/webhook/route.js` file

**3. Webhook Endpoint: :** Add webhook endpoint in Stripe dashboard
`https://www.example.com/api/stripe/webhook`
