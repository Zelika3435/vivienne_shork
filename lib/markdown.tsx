import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

const letterComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-8 mb-3 font-letter text-[1.35rem] font-medium leading-snug text-ink first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 font-letter text-[1.25rem] font-medium leading-snug text-ink first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 font-letter text-[1.15rem] font-medium leading-snug text-ink first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-[1.1em] last:mb-0">{children}</p>,
  em: ({ children }) => <em className="italic">{children}</em>,
  strong: ({ children }) => <strong className="font-medium">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-sage underline decoration-sage/50 underline-offset-[3px] transition-colors hover:text-sage-deep"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-[3px] border-sage py-0.5 pl-4 font-letter italic text-ink">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mb-[1.1em] list-disc space-y-1.5 pl-6 marker:text-sage last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-[1.1em] list-decimal space-y-1.5 pl-6 marker:text-sage last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  hr: () => <hr className="my-8 border-0 border-t border-wicker" />,
  code: ({ children }) => (
    <code className="rounded-md bg-kraft/60 px-1.5 py-0.5 font-letter text-[0.95em] text-ink">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-2xl bg-kraft/50 px-4 py-3 font-letter text-[0.95rem] leading-relaxed text-ink">
      {children}
    </pre>
  ),
};

type LetterMarkdownProps = {
  source: string;
};

export function LetterMarkdown({ source }: LetterMarkdownProps) {
  return (
    <ReactMarkdown
      skipHtml
      disallowedElements={["img"]}
      components={letterComponents}
    >
      {source}
    </ReactMarkdown>
  );
}
