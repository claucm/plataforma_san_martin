# Research Web - Angular 19 Frontend

Este proyecto Angular se conecta con la API backend en Spring Boot 3.5 para proveer la interfaz de usuario del sistema de investigación.

## Estructura de Autenticación

El sistema usa autenticación entre componentes para asegurar la comunicación entre el frontend y el backend.

### Autenticación API

- **URL**: https://localhost:8080/api/authenticate
- **Método**: POST
- **Body**: `{ "password": "Fu5Mr3sE4rcH!" }`
- **Respuesta**:
  ```json
  {
    "status": true,
    "data": {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcHAiLCJpYXQiOjE3NDQ4Mzg4ODksImV4cCI6MTc0NDgzOTE4OX0.0zMTsfZehCt6oFusgkcln7gqzUWYGw_1QhB8ucU3SHFYzJu2_XIFium4Pk7wjwUJFs12L0qSBwXlSgc9TfgGmw"
    },
    "statusCode": 200
  }
  ```

El sistema guarda automáticamente el token y lo utiliza en todas las peticiones posteriores añadiéndolo en el header `Authorization: Bearer <token>`.

## Servicios API

Todos los servicios de API siguen una estructura común y estándar:

1. Respuesta estándar:
```json
{
  "status": true, // true o false, dependiendo si la petición generó error
  "data": {
    // Objeto de la respuesta de la petición
  },
  "statusCode": 200 // Código de estado HTTP del resultado de la petición
}
```

2. Estructura de servicios:
   - Todos extienden de `BaseService<T>` que contiene métodos CRUD genéricos
   - Autenticación automática en cada servicio
   - Manejo estandarizado de errores

3. Cada solicitud se realiza con el token de autenticación en el header `Authorization`

# angular19admin
Angular 19 Admin Dashboard Template Free using Bootstrap 5<br>
[Live Demo
](https://therichpost.com/angular-19-admin-dashboard-template-free-using-bootstrap-5/)
<br>

Please run below commands<br>

**npm install**

**ng serve**
