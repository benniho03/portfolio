import { describe, expect, test } from "vitest";
import type { Skill, Weight } from "@/content/types";
import { orbitRings } from "./orbit-rings";

const skill = (key: string, weight: Weight): Skill => ({ key, name: key, isSkill: true, weight });

describe("orbitRings", () => {
	test("ordnet jeden Skill dem Ring seiner Gewichtung zu, die stärkste innen", () => {
		const rings = orbitRings([
			skill("git", 1),
			skill("react", 3),
			skill("bun", 2),
			skill("ts", 3),
		]);

		expect(rings.map((ring) => ring.skills.map(({ key }) => key))).toEqual([
			["react", "ts"],
			["bun"],
			["git"],
		]);
	});
});
