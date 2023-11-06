import { Slider as SliderData } from '@fullstack-demo/domain';
import { observer } from 'mobx-react-lite';
import React, { ReactElement, useState } from 'react';
import { EditIcon, LeftArrowIcon, RightArrowIcon } from '../common/icons';
import { uiStateStore } from '../store/UI/UIStateStore';
import SliderItem from './SliderItem';
import SliderRadio from './SliderRadio';

const Slider = observer(({ slider }: { slider: SliderData }): ReactElement => {
  const [_currentIndex, _setCurrentIndex] = useState(0);

  const beingEdited = uiStateStore.targetSliderId === slider.id;

  const currentIndex = beingEdited
    ? uiStateStore.targetSlideIndex
    : _currentIndex;

  const setCurrentIndex = (v: number): void => {
    _setCurrentIndex(v);
    if (beingEdited) {
      uiStateStore.setTargetSlideIndex(v);
    }
  };

  const sliderItems = slider.data.items;

  const editBtn = beingEdited ? (
    <></>
  ) : (
    <div
      className="absolute left-6 top-6 z-20  invisible group-hover:visible
       animate__animated animate__pulse repeat-infinite"
    >
      <div
        className="btn  btn-accent"
        onClick={() => {
          if (slider.id) {
            uiStateStore.editSlider(slider.id, currentIndex);
          }
        }}
      >
        Edit Component
        <EditIcon className="w-7" />
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col w-full  items-center gap-4 relative  group ${
        beingEdited
          ? 'outline outline-offset-[10px] outline-secondary-focus outline-4 outline-dashed'
          : ''
      }`}
    >
      <div className="w-full max-w-[1120px] h-[32rem] md:h-[474px] relative overflow-hidden">
        {sliderItems.map((slide, i) => (
          <div
            className={`w-full h-full absolute`}
            key={i}
            style={{
              transform: `translate(${110 * (i - currentIndex)}%)`,
              transition: 'all 0.7s ease-out',
            }}
          >
            <SliderItem
              slide={slide}
              // only load neighboring slides
              active={Math.abs(currentIndex - i) <= 1}
            />
          </div>
        ))}

        <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center ">
          <LeftArrowIcon
            className="w-11 p-1 text-neutral-500  base-interaction hover:bg-white hover:bg-opacity-20 rounded-full"
            onClick={() => {
              setCurrentIndex(Math.max(currentIndex - 1, 0));
            }}
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 z-10 flex flex-col justify-center">
          <RightArrowIcon
            className="w-11 p-1  text-neutral-500 base-interaction hover:bg-white hover:bg-opacity-20 rounded-full"
            onClick={() => {
              setCurrentIndex(
                Math.min(currentIndex + 1, sliderItems.length - 1)
              );
            }}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center w-full gap-3">
        <SliderRadio
          slider={slider}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>

      {editBtn}
    </div>
  );
});

export default Slider;
