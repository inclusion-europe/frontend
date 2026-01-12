# Vercel SSR Deployment Guide

This frontend has been configured for Server-Side Rendering (SSR) deployment on Vercel.

## Key Changes for Vercel SSR

### 1. **Nuxt Configuration** (`nuxt.config.ts`)
- Changed Nitro preset from `netlify` to `vercel`
- Enabled SSR rendering for better SEO and initial page load performance
- Configured proper runtime config for backend URL management

### 2. **Server-Side Data Fetching** (`app.vue`)
- Enabled `onServerPrefetch()` to load posts and menu data during server-side rendering
- This ensures data is available when the page is rendered on the server
- Fallback to client-side loading on mount if data isn't available

### 3. **Vercel Configuration** (`vercel.json`)
- Set Nuxt framework detection
- Configured build and dev commands
- Set Node.js version to 20.x

### 4. **Environment Variables**
- Update `NUXT_PUBLIC_BACKEND_URL` in Vercel dashboard
- Path: Project Settings > Environment Variables

## Deployment Steps

1. **Connect your repository to Vercel**
   - Go to https://vercel.com
   - Click "Import Project" and select your Git repository
   - Select the `frontend` folder as the root directory

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add `NUXT_PUBLIC_BACKEND_URL` with your backend API endpoint
   - Example: `https://your-backend-api.com`

3. **Deploy**
   - Vercel will automatically detect Nuxt and use the configured build process
   - Your app will deploy with full SSR support

## Local Development

```bash
npm install
npm run dev
```

## Building Locally

```bash
npm run build
npm run preview
```

## Troubleshooting

### "Posts not loading"
- Check that `NUXT_PUBLIC_BACKEND_URL` is correctly set in environment variables
- Verify the backend API is accessible from Vercel

### "Hydration mismatch"
- Clear `.nuxt` and `node_modules` folders
- Run `npm install` and `npm run build` again

### "Build fails"
- Check Node.js version compatibility (currently set to 20.x in vercel.json)
- Verify all dependencies are properly installed
- Check Vercel build logs for specific error messages

## File Structure

```
frontend/
├── nuxt.config.ts          # Nuxt configuration (configured for Vercel)
├── vercel.json             # Vercel build configuration
├── app.vue                 # Root component (SSR optimized)
├── package.json            # Dependencies and scripts
├── .env.production         # Production environment variables
├── store/
│   └── index.js           # Pinia store for posts and menu
├── server/
│   └── posts/             # API routes (optional)
└── ...
```

## Notes

- The application uses Pinia for state management, which is SSR-compatible
- Data fetching happens during server-side rendering for better performance
- The app maintains client-side data loading as a fallback
- OpenGraph tags are properly configured for social media sharing
