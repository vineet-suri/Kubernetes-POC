import {SoftCrudRepository} from 'loopback4-soft-delete';

import {UserModifiableEntity} from '../models/user-modifiable-entity.model';
import {DataObject, Getter, Where, Count} from '@loopback/repository';
import {Options} from 'loopback-datasource-juggler';
import {MasterDataSource} from '../datasources';
import {HttpErrors} from '@loopback/rest';
import {AuthErrorKeys, IAuthUser} from 'loopback4-authentication';

export abstract class DefaultUserModifyCrudRepository<
  T extends UserModifiableEntity,
  ID,
  Relations extends object = {}
> extends SoftCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof UserModifiableEntity & {
      prototype: T;
    },
    dataSource: MasterDataSource,
    protected readonly getCurrentUser: Getter<IAuthUser | undefined>,
  ) {
    super(entityClass, dataSource);
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    entity.createdBy = currentUser.id as number;
    entity.modifiedBy = currentUser.id as number;
    return super.create(entity, options);
  }

  async createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    entities.forEach(entity => {
      entity.createdBy = (currentUser ? currentUser.id : 0) as number;
      entity.modifiedBy = (currentUser ? currentUser.id : 0) as number;
    });
    return super.createAll(entities, options);
  }

  async save(entity: T, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    entity.modifiedBy = currentUser.id as number;
    return super.save(entity, options);
  }

  async update(entity: T, options?: Options): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    entity.modifiedBy = currentUser.id as number;
    return super.update(entity, options);
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id as number;
    return super.updateAll(data, where, options);
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id as number;
    return super.updateById(id, data, options);
  }
  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    data.modifiedBy = currentUser.id as number;
    return super.replaceById(id, data, options);
  }
}
