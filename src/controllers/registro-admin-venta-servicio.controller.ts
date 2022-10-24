import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  RegistroAdmin,
  VentaServicio,
} from '../models';
import {RegistroAdminRepository} from '../repositories';

export class RegistroAdminVentaServicioController {
  constructor(
    @repository(RegistroAdminRepository) protected registroAdminRepository: RegistroAdminRepository,
  ) { }

  @get('/registro-admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of RegistroAdmin has many VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VentaServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VentaServicio>,
  ): Promise<VentaServicio[]> {
    return this.registroAdminRepository.ventaServicios(id).find(filter);
  }

  @post('/registro-admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'RegistroAdmin model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof RegistroAdmin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInRegistroAdmin',
            exclude: ['id'],
            optional: ['registroAdminId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.registroAdminRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/registro-admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'RegistroAdmin.VentaServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {partial: true}),
        },
      },
    })
    ventaServicio: Partial<VentaServicio>,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.registroAdminRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/registro-admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'RegistroAdmin.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.registroAdminRepository.ventaServicios(id).delete(where);
  }
}
