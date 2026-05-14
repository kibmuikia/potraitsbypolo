import { defineAction } from "astro:actions";
import { z } from "zod";

import type { TablesInsert } from "../database.types";
import { supabase } from "../js/supabase";
import { admin } from "./admin";

const attribution = {
	phone: z.string().optional(),
	inquiry_type: z.string().optional(),
	source_url: z.string().optional(),
	utm_source: z.string().optional(),
	utm_medium: z.string().optional(),
	session_id: z.string().optional(),
	device_type: z.string().optional(),
};

export const server = {
	admin,

	submitContact: defineAction({
		input: z.discriminatedUnion("channel", [
			z.object({
				channel: z.literal("whatsapp"),
				message: z.string().min(1),
				...attribution,
			}),
			z.object({
				channel: z.literal("email"),
				name: z.string().min(1),
				email: z.email(),
				preferred_date: z.string().optional(),
				message: z.string().min(1),
				...attribution,
			}),
		]),
		handler: async (input) => {
			console.debug("[submitContact] channel=%s", input.channel);

			const attr: Partial<TablesInsert<"contact_submissions">> = {
				phone: input.phone ?? null,
				inquiry_type: input.inquiry_type ?? null,
				source_url: input.source_url ?? null,
				utm_source: input.utm_source ?? null,
				utm_medium: input.utm_medium ?? null,
				session_id: input.session_id ?? null,
				device_type: input.device_type ?? null,
			};

			let row: TablesInsert<"contact_submissions">;
			if (input.channel === "email") {
				row = {
					channel: input.channel,
					message: input.message,
					name: input.name,
					email: input.email,
					preferred_date: input.preferred_date ?? null,
					...attr,
				};
			} else {
				row = { channel: input.channel, message: input.message, ...attr };
			}

			console.debug("[submitContact] inserting row", { channel: row.channel });
			const { error } = await supabase.from("contact_submissions").insert(row);

			if (error) {
				console.error("[submitContact] Supabase insert failed:", error.message);
				return { success: true as const, dbSaved: false as const, dbError: error.message };
			}

			console.debug("[submitContact] Supabase insert OK");
			return { success: true as const, dbSaved: true as const };
		},
	}),
};
