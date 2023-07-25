import { observer } from 'mobx-react-lite';
import React, { ReactElement, useState } from 'react';
import { AddIcon } from '../common/icons';
import { genEmptySlider, sliderStore } from '../store/SliderStore';
import { uiStateStore } from '../store/UI/UIStateStore';
import Slider from './Slider';

export const SliderList = observer((): ReactElement => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const sliders = sliderStore.sliders;

  const onAdd = async () => {
    const r = await sliderStore.create(genEmptySlider());
    if (r) {
      uiStateStore.editSlider(r.id, 0);
      ref?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col max-w-[1200px] gap-8 p-5 px-8 flex-grow animate__animated animate__fadeInLeft ">
      {sliders.map((slider, i) => (
        <Slider key={i} slider={slider} />
      ))}

      <div
        className="w-full flex flex-row justify-center p-5 mb-10
          base-interaction
          outline-offset-[10px] outline-primary outline-4 outline-dashed 
        "
        onClick={onAdd}
        ref={setRef}
      >
        <AddIcon className="w-10 text-neutral-400" />
      </div>
    </div>
  );
});

export default SliderList;
