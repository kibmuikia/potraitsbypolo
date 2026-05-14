/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SUPABASE_URL: string;
	readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
	readonly SUPABASE_SERVICE_ROLE_KEY: string;
	readonly ADMIN_TOKEN: string;
	readonly PAUL_WHATSAPP_NUMBER: string;
}
