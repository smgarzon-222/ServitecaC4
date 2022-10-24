import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Servicio} from './servicio.model';
import {Clientes} from './clientes.model';
import {Vehiculos} from './vehiculos.model';
import {RegistroAdmin} from './registro-admin.model';

@model()
export class VentaServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_servicio: string;

  @property({
    type: 'number',
    required: true,
  })
  identificacion_cliente: number;

  @property({
    type: 'string',
    required: true,
  })
  placa_vehiculo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_servicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valor_servicio: number;

  @belongsTo(() => Servicio)
  servicioId: string;

  @belongsTo(() => Clientes)
  clientesId: string;

  @belongsTo(() => Vehiculos)
  vehiculosId: string;

  @belongsTo(() => RegistroAdmin)
  registroAdminId: string;

  constructor(data?: Partial<VentaServicio>) {
    super(data);
  }
}

export interface VentaServicioRelations {
  // describe navigational properties here
}

export type VentaServicioWithRelations = VentaServicio & VentaServicioRelations;
