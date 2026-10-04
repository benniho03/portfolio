import type { LegalPage } from "@/content/types";

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <article className="max-w-3xl pt-10">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <div className="mt-8 space-y-4 text-stone-600">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
