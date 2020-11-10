import { stringify } from 'querystring'

export interface Mensaje{
    nombre: string;
    mensaje: string;
    fecha?: Number;
    uid?: string; 
    urlImg?: string;
}