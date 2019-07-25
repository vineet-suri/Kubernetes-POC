import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './test1.datasource.json';

export class Test1DataSource extends juggler.DataSource {
  static dataSourceName = 'test1';

  constructor(
    @inject('datasources.config.test1', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
