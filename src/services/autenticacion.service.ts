import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import {RegistroAdminRepository} from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
      @repository(RegistroAdminRepository)
      public registroadminRepository: RegistroAdminRepository



  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
    }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
    }

    IdentificarAdministrador(usuario: string, clave: string) {
      try {
        let p = this.registroadminRepository.findOne({
          where: {
            correo_admin: usuario,
            clave_admin: clave
          }
        });
        if (p) {
          return p;
        }
        return false;
      } catch {
        return false;
      }
    }





}
