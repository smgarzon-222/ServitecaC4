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
  Clientes,
  VentaServicio,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesVentaServicioController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Clientes has many VentaServicio',
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
    return this.clientesRepository.ventaServicios(id).find(filter);
  }

  @post('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInClientes',
            exclude: ['id'],
            optional: ['clientesId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.clientesRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Clientes.VentaServicio PATCH success count',
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
    return this.clientesRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/clientes/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Clientes.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.clientesRepository.ventaServicios(id).delete(where);
  }
}
