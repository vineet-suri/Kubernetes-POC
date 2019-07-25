import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TenantDbConfig} from '../models';
import {TenantDbConfigRepository} from '../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';

export class TenantdbconfigController {
  constructor(
    @repository(TenantDbConfigRepository)
    public tenantDbConfigRepository: TenantDbConfigRepository,
  ) {}

  @post('/tenant-db-configs', {
    responses: {
      '200': {
        description: 'TenantDbConfig model instance',
        content: {'application/json': {schema: {'x-ts-type': TenantDbConfig}}},
      },
    },
  })
  async create(
    @requestBody() tenantDbConfig: TenantDbConfig,
  ): Promise<TenantDbConfig> {
    return await this.tenantDbConfigRepository.create(tenantDbConfig);
  }

  @get('/tenant-db-configs/count', {
    responses: {
      '200': {
        description: 'TenantDbConfig model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TenantDbConfig))
    where?: Where<TenantDbConfig>,
  ): Promise<Count> {
    return await this.tenantDbConfigRepository.count(where);
  }

  @get('/tenant-db-configs', {
    responses: {
      '200': {
        description: 'Array of TenantDbConfig model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TenantDbConfig}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TenantDbConfig))
    filter?: Filter<TenantDbConfig>,
  ): Promise<TenantDbConfig[]> {
    return await this.tenantDbConfigRepository.find({
      fields: {dbConfig: false},
    });
  }

  @get('/tenant-db-configs-only', {
    responses: {
      '200': {
        description: 'Array of TenantDbConfig model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TenantDbConfig}},
          },
        },
      },
    },
  })
  async findDbConfigs(
    @param.query.object('filter', getFilterSchemaFor(TenantDbConfig))
    filter?: Filter<TenantDbConfig>,
  ): Promise<TenantDbConfig[]> {
    return await this.tenantDbConfigRepository.find({fields: {dbConfig: true}});
  }

  @patch('/tenant-db-configs', {
    responses: {
      '200': {
        description: 'TenantDbConfig PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenantDbConfig, {partial: true}),
        },
      },
    })
    tenantDbConfig: TenantDbConfig,
    @param.query.object('where', getWhereSchemaFor(TenantDbConfig))
    where?: Where<TenantDbConfig>,
  ): Promise<Count> {
    return await this.tenantDbConfigRepository.updateAll(tenantDbConfig, where);
  }

  @get('/tenant-db-configs/{id}', {
    responses: {
      '200': {
        description: 'TenantDbConfig model instance',
        content: {'application/json': {schema: {'x-ts-type': TenantDbConfig}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TenantDbConfig> {
    return await this.tenantDbConfigRepository.findById(id);
  }

  @patch('/tenant-db-configs/{id}', {
    responses: {
      '204': {
        description: 'TenantDbConfig PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenantDbConfig, {partial: true}),
        },
      },
    })
    tenantDbConfig: TenantDbConfig,
  ): Promise<void> {
    await this.tenantDbConfigRepository.updateById(id, tenantDbConfig);
  }

  @put('/tenant-db-configs/{id}', {
    responses: {
      '204': {
        description: 'TenantDbConfig PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tenantDbConfig: TenantDbConfig,
  ): Promise<void> {
    await this.tenantDbConfigRepository.replaceById(id, tenantDbConfig);
  }

  @del('/tenant-db-configs/{id}', {
    responses: {
      '204': {
        description: 'TenantDbConfig DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tenantDbConfigRepository.deleteById(id);
  }
}
