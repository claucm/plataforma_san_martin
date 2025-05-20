# Manual de Servicios API para Research Web

## Introducción

Este manual documenta la arquitectura de servicios implementada para la comunicación entre el frontend Angular (research-web) y el backend Spring Boot (research-api). La arquitectura sigue un diseño orientado a objetos con herencia, facilitando el mantenimiento y la escalabilidad.

## Estructura General

### 1. Autenticación entre Componentes

El sistema utiliza un mecanismo de autenticación basado en token JWT para la comunicación entre componentes frontend y backend:

```
Frontend (research-web) <--[JWT Token]--> Backend (research-api)
```

#### ApiAuthService

Ubicación: `src/app/services/api-auth.service.ts`

Este servicio maneja la autenticación entre componentes, obteniendo y almacenando el token JWT.

```typescript
// Autenticación básica
this.apiAuthService.authenticate().subscribe({
  next: (response) => {
    console.log('Autenticado correctamente');
  },
  error: (error) => {
    console.error('Error de autenticación', error);
  }
});

// Verificación de autenticación
if (this.apiAuthService.isAuthenticated()) {
  // El usuario está autenticado
}
```

### 2. Estructura de Respuestas API

Todas las respuestas del API siguen un formato estándar:

```typescript
interface ApiResponse<T> {
  status: boolean;    // Estado de la operación (true: éxito, false: error)
  data: T;            // Datos de la respuesta
  statusCode: number; // Código HTTP de la respuesta
}
```

Esto permite un manejo uniforme de respuestas y errores en toda la aplicación.

### 3. Servicios Base y Herencia

#### BaseService

Ubicación: `src/app/services/base.service.ts`

Clase abstracta que proporciona funcionalidad CRUD común para todos los servicios. Todos los servicios específicos extienden de esta clase base.

Características principales:
- Autenticación automática antes de cada solicitud
- Manejo estándar de respuestas
- Métodos CRUD genéricos

```typescript
export abstract class BaseService<T> {
  // Debe ser implementado por las clases hijas
  protected abstract endpoint: string;
  
  // Métodos CRUD genéricos
  getAll(): Observable<ApiResponse<T[]>>
  getById(id: number): Observable<ApiResponse<T>>
  create(item: T): Observable<ApiResponse<T>>
  update(id: number, item: T): Observable<ApiResponse<T>>
  delete(id: number): Observable<ApiResponse<void>>
}
```

### 4. Servicios Específicos

Todos los servicios específicos heredan del `BaseService` y simplemente definen su endpoint:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  protected override endpoint = 'users';
}
```

Lista de servicios implementados:
- UserService
- RoleService
- PermissionService
- ProjectService
- ProjectStatusService
- ProjectTypeService
- ResearchGroupService
- ResearchSeedbedService
- FacultyService
- ProgramService
- ModuleService
- SubmoduleService
- FunctionalityService
- CampusService
- CostCenterService
- ProjectProductService
- BudgetService
- BudgetStatusService
- BudgetExecutionService
- KnowledgeAreasService
- ExtensionBeneficiaryService
- InformationSystemService

### 5. Interceptor HTTP

Ubicación: `src/app/interceptors/auth.interceptor.ts`

Este interceptor añade automáticamente el token JWT a todas las solicitudes HTTP salientes (excepto a la solicitud de autenticación).

## Guía de Uso

### Cómo Utilizar los Servicios en Componentes

#### 1. Inyectar el Servicio

```typescript
constructor(private userService: UserService) {}
```

#### 2. Operaciones CRUD Básicas

**Obtener todos los registros:**
```typescript
this.userService.getAll().subscribe({
  next: (response) => {
    if (response.status) {
      const users = response.data;
      console.log('Usuarios obtenidos:', users);
    } else {
      console.error('Error al obtener usuarios:', response.statusCode);
    }
  },
  error: (error) => {
    console.error('Error en la solicitud:', error);
  }
});
```

**Obtener un registro por ID:**
```typescript
this.userService.getById(1).subscribe({
  next: (response) => {
    if (response.status) {
      const user = response.data;
      console.log('Usuario obtenido:', user);
    } else {
      console.error('Error al obtener usuario:', response.statusCode);
    }
  }
});
```

**Crear un nuevo registro:**
```typescript
const newUser: User = {
  first_name: 'Juan',
  lastname: 'Pérez',
  email: 'juan.perez@example.com'
};

this.userService.create(newUser).subscribe({
  next: (response) => {
    if (response.status) {
      console.log('Usuario creado:', response.data);
    } else {
      console.error('Error al crear usuario:', response.statusCode);
    }
  }
});
```

**Actualizar un registro existente:**
```typescript
const updatedUser: User = {
  first_name: 'Juan',
  lastname: 'González',
  email: 'juan.gonzalez@example.com'
};

this.userService.update(1, updatedUser).subscribe({
  next: (response) => {
    if (response.status) {
      console.log('Usuario actualizado:', response.data);
    } else {
      console.error('Error al actualizar usuario:', response.statusCode);
    }
  }
});
```

**Eliminar un registro:**
```typescript
this.userService.delete(1).subscribe({
  next: (response) => {
    if (response.status) {
      console.log('Usuario eliminado correctamente');
    } else {
      console.error('Error al eliminar usuario:', response.statusCode);
    }
  }
});
```

### Consideraciones Importantes

1. **Autenticación Automática**: No es necesario preocuparse por la autenticación, el sistema la maneja automáticamente.

2. **Manejo de Errores**: Siempre verificar el campo `status` de la respuesta para determinar si la operación fue exitosa.

3. **Tipos Genéricos**: Los servicios utilizan tipos genéricos para asegurar la consistencia de datos.

4. **Formato de Respuestas**: Todas las respuestas siguen el formato `ApiResponse<T>`.

## Diagrama de Arquitectura

```
┌─────────────────┐
│  Componentes    │
│    Angular      │
└───────┬─────────┘
        │
        │ (Inyección de Dependencias)
        ▼
┌─────────────────┐          ┌─────────────────┐
│   Servicios     │          │  ApiAuthService │
│  Específicos    │◄─────────┤                 │
│ (UserService,   │          │ (Autenticación) │
│ ProjectService, │          └─────────────────┘
│     etc.)       │
└───────┬─────────┘
        │ (Herencia)
        │
        ▼
┌─────────────────┐
│  BaseService<T> │
│                 │
│ (Funcionalidad  │
│  CRUD genérica) │
└───────┬─────────┘
        │
        │ (HTTP Requests)
        ▼
┌─────────────────┐
│ AuthInterceptor │
│                 │
│ (Añade token a  │
│  las peticiones)│
└───────┬─────────┘
        │
        │
        ▼
┌─────────────────┐
│  Backend API    │
│  (Spring Boot)  │
└─────────────────┘
```

## Diferencias con la Autenticación de Usuario

Es importante no confundir el sistema de autenticación entre componentes (`ApiAuthService`) con el sistema de autenticación de usuarios (`AuthService`). 

- **ApiAuthService**: Maneja la comunicación entre el frontend y el backend
- **AuthService**: Maneja la autenticación de usuarios finales (login con Google)

## Conclusión

Esta arquitectura de servicios proporciona una forma estandarizada, mantenible y escalable de comunicarse con el backend. Al seguir este patrón, se asegura que todas las solicitudes HTTP cumplan con el formato esperado por el backend y se manejen de manera uniforme en el frontend. 