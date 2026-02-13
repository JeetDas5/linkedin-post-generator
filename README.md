# TrendMind: LinkedIn Post Creator

TrendMind is an AI-powered tool to help you generate engaging LinkedIn posts with ease. Switch between light and dark themes, and enjoy a modern, responsive UI.

## Live Demo

Check out the live demo of TrendMind on Vercel: [https://linkedin-post-generator-vert.vercel.app](https://linkedin-post-generator-vert.vercel.app)

## Features

- Generate LinkedIn posts using AI
- Copy posts to clipboard
- Theme toggler (light/dark mode)
- Responsive and accessible design

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/JeetDas5/linkedin-post-generator
   cd linkedin-post-generator
   ```
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js app directory (pages, layout, API routes)
- `components/` — Reusable UI components
- `lib/` — Utility functions and API helpers
- `public/` — Static assets
- `types/` — TypeScript type definitions


## API Structure

### `/api/generate` (POST)
Generates a LinkedIn post using OpenRouter AI.

**Request Body:**
```json
{
   "voice": "professional", // string, required
   "audience": "Developers", // string, required
   "topic": "AI in 2026",    // string, required
   "length": "medium"        // string, optional (short|medium|long)
}
```

**Response:**
```json
{
   "success": true,
   "post": "...generated post..."
}
```
or
```json
{
   "success": false,
   "error": "Validation or generation error message."
}
```

## OpenRouter API Usage

This project uses [OpenRouter](https://openrouter.ai/) for AI completions. You must provide an API key.

### Environment Variables

Create a `.env` file with the following:

```
OPENROUTER_API_KEY=your-openrouter-key-here
OPENROUTER_MODEL=gpt-4o-mini
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

See `.env.example` for reference.

## Customization

- Edit theme colors in `app/globals.css`
- Add or modify UI components in `components/ui/`

Made with ❤️ By Jeet Das!
