# Resume Builder

A modern, professional resume builder application created with [Next.js 15](https://nextjs.org) and enhanced with cutting-edge technologies.

## Features

- **Dynamic Resume Creation**: Build and customize your professional resume
- **Project Showcase**: Display your projects with detailed descriptions
- **Profile Management**: Maintain your professional information
- **Export Functionality**: Download your resume as PDF

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Styling**: [TailwindCSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/)
- **Development**: TypeScript, ESLint, TurboPack

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server with TurboPack:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context providers
│   │   ├── api/        # API routes
│   │   ├── profile/    # Profile management pages
│   │   ├── projects/   # Project showcase pages
│   │   └── page.tsx    # Home page
│   └── ...
└── ...
```

## Deployment

The application is configured for easy deployment on [Vercel](https://vercel.com/new), the platform from the creators of Next.js.

```bash
vercel
```

For more deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
