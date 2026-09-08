import { BackLink } from "@/components/reader/BackLink";
import { ShorkMark } from "@/components/reader/ShorkMark";
import { Wordmark } from "@/components/reader/Wordmark";

export function SoftNotFound() {
  return (
    <main className="picnic-enter mx-auto flex max-w-md flex-col items-center px-2 py-6 text-center md:py-10">
      <Wordmark />
      <ShorkMark pose="search" className="mt-10 size-28 md:size-32" />
      <h1 className="mt-6 font-display text-[1.75rem] font-semibold leading-tight text-ink">
        That letter isn’t here.
      </h1>
      <p className="mt-2 font-accent text-[1.3rem] leading-snug text-ink-soft">
        It may have drifted off the blanket.
      </p>
      <div className="mt-6">
        <BackLink />
      </div>
    </main>
  );
}
