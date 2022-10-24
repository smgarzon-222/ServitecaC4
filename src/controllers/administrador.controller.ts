import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroAdmin} from '../models';
import {RegistroAdminRepository} from '../repositories';

export class AdministradorController {
  constructor(
    @repository(RegistroAdminRepository)
    public registroAdminRepository : RegistroAdminRepository,
  ) {}

  @post('/registro-admins')
  @response(200, {
    description: 'RegistroAdmin model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroAdmin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, {
            title: 'NewRegistroAdmin',
            exclude: ['id'],
          }),
        },
      },
    })
    registroAdmin: Omit<RegistroAdmin, 'id'>,
  ): Promise<RegistroAdmin> {
    return this.registroAdminRepository.create(registroAdmin);
  }

  @get('/registro-admins/count')
  @response(200, {
    description: 'RegistroAdmin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroAdmin) where?: Where<RegistroAdmin>,
  ): Promise<Count> {
    return this.registroAdminRepository.count(where);
  }

  @get('/registro-admins')
  @response(200, {
    description: 'Array of RegistroAdmin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroAdmin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroAdmin) filter?: Filter<RegistroAdmin>,
  ): Promise<RegistroAdmin[]> {
    return this.registroAdminRepository.find(filter);
  }

  @patch('/registro-admins')
  @response(200, {
    description: 'RegistroAdmin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, {partial: true}),
        },
      },
    })
    registroAdmin: RegistroAdmin,
    @param.where(RegistroAdmin) where?: Where<RegistroAdmin>,
  ): Promise<Count> {
    return this.registroAdminRepository.updateAll(registroAdmin, where);
  }

  @get('/registro-admins/{id}')
  @response(200, {
    description: 'RegistroAdmin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroAdmin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroAdmin, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroAdmin>
  ): Promise<RegistroAdmin> {
    return this.registroAdminRepository.findById(id, filter);
  }

  @patch('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, {partial: true}),
        },
      },
    })
    registroAdmin: RegistroAdmin,
  ): Promise<void> {
    await this.registroAdminRepository.updateById(id, registroAdmin);
  }

  @put('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroAdmin: RegistroAdmin,
  ): Promise<void> {
    await this.registroAdminRepository.replaceById(id, registroAdmin);
  }

  @del('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroAdminRepository.deleteById(id);
  }
}
