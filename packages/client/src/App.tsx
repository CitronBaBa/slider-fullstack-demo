import React from 'react';
import ToasterContext from './components/context/ToasterContext';
import { SliderEditor } from './components/slider/SliderEditor';
import SliderList from './components/slider/SliderList';

export const App = (): React.ReactElement => {
  return (
    <>
      <div className="flex flex-col w-full h-full bg-[#F4F4F4] px-8 mb-10 overflow-scroll">
        <SliderList />
      </div>
      <SliderEditor />
      <ToasterContext />
    </>
  );
};
