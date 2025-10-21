import { useEffect, useState } from "react";

export function ModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{
        display: 'inline-block',
        width: 40,
        height: 24,
        borderRadius: 16,
        background: dark ? '#22223b' : '#e0e7ff',
        border: '2px solid #6366f1',
        position: 'relative',
        transition: 'background 0.2s',
      }}>
        <span style={{
          display: 'block',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: dark ? '#fff' : '#222',
          position: 'absolute',
          top: 2,
          left: dark ? 22 : 2,
          transition: 'left 0.2s, background 0.2s',
          boxShadow: '0 1px 4px 0 rgba(99,102,241,0.10)'
        }} />
      </span>
    </button>
  );
}
