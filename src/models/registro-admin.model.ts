import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class RegistroAdmin extends Entity {
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
  documento_admin: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_admin: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido_admin: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_admin: string;

  @property({
    type: 'string',
    required: true,
  })
  celular_admin: string;

  @property({
    type: 'string',
    required: false,
  })
  clave_admin: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];
  correo: any;

  constructor(data?: Partial<RegistroAdmin>) {
    super(data);
  }
}

export interface RegistroAdminRelations {
  // describe navigational properties here
}

export type RegistroAdminWithRelations = RegistroAdmin & RegistroAdminRelations;
