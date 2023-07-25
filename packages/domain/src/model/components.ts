export type Duty = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  completedAt: Date | null;
  dueAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Component<T extends string, DataT> = {
  id: string;
  type: T;
  schemaVersion: string;
  data: DataT;

  createdAt: Date;
  updatedAt: Date;
};

export type GeneralComponent = Component<string, unknown>;
export type GeneralComponentPartial = Omit<
  GeneralComponent,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SliderImage = {
  name: string;
  link: string;
};

export type SliderItem = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: SliderImage;
};

export type Slider = Component<
  'slider',
  {
    items: SliderItem[];
  }
>;

export type SliderPartial = Omit<Slider, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ComponentType = Slider['type'];
