import Image from "next/image";
import type { Labels, Project } from "@/content/types";

const tiles = {
	large: { span: "md:col-span-2 md:row-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
	wide: { span: "md:col-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
	small: { span: "", sizes: "(min-width: 768px) 25vw, 100vw" },
};
type Tile = (typeof tiles)[keyof typeof tiles];

/** Das erste Projekt ist groß, danach wechseln eine breite und zwei kleine Kacheln. */
const tileAt = (index: number): Tile =>
	index === 0 ? tiles.large : [tiles.wide, tiles.small, tiles.small][(index - 1) % 3];

export function ProjectsSection({ projects, labels }: { projects: Project[]; labels: Labels }) {
	return (
		<section id="projects" className="mt-24 scroll-mt-6">
			<h2 className="text-4xl font-bold">
				{labels.projects} <span className="text-stone-400">{projects.length}</span>
			</h2>
			<div className="mt-8 grid auto-rows-[minmax(10rem,auto)] grid-cols-1 gap-4 md:grid-cols-4">
				{projects.map((project, i) => (
					<ProjectTile
						key={project.name}
						project={project}
						visitLabel={labels.visit}
						tile={tileAt(i)}
					/>
				))}
			</div>
		</section>
	);
}

function ProjectTile({
	project,
	visitLabel,
	tile,
}: {
	project: Project;
	visitLabel: string;
	tile: Tile;
}) {
	return (
		<article
			className={`group relative min-h-64 overflow-hidden rounded-3xl bg-stone-900 ${tile.span}`}
		>
			<Image
				src={project.image}
				alt=""
				fill
				sizes={tile.sizes}
				className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
			/>
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 text-white">
				<ul className="mb-3 flex flex-wrap gap-1.5">
					{project.technologies.map((technology) => (
						<li
							key={technology.key}
							className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs backdrop-blur"
						>
							{technology.name}
						</li>
					))}
				</ul>
				<h3 className="text-2xl font-bold">{project.name}</h3>
				<p className="mt-2 line-clamp-2 text-sm text-white/80 transition-all group-hover:line-clamp-none">
					{project.description}
				</p>
				<div className="mt-4 flex gap-2 text-sm font-medium">
					{project.link && (
						<a
							href={project.link}
							className="rounded-full bg-white px-4 py-1.5 text-stone-900 hover:bg-amber-300"
						>
							{visitLabel}
						</a>
					)}
					{project.githubLink && (
						<a
							href={project.githubLink}
							className="rounded-full border border-white/50 px-4 py-1.5 hover:bg-white/10"
						>
							GitHub
						</a>
					)}
				</div>
			</div>
		</article>
	);
}
