# Guía de Integración Frontend - API ASEFAL

## 📋 Información General

**Base URL Producción:** `https://asefal-back-production.up.railway.app`
**Base URL Local:** `http://localhost:4000`

**Formato de Respuesta:**
```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { ... }
}
```

**Formato de Error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos"
}
```

---

## 🔗 Endpoints Disponibles

### 1. Health Check & Info

#### `GET /`
Información general de la API
```javascript
fetch('https://asefal-back-production.up.railway.app/')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Respuesta:**
```json
{
  "message": "API ASEFAL funcionando",
  "version": "1.0.0",
  "description": "Sistema de Gestión de Torneos de Fútbol",
  "endpoints": { ... }
}
```

#### `GET /api/health`
Verificar estado del servidor
```javascript
fetch('https://asefal-back-production.up.railway.app/api/health')
```

**Respuesta:**
```json
{
  "success": true,
  "message": "API ASEFAL funcionando correctamente",
  "timestamp": "2026-01-02T22:00:00.000Z",
  "endpoints": { ... }
}
```

---

### 2. Autenticación

#### `POST /api/auth/login`
Iniciar sesión con email y contraseña

**Cuerpo de la petición:**
```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

**Ejemplo:**
```javascript
const login = async (email, password) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();

  if (data.success) {
    // Guardar token en localStorage o cookie
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.usuario));
  }

  return data;
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "nombre_completo": "Administrador",
      "email": "admin@test.com",
      "activo": true,
      "rol": {
        "id": 1,
        "nombre": "ADMIN",
        "descripcion": "Super Administrador"
      }
    }
  }
}
```

**Errores posibles:**
- `400` - Email o password no proporcionados
- `401` - Credenciales inválidas
- `403` - Usuario inactivo

#### `POST /api/auth/register`
Registrar un nuevo usuario

**Cuerpo de la petición:**
```json
{
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol_id": 2
}
```

**Ejemplo:**
```javascript
const register = async (userData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();

  if (data.success) {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.usuario));
  }

  return data;
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 2,
      "nombre_completo": "Juan Pérez",
      "email": "juan@example.com",
      "activo": true,
      "rol": {
        "id": 2,
        "nombre": "DELEGADO",
        "descripcion": "Representante del Club"
      }
    }
  }
}
```

**Errores posibles:**
- `400` - Campos requeridos faltantes o rol inválido
- `409` - Email ya registrado

#### `GET /api/auth/profile`
Obtener perfil del usuario autenticado (requiere token)

**Ejemplo:**
```javascript
const getProfile = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('https://asefal-back-production.up.railway.app/api/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre_completo": "Administrador",
    "email": "admin@test.com",
    "rol_id": 1,
    "activo": true,
    "created_at": "2026-01-02T00:00:00.000Z",
    "rol": {
      "id": 1,
      "nombre": "ADMIN",
      "descripcion": "Super Administrador"
    }
  }
}
```

**Errores posibles:**
- `401` - Token no proporcionado
- `403` - Token inválido o expirado

---

### 3. Roles

#### `GET /api/roles`
Obtener todos los roles del sistema

**Ejemplo:**
```javascript
const getRoles = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/roles');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "ADMIN",
      "descripcion": "Super Administrador",
      "usuarios": [...]
    },
    {
      "id": 2,
      "nombre": "DELEGADO",
      "descripcion": "Representante del Club"
    },
    {
      "id": 3,
      "nombre": "PLANILLERO",
      "descripcion": "Encargado de registrar estadísticas en campo"
    }
  ]
}
```

#### `GET /api/roles/:id`
Obtener un rol específico

**Ejemplo:**
```javascript
const getRolById = async (id) => {
  const response = await fetch(`https://asefal-back-production.up.railway.app/api/roles/${id}`);
  const data = await response.json();
  return data.data;
}
```

---

### 4. Usuarios

#### `GET /api/usuarios`
Listar todos los usuarios (sin contraseñas)

**Ejemplo:**
```javascript
const getUsuarios = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/usuarios');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre_completo": "Juan Pérez",
      "email": "juan@example.com",
      "rol_id": 1,
      "activo": true,
      "created_at": "2026-01-02T00:00:00.000Z",
      "rol": {
        "id": 1,
        "nombre": "ADMIN"
      }
    }
  ]
}
```

#### `GET /api/usuarios/:id`
Obtener un usuario específico

**Ejemplo:**
```javascript
const getUsuarioById = async (id) => {
  const response = await fetch(`https://asefal-back-production.up.railway.app/api/usuarios/${id}`);
  const data = await response.json();
  return data.data;
}
```

#### `POST /api/usuarios`
Crear un nuevo usuario

**Cuerpo de la petición:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "ADMIN"
}
```

