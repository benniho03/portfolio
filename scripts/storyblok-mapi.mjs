// Zugriff auf die Storyblok Management API für die Skripte in diesem Ordner.
// Erwartet STORYBLOK_SPACE_ID und STORYBLOK_PERSONAL_ACCESS_TOKEN, optional STORYBLOK_REGION (eu, us, ca, ap).

const hosts = {
	eu: "mapi.storyblok.com",
	us: "api-us.storyblok.com",
	ca: "api-ca.storyblok.com",
	ap: "api-ap.storyblok.com",
};

const region = process.env.STORYBLOK_REGION ?? "eu";
const spaceId = process.env.STORYBLOK_SPACE_ID?.trim();
const token = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN?.trim();
if (!spaceId || !token) {
	console.error("STORYBLOK_SPACE_ID und STORYBLOK_PERSONAL_ACCESS_TOKEN müssen gesetzt sein.");
	process.exit(1);
}
if (!/^\d+$/.test(spaceId)) {
	console.error(`STORYBLOK_SPACE_ID muss eine Zahl sein, ist aber „${spaceId}“.`);
	process.exit(1);
}
if (!hosts[region]) {
	console.error(
		`Unbekannte STORYBLOK_REGION „${region}“. Erlaubt: ${Object.keys(hosts).join(", ")}.`,
	);
	process.exit(1);
}

const base = `https://${hosts[region]}/v1/spaces/${spaceId}`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Wiederholt Anfragen, die am Rate-Limit der Management API scheitern. */
export async function request(method, path, body) {
	for (let attempt = 0; ; attempt++) {
		const response = await fetch(`${base}${path}`, {
			method,
			headers: { Authorization: token, "Content-Type": "application/json" },
			body: body && JSON.stringify(body),
		});
		if (response.status === 429 && attempt < 5) {
			await sleep(1000 * (attempt + 1));
			continue;
		}
		if (!response.ok) {
			throw new Error(`${method} ${path}: ${response.status} ${await response.text()}`);
		}
		if (response.status === 204) return null;
		const result = await response.json();
		if (result === null || typeof result !== "object") {
			throw new Error(
				`Unerwartete Antwort von ${method} ${base}${path}: ${JSON.stringify(result)}`,
			);
		}
		return result;
	}
}
