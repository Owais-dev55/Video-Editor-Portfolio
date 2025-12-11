# Professional Video Editor Portfolio

A modern, responsive portfolio website for video editors built with Next.js 16, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

✨ **Modern Design**
- Responsive layout (mobile, tablet, desktop)
- Light/dark theme toggle
- Smooth animations with Framer Motion
- Professional color scheme

🎬 **Portfolio Showcase**
- Interactive 3D model section (react-three-fiber)
- Video gallery carousel with keyboard navigation
- Lazy-loaded video embeds
- Lightbox modal viewer

💬 **Client Interaction**
- Contact form with validation
- Review/testimonial submission form
- Admin approval workflow for reviews
- Rate limiting & spam protection

🚀 **Performance & SEO**
- Next.js App Router with streaming
- Image optimization with next/image
- Structured data (schema.org)
- Meta tags and Open Graph
- Accessibility-first (WCAG 2.1)

🔒 **Security**
- Input validation & sanitization
- Honeypot spam protection
- Rate limiting
- Environment variable safety

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: react-three-fiber
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open browser**
   Navigate to `http://localhost:3000`

## Available Scripts

\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run tests
npm run test
\`\`\`

## Project Structure

\`\`\`
portfolio/
├── app/
│   ├── api/                 # API routes
│   │   ├── contact/route.ts
│   │   └── reviews/route.ts
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── page.tsx             # Home page
├── components/
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── overview-section.tsx
│   ├── three-d-model-section.tsx
│   ├── video-gallery-section.tsx
│   ├── testimonials-section.tsx
│   ├── contact-section.tsx
│   ├── review-form-section.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── skip-link.tsx
│   ├── providers/
│   │   └── theme-provider.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── constants.ts        # Constants
│   ├── schema.ts           # TypeScript interfaces
│   └── rate-limit.ts       # Rate limiting logic
├── types/
│   └── index.ts            # Global types
├── __tests__/
│   ├── components/
│   └── api/
├── public/                 # Static assets
├── .env.example
├── DEPLOYMENT.md           # Deployment guide
└── README.md
\`\`\`

## Customization

### Change Brand Colors
Edit `app/globals.css` CSS variables section:
\`\`\`css
:root {
  --primary: oklch(0.4 0.2 280);      /* Purple */
  --secondary: oklch(0.5 0.15 200);   /* Cyan */
  --accent: oklch(0.6 0.2 50);        /* Gold */
}
\`\`\`

### Update Portfolio Content
- Edit component files to change text
- Replace placeholder images in `public/`
- Update video URLs in components

### Add Database Integration
See `DEPLOYMENT.md` for PostgreSQL setup instructions.

## Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Skip links
- Focus management
- Color contrast ratios

## Performance

- Lazy-loaded components
- Image optimization
- Code splitting
- Caching strategy
- Optimized 3D model loading
- Progressive enhancement

## SEO

- Meta tags (title, description)
- Open Graph tags
- Schema.org structured data
- Canonical URLs
- Sitemap ready
- Mobile-friendly

## Security

- Input validation
- Sanitization
- Rate limiting (5 req/min for contact, 3 req/day for reviews)
- Honeypot spam protection
- CORS configuration
- Environment variable protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### Quick Deploy to Vercel

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

See `DEPLOYMENT.md` for detailed deployment instructions.

## Testing

\`\`\`bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Coverage report
npm run test -- --coverage
\`\`\`

## Roadmap

- [ ] Admin dashboard for review moderation
- [ ] Blog section
- [ ] Client testimonials pagination backend
- [ ] Email notification service
- [ ] Analytics integration
- [ ] Dark mode persistence
- [ ] PWA support

## Contributing

Feel free to fork and submit pull requests.

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions:
1. Check the documentation
2. Review existing GitHub issues
3. Create a new issue with details

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- [shadcn/ui](https://ui.shadcn.com)

---

**Last Updated**: November 2024

**Status**: Production Ready ✅
