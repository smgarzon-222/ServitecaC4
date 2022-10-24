import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Vehiculos extends Entity {
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
  placa_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  color_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo_vehiculo: string;

  @property({
    type: 'date',
    required: true,
  })
  ano_vehiculo: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Vehiculos>) {
    super(data);
  }
}

export interface VehiculosRelations {
  // describe navigational properties here
}

export type VehiculosWithRelations = Vehiculos & VehiculosRelations;
