import { Slider as SliderData } from '@fullstack-demo/domain';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';

export const SliderRadio = observer(
  ({
    slider,
    currentIndex,
    setCurrentIndex,
    inactiveClassName = 'bg-white',
  }: {
    slider: SliderData;
    currentIndex: number;
    setCurrentIndex: (v: number) => void;
    inactiveClassName?: string;
  }): ReactElement => {
    const sliderItems = slider.data.items;

    return (
      <div className="flex flex-row justify-center w-full gap-3">
        {sliderItems.map((slide, i) => (
          <div
            className={`w-2 h-2 rounded-full base-interaction ${
              i === currentIndex ? 'bg-black' : inactiveClassName
            }`}
            key={i}
            onClick={() => {
              setCurrentIndex(i);
            }}
          />
        ))}
      </div>
    );
  }
);

export default SliderRadio;
