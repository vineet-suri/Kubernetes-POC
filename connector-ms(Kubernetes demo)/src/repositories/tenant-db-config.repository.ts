import {TenantDbConfig, TenantDbConfigRelations} from '../models';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import {MasterTestDataSource} from '../datasources';
import { Getter, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { IAuthUser, AuthenticationBindings } from 'loopback4-authentication';

export class TenantDbConfigRepository extends DefaultCrudRepository<
  TenantDbConfig,
  typeof TenantDbConfig.prototype.id,
  TenantDbConfigRelations
> {
  constructor(
    @inject('datasources.master_test') dataSource: MasterTestDataSource,

  ) {
    super(TenantDbConfig, dataSource);
  }
}
