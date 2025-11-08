## MORALISIMO Print Studio

Landing page y catálogo digital construidos con [Next.js](https://nextjs.org) utilizando el App Router. El proyecto se enfoca en mostrar la propuesta comercial de MORALISIMO y un catálogo vivo de productos conectados a Strapi.

## Requisitos Previos

- Node.js 18+ y npm instalados.
- Servidor Strapi (o API compatible) exponiendo el endpoint `GET /api/products`.
- Variables de entorno configuradas en `.env.local`:
	- `NEXT_PUBLIC_API_BASE_URL`: URL base del backend (por ejemplo, `http://localhost:1337`).
	- `NEXT_PUBLIC_WHATSAPP_PHONE`: Número de WhatsApp en formato internacional (solo dígitos) para las llamadas a la acción del catálogo.

## Ejecutar en Desarrollo

```bash
npm install
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) en el navegador. La home se encuentra en `/` y el catálogo de productos en `/productos`.

## Estructura Destacada

- `src/app/page.js`: Landing page principal con propuesta de valor y formulario de contacto.
- `src/app/productos/page.js`: Catálogo dinámico que consume los productos desde Strapi y genera CTA directas a WhatsApp.
- `next.config.mjs`: Configuración para permitir imágenes remotas del CDN de productos.

## Despliegue

Para desplegar el sitio en Vercel u otra plataforma compatible con Next.js, asegúrate de declarar las variables de entorno mencionadas y de que tu backend sea accesible públicamente.
