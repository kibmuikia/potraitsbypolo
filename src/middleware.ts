import { defineMiddleware } from "astro:middleware";

const COOKIE_NAME = "polo_admin";

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	if (!pathname.startsWith("/admin")) return next();

	// Login and logout pages are always accessible
	if (pathname === "/admin/login" || pathname === "/admin/logout") return next();

	const token = context.request.headers
		.get("cookie")
		?.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith(`${COOKIE_NAME}=`))
		?.slice(COOKIE_NAME.length + 1);

	const expected = import.meta.env.ADMIN_TOKEN ?? "";

	if (!token || !expected || token !== expected) {
		return context.redirect("/admin/login");
	}

	return next();
});
