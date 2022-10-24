import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RegistroAdmin, RegistroAdminRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class RegistroAdminRepository extends DefaultCrudRepository<
  RegistroAdmin,
  typeof RegistroAdmin.prototype.id,
  RegistroAdminRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof RegistroAdmin.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(RegistroAdmin, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
