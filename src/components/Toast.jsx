import React from 'react';

export default function Toast({ visible, message }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-surface2 border border-success text-success
        px-5 py-3 rounded-xl font-mono text-xs transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      {message}
    </div>
  );
}
