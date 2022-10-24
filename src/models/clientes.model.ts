import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Clientes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  identificacion_cliente: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_cliente: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono_cliente: number;

  @property({
    type: 'string',
    required: true,
  })
  email_cliente: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