**Ejemplo:**
```javascript
const createUsuario = async (usuarioData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioData)
  });
  const data = await response.json();
  return data;
}
```

#### `PUT /api/usuarios/:id`
Actualizar un usuario

**Ejemplo:**
```javascript
const updateUsuario = async (id, updates) => {
  const response = await fetch(`https://asefal-back-production.up.railway.app/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return await response.json();
}
```

#### `DELETE /api/usuarios/:id`
Eliminar un usuario

**Ejemplo:**
```javascript
const deleteUsuario = async (id) => {
  const response = await fetch(`https://asefal-back-production.up.railway.app/api/usuarios/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
}
```

---

### 5. Torneos

#### `GET /api/torneos`
Listar todos los torneos con sus categorías

**Ejemplo:**
```javascript
const getTorneos = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/torneos');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Copa ASEFAL 2026",
      "fecha_inicio": "2026-01-15",
      "fecha_fin": "2026-03-30",
      "estado": "EN_JUEGO",
      "categorias": [
        {
          "id": 1,
          "nombre": "Categoría 2010",
          "ano_nacimiento_limite": 2010,
          "torneo_id": 1
        }
      ]
    }
  ]
}
```

**Estados posibles:**
- `CREADO` - Torneo creado pero no iniciado
- `EN_JUEGO` - Torneo en curso
- `FINALIZADO` - Torneo terminado

#### `GET /api/torneos/:id`
Obtener un torneo específico con sus categorías

#### `POST /api/torneos`
Crear un nuevo torneo

**Cuerpo de la petición:**
```json
{
  "nombre": "Copa ASEFAL 2026",
  "fecha_inicio": "2026-01-15",
  "fecha_fin": "2026-03-30",
  "estado": "CREADO"
}
```

**Ejemplo:**
```javascript
const createTorneo = async (torneoData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/torneos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(torneoData)
  });
  return await response.json();
}
```

#### `PUT /api/torneos/:id`
Actualizar un torneo

#### `DELETE /api/torneos/:id`
Eliminar un torneo

---

### 6. Clubes

#### `GET /api/clubes`
Listar todos los clubes con sus equipos y delegado

**Ejemplo:**
```javascript
const getClubes = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/clubes');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Club Deportivo Los Tigres",
      "logo_url": "https://example.com/logo.png",
      "delegado_usuario_id": 5,
      "delegado": {
        "id": 5,
        "nombre_completo": "María González",
        "email": "maria@example.com"
      },
      "equipos": [...]
    }
  ]
}
```

#### `GET /api/clubes/:id`
Obtener un club específico

#### `POST /api/clubes`
Crear un nuevo club

**Cuerpo de la petición:**
```json
{
  "nombre": "Club Deportivo Los Tigres",
  "logo_url": "https://example.com/logo.png",
  "delegado_usuario_id": 5
}
```

**Ejemplo:**
```javascript
const createClub = async (clubData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/clubes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clubData)
  });
  return await response.json();
}
```

#### `PUT /api/clubes/:id`
Actualizar un club

#### `DELETE /api/clubes/:id`
Eliminar un club

---

### 7. Sedes

#### `GET /api/sedes`
Listar todas las sedes

**Ejemplo:**
```javascript
const getSedes = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/sedes');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Estadio Metropolitano",
      "direccion": "Calle 72 #46-64",
      "ciudad": "Barranquilla",
      "partidos": [...]
    }
  ]
}
```

#### `GET /api/sedes/:id`
Obtener una sede específica

#### `POST /api/sedes`
Crear una nueva sede

**Cuerpo de la petición:**
```json
{
  "nombre": "Estadio Metropolitano",
  "direccion": "Calle 72 #46-64",
  "ciudad": "Barranquilla"
}
```

**Ejemplo:**
```javascript
const createSede = async (sedeData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/sedes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sedeData)
  });
  return await response.json();
}
```

#### `PUT /api/sedes/:id`
Actualizar una sede

#### `DELETE /api/sedes/:id`
Eliminar una sede

---

### 8. Partidos

#### `GET /api/partidos`
Listar todos los partidos con información completa

**Ejemplo:**
```javascript
const getPartidos = async () => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/partidos');
  const data = await response.json();
  return data.data;
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "equipo_local_id": 1,
      "equipo_visitante_id": 2,
      "sede_id": 1,
      "fecha_hora": "2026-01-20T15:00:00.000Z",
      "estado": "PROGRAMADO",
      "goles_local": 0,
      "goles_visitante": 0,
      "jornada": "Jornada 1",
      "planillero_id": 3,
      "equipo_local": {
        "id": 1,
        "nombre_equipo": "Tigres 2010",
        "club": {
          "id": 1,
          "nombre": "Club Deportivo Los Tigres",
          "logo_url": "..."
        },
        "categoria": {
          "id": 1,
          "nombre": "Categoría 2010"
        }
      },
      "equipo_visitante": { ... },
      "sede": {
        "id": 1,
        "nombre": "Estadio Metropolitano",
        "direccion": "Calle 72 #46-64",
        "ciudad": "Barranquilla"
      },
      "planillero": {
        "id": 3,
        "nombre_completo": "Carlos Ruiz"
      },
      "eventos": [...]
    }
  ]
}
```

**Estados del partido:**
- `PROGRAMADO` - Partido programado, no iniciado
- `EN_JUEGO` - Partido en curso
- `FINALIZADO` - Partido terminado
- `SUSPENDIDO` - Partido suspendido

#### `GET /api/partidos/:id`
Obtener un partido específico con todos los detalles y eventos

#### `POST /api/partidos`
Crear un nuevo partido

**Cuerpo de la petición:**
```json
{
  "equipo_local_id": 1,
  "equipo_visitante_id": 2,
  "sede_id": 1,
  "fecha_hora": "2026-01-20T15:00:00.000Z",
  "jornada": "Jornada 1",
  "planillero_id": 3
}
```

**Ejemplo:**
```javascript
const createPartido = async (partidoData) => {
  const response = await fetch('https://asefal-back-production.up.railway.app/api/partidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partidoData)
  });
  return await response.json();
}
```

#### `PUT /api/partidos/:id`
Actualizar un partido (estado, marcador, etc.)

**Ejemplo para actualizar marcador:**
```javascript
const updateMarcador = async (partidoId, golesLocal, golesVisitante) => {
  const response = await fetch(`https://asefal-back-production.up.railway.app/api/partidos/${partidoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      goles_local: golesLocal,
      goles_visitante: golesVisitante,
      estado: 'FINALIZADO'
    })
  });
  return await response.json();
}
```

#### `DELETE /api/partidos/:id`
Eliminar un partido

---

## 🎨 Ejemplo de Integración en React/Next.js

### Configuración del Cliente API

```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://asefal-back-production.up.railway.app';

