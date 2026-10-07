import type { Skill, Weight } from "@/content/types";

export type Ring = {
	skills: Skill[];
	/** Halbachsen in Prozent der Containerbreite bzw. -höhe. */
	rx: number;
	ry: number;
	/** Sekunden pro Umlauf; negativ läuft gegen den Uhrzeigersinn. */
	period: number;
	/** Tailwind-Klassen für die Logogröße. */
	logo: string;
};

const ringByWeight = {
	3: { rx: 22, ry: 25, period: 45, logo: "size-9 md:size-14" },
	2: { rx: 34, ry: 37, period: -72, logo: "size-7 md:size-10" },
	1: { rx: 46, ry: 47, period: 99, logo: "size-5 md:size-8" },
} satisfies Record<Weight, Omit<Ring, "skills">>;

/** Ein Ring pro Gewichtung, von innen (3) nach außen (1). */
export function orbitRings(skills: Skill[]): Ring[] {
	return ([3, 2, 1] as const).map((weight) => ({
		...ringByWeight[weight],
		skills: skills.filter((skill) => skill.weight === weight),
	}));
}
