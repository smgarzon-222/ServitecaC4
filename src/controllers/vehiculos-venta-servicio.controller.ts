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
  Vehiculos,
  VentaServicio,
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosVentaServicioController {
  constructor(
    @repository(VehiculosRepository) protected vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Vehiculos has many VentaServicio',
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
    return this.vehiculosRepository.ventaServicios(id).find(filter);
  }

  @post('/vehiculos/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Vehiculos model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInVehiculos',
            exclude: ['id'],
            optional: ['vehiculosId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'id'>,
  ): Promise<VentaServicio> {
    return this.vehiculosRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/vehiculos/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Vehiculos.VentaServicio PATCH success count',
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
    return this.vehiculosRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/vehiculos/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Vehiculos.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.vehiculosRepository.ventaServicios(id).delete(where);
  }
}
