import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Credenciales, RegistroAdmin } from '../models';
import { RegistroAdminRepository } from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

export class AdministradorController {
  constructor(
    @repository(RegistroAdminRepository)
    public registroAdminRepository: RegistroAdminRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/registro-admins')
  @response(200, {
    description: 'RegistroAdmin model instance',
    content: { 'application/json': { schema: getModelSchemaRef(RegistroAdmin) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, {
            title: 'NewRegistroAdmin',
            exclude: ['id'],
          }),
        },
      },
    })
    registroAdmin: Omit<RegistroAdmin, 'id'>,
  ): Promise<RegistroAdmin> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let cifrada = this.servicioAutenticacion.CifrarClave(clave);
    registroAdmin.clave_admin = cifrada;
    let p = await this.registroAdminRepository.create(registroAdmin);

    let destino = registroAdmin.correo_admin;
    let asunto = 'Registro en la plataforma';
    let contenido = `Hola ${registroAdmin.nombre_admin} ${registroAdmin.apellido_admin}, su registro en la plataforma se ha realizado exitosamente. Su usuario es: ${registroAdmin.correo_admin} y su contraseña es: ${clave}`;
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    return p;

  }

  @post('/administradors/identificar')
  @response(200, {
    description: 'Identificación de administrador'
  })
  async identificar(
    @requestBody() creds: Credenciales
  ) {
    let p = await this.servicioAutenticacion.IdentificarAdministrador(creds.usuario, creds.clave);

    if (p) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(p)
      return {
        datos: { nombre: p.nombre_admin, correo: p.correo_admin, id: p.id },
        tk: token
      }
    } else {
      throw new HttpErrors[401]('Datos invalidos');
    }





  }

  @get('/registro-admins/count')
  @response(200, {
    description: 'RegistroAdmin model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(RegistroAdmin) where?: Where<RegistroAdmin>,
  ): Promise<Count> {
    return this.registroAdminRepository.count(where);
  }

  @get('/registro-admins')
  @response(200, {
    description: 'Array of RegistroAdmin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroAdmin, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroAdmin) filter?: Filter<RegistroAdmin>,
  ): Promise<RegistroAdmin[]> {
    return this.registroAdminRepository.find(filter);
  }

  @patch('/registro-admins')
  @response(200, {
    description: 'RegistroAdmin PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, { partial: true }),
        },
      },
    })
    registroAdmin: RegistroAdmin,
    @param.where(RegistroAdmin) where?: Where<RegistroAdmin>,
  ): Promise<Count> {
    return this.registroAdminRepository.updateAll(registroAdmin, where);
  }

  @get('/registro-admins/{id}')
  @response(200, {
    description: 'RegistroAdmin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroAdmin, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroAdmin, { exclude: 'where' }) filter?: FilterExcludingWhere<RegistroAdmin>
  ): Promise<RegistroAdmin> {
    return this.registroAdminRepository.findById(id, filter);
  }

  @patch('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroAdmin, { partial: true }),
        },
      },
    })
    registroAdmin: RegistroAdmin,
  ): Promise<void> {
    await this.registroAdminRepository.updateById(id, registroAdmin);
  }

  @put('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroAdmin: RegistroAdmin,
  ): Promise<void> {
    await this.registroAdminRepository.replaceById(id, registroAdmin);
  }

  @del('/registro-admins/{id}')
  @response(204, {
    description: 'RegistroAdmin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroAdminRepository.deleteById(id);
  }
}
