import {DefaultCrudRepository} from '@loopback/repository';
import {Test, TestRelations} from '../models';
import {Test1DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.id,
  TestRelations
> {
  constructor(
    @inject('datasources.test1') dataSource: Test1DataSource,
  ) {
    super(Test, dataSource);
  }
}
