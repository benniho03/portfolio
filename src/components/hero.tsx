import type { Settings, Skill } from "@/content/types";
import { orbitRings } from "./orbit-rings";
import { sectionLabel } from "./section";
import { SkillOrbit } from "./skill-orbit";

export function Hero({ settings, skills }: { settings: Settings; skills: Skill[] }) {
	return (
		<section className="grid items-center gap-8 md:min-h-[75vh] md:grid-cols-[1fr_1.15fr]">
			<div>
				<p className={sectionLabel}>{settings.role}</p>
				<h1 className="mt-3 text-5xl font-bold leading-none md:text-7xl">
					{settings.greeting}
				</h1>
				<p className="mt-6 max-w-xl text-lg text-stone-600">{settings.intro}</p>
				<div className="mt-8 flex flex-wrap items-center gap-3">
					{settings.socialLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 font-medium text-white hover:bg-stone-700"
						>
							{link.label}
							<span
								aria-hidden
								className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							>
								↗
							</span>
						</a>
					))}
					<a
						href="#projects"
						className="rounded-full px-5 py-2.5 font-medium ring-1 ring-stone-900 hover:bg-white"
					>
						{settings.labels.projects} <span aria-hidden>↓</span>
					</a>
				</div>
			</div>
			<SkillOrbit rings={orbitRings(skills)} className="aspect-[6/5]">
				<Portrait />
			</SkillOrbit>
		</section>
	);
}

/** Platzhalter, bis das Foto aus dem CMS kommt. */
function Portrait() {
	return (
		<div className="relative grid aspect-square w-[28%] place-items-center rounded-full bg-gradient-to-br from-pink-600 to-amber-400 text-4xl font-bold text-white shadow-xl ring-8 ring-white md:text-6xl">
			b.
			<span className="absolute bottom-[16%] text-[10px] font-medium uppercase tracking-widest opacity-80">
				[Foto]
			</span>
		</div>
	);
}
