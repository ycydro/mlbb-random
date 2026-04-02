import RandomizerCard from "@/components/custom/RandomizerCard";
import { getRandomizerAssets } from "@/lib/api/randomizer-assets";
import { EmblemSet } from "./types";
import { RandomizerProvider } from "./context/RandomizerContext";

export default async function HomePage() {
  const assets = await getRandomizerAssets();

  return (
    <>
      {/* seo thingz(?) */}
      <header className="sr-only">
        <h1>MLBB Randomizer. A Random Hero, Build and Loadout Generator</h1>
        <p>
          Free Mobile Legends: Bang Bang randomizer tool. Instantly generate a
          random hero, 6-item build, lane, role, emblem setup, and battle spell
          for your next match. Works for all ranks and hero classes.
        </p>
      </header>

      <main
        id="main-content"
        className="min-h-screen overscroll-none justify-center w-full bg-slate-800 flex flex-col items-center overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,64,175,0.25),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-lg px-4 pt-10 pb-16 flex flex-col gap-6">
          <RandomizerProvider
            heroes={assets.heroes}
            emblems={assets.emblems}
            items={assets.items}
            battleSpells={assets.battleSpells}
          >
            {/* TODO: HERO, ITEM, AND SPELL PICKER. DIFFICULTY (MAYBE) */}
            <RandomizerCard isLoading={false} />
          </RandomizerProvider>
          {/* seo thingz(?) */}
          <section aria-labelledby="about-heading" className="sr-only">
            <h2 id="about-heading">About This Tool</h2>
            <p>
              The <strong>MLBB Randomizer</strong> generates a completely random
              Mobile Legends: Bang Bang setup — hero, item build, lane, role,
              emblems, and battle spell.
            </p>
            <ul>
              <li>Random hero selection from the full MLBB roster</li>
              <li>Complete 6-item build randomized per hero class</li>
              <li>Lane &amp; role assignment (Gold, Exp, Mid, Jungle, Roam)</li>
              <li>Emblem setup &amp; battle spell pairing</li>
            </ul>
          </section>

          <footer className="text-center">
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Not affiliated with Moonton or Mobile Legends: Bang Bang
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
