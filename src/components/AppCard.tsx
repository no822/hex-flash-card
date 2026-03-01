import type { ReactNode } from "react";

interface Props {
  title?: string;
  footer?: ReactNode;
  onBack?: () => void;
  children: ReactNode;
}

const CSS = `
  .ac-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .ac-card {
    width: 100%;
    max-width: 460px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    animation: ac-appear 0.3s ease-out;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .ac-titlebar {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f9fafb;
    border-radius: 8px 8px 0 0;
  }

  .ac-dots {
    display: flex;
    gap: 6px;
  }

  .ac-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .ac-dot-r { background: #ff5f57; }
  .ac-dot-y { background: #febc2e; }
  .ac-dot-g { background: #28c840; }

  .ac-title {
    flex: 1;
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    letter-spacing: 0.05em;
  }

  .ac-back {
    all: unset;
    cursor: pointer;
    font-size: 11px;
    color: #9ca3af;
    padding: 2px 6px;
    border-radius: 4px;
    transition: color 0.12s, background 0.12s;
    white-space: nowrap;
  }

  .ac-back:hover { color: #374151; background: #e5e7eb; }

  .ac-statusbar {
    padding: 9px 16px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
    border-radius: 0 0 8px 8px;
  }

  .ac-status {
    font-size: 10px;
    color: #d1d5db;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .ac-status-live {
    color: #22c55e;
    font-weight: 600;
  }

  @keyframes ac-appear {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const AppCard = ({ title, footer, onBack, children }: Props) => (
  <>
    <style>{CSS}</style>
    <div className="ac-root">
      <div className="ac-card">
        <div className="ac-titlebar">
          <div className="ac-dots">
            <div className="ac-dot ac-dot-r" />
            <div className="ac-dot ac-dot-y" />
            <div className="ac-dot ac-dot-g" />
          </div>
          {title && <div className="ac-title">{title}</div>}
          {onBack && (
            <button className="ac-back" onClick={onBack}>
              ← Back
            </button>
          )}
        </div>

        {children}

        {footer && <div className="ac-statusbar">{footer}</div>}
      </div>
    </div>
  </>
);

export default AppCard;
