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
  RegistroAdmin,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioRegistroAdminController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/registro-admin', {
    responses: {
      '200': {
        description: 'RegistroAdmin belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroAdmin)},
          },
        },
      },
    },
  })
  async getRegistroAdmin(
    @param.path.string('id') id: typeof VentaServicio.prototype.id,
  ): Promise<RegistroAdmin> {
    return this.ventaServicioRepository.registroAdmin(id);
  }
}
