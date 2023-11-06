import { Slider, SliderItem } from '@fullstack-demo/domain';
import { makeAutoObservable } from 'mobx';
import { sliderStore } from '../SliderStore';

class UIStateStore {
  loading = false;
  editing = true;

  targetSliderId?: string;
  targetSlideIndex = 0;
  get targetSlider(): Slider | undefined {
    return sliderStore.sliders.find(s => s.id === this.targetSliderId);
  }
  get targetSlide(): SliderItem | undefined {
    return this.targetSlider?.data?.items?.[this.targetSlideIndex];
  }

  stopEditing(): void {
    this.editing = false;
    this.targetSliderId = undefined;
    this.targetSlideIndex = 0;
  }

  editSlider(id: string, index: number): void {
    this.editing = true;
    this.targetSliderId = id;
    this.targetSlideIndex = index;
  }

  saveSliderEdit = async (): Promise<void> => {
    if (this.targetSlider) {
      await sliderStore.updateDebounced(this.targetSlider.id);
    }
  };

  setTargetSlideIndex(v: number): void {
    this.targetSlideIndex = v;
  }

  setLoading(v: boolean): void {
    this.loading = v;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const uiStateStore = new UIStateStore();
