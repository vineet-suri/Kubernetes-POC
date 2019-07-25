import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './master.datasource.json';

export class MasterDataSource extends juggler.DataSource {
  static dataSourceName = 'master';

  constructor(
    @inject('datasources.config.master', {optional: true})
    dsConfig: object = config,
  ) {
    // Object.assign(dsConfig, {
    //   host: process.env.DB_HOST,
    //   port: process.env.DB_PORT,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   schema: process.env.DB_SCHEMA,
    // });
    super(dsConfig);
  }
}
