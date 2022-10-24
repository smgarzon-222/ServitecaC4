import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VentaServicio,
  Vehiculos,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioVehiculosController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculos belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async getVehiculos(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<Vehiculos> {
    return this.ventaServicioRepository.vehiculos(id);
  }
}
