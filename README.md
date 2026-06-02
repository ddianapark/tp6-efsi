## Instrucciones de Ejecución

Para clonar y ejecutar este proyecto de forma local en tu entorno de desarrollo, seguí estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/ddianapark/tp6-efsi.git
cd tp6-efsi
```

### 2. Instalar las dependencias
Asegurate de tener Node.js instalado en tu sistema. Luego, ejecutá:
``` bash
npm install
```

### 3. Iniciar el entorno de desarrollo
Para levantar el servidor local interactivo mediante Vite, ejecutá:
``` bash
npm run dev
```

Abrí tu navegador en la dirección provista por la terminal (por defecto `http://localhost:5173`) para interactuar con la aplicación.

---

## Referencia de Diseño (Figma)

Para el modelado de la interfaz visual, la distribución espacial de los componentes, las tipografías y las paletas cromáticas, se utilizó como referencia una fusión entre los siguientes diseños:
**Link a los diseños de Figma:**
  - https://www.figma.com/community/file/1004033523744290376
  - https://www.figma.com/es-es/comunidad/file/1235135369163092252/instagram-web-ui-recreated

La implementación se realizó bajo un enfoque de alta fidelidad, respetando detalles visuales clave como los bordes redondeados (`border-radius: 50%`) para avatares, transiciones de interacción fluidas, el degradado lineal multicolor característico para los anillos de las historias (`linear-gradient(45deg, #f9d423 0%, #ff4e50 35%, ...)`) y un scrollbar personalizado para optimizar la estética del feed sin romper el Layout.
Además, se tomaron los íconos directamente del diseño, para asegurar la cohesión entre ambas plataformas.

---

## Organización del Proyecto

El código fuente de la aplicación mantiene una estructura modular y jerárquica limpia dentro del directorio `src/`, separando estrictamente las responsabilidades de UI, estilos, tipados y servicios de red:

```text
src/
├── components/         # Componentes funcionales autónomos de React.
│   ├── icons/          # Módulo de íconos vectoriales SVG empaquetados.
│   │   ├── CreateIcon.tsx
│   │   ├── Edit.tsx
│   │   ├── ExploreIcon.tsx
│   │   ├── HomeIcon.tsx
│   │   ├── Logo.tsx
│   │   ├── MessagesIcon.tsx
│   │   ├── NotificationsIcon.tsx
│   │   ├── ReelsIcon.tsx
│   │   └── SearchIcon.tsx
│   ├── Carrousel.tsx   # Contenedor y slider de historias (Stories).
│   ├── CloseUp.tsx     # Ventana modal de visualización detallada del post.
│   ├── Feed.tsx        # Malla orquestadora del flujo de publicaciones.
│   ├── Loader.tsx      # Componente visual animado de carga (SVG nativo).
│   ├── Navbar.tsx      # Barra de navegación lateral fija e identidad de usuario.
│   ├── Post.tsx        # Tarjeta atómica individual de representación de posts.
│   ├── Profile.tsx     # Vista de perfil dedicada de la cuenta activa.
│   └── Story.tsx       # Burbuja individual para cada historia del carrusel.
├── services/           # Capa de servicios e integración con APIs externas.
│   ├── api.ts          # Configuración base de Axios e inclusión de la API Key.
│   └── apiCalls.ts     # Encapsulamiento de llamadas HTTP concurrentes (getCats).
├── styles/             # Hojas de estilos CSS modulares e independientes.
│   ├── Carrousel.css
│   ├── CloseUp.css
│   ├── Feed.css
│   ├── Loader.css
│   ├── Navbar.css
│   ├── Post.css
│   ├── Profile.css
│   └── Story.css
├── types/              # Definiciones de tipado estático globales para TypeScript.
│   └── index.ts        # Interfaces estructuradas (User, CloseUpType, PostType, etc.).
├── App.tsx             # Componente raíz controlador del estado central y las vistas.
├── App.css             # Reglas del layout global implementadas con CSS Grid.
└── main.tsx            # Punto de entrada para el montado del DOM Virtual de React.
```

---

## Componentización y Justificación Técnica

El software fue segmentado siguiendo el principio de responsabilidad única. Esto asegura el desacoplamiento, aislando las fallas del sistema y maximizando la reutilización de código en interfaces iterativas.

### Detalle de Componentes y Justificaciones:

