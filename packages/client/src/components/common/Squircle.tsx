import { getSvgPath } from 'figma-squircle';
import React, { ReactElement, useEffect, useState } from 'react';

export function SquircleMask({
  children,
  className = '',
  cornerRadius,
}: {
  children: React.ReactNode;
  className?: string;
  cornerRadius: number;
}): ReactElement {
  const [buttonRef, setButtonRef] = useState<HTMLDivElement | null>(null);

  const [path, setPath] = useState('');

  useEffect(() => {
    if (!buttonRef) {
      return;
    }

    const redraw = (): void => {
      const width = buttonRef ? buttonRef.getBoundingClientRect().width : 0;
      const height = buttonRef ? buttonRef.getBoundingClientRect().height : 0;

      const svgPath = getSvgPath({
        width,
        height,
        cornerRadius,
        cornerSmoothing: 1, // cornerSmoothing goes from 0 to 1
      });
      setPath(svgPath);
    };

    const observer = new ResizeObserver(() => {
      redraw();
    });
    observer.observe(buttonRef);
    return () => {
      observer.disconnect();
    };
  }, [buttonRef, cornerRadius, children]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        padding: 0,
        display: 'inline-block',
      }}
    >
      <div
        key="content"
        ref={setButtonRef}
        style={{
          clipPath: `path('${path}')`,
          display: 'inline-block',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
