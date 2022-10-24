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
  Clientes,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioClientesController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Clientes belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async getClientes(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<Clientes> {
    return this.ventaServicioRepository.clientes(id);
  }
}