1. **`App.tsx` (Núcleo de la Aplicación):**
   * **Responsabilidad:** Gobierna el estado central de la app, maneja los datos devueltos por la API de gatos y define de forma condicional qué pantalla debe renderizarse en la sección `.scroll`.
   * **Justificación:** Centraliza los flujos de control críticos y las promesas asincrónicas, actuando como la fuente única de la verdad.

2. **`Navbar.tsx` (Control de Navegación):**
   * **Responsabilidad:** Renderiza de forma estática los accesos de interacción. Al hacer clic en los ítems de lista "Home" o "Profile", dispara eventos para conmutar las pantallas.
   * **Justificación:** Centraliza el menú principal y hereda de manera directa los datos del usuario logueado para persistir su foto de perfil en la base inferior.

3. **`components/icons/` (Módulo de Íconos Vectoriales):**
   * **Responsabilidad:** Encapsula gráficos SVG individuales como componentes puros de React, permitiendo la inyección dinámica de propiedades nativas a través de `React.SVGProps<SVGSVGElement>`.
   * **Justificación:** Evita la duplicación masiva de código de marcado en los componentes de vista (`Navbar`, `Profile`), reduce el peso del bundle al no depender de librerías externas de íconos pesadas, y flexibiliza el mantenimiento estético de los vectores.

4. **`Feed.tsx` y `Post.tsx` (Módulo de Feed Dinámico):**
   * **Responsabilidad:** `Feed` actúa como una malla inteligente que itera el array de posts mediante el método `.map()`, generando instancias reactivas de `Post`. 
   * **Justificación Técnica Avanzada:** Al utilizar una grilla adaptativa tipo Pinterest (`grid-auto-rows: 8px`), el componente `Feed` utiliza un Hook `useRef` combinado con listeners de `resize` para calcular en tiempo real el alto dinámico de cada imagen cargada, aplicando un cálculo matemático para asignar el `gridRowEnd` exacto de forma asíncrona. Esto soluciona la superposición de elementos mientras las imágenes se descargan de internet.

5. **`Carrousel.tsx` y `Story.tsx` (Carrusel de Historias):**
   * **Responsabilidad:** Iterar y renderizar de manera horizontal las historias activas pasadas por propiedad.
   * **Justificación:** Encapsula la lógica del slider manteniendo limpio el cuerpo del feed general.

6. **`CloseUp.tsx` (Vista Detallada):**
   * **Responsabilidad:** Funciona como un componente superpuesto de pantalla completa (`position: fixed`) que muestra de manera expandida los comentarios de la comunidad, la descripción del post, y botones interactivos independientes.
   * **Justificación:** Permite aislar visual y lógicamente el foco de atención del usuario sin alterar el scroll del feed de fondo.

7. **`Profile.tsx` (Perfil de Usuario):**
   * **Responsabilidad:** Renderiza la cuenta privada del usuario. Cuenta con su propia lógica de sub-pestañas secundarias ("POSTS", "REELS", "SAVED") mediante un estado local `activeTab` e inicia su propia petición HTTP asincrónica (`apiCalls.getCats(9)`) para poblar la grilla de fotos personales del usuario.
   * **Justificación:** Modulariza las pantallas. Al encapsular la petición de posts del perfil dentro de su propio ciclo de vida, evita saturar de consultas a la red si el usuario nunca ingresa a su perfil.


---

## Comunicación entre Componentes mediante Props

El flujo de información se gestiona de forma unidireccional descendente (Top-Down), apoyándose en funciones callback para la comunicación inversa (ascendente):

* **Envío de Datos:** El componente padre `App.tsx` transfiere objetos de datos estructurados directamente a sus hijos. Por ejemplo: `<Carrousel stories={stories} />` o `<Feed posts={posts} setCloseUp={setCloseUp} />`.
* **Comunicación Ascendente (Callbacks):** Para romper la rigidez del flujo, los componentes padres delegan funciones modificadoras de estado hacia abajo. Un claro ejemplo ocurre en `Feed` y `Profile`: ambos reciben la función `setCloseUp`. Cuando se hace un click en cualquier tarjeta `Post`, esta ejecuta el callback inyectando sus propios datos hacia arriba. Esto altera el estado en el nodo superior (`App` o `Profile`), provocando que se levante de manera inmediata el componente modal `<CloseUp />`.

---

## Hooks Utilizados y Justificación

Para controlar el ciclo de vida y la memoria reactiva de la interfaz de usuario, se utilizaron los siguientes React Hooks:

