import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import {
  CreateVideoReqDto,
  DownloadVideoReqDto,
  FindVideoReqDto,
} from './dto/req.dto';
import { VideoService } from './video.service';
import {
  ApiGetItemResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { IAuthUser } from 'src/common/types/global-types';
import { Public } from 'src/common/decorator/public.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { pageReqDto } from 'src/common/dto/req.dto';
import { PageResDto } from 'src/common/dto/res.dto';
import { Response } from 'express';

@ApiTags('Video')
@ApiExtraModels(CreateVideoResDto, FindVideoResDto, FindVideoReqDto)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiPostResponse(CreateVideoResDto)
  @Post('upload/v1')
  @UseInterceptors(FileInterceptor('video'))
  async uploadV1(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'mp4' })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() { title }: CreateVideoReqDto,
    @GetUser() user: IAuthUser,
  ): Promise<CreateVideoResDto> {
    const video = await this.videoService.create({ file, title, user });

    const response = CreateVideoResDto.toDto(video);

    return response;
  }

  @Public()
  @ApiGetItemResponse(FindVideoResDto)
  @SkipThrottle()
  @Get('')
  async findAllV1(
    @Query() data: pageReqDto,
  ): Promise<PageResDto<FindVideoResDto>> {
    const videos = await this.videoService.findAll(data);

    return {
      page: data.page,
      size: data.size,
      items: videos.map((v) => FindVideoResDto.toDto(v)),
    };
  }

  @Public()
  @ApiGetItemResponse(FindVideoResDto)
  @SkipThrottle()
  @Get(':id/v1')
  async findOneV1(@Query() { id }: FindVideoReqDto): Promise<FindVideoResDto> {
    const video = await this.videoService.findOne({ id });

    console.log(video);
    const response = FindVideoResDto.toDto(video);

    return response;
  }

  @ApiBearerAuth()
  @Get(':id/download/v1')
  async downloadV1(
    @Param() { id }: DownloadVideoReqDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { mimetype, stream, size } = await this.videoService.download({ id });

    res.set({
      'Content-Type': mimetype,
      'Content-Length': size,
      'Content-Disposition': 'attachment',
    });

    return new StreamableFile(stream);
  }
}
