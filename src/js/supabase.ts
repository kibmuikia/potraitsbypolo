import { createClient } from "@supabase/supabase-js";

import type { Database } from "../database.types.ts"; // cmd: pnpm dlx supabase gen types typescript --project-id pysqmyqbovjvmgaprgtk > src/database.types.ts

export const supabase = createClient<Database>(
	import.meta.env.PUBLIC_SUPABASE_URL,
	import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
