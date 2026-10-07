import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getSettings } from "@/content";
import { hasLocale, locales } from "@/i18n";

// Ein sprachabhängiger Alt-Text per generateImageMetadata scheitert im Build: Next übergibt dort kein `lang`.
export const alt = "benni.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og liest kein WOFF2, deshalb liegen hier zusätzlich statische TTF-Schnitte.
const fontDir = join(process.cwd(), "src/app/fonts");
const [medium, bold] = await Promise.all([
	readFile(join(fontDir, "space-grotesk-medium.ttf")),
	readFile(join(fontDir, "space-grotesk-bold.ttf")),
]);

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const { role, greeting, meta, photo } = await getSettings(lang);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				padding: "72px 80px",
				background: "#f5f5f4",
				color: "#1c1917",
				fontFamily: "Space Grotesk",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
				<div style={{ fontSize: 36, fontWeight: 700 }}>benni.</div>
				<div
					style={{
						marginTop: 56,
						fontSize: 22,
						textTransform: "uppercase",
						letterSpacing: "0.2em",
						color: "#78716c",
					}}
				>
					{role}
				</div>
				<div style={{ marginTop: 16, fontSize: 76, fontWeight: 700, lineHeight: 1 }}>
					{greeting}
				</div>
				<div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "#57534e" }}>
					{meta.description}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 400,
					height: 340,
					borderRadius: "50%",
					border: "2px dashed #d6d3d1",
				}}
			>
				<Portrait photo={photo} />
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
				{ name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
			],
		},
	);
}

const portrait = {
	display: "flex",
	width: 240,
	height: 240,
	borderRadius: "50%",
	border: "12px solid white",
	boxShadow: "0 20px 40px rgba(28, 25, 23, 0.2)",
} as const;

function Portrait({ photo }: { photo?: string }) {
	if (photo) {
		return (
			<img
				src={`${photo}/m/480x480/filters:format(png)`}
				alt=""
				width={240}
				height={240}
				style={{ ...portrait, objectFit: "cover" }}
			/>
		);
	}
	return (
		<div
			style={{
				...portrait,
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #db2777, #fbbf24)",
				color: "white",
				fontSize: 96,
				fontWeight: 700,
			}}
		>
			b.
		</div>
	);
}
