export const terminalTriggerClassName =
  "inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border-subtle px-3 font-mono text-xs text-text-secondary transition hover:border-border-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

export const TerminalTriggerLabel = ({ label }: { label: string }) => (
  <>
    <span aria-hidden className="text-accent-500">
      $
    </span>
    {label}
    <span
      aria-hidden
      className="h-3.5 w-1.5 animate-terminal-caret bg-text-secondary"
    />
  </>
);

export const TerminalTriggerPlaceholder = () => (
  <span aria-hidden className={`${terminalTriggerClassName} w-36`} />
);
