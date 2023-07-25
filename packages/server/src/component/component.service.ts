import {
  GeneralComponent,
  GeneralComponentPartial,
  Slider,
} from '@fullstack-demo/domain';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class ComponentService {
  constructor(private readonly prisma: PrismaService) {}

  findByType = async (type: string): Promise<GeneralComponent[]> => {
    return this.prisma.component.findMany({
      where: {
        type,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
  };

  create = async (dto: GeneralComponentPartial): Promise<GeneralComponent> => {
    // filter out system fields
    const { id, createdAt, updatedAt, ...fields } = dto;

    const result = await this.prisma.component.create({
      data: {
        ...fields,
        data: fields.data as Prisma.InputJsonValue,
      },
    });
    return result;
  };

  update = async (
    id: string,
    component: Partial<GeneralComponent>
  ): Promise<GeneralComponent> => {
    // filter out system fields
    const { createdAt, updatedAt, ...fields } = component;

    const result = await this.prisma.component.update({
      where: {
        id,
      },
      data: {
        ...fields,
        id,
        data: fields.data as Prisma.InputJsonValue,
      },
    });
    return result;
  };

  updateSliderBgImage = async (
    id: string,
    itemId: string,
    name: string,
    link: string
  ) => {
    return this.prisma.$transaction(async tx => {
      const component = await tx.component.findFirstOrThrow({ where: { id } });
      if (component.type !== 'slider' || component.data === null) {
        throw new Error('Unexpected component data');
      }
      const data = component.data as Slider['data'];
      const items = data.items;
      const targetItem = items.find(it => it.id === itemId);
      if (!targetItem) {
        throw new Error('Slider item not found');
      }
      targetItem.backgroundImage = {
        name,
        link,
      };

      return tx.component.update({
        where: { id },
        data: { ...component, data: component.data },
      });
    }) as Promise<Slider>;
  };

  delete = async (id: string): Promise<void> => {
    await this.prisma.component.delete({
      where: { id },
    });
  };
}
