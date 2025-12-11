# Deployment Guide

## Overview
This portfolio website is built with Next.js 16 and is optimized for deployment on Vercel.

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with repository
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add `NEXT_PUBLIC_APP_URL` with your deployment URL
   - Add any API keys for services (email, etc.)

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Your site is live!

### Automatic Deployments
Every push to `main` branch triggers an automatic deployment.

## Self-Hosted Deployment

### With Node.js (e.g., DigitalOcean, Linode)

1. **Clone repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Build**
   \`\`\`bash
   npm run build
   \`\`\`

4. **Set environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

5. **Start production server**
   \`\`\`bash
   npm run start
   \`\`\`

6. **Setup reverse proxy** (nginx example)
   \`\`\`nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
     }
   }
   \`\`\`

7. **Enable SSL** (Let's Encrypt)
   \`\`\`bash
   sudo certbot certonly --nginx -d yourdomain.com
   \`\`\`

## Database Setup (Optional)

If you want to enable persistent storage for reviews and contact messages:

### PostgreSQL Setup

1. **Create database**
   \`\`\`sql
   CREATE DATABASE portfolio_db;
   \`\`\`

2. **Create tables**
   \`\`\`sql
   CREATE TABLE contacts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(254) NOT NULL,
     phone VARCHAR(20),
     message TEXT NOT NULL,
     budget VARCHAR(20),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE reviews (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(254),
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     comment TEXT NOT NULL,
     approved BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   \`\`\`

3. **Add DATABASE_URL to environment**
   \`\`\`
   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
   \`\`\`

## Email Service Setup (Optional)

To send email notifications:

1. **Using SendGrid**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Get API key
   - Add to environment variables

2. **Using Gmail**
   - Create [App Password](https://myaccount.google.com/apppasswords)
   - Add SMTP credentials to environment

## Performance Optimization

- Images are optimized with `next/image`
- Videos are lazy-loaded
- 3D model uses performance-aware loading
- Static assets are cached with CDN
- Use Vercel's built-in caching and compression

## Security Checklist

- ✅ Input validation on all forms
- ✅ Rate limiting implemented
- ✅ Honeypot spam protection
- ✅ CSRF protection (Next.js built-in)
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection via sanitization
- ✅ Content Security Policy headers

## Monitoring

### Vercel Analytics
- Built-in Web Vitals monitoring
- Real User Monitoring (RUM)
- Performance insights

### Error Tracking (Optional)
- Integrate Sentry for error tracking
- Set up monitoring alerts

## Troubleshooting

### Build fails
\`\`\`bash
npm run build
# Check for TypeScript errors
npm run lint
\`\`\`

### Performance issues
- Check image sizes and optimization
- Monitor 3D model loading
- Use Vercel Analytics for insights

### Contact form not working
- Check API routes are deployed
- Verify environment variables
- Check browser console for errors

## Support

For issues or questions:
1. Check Next.js documentation: https://nextjs.org/docs
2. Check Vercel documentation: https://vercel.com/docs
3. Review environment variable setup

---

**Last Updated**: November 2024
