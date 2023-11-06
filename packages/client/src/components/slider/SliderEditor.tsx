import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';
import { sliderStore } from '../store/SliderStore';
import { uiStateStore } from '../store/UI/UIStateStore';
import SlidesControl from './SliderEditorControl';

export const SliderEditor = observer((): ReactElement => {
  const { targetSlider, targetSlide, editing, saveSliderEdit } = uiStateStore;

  if (!editing || !targetSlider || !targetSlide) {
    return <></>;
  }

  const onEdit = () => {
    saveSliderEdit();
  };

  const onFileChoosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sliderStore.uploadBgImage(targetSlider.id, targetSlide.id, file);
    }
    e.target.value = '';
  };

  const onCancel = (): void => {
    uiStateStore.stopEditing();
  };

  const onDelete = (): void => {
    sliderStore.delete(targetSlider.id);
  };

  return (
    <div
      className="
        absolute left-0 right-0 bottom-0 
        md:right-0 md:top-0 md:left-[auto] md:bottom-[auto] md:h-screen
        pl-6 pr-8 py-4 bg-base-100 shadow-xl-pan
        rounded-3xl md:rounded-xl
        animate__animated animate__fadeInRight animate__faster
    "
    >
      <div className="flex flex-col justify-between h-full gap-10">
        <div className="flex flex-col gap-4">
          <SlidesControl />
          <div className="flex flex-col gap-5">
            <div>
              <label className="label label-text" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={targetSlide.title}
                onChange={e => {
                  runInAction(() => {
                    targetSlide.title = e.target.value;
                    onEdit();
                  });
                }}
                className={`input input-bordered input-sm w-full`}
              />
            </div>
            <div>
              <label className="label label-text" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={targetSlide.description}
                onChange={e => {
                  runInAction(() => {
                    targetSlide.description = e.target.value;
                    onEdit();
                  });
                }}
                className={`input input-bordered input-primary input-md w-full`}
              />
            </div>
            <div>
              <label className="label label-text" htmlFor="buttonText">
                Button Text
              </label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                value={targetSlide.buttonText}
                onChange={e => {
                  runInAction(() => {
                    targetSlide.buttonText = e.target.value;
                    onEdit();
                  });
                }}
                className={`input input-bordered input-secondary input-md `}
              />
            </div>
            <form
              className=" w-full max-w-xs"
              onSubmit={e => e.preventDefault()}
            >
              <label className="label label-text">
                Background Image: {targetSlide.backgroundImage.name}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={onFileChoosen}
                id="backgroundImage"
                name="backgroundImage"
                className="file-input file-input-bordered file-input-secondary file-input-sm max-w-xs"
              />
            </form>
          </div>
        </div>

        <div className="flex flex-col  gap-2 justify-end ">
          <button
            className="btn btn-primary btn-outline flex-grow"
            onClick={onDelete}
          >
            Delete
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
