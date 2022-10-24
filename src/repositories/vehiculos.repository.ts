import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.id,
  VehiculosRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Vehiculos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
