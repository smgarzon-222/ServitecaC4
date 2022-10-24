import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Servicio extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre_servicio: string;

  @property({
    type: 'number',
    required: true,
  })
  costo_servicio: number;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
