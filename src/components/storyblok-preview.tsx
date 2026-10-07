"use client";

import { loadStoryblokBridge } from "@storyblok/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Verbindet die Seite im Draft Mode mit dem Visual Editor und rendert sie nach jedem Speichern neu. */
export function StoryblokPreview() {
	const router = useRouter();
	useEffect(() => {
		let active = true;
		loadStoryblokBridge().then(() => {
			if (!active) return;
			new window.StoryblokBridge().on(["change", "published"], () => router.refresh());
		});
		return () => {
			active = false;
		};
	}, [router]);
	return null;
}
