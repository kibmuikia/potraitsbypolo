export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "Portraits by Polo",
	// Your website's title and description (meta fields)
	title: "Portraits by Polo — Global Film Camera Operator",
	description:
		"Vincere est vivere™. Polo is a global film camera operator capturing portraits, weddings, and cinematic moments. View the portfolio and get in touch.",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "portraitsbypolo",
		email: "",
		twitter: "portraitsbypolo",
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/cosmic-themes-logo.jpg",
		alt: "Portraits by Polo",
	},
};

export default siteData;
