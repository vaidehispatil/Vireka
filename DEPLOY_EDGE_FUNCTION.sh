#!/bin/bash
# Deploy Edge Function using Supabase API

PROJECT_ID="dxcgnphgnzqpgghiucdg"
FUNCTION_NAME="generate-image"

# Read the function file
FUNCTION_CONTENT=$(cat supabase/functions/generate-image/index.ts)

# Base64 encode the content
ENCODED_CONTENT=$(echo "$FUNCTION_CONTENT" | base64 -w 0)

echo "To complete the deployment manually, follow these steps:"
echo ""
echo "1. Go to your Supabase Dashboard: https://app.supabase.com"
echo "2. Select your project"
echo "3. Go to Edge Functions (from left sidebar)"
echo "4. Click 'Create a new function'"
echo "5. Name it: generate-image"
echo "6. Copy and paste the content from: supabase/functions/generate-image/index.ts"
echo "7. Click Deploy"
echo ""
echo "8. Then go to Project Settings → Edge Functions Secrets"
echo "9. Add new secret:"
echo "   - Name: OPENAI_API_KEY"
echo "   - Value: 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"
echo ""
echo "That's it! The AI Custom page will now work."
