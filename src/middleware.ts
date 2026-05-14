import { defineMiddleware } from "astro:middleware";

const COOKIE_NAME = "polo_admin";

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	if (!pathname.startsWith("/admin")) return next();

	// Login and logout pages are always accessible
	if (pathname === "/admin/login" || pathname === "/admin/logout") return next();

	const token = context.cookies.get(COOKIE_NAME)?.value ?? "";

	const expected = import.meta.env.ADMIN_TOKEN ?? "";

	if (!token || !expected || token !== expected) {
		return context.redirect("/admin/login");
	}

	return next();
});
