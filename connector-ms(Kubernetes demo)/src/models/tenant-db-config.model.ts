import {model, property, Entity} from '@loopback/repository';
import {UserModifiableEntity} from './user-modifiable-entity.model';

@model({
  name: 'tenantDbConfig',
})
export class TenantDbConfig extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  tenant_key: string;

  @property({
    type: 'object',
    required: true,
  })
  db_config: object;

  // @property({
  //   type: 'date',
  //   default: () => new Date(),
  //   name: 'created_on',
  // })
  // createdOn?: Date;

  // @property({
  //   type: 'date',
  //   default: () => new Date(),
  //   name: 'modified_on',
  // })
  // modifiedOn?: Date;

  // @property({
  //   type: 'number',
  //   name: 'created_by',
  // })
  // createdBy?: number;

  // @property({
  //   type: 'number',
  //   name: 'modified_by',
  // })
  // modifiedBy?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TenantDbConfig>) {
    super(data);
  }
}

export interface TenantDbConfigRelations {
  // describe navigational properties here
}

export type TenantDbConfigWithRelations = TenantDbConfig &
  TenantDbConfigRelations;
