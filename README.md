# The Poetic Toolbox

A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.

Built with Next.js, TypeScript, and TailwindCSS.

## Features

- ✨ Modern design with playful animations
- 📱 Fully responsive for all device sizes
- 🌓 Multiple theme options with bold color palettes
- ✉️ Email signup with Mailchimp integration
- 🔍 SEO optimized with proper metadata
- 🚀 Performance optimized for fast loading

## Getting Started

### Prerequisites

- Node.js 18.17.0 or newer
- pnpm (recommended) or npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/poto.git
   cd poto
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your Mailchimp credentials:
   ```
   MAILCHIMP_API_KEY=your_api_key_here
   MAILCHIMP_SERVER_PREFIX=us1 # The server prefix from your API key (e.g., us1)
   MAILCHIMP_LIST_ID=your_audience_id_here
   ```

4. Run the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

- `/app` - Next.js app directory with pages and layouts
- `/components` - Reusable React components
  - `/layout` - Layout components (navbar, footer)
  - `/ui` - UI components (buttons, cards, forms)
- `/lib` - Utility functions and API clients
- `/public` - Static assets (images, icons)
- `/styles` - CSS styles and animations

## Deployment

The application is optimized for deployment on Vercel:

```bash
pnpm build
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `MAILCHIMP_API_KEY` | Your Mailchimp API key |
| `MAILCHIMP_SERVER_PREFIX` | Server prefix from your API key (e.g., us1) |
| `MAILCHIMP_LIST_ID` | ID of your Mailchimp audience list |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
