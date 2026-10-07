import type { RechtlicheSeite } from "@/content/types";

export function RechtlicheSeiteView({ page }: { page: RechtlicheSeite }) {
	return (
		<article className="max-w-3xl pt-10">
			<h1 className="text-4xl font-bold">{page.title}</h1>
			<div className="mt-8 space-y-4 text-stone-600">
				{page.paragraphs.map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</div>
		</article>
	);
}
