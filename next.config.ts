import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "a.storyblok.com", pathname: "/f/**" }],
	},
};

export default nextConfig;
