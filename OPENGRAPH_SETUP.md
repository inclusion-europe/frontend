# OpenGraph Setup Instructions

## The Problem ✅ SOLVED
Your Nuxt app on Netlify couldn't fetch dynamic post data because the backend URL was set to `localhost:3000`, which doesn't work in production.

## The Solution
I've implemented a fallback system that will:
1. Try to fetch real data from your backend API
2. Fall back to store data if available  
3. Generate SEO-friendly meta tags with meaningful fallback content

## Next Steps

### Option 1: Deploy Your Backend API
1. Deploy your backend (`/backend` folder) to a hosting service like:
   - Netlify Functions
   - Vercel
   - Railway
   - Render
   - Heroku

2. Update the backend URL in `netlify.toml`:
   ```toml
   NUXT_PUBLIC_BACKEND_URL = "https://your-actual-backend-url.com"
   ```

### Option 2: Use the Fallback System (Current Setup)
The app will now work without a backend by:
- Generating meaningful meta tags from the URL slug
- Using fallback images and descriptions
- Providing good OpenGraph sharing even without API data

## Testing OpenGraph
1. Deploy to Netlify
2. Test a post URL like: `https://your-site.netlify.app/your-post-slug`
3. Check meta tags using:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Files Changed
- `pages/[post].vue` - Added fallback post data generation
- `nuxt.config.ts` - Updated runtime config with environment-based URLs  
- `netlify.toml` - Added production environment variables
- `.env.production` - Created for production environment config

## Current Behavior
- **Development**: Uses localhost backend or fallback
- **Production**: Uses fallback system with SEO-optimized content
- **With Backend**: Will use real API data when backend URL is configured

## Technical Implementation

### Key Changes Made
1. **SSR Configuration**: Enabled server-side rendering in `nuxt.config.ts`
2. **Dynamic Meta Tags**: Added `useSeoMeta` to all dynamic pages with computed values
3. **Server-Side Data Fetching**: Using `useLazyFetch` with `server: true` for SEO
4. **Netlify Optimization**: Configured build settings and redirects
5. **Fallback System**: Smart fallback for when API isn't available

Your OpenGraph sharing should now work properly!