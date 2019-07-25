import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './master-test.datasource.json';

export class MasterTestDataSource extends juggler.DataSource {
  static dataSourceName = 'master_test';

  constructor(
    @inject('datasources.config.master_test', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
