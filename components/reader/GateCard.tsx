import { GateForm } from "@/components/reader/GateForm";
import { ShorkMark } from "@/components/reader/ShorkMark";
import { Wordmark } from "@/components/reader/Wordmark";

export function GateCard() {
  return (
    <section className="picnic-shadow w-full max-w-[24rem] rounded-[1.75rem] border border-wicker bg-paper px-6 py-8 md:px-8 md:py-10">
      <Wordmark />
      <p className="mt-5 font-accent text-[1.4rem] leading-snug text-ink-soft">
        Unlatch the basket. The letters are inside.
      </p>
      <ShorkOnTheLatch />
      <GateForm />
    </section>
  );
}

function ShorkOnTheLatch() {
  return (
    <div className="relative mx-auto mt-6 h-[10.25rem] w-[12rem]" aria-hidden>
      <svg
        viewBox="0 0 192 110"
        className="absolute inset-x-0 bottom-0 h-[6.75rem] w-full"
        fill="none"
      >
        <path
          d="M36 48c0-18 26-32 60-32s60 14 60 32"
          stroke="var(--picnic-sage)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="28"
          y="46"
          width="136"
          height="56"
          rx="16"
          fill="var(--picnic-kraft)"
          stroke="var(--picnic-wicker)"
          strokeWidth="1.5"
        />
        <path d="M28 64h136" stroke="var(--picnic-wicker)" strokeWidth="1.5" />
        <rect
          x="82"
          y="54"
          width="28"
          height="22"
          rx="6"
          fill="var(--picnic-sage)"
          stroke="var(--picnic-sage-deep)"
          strokeWidth="1.4"
        />
        <circle cx="96" cy="65" r="4.5" fill="var(--picnic-daisy)" />
      </svg>
      <ShorkMark
        pose="daisy"
        className="absolute left-1/2 top-0 size-[5.75rem] -translate-x-1/2"
        title=""
      />
    </div>
  );
}
