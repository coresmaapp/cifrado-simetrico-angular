import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtenemos el valor de la 'key' desde un servicio, variable o cualquier fuente dinámica
  const dynamicKey = sessionStorage.getItem('key') || ''; // Ejemplo usando localStorage

  const headers = new HttpHeaders({
    'Content-Type': 'text/plain'
  });

  console.log('Headers:', headers);


  // Clonamos la solicitud original con los nuevos headers
  const reqWithHeader = req.clone({
    headers: headers.set('key',dynamicKey)
  });

  // Pasamos la solicitud modificada al siguiente handler
  return next(reqWithHeader);
};