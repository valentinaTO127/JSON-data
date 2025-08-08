# JSON-data
Práctica rápida del uso de servicios API, específicamente en formato JSON.

## Explicación de API y JSON

Este proyecto es una demostración sencilla sobre qué son las APIs y cómo funciona el formato JSON, con ejemplos prácticos utilizando la API de DummyJSON.

## Contenido

- **Explicación de conceptos básicos:**
  - Qué es una API y cómo funciona
  - Qué es JSON y su estructura
  
- **Demostración práctica:**
  - Peticiones a la API de DummyJSON
  - Visualización de los datos recibidos
  - Acceso a datos usando notación de punto

## Cómo usar

1. Abre el archivo `index.html` en tu navegador
2. Utiliza los botones para cargar diferentes datos desde la API
3. Usa el selector de notación de punto para acceder a partes específicas de los datos
4. Observa cómo se pueden acceder a diferentes niveles de la jerarquía JSON

## Notación de punto

La notación de punto es una forma de acceder a propiedades anidadas dentro de objetos JSON:

```javascript
// Ejemplo de objeto JSON
const datos = {
  productos: [
    {
      nombre: "Smartphone",
      precio: 500,
      detalles: {
        marca: "TechBrand",
        color: "negro"
      }
    }
  ]
};

// Acceso usando notación de punto
console.log(datos.productos[0].nombre);         // "Smartphone"
console.log(datos.productos[0].detalles.marca); // "TechBrand"
```

---

Creado como ejemplo educativo para entender APIs y JSON.
