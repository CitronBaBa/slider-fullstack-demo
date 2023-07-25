import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import {
  AddIcon,
  LeftArrowIcon,
  MinusIcon,
  RightArrowIcon,
} from '../common/icons';
import { genEmptySlide } from '../store/SliderStore';
import { uiStateStore } from '../store/UI/UIStateStore';
import SliderRadio from './SliderRadio';

export const SliderEditorControl = observer((): ReactElement => {
  const { targetSlider, targetSlideIndex } = uiStateStore;
  if (!targetSlider) {
    return <></>;
  }

  const slides = targetSlider.data.items;

  const onDeleteSlide = async () => {
    if (slides.length >= 2) {
      runInAction(async () => {
        slides.splice(targetSlideIndex, 1);
        uiStateStore.setTargetSlideIndex(Math.max(targetSlideIndex - 1, 0));
        await uiStateStore.saveSliderEdit();
      });
    }
  };

  const onAddSlide = async () => {
    runInAction(async () => {
      slides.push(genEmptySlide());
      uiStateStore.setTargetSlideIndex(slides.length - 1);
      await uiStateStore.saveSliderEdit();
    });
  };

  return (
    <div className="flex flex-row justify-between items-center w-full gap-3 my-2">
      <MinusIcon
        className="w-4 text-neutral-400 base-interaction "
        onClick={onDeleteSlide}
      />

      <div className="flex flex-row items-center gap-2">
        <LeftArrowIcon
          className="w-6 base-interaction "
          onClick={() => {
            uiStateStore.setTargetSlideIndex(Math.max(targetSlideIndex - 1, 0));
          }}
        />
        <SliderRadio
          slider={targetSlider}
          currentIndex={targetSlideIndex}
          setCurrentIndex={(v: number) => uiStateStore.setTargetSlideIndex(v)}
          inactiveClassName="bg-base-300"
        />
        <RightArrowIcon
          className="w-6 base-interaction "
          onClick={() => {
            uiStateStore.setTargetSlideIndex(
              Math.min(targetSlideIndex + 1, targetSlider.data.items.length - 1)
            );
          }}
        />
      </div>

      <AddIcon
        className="w-4 text-neutral-400 base-interaction "
        onClick={onAddSlide}
      />
    </div>
  );
});

export default SliderEditorControl;
