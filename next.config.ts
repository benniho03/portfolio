import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "a.storyblok.com", pathname: "/f/**" }],
	},
	/** Altprojekte lagen als Unterverzeichnisse auf dem Strato-Webspace, siehe ADR 0001. */
	async redirects() {
		return [
			{
				source: "/wetter-getter/:path*",
				destination: "https://wetter-getter.holderle.de/:path*",
				permanent: true,
			},
			{
				source: "/pop-up/:path*",
				destination: "https://pop-up.holderle.de/:path*",
				permanent: true,
			},
			{ source: "/study-card/:path*", destination: "/", permanent: true },
		];
	},
};

export default nextConfig;
