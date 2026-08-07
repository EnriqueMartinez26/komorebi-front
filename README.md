# Komorebi Home — Frontend

E-commerce de deco y objetos para el hogar con estética Japandi. Este es el **proyecto final** de la carrera de Desarrollo Web Full Stack de **Rolling Code School**.

Komorebi es la palabra japonesa para la luz del sol que se filtra entre las hojas de los árboles. La tienda es una curaduría chica y coherente: madera, lino, bambú, cerámica y fibras naturales, pensada para departamentos reales donde el espacio importa.

Este repo es el **cliente en React**. La API vive en un repo aparte: [komorebi-back](https://github.com/EnriqueMartinez26/komorebi-back).

## Demo

- **Sitio en producción:** https://komorebi-front.netlify.app/ (Netlify)
- **API:** https://komorebi-back.onrender.com (Render)

> La API está en el plan gratuito de Render: si estuvo inactiva un rato, la primera carga puede demorar unos segundos mientras el servicio despierta.

## Qué hace

- **Home** con slider de destacados, banners publicitarios y grilla de productos paginada.
- **Buscador** con resultados por término, más navegación por categorías desde el navbar.
- **Ficha de producto** por slug, con precio, descuento, stock e imágenes.
- **Carrito** persistido en la base: sumar, restar, eliminar ítems y vaciar.
- **Favoritos** por usuario, con badge en el header.
- **Checkout** con dos métodos de pago simulados: tarjeta y enlace de Mercado Pago.
- **Registro y login** en modales, con sesión por JWT y recuperación de contraseña por email.
- **Contacto** con formulario validado que dispara un mail al correo de la tienda.
- **Diseño responsive**, con navbar sticky, estados vacíos, loaders y toasts.

## Stack

| Qué | Con qué |
| --- | --- |
| Librería UI | React 18 |
| Build tool | Vite 5 |
| Ruteo | React Router DOM 6 |
| Estado global | Context API + hooks propios |
| Estilos | CSS puro con variables (sin framework) |
| HTTP | `fetch` encapsulado en clases de servicio |

## Estructura

```
src/
├── components/     # UI por dominio: auth, cart, products, layout, ui
├── context/        # AuthContext, CartContext, FavoritesContext, UIContext
├── hooks/          # usePageMeta, useProductsPerPage
├── pages/          # una carpeta por ruta
├── router/         # AppRouter
├── services/       # capa HTTP: BaseHttpService + un service por recurso
├── styles/         # index.css con el design system
└── utils/          # constants, currency, payments, social
```

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Home |
| `/buscar?q=` | Resultados de búsqueda |
| `/producto/:slug` | Detalle de producto |
| `/carrito` | Carrito y checkout |
| `/favoritos` | Favoritos del usuario |
| `/contacto` | Formulario de contacto |
| `/ayuda` | Preguntas frecuentes |
| `/quienes-somos` | Sobre la marca |
| `/forgot-password` | Recuperación de contraseña |

Cualquier ruta inexistente redirige al home.

## Cómo levantarlo

Necesitás Node 18 o superior y el backend corriendo.

```bash
git clone https://github.com/EnriqueMartinez26/komorebi-front
cd komorebi-front
npm install
cp .env.example .env
npm run dev
```

Queda en `http://127.0.0.1:5173`.

### Variables de entorno

| Variable | Para qué | Default |
| --- | --- | --- |
| `VITE_API_URL` | URL base de la API | `http://<host>:4000/api` |
| `VITE_DEFAULT_SEARCH_TERM` | Término del buscador por defecto | `destacados` |

### Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build para probarlo local |

## Autor

**Enrique Leonel Martínez**

Proyecto final — Rolling Code School.
