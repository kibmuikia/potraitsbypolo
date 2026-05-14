import { defineAction } from "astro:actions";
import { z } from "zod";

import type { TablesInsert } from "../database.types";
import { supabase } from "../js/supabase";

export const server = {
	submitContact: defineAction({
		input: z.discriminatedUnion("channel", [
			z.object({
				channel: z.literal("whatsapp"),
				message: z.string().min(1),
			}),
			z.object({
				channel: z.literal("email"),
				name: z.string().min(1),
				email: z.email(),
				preferred_date: z.string().optional(),
				message: z.string().min(1),
			}),
		]),
		handler: async (input) => {
			console.debug("[submitContact] channel=%s", input.channel);

			let row: TablesInsert<"contact_submissions">;
			if (input.channel === "email") {
				row = {
					channel: input.channel,
					message: input.message,
					name: input.name,
					email: input.email,
					preferred_date: input.preferred_date ?? null,
				};
			} else {
				row = { channel: input.channel, message: input.message };
			}

			console.debug("[submitContact] inserting row", { channel: row.channel });
			const { error } = await supabase.from("contact_submissions").insert(row);

			if (error) {
				// Do not throw — caller decides whether to surface this to the user
				console.error("[submitContact] Supabase insert failed:", error.message);
				return { success: true as const, dbSaved: false as const, dbError: error.message };
			}

			console.debug("[submitContact] Supabase insert OK");
			return { success: true as const, dbSaved: true as const };
		},
	}),
};
