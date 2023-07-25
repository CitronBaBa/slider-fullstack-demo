import {
  GeneralComponent,
  GeneralComponentPartial,
  Slider,
} from '@fullstack-demo/domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserErrorException } from '~/util/util.exception';
import { ComponentService } from './component.service';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Get('/list')
  async findAll(@Query('type') type: string): Promise<GeneralComponent[]> {
    return this.componentService.findByType(type);
  }

  @Post('/add')
  async create(
    @Body() dto: GeneralComponentPartial
  ): Promise<GeneralComponent> {
    return this.componentService.create(dto);
  }

  @Put('/update/:id')
  async upsert(
    @Param('id') id: string,
    @Body() updateDutyDto: Partial<GeneralComponent>
  ): Promise<GeneralComponent> {
    return this.componentService.update(id, updateDutyDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.componentService.delete(id);
  }

  @Post('/slider/bgUpload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
      preservePath: true,
    })
  )
  // TODO: upload & serve file from cloud object storage
  async uploadSliderBgImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 20 * 1024 * 1024,
        })
        .build({
          exceptionFactory: msg => {
            return new UserErrorException({
              message: msg,
              hint: 'Background image upload failed: ' + msg,
              bizCode: 'BG_IMAGE_UPLOAD',
            });
          },
        })
    )
    file: Express.Multer.File,
    @Query('id') id: string,
    @Query('itemId') itemId: string,
    @Req() request: Request
  ): Promise<Slider> {
    return this.componentService.updateSliderBgImage(
      id,
      itemId,
      file.originalname,
      `${request.protocol}://${request.get('host')}/${file.path}`
    );
  }
}
