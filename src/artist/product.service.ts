import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image?: Express.Multer.File,
  ) {
    return await this.productsRepository.save({
      ...createProductDto,
      image: image?.filename || '',
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: { category: true } });
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  update(id: number, product: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
