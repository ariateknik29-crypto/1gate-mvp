-- ============================================================
-- 1gate @ Supabase — Magic Link activation
-- Project ref: urjtpcwwbqmsjxgycvin
-- Run in SQL Editor (https://supabase.com/dashboard/project/urjtpcwwbqmsjxgycvin/editor)
-- ============================================================

-- 1) Enable Email provider
INSERT INTO auth.providers (id, enabled, config) VALUES ('email', true, '{}') 
ON CONFLICT (id) DO UPDATE SET enabled = true;

-- 2) Enable Magic Link + set site URL
UPDATE auth.config 
SET email_magiclink_enabled = true, 
    site_url = 'https://1gate.vercel.app',
    uri_allow_list = '["https://1gate.vercel.app","https://1gate.vercel.app/*"]';
