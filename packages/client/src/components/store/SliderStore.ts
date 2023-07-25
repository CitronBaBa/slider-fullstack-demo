import { Slider, SliderItem, SliderPartial } from '@fullstack-demo/domain';
import { makeAutoObservable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { fetchApi } from '~/api/apiCommon';
import { createOne, deleteOne, findAll, updateOne } from '~/api/componentApi';

class SliderStore {
  sliders: Slider[] = [];
  private updateDebounceTimer?: NodeJS.Timeout;

  async list() {
    try {
      const sliders = await findAll<Slider>('slider');
      runInAction(() => (this.sliders = sliders));
    } catch (e) {
      // potential fine-grained error dispaly beyond current toaster
      console.error(e);
    }
  }

  async create(dto: SliderPartial) {
    try {
      const result = await createOne<Slider>(dto);
      runInAction(() => this.sliders.push(result));
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  async updateDebounced(id: string) {
    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer);
    }

    this.updateDebounceTimer = setTimeout(async () => {
      const dto = this.sliders.find(s => s.id === id);
      try {
        const result = await updateOne<Slider>(id, dto);
        runInAction(() => {
          const i = this.sliders.findIndex(s => s.id === result.id);
          this.sliders[i] = result;
        });
      } catch (e) {
        console.error(e);
      }
    }, 500);
  }

  async delete(id: string) {
    try {
      await deleteOne(id);
      runInAction(() => {
        const i = this.sliders.findIndex(s => s.id === id);
        this.sliders.splice(i, 1);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async uploadBgImage(id: string, itemId: string, file: File) {
    try {
      const params = new URLSearchParams();
      params.append('id', id);
      params.append('itemId', itemId);
      const formData = new FormData();
      formData.append('file', file);
      const result = await fetchApi<Slider>({
        uri: `/component/slider/bgUpload?` + params.toString(),
        requestInit: {
          method: 'POST',
          headers: {},
          body: formData,
        },
      });
      runInAction(() => {
        const i = this.sliders.findIndex(s => s.id === result.id);
        this.sliders[i] = result;
      });
    } catch (e) {
      console.error(e);
    }
  }

  constructor() {
    makeAutoObservable(this);
    this.list();
  }
}

export function genEmptySlider(): SliderPartial {
  const slide: SliderItem = genEmptySlide();
  return {
    type: 'slider',
    schemaVersion: 'v0',
    data: { items: [slide] },
  };
}

export function genEmptySlide(): SliderItem {
  return {
    id: uuidv4(),
    title: '<Title>',
    description: '<Description>',
    buttonText: '<text>',
    backgroundImage: {
      name: '<placeholder>',
      link: demoImageUrl,
    },
  };
}

const demoImageUrl =
  'https://plus.unsplash.com/premium_photo-1668091148044-056cd744e64a?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMHNreXxlbnwwfHwwfHx8MA%3D%3D';

export const sliderStore = new SliderStore();
