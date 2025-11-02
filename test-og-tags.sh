#!/bin/bash

# Script to test OpenGraph meta tags on your Netlify site
# Usage: ./test-og-tags.sh [your-netlify-url]

SITE_URL=${1:-"https://deploy-preview-30.inclusion-dev.kyng.be/"}

echo "🔍 Testing OpenGraph tags for Inclusion Europe site: $SITE_URL"
echo "=================================================="

# Function to test a URL and extract OG tags
test_og_tags() {
    local url=$1
    local description=$2
    
    echo ""
    echo "📄 Testing: $description"
    echo "URL: $url"
    echo "---"
    
    # Fetch the page and extract OG tags
    curl -s "$url" | grep -E 'og:|twitter:' | sed 's/.*content="//' | sed 's/".*//' | head -10
    
    echo ""
}

# Test different page types
test_og_tags "$SITE_URL/" "Homepage"
test_og_tags "$SITE_URL/articles" "Articles page"
test_og_tags "$SITE_URL/search/inclusion" "Search results"
test_og_tags "$SITE_URL/tag/rights" "Tag page"

echo "💡 Tips for testing:"
echo "1. Use Facebook's Sharing Debugger: https://developers.facebook.com/tools/debug/"
echo "2. Use Twitter Card Validator: https://cards-dev.twitter.com/validator"
echo "3. Use LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/"
echo ""
echo "🚀 If tags aren't showing up:"
echo "1. Wait a few minutes for Netlify to propagate changes"
echo "2. Clear the social platform's cache using their debugging tools"
echo "3. Check that your site is properly deployed and accessible"