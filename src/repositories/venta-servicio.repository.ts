import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VentaServicio, VentaServicioRelations, Servicio, Clientes, Vehiculos, RegistroAdmin} from '../models';
import {ServicioRepository} from './servicio.repository';
import {ClientesRepository} from './clientes.repository';
import {VehiculosRepository} from './vehiculos.repository';
import {RegistroAdminRepository} from './registro-admin.repository';

export class VentaServicioRepository extends DefaultCrudRepository<
  VentaServicio,
  typeof VentaServicio.prototype.id,
  VentaServicioRelations
> {

  public readonly servicio: BelongsToAccessor<Servicio, typeof VentaServicio.prototype.id>;

  public readonly clientes: BelongsToAccessor<Clientes, typeof VentaServicio.prototype.id>;

  public readonly vehiculos: BelongsToAccessor<Vehiculos, typeof VentaServicio.prototype.id>;

  public readonly registroAdmin: BelongsToAccessor<RegistroAdmin, typeof VentaServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>, @repository.getter('RegistroAdminRepository') protected registroAdminRepositoryGetter: Getter<RegistroAdminRepository>,
  ) {
    super(VentaServicio, dataSource);
    this.registroAdmin = this.createBelongsToAccessorFor('registroAdmin', registroAdminRepositoryGetter,);
    this.registerInclusionResolver('registroAdmin', this.registroAdmin.inclusionResolver);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.clientes = this.createBelongsToAccessorFor('clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
  }
}
