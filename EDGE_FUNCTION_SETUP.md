# Deploy Edge Function for AI Custom Jewelry

## Quick Manual Deploy (Easiest)

Follow these steps to deploy the Edge Function:

### Step 1: Go to Supabase Dashboard
- Visit: https://app.supabase.com
- Login with your account
- Select your project: **vireka**

### Step 2: Create Edge Function
1. From the left sidebar, click **Edge Functions** (under SQL Editor)
2. Click the **Create a new function** button
3. Name it: `generate-image`
4. Leave other settings as default
5. Click **Create function**

### Step 3: Copy the Function Code
1. Open this file: `supabase/functions/generate-image/index.ts`
2. Copy all the code
3. Go back to Supabase and paste it into the function editor
4. Click **Deploy** (blue button on right)

### Step 4: Add Environment Variable
1. In Supabase, go to **Project Settings** (bottom left, gear icon)
2. Go to **Edge Functions** (left sidebar)
3. Under **Secrets**, click **+ New secret**
4. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `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`
5. Click **Add secret**

### Step 5: Done! ✅
Your AI Custom page should now work! Try generating a design.

---

## Function Code Location
`supabase/functions/generate-image/index.ts`

## Troubleshooting

If you get "Failed to fetch" error:
- Check that the Edge Function is deployed (should show green checkmark)
- Verify the secret was added correctly
- Check browser console for detailed error messages

Need help? The Edge Function handles all OpenAI API calls securely from the backend.
