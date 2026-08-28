import type { RequiredSkill } from "@/lib/types/graph";

const IMPORTANCE_LABEL: Record<RequiredSkill["importance"], string> = {
  critical: "Critical",
  important: "Important",
  "nice-to-have": "Nice to have",
};

const IMPORTANCE_CLASSES: Record<RequiredSkill["importance"], string> = {
  critical: "text-[var(--danger)] bg-[var(--danger-soft)]",
  important: "text-[var(--warning)] bg-[var(--warning-soft)]",
  "nice-to-have": "text-[var(--muted)] bg-[var(--surface-muted)]",
};

export function SkillGapList({ skills }: { skills: RequiredSkill[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {skills.map((skill) => (
        <li
          key={skill.id}
          className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">{skill.name}</p>
            <p className="text-xs text-[var(--muted)]">Minimum level: {skill.minimumLevel}</p>
          </div>
          <span
            className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-medium ${IMPORTANCE_CLASSES[skill.importance]}`}
          >
            {IMPORTANCE_LABEL[skill.importance]}
          </span>
        </li>
      ))}
    </ul>
  );
}
