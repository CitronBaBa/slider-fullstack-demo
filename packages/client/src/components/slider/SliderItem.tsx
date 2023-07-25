import { SliderItem as SliderItemData } from '@fullstack-demo/domain';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import { SquircleMask } from '../common/Squircle';

export const SliderItem = observer(
  ({ slide }: { slide: SliderItemData }): ReactElement => {
    return (
      <SquircleMask cornerRadius={24} className="w-full h-full">
        <div
          className="w-full h-full bg-cover bg-center
        flex flex-col justify-center pl-10 md:pl-20 
        text-black font-sans
        gap-8 
      "
          style={{
            backgroundImage: `url('${slide.backgroundImage?.link || ''}')`,
          }}
        >
          <div className="text-[40px] leading-[48px] max-w-[408px] font-black">
            {slide.title}
          </div>
          <div className="text-[20px] leading-[24px] max-w-[600px]">
            {slide.description}
          </div>
          <SquircleMask cornerRadius={12} className="w-[200px] h-12 ">
            <button className="bg-black text-white normal-case rounded-none h-full w-full text-xl leading-[24.2px] ">
              {slide.buttonText}
            </button>
          </SquircleMask>
        </div>
      </SquircleMask>
    );
  }
);

export default SliderItem;
