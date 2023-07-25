import { getSvgPath } from 'figma-squircle';
import React, {
  HtmlHTMLAttributes,
  ReactElement,
  useEffect,
  useState,
} from 'react';

export function SquircleMask({
  children,
  className = '',
  style,
  cornerRadius,
  cornerSmoothing,
  hasOutline,
  dropShadow,
  outlineColor,
}: {
  children: React.ReactNode;
  className?: string;
  style?: HtmlHTMLAttributes<'style'>;
  cornerRadius: number;
  cornerSmoothing?: number;
  hasOutline?: boolean;
  dropShadow?: string;
  outlineColor?: string;
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
        cornerSmoothing: cornerSmoothing || 1, // cornerSmoothing goes from 0 to 1
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
  }, [buttonRef, cornerRadius, cornerSmoothing, children]);

  return (
    <div
      className={className}
      style={{
        filter: dropShadow,
        position: 'relative',
        padding: hasOutline ? '1px' : 0,
        display: 'inline-block',
        ...style,
      }}
    >
      {hasOutline && (
        <div key="outline" className="absolute top-0 bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <path
              d={path}
              fill="none"
              stroke={outlineColor}
              transform="translate(1 1)"
            />
          </svg>
        </div>
      )}
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
