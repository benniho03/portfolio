import type { Station } from "@/content/types";
import { sectionGrid, sectionLabel } from "./section";

export function CareerSection({
	stations,
	heading,
	today,
}: {
	stations: Station[];
	heading: string;
	today: string;
}) {
	return (
		<section className={`mt-16 ${sectionGrid}`}>
			<h2 className={sectionLabel}>{heading}</h2>
			<ol className="relative space-y-8 border-l-2 border-stone-300 pl-6">
				{stations.map((station) => (
					<li key={`${station.organisation}-${station.from}`} className="relative">
						<span className="absolute -left-[33px] top-1.5 size-4 rounded-full border-4 border-stone-100 bg-stone-900" />
						<p className="text-sm tabular-nums text-stone-500">
							{station.from} – {station.to ?? today}
						</p>
						<p className="mt-1 text-xl font-bold">{station.role}</p>
						<p className="text-stone-500">{station.organisation}</p>
						<p className="mt-2 max-w-2xl text-stone-600">{station.description}</p>
						{station.technologies.length > 0 && (
							<p className="mt-2 text-sm text-stone-500">
								{station.technologies.map(({ name }) => name).join(" · ")}
							</p>
						)}
					</li>
				))}
			</ol>
		</section>
	);
}