* **`useState`:**
  * `user`: Objeto que retiene la información de la sesión emulada actual.
  * `posts` y `stories`: Almacenan la información en crudo traída desde los servicios de red.
  * `isLoading` / `loadingPosts`: Estados booleanos de control de flujo. Mientras se resuelven las promesas HTTP, se evalúan en corto circuito para renderizar el componente `<Loader />`, evitando que el usuario visualice una interfaz rota o vacía.
  * `closeUp`: Objeto `{ isCloseUp: boolean, data: any }` que determina si el modal detallado debe montarse y qué gato específico debe inyectar en la interfaz.
  * `profile`: Objeto controlador de la vista principal (`{ isProfile: boolean, user: any }`).
  * `activeTab` (En `Profile.tsx`): Controla la sub-navegación local de pestañas del perfil.
  * `liked`, `commented`, `sent` (Locales dentro de `Post.tsx` y `CloseUp.tsx`): Manejan estados booleanos locales e independientes para alternar clases de CSS dinámicas (activar/desactivar colores de botones al interactuar).
* **`useEffect`:**
  * En `App.tsx` se definió con un array de dependencias vacío `[]`. Esto le garantiza al compilador que la lógica de inicialización se ejecutará únicamente una vez en el montaje inicial.
  * **Justificación Técnica:** Dentro de este efecto se orquesta un `Promise.all` asincrónico encargado de disparar concurrentemente las consultas a la API externa de gatos (`getCats(12)` y `getCats(7)`). Esto previene ciclos infinitos de re-renderizado y bloqueos de red al actualizar otros estados visuales de la aplicación.

---

## Consumo de API y Renderizado Dinámico

La aplicación consume información en tiempo real a través de Axios, la cual se centraliza en la capa de servicios `services/apiCalls.ts`.
El circuito técnico funciona de la siguiente manera:

1. `api.ts` define la instancia de Axios con la URL base (`https://api.thecatapi.com/v1/images/search`) e incluye en los headers la clave privada de autenticación (`x-api-key`).
2. Tras resolverse la promesa asincrónica de Axios en el `App.tsx`, las respuestas en crudo son interceptadas y transformadas mediante un mapeo `.map()` para estructurar objetos que respeten la interfaz tipada de TypeScript. Se extrae la URL de la imagen y se construyen nombres de usuarios dinámicos basados en los identificadores o propiedades internas devueltas.
3. React detecta la mutación de los estados globales y genera las interfaces del feed en base a los componentes dinámicos.

---

## Visualización Individual de Publicaciones

La visualización individual se logra mediante un patrón de renderizado condicional controlado desde el componente que aloja la vista (tanto en `App.tsx` para el feed, como internamente en `Profile.tsx` para su grilla propia):

```tsx
{
  closeUp.isCloseUp && closeUp.data && (
    <CloseUp 
      data={closeUp.data} 
      closeOverlay={() => setCloseUp({ isCloseUp: false, data: null })} 
    />
  )
}
```

Al hacer clic en un post, se alimenta el estado closeUp.data con la información de esa publicación específica y se activa la bandera booleana. El modal se monta inmediatamente recibiendo como propiedad el método callback closeOverlay. Al activarse mediante eventos del mouse (onMouseDown) en el botón de cierre o al hacer clic fuera del contenedor (overlay), este limpia el estado restableciéndolo a false y null, desmontando el componente de forma limpia.

---

## Perfil de Usuario Emulado

Para simular una sesión activa sin necesidad de implementar arquitecturas complejas de backend con sistemas de autenticación, la emulación se resolvió de forma automatizada en el frontend:

* **Estrategia de Inicialización:** Al completarse la carga asincrónica de las publicaciones de la API dentro del `useEffect` inicial de `App.tsx`, la aplicación toma de forma programática el primer elemento del array devuelto (`itemsPosts[0]`).
* **Datos mostrados en el Perfil:** Utilizando estos datos dinámicos, se invoca a `setUser()` guardando un nombre de usuario (`username`) y una imagen de avatar (`userImage`) por defecto que representará al usuario logueado en la sesión.
* **Renderizado de la Vista:** Cuando se conmuta a la vista `<Profile />`, este componente recibe el estado del usuario emulado por propiedades y pinta en su cabecera visual (`.profile-header`) la información de identidad (Avatar, username) junto con la inclusión del botón modular interactivo `<Edit />`, descripciones personalizadas y contadores fijos simulados (Posts, Followers, Following), cumpliendo con los criterios de evaluación solicitados para simular un perfil completo en el lado del cliente.
