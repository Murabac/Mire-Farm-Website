# Mire Farms Website

A modern, responsive website for Mire Farms, showcasing the farm's operations, products, and services.

## Overview

The Mire Farms website is designed to provide visitors with information about the farm, its products, farming practices, and how to connect with the farm. The website serves as a digital presence for Mire Farms, helping to build community connections and share the farm's story.

## Features

- **Home Page**: Welcome visitors with an overview of Mire Farms
- **About Us**: Share the farm's history, mission, and values
- **Products**: Showcase farm products and offerings
- **Contact**: Provide ways for visitors to get in touch
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase (optional but recommended):
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
   - Create a `.env.local` file in the root directory with your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
mire-farm-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── products/       # Products page
│   │   ├── contact/        # Contact page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx      # Site header/navigation
│   │   └── Footer.tsx      # Site footer
│   ├── lib/                # Utility functions
│   │   ├── utils.ts        # Helper utilities
│   │   ├── supabase.ts     # Supabase client configuration
│   │   └── supabase-helpers.ts  # Supabase helper functions
│   ├── types/              # TypeScript type definitions
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Additional stylesheets
├── public/                 # Static assets (images, etc.)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Database Setup

This project uses Supabase as the database backend. To set up the database:

1. Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
2. Run the migrations from the `migrations/` folder in your Supabase SQL Editor (in order: 001, then 002)
3. Configure your environment variables in `.env.local`

See `migrations/README.md` for details about the migration files.

The database schema includes tables for:
- News articles
- Contact form submissions
- Newsletter subscriptions
- Products (optional)
- Gallery images (optional)

## License

*License information to be added*

---

**Note**: This project is currently in development. More details will be added as the website is built.


