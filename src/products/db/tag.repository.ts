import { Injectable } from '@nestjs/common';
import { DataSource, Repository, In } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }
  findTagsByName(names: string[]): Promise<Tag[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
