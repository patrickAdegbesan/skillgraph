# SkillGraph screen-recording script

Target length: 2–4 minutes. Record against the deployed hosted demo once it
exists (see the Live Demo section of the root README) — not a local instance.
Nothing below needs narration about Claude, Cypher jargon, or this
development process; keep the language aimed at a nontechnical evaluator.

## Beats

1. **Open on the Overview page.** "This is SkillGraph — it shows a developer
   how their skills and project work connect to real career opportunities."
   (one sentence, the real-world problem)
2. Point at the developer header and the four metric cards. Point at the
   "Your strongest match" card (Full Stack Developer, 80%, matched skill
   pills).
3. **Click "Skills" in the nav.** Show the direct skills row, then the "Seen
   in your projects" row. Call out by name: Neo4j, Node.js, Tailwind CSS —
   "these came from the developer's actual project work, not something they
   typed in themselves."
4. **Click "Roles" in the nav.** Show the ranked list. Point at the top
   card: Full Stack Developer, 80%, 4 of 5 skills.
5. **Click "Explore this role"** on that card (or navigate to its detail
   page). Point at the missing-skill section: Node.js, called out as the one
   gap. Point at the companies list.
6. **Scroll to the Career Path section** on that same page (or go to the
   dedicated Career Path page). Show the step diagram connecting a current
   skill through to the role. One sentence: "This traces a path through
   related skills already in the graph — it's a possible learning
   connection, not a promise that finishing it gets you the job."
7. **One sentence on the tech**: "Under the hood this is CognoDB — a graph
   database — queried with Cypher through the official Neo4j driver, so
   these are real graph traversals, not hand-joined tables."
8. **End card / final seconds**: show the repository URL and the deployed
   demo URL on screen (read them or leave them visible long enough to read).

## Notes for whoever records this

- Do the whole thing as one continuous click-through — no cuts needed if
  each beat above takes 15–25 seconds.
- If a role with no career path is available at recording time, it's worth
  a 5-second aside showing that empty state ("no short learning path was
  found") so the recording demonstrates the app doesn't fake a path when
  none exists — optional, only if time allows.
- Show the mobile layout for a few seconds if there's room left in the
  4-minute budget; not required.
- Do not show devtools, terminal output, or any `.env.local` file on screen.
