import { describe, expect, test } from "vitest";
import type { Skill, Weight } from "@/content/types";
import { orbitRings } from "./orbit-rings";

const skill = (key: string, weight: Weight): Skill => ({ key, name: key, isSkill: true, weight });

describe("orbitRings", () => {
  test("ordnet jeden Skill dem Ring seiner Gewichtung zu, die stärkste innen", () => {
    const rings = orbitRings([skill("git", 1), skill("react", 3), skill("bun", 2), skill("ts", 3)]);

    expect(rings.map((ring) => ring.skills.map(({ key }) => key))).toEqual([
      ["react", "ts"],
      ["bun"],
      ["git"],
    ]);
  });

  test("legt die Ringe von innen nach außen mit wachsenden Halbachsen an", () => {
    const rings = orbitRings([]);

    expect(rings.map(({ rx, ry }) => [rx, ry])).toEqual([
      [22, 25],
      [34, 37],
      [46, 47],
    ]);
  });

  test("lässt den mittleren Ring gegenläufig und die äußeren langsamer kreisen", () => {
    const rings = orbitRings([]);

    expect(rings.map(({ period }) => period)).toEqual([45, -72, 99]);
  });
});
