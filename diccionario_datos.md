# Diccionario de Datos - Tabla Inventory

Este documento describe la estructura de la tabla `inventory` en la base de datos PostgreSQL, basada en los datos importados desde el archivo CSV de WooCommerce.

## Descripción General
La tabla `inventory` almacena información de productos de inventario, incluyendo detalles de precios, stock, categorías y atributos. Está diseñada para productos simples, variables y variaciones de WooCommerce.

## Estructura de la Tabla

| Nombre de Columna      | Tipo de Dato      | Descripción |
|------------------------|-------------------|-------------|
| type                  | VARCHAR(50)      | Tipo de producto: 'simple' para productos simples, 'variable' para productos con variaciones, 'variation' para variaciones específicas. |
| name                  | TEXT             | Nombre del producto. |
| sku                   | VARCHAR(50)      | Unidad de mantenimiento de stock (SKU), identificador único del producto. |
| regular_price         | NUMERIC          | Precio regular del producto (en la moneda local, sin decimales). |
| sale_price            | NUMERIC          | Precio de venta o descuento del producto (puede ser NULL si no hay descuento). |
| manage_stock          | VARCHAR(10)      | Indica si se debe gestionar el stock: 'yes' o 'no'. |
| stock                 | INTEGER          | Cantidad disponible en stock. |
| backorders            | VARCHAR(10)      | Permite pedidos pendientes: 'yes' o 'no'. |
| stock_status          | VARCHAR(20)      | Estado del stock: 'instock' (en stock), 'outofstock' (agotado), etc. |
| categories            | TEXT             | Categorías del producto, separadas por comas (ej: 'Prendas > Camisetas'). |
| tags                  | TEXT             | Etiquetas del producto, separadas por comas (ej: 'camiseta, personalizada, ropa'). |
| short_description     | TEXT             | Descripción corta del producto. |
| description           | TEXT             | Descripción completa del producto, incluyendo detalles y personalización. |
| images                | TEXT             | URLs de las imágenes del producto, separadas por comas. |
| attributes_name       | TEXT             | Nombre del atributo (ej: 'Talla' para tallas). |
| attributes_values     | TEXT             | Valores del atributo, separados por ' | ' (ej: 'S | M'). |
| attributes_visible    | INTEGER          | Indica si el atributo es visible: 1 (sí) o 0 (no). |
| attributes_taxonomy   | INTEGER          | Indica si el atributo es una taxonomía: 1 (sí) o 0 (no). |
| parent_id             | VARCHAR(50)      | ID del producto padre (para variaciones), coincide con el SKU del producto variable. |

## Notas Adicionales
- Los precios están en la moneda local (probablemente COP o similar) y se almacenan como números enteros (sin decimales).
- Campos de texto pueden contener caracteres especiales y URLs.
- Para productos variables, el `parent_id` está vacío; para variaciones, contiene el SKU del producto padre.
- Los atributos son específicos de WooCommerce y se usan para variaciones de productos (ej: tallas, colores).
- La tabla no incluye restricciones de clave primaria o índices; se recomienda agregar un índice en `sku` para búsquedas eficientes.