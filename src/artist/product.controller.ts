import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './storageConfig';
import { validate } from 'class-validator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // const errors = await validate(createProductDto, {
    //   whitelist: true,
    //   validationError: { target: false, value: false },
    // });

    // console.log('errors======', errors);
    // if (errors.length > 0) {
    //   throw errors;
    // }
    return this.productService.create(createProductDto, image);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      // res.status(HttpStatus.NOT_FOUND);
      // res.send('Product not found');
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id); // convert id to number
  }
}
