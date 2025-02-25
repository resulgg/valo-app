# VALO-APP

A modern Valorant companion application built with Next.js 15, providing tools and information for Valorant players.

![Valorant App](https://valorant-api.com/v1/version)

## Features

### Helper Tools

- **Random Agent Selector** - Let chance decide which agent you should play in your next match
- **"Should I Pick Sage?"** - Get help deciding whether to play Sage in your current match
- **Case Opening** - Open virtual cases to decide what to play

### Game Elements

- **Agents** - Explore all Valorant agents, their abilities, and strategies
- **Maps** - Learn about all Valorant maps, callouts, and layouts
- **Weapons** - Browse all weapons, their specifications, and skins
- **Sprays** - View all sprays available in Valorant
- **Weapon Buddies** - Explore all weapon buddies and collections
- **Player Cards** - Browse all player cards and banners
- **Competitive** - Track your competitive stats and rankings

### Additional Features

- **Daily Cat** - Enjoy a new cat image every day
- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Mode** - Choose your preferred theme

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Animations**:
  - [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
  - [Motion](https://motion.dev/)
- **UI Enhancements**:
  - [Vaul](https://vaul.emilkowal.ski/) - Drawer component
  - [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Celebration effects
- **Development Tools**:
  - [ESLint](https://eslint.org/)
  - [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/valo-app.git
   cd valo-app
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
valo-app/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # Reusable UI components
│   ├── data/         # Static data (agents, maps, weapons, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript type definitions
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.ts    # Next.js configuration
```

## Development

### Commands

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/), the platform created by the makers of Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Valorant API](https://valorant-api.com/) - For Valorant game data
- [The Cat API](https://thecatapi.com/) - For the daily cat images
- [Shadcn UI](https://ui.shadcn.com/) - For the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - For accessible UI primitives
