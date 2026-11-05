# Impactora — Community Service & Social Development Platform

Impactora is a community-driven platform that connects people through meaningful social development and volunteer activities. Users can discover upcoming events, join community initiatives, create their own events, and contribute to making a positive impact on society.

## 🌐 Live Website

**Live Site:** [Visit Impactora](https://your-impactora-live-url.vercel.app)

> Replace the URL above with your actual deployed client-side URL.

## ✨ Key Features

- **Dynamic Homepage:** Explore featured sections, recent upcoming events, and community activities.
- **Upcoming Events:** Browse upcoming events in a responsive grid with event images, titles, locations, types, and dates.
- **Create Events:** Authenticated users can create events with a title, description, event type, image URL, location, and future date.
- **Event Details:** View complete event information without requiring a login.
- **Join Events:** Logged-in users can join community events, with participation data stored in MongoDB.
- **Joined Events Dashboard:** View joined events sorted by event date.
- **Manage My Events:** Update or delete events created by the authenticated user.
- **Authentication:** Secure user authentication with Better Auth, including email/password and Google sign-in when configured.
- **Profile Management:** Update profile information, including name and profile picture, when the profile feature is enabled.
- **Responsive Design:** Optimized layouts for mobile phones, tablets, and desktop screens.
- **Loading Skeletons:** Display loading placeholders while event data is being fetched.
- **Protected Actions:** Backend authentication and ownership checks protect event creation, updates, deletion, and joining.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Better Auth
- JWT authentication
- Sonner
- Vercel

## 📂 Project Structure

```text
impactora/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── create-event/
│   │   │   ├── joined-events/
│   │   │   ├── manage-events/
│   │   │   └── profile/
│   │   ├── upcoming-events/
│   │   ├── components/
│   │   └── page.tsx
│   ├── components/
│   │   ├── home/
│   │   └── shared/
│   ├── lib/
│   └── types/
├── index.ts
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB database
- Google OAuth credentials, if Google sign-in is enabled

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd impactora
```

### 2. Install Dependencies

Install the frontend dependencies:

```bash
npm install
```

If your backend uses a separate `package.json`, navigate to the backend directory and install its dependencies there as well.

### 3. Configure Environment Variables

Create a `.env` file in the appropriate project root and configure the required environment variables.

```env
PORT=8000
CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:8000

MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=kindora

BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_secure_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Use the environment variables required by your actual configuration. Never commit `.env` or expose secret credentials in client-side code.

### 4. Start the Development Servers

Start the Next.js frontend:

```bash
npm run dev
```

Start the Express backend in a separate terminal using the script configured in its `package.json`. For example:

```bash
npm run dev
```

The frontend should be available at `http://localhost:3000`, and the backend at `http://localhost:8000`.

## 🔐 Security

- Authenticated API requests use token verification.
- Event ownership is checked on the backend before updates and deletions.
- User identity is derived from the verified authentication token.
- Environment variables are used to keep sensitive credentials out of source code.

## 🚀 Deployment

Deploy the Next.js client to Vercel or another compatible hosting provider. Deploy the Express backend separately if it is not hosted with the frontend.

Configure the production environment variables, MongoDB connection, authentication URLs, OAuth callback URLs, and CORS origin before deployment.

## 🎯 Project Goal

Impactora aims to make community participation easier by bringing event discovery, volunteer coordination, and social development activities together in one accessible platform.

---

**Built with ❤️ to inspire meaningful community impact.**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
