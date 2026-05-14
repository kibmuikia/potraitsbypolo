import { defineAction } from "astro:actions";
import { z } from "zod";

import { supabaseAdmin } from "../js/supabase-admin";

export const admin = {
	updateLeadStatus: defineAction({
		input: z.object({
			id: z.string().min(1),
			status: z.enum(["new", "read", "replied", "archived", "spam"]),
		}),
		handler: async ({ id, status }) => {
			console.debug("[admin:updateLeadStatus] id=%s status=%s", id, status);

			const { error } = await supabaseAdmin
				.from("contact_submissions")
				.update(
					status === "replied"
						? { status, replied_at: new Date().toISOString() }
						: { status },
				)
				.eq("id", id);

			if (error) {
				console.error("[admin:updateLeadStatus] failed:", error.message);
				return { success: false as const, error: error.message };
			}
			return { success: true as const };
		},
	}),

	updateLeadNotes: defineAction({
		input: z.object({
			id: z.string().min(1),
			notes: z.string(),
		}),
		handler: async ({ id, notes }) => {
			console.debug("[admin:updateLeadNotes] id=%s", id);
			const { error } = await supabaseAdmin
				.from("contact_submissions")
				.update({ notes })
				.eq("id", id);

			if (error) {
				console.error("[admin:updateLeadNotes] failed:", error.message);
				return { success: false as const, error: error.message };
			}
			return { success: true as const };
		},
	}),
};