// Helper para obtener headers con token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  async get(endpoint, useAuth = false) {
    const headers = useAuth ? getHeaders() : {};
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  },

  async post(endpoint, data, useAuth = false) {
    const headers = useAuth ? getHeaders() : { 'Content-Type': 'application/json' };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  },

  async put(endpoint, data, useAuth = false) {
    const headers = useAuth ? getHeaders() : { 'Content-Type': 'application/json' };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  },

  async delete(endpoint, useAuth = false) {
    const headers = useAuth ? getHeaders() : {};
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) throw new Error('Error en la petición');
    return await response.json();
  }
};

// Funciones de autenticación
export const auth = {
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    return response;
  },

  async register(userData) {
    const response = await api.post('/api/auth/register', userData);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    return response;
  },

  async getProfile() {
    return await api.get('/api/auth/profile', true);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
```

### Hooks Personalizados

```javascript
// hooks/usePartidos.js
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export const usePartidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await api.get('/api/partidos');
        setPartidos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  return { partidos, loading, error };
};
```

```javascript
// hooks/useTorneos.js
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export const useTorneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneos = async () => {
      const response = await api.get('/api/torneos');
      setTorneos(response.data);
      setLoading(false);
    };
    fetchTorneos();
  }, []);

  return { torneos, loading };
};
```

### Componente de Ejemplo

```jsx
// components/PartidosList.jsx
'use client';
import { usePartidos } from '@/hooks/usePartidos';

