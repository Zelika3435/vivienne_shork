import { FlowerDoodle, ShorkMark } from "@/components/reader/ShorkMark";

export function SoftEmpty() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center md:py-14">
      <div className="relative">
        <ShorkMark pose="daisy" className="size-28 md:size-32" />
        <FlowerDoodle
          kind="daisy"
          className="absolute -bottom-1 -left-6 size-10 rotate-[-18deg] opacity-80"
        />
      </div>
      <p className="mt-5 max-w-sm font-accent text-[1.45rem] leading-snug text-ink-soft">
        Nothing to read just yet. Come back soon.
      </p>
    </div>
  );
}