export default function PartidosList() {
  const { partidos, loading, error } = usePartidos();

  if (loading) return <div>Cargando partidos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="partidos-container">
      {partidos.map(partido => (
        <div key={partido.id} className="partido-card">
          <div className="equipos">
            <div className="equipo-local">
              <img src={partido.equipo_local.club.logo_url} alt="Logo" />
              <span>{partido.equipo_local.club.nombre}</span>
              <span className="goles">{partido.goles_local}</span>
            </div>
            <span className="vs">VS</span>
            <div className="equipo-visitante">
              <span className="goles">{partido.goles_visitante}</span>
              <span>{partido.equipo_visitante.club.nombre}</span>
              <img src={partido.equipo_visitante.club.logo_url} alt="Logo" />
            </div>
          </div>
          <div className="info">
            <p>📍 {partido.sede.nombre}</p>
            <p>📅 {new Date(partido.fecha_hora).toLocaleString()}</p>
            <p>🏆 {partido.equipo_local.categoria.nombre}</p>
            <span className={`estado ${partido.estado.toLowerCase()}`}>
              {partido.estado}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔐 Notas de Seguridad

**IMPORTANTE:** Los siguientes endpoints NO están protegidos actualmente:
- POST, PUT, DELETE requieren implementación de autenticación JWT (Fase 5)

**Próximas implementaciones:**
- Login: `POST /api/auth/login`
- Registro: `POST /api/auth/register`
- Middleware de autenticación para rutas protegidas
- Roles y permisos

---

## 📝 Notas Adicionales

### Fechas
- Las fechas vienen en formato ISO 8601: `2026-01-20T15:00:00.000Z`
- Usar `new Date()` en JavaScript para parsear
- Para fechas sin hora (DATEONLY): `2026-01-20`

### Relaciones
Todos los endpoints principales incluyen sus relaciones:
- **Usuarios** incluyen su rol
- **Torneos** incluyen sus categorías
- **Clubes** incluyen delegado y equipos
- **Partidos** incluyen equipos completos, sede, planillero y eventos

### CORS
La API tiene CORS habilitado para todas las peticiones durante desarrollo.

### Variables de Entorno Frontend

```env
# .env.local
NEXT_PUBLIC_API_URL=https://asefal-back-production.up.railway.app
```

---

## 🚀 Próximos Endpoints (En desarrollo)

Los siguientes endpoints estarán disponibles próximamente:

- `GET /api/categorias` - Listar categorías
- `GET /api/equipos` - Listar equipos
- `GET /api/jugadores` - Listar jugadores
- `GET /api/inscripciones` - Listar inscripciones
- `GET /api/eventos` - Listar eventos de partidos
- `POST /api/auth/login` - Login de usuarios
- `POST /api/auth/register` - Registro de usuarios

---

**Última actualización:** 2 de enero de 2026
**Versión API:** 1.0.0
