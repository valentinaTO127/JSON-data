// Variables globales para almacenar los datos de la API
let currentData = null;

// Elementos del DOM
const jsonResultElement = document.getElementById('jsonResult');
const dotNotationPathElement = document.getElementById('dotNotationPath');
const dotNotationResultElement = document.getElementById('dotNotationResult');

// Botones para cargar datos
document.getElementById('loadProducts').addEventListener('click', () => {
    fetchData('https://dummyjson.com/products');
});

document.getElementById('loadUsers').addEventListener('click', () => {
    fetchData('https://dummyjson.com/users');
});

document.getElementById('loadSingleProduct').addEventListener('click', () => {
    fetchData('https://dummyjson.com/products/1');
});

// Botón para acceder a los datos con notación de punto
document.getElementById('accessData').addEventListener('click', () => {
    accessDataWithDotNotation();
});

/**
 * Función para hacer peticiones a la API
 * @param {string} url - URL de la API a consultar
 */
async function fetchData(url) {
    try {
        // Mostrar mensaje de carga
        jsonResultElement.innerHTML = 'Cargando datos...';
        
        // Hacer la petición a la API
        const response = await fetch(url);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        
        // Convertir la respuesta a JSON
        const data = await response.json();
        
        // Guardar los datos para acceso posterior
        currentData = data;
        
        // Mostrar los datos en el elemento de resultados
        jsonResultElement.innerHTML = JSON.stringify(data, null, 2);
        
        // Generar opciones para la notación de punto
        generateDotNotationOptions(data);
        
    } catch (error) {
        jsonResultElement.innerHTML = `Error: ${error.message}`;
    }
}

/**
 * Genera las opciones del select para la notación de punto
 * @param {Object} data - Datos JSON recibidos de la API
 */
function generateDotNotationOptions(data) {
    // Limpiar opciones anteriores
    dotNotationPathElement.innerHTML = '<option value="">Selecciona para acceder...</option>';
    
    // Si los datos son un objeto con varias propiedades
    if (typeof data === 'object' && data !== null) {
        // Si es un objeto simple o un array
        if (Array.isArray(data)) {
            // Para arrays como products o users
            if (data.length > 0) {
                addOption('data[0]', 'Primer elemento del array');
                
                // Si el primer elemento es un objeto, agregar sus propiedades
                if (typeof data[0] === 'object' && data[0] !== null) {
                    Object.keys(data[0]).forEach(key => {
                        addOption(`data[0].${key}`, `data[0].${key}`);
                    });
                }
            }
        } else if (data.products) {
            // Caso específico para la respuesta de productos
            addOption('data.products', 'Todos los productos');
            addOption('data.products[0]', 'Primer producto');
            addOption('data.products[0].title', 'Título del primer producto');
            addOption('data.products[0].price', 'Precio del primer producto');
            addOption('data.products[0].description', 'Descripción del primer producto');
            addOption('data.products.length', 'Número total de productos');
        } else if (data.users) {
            // Caso específico para la respuesta de usuarios
            addOption('data.users', 'Todos los usuarios');
            addOption('data.users[0]', 'Primer usuario');
            addOption('data.users[0].firstName', 'Nombre del primer usuario');
            addOption('data.users[0].email', 'Email del primer usuario');
            addOption('data.users[0].address', 'Dirección del primer usuario');
            addOption('data.users[0].address.city', 'Ciudad del primer usuario');
            addOption('data.users.length', 'Número total de usuarios');
        } else {
            // Para un objeto individual (producto o usuario específico)
            Object.keys(data).forEach(key => {
                addOption(`data.${key}`, `data.${key}`);
                
                // Si la propiedad es un objeto, agregar sus subpropiedades
                if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
                    Object.keys(data[key]).forEach(subKey => {
                        addOption(`data.${key}.${subKey}`, `data.${key}.${subKey}`);
                    });
                }
            });
        }
    }
}

/**
 * Agrega una opción al select de notación de punto
 * @param {string} value - Valor de la opción (ruta de acceso)
 * @param {string} text - Texto a mostrar en la opción
 */
function addOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    dotNotationPathElement.appendChild(option);
}

/**
 * Accede a los datos usando la notación de punto seleccionada
 */
function accessDataWithDotNotation() {
    if (!currentData) {
        dotNotationResultElement.innerHTML = 'Primero debes cargar datos desde la API';
        return;
    }
    
    const path = dotNotationPathElement.value;
    
    if (!path) {
        dotNotationResultElement.innerHTML = 'Por favor selecciona una ruta de acceso';
        return;
    }
    
    try {
        // Reemplazar 'data' con 'currentData' en la expresión
        const accessPath = path.replace('data', 'currentData');
        
        // Evaluar la expresión para acceder a los datos
        const result = eval(accessPath);
        
        // Mostrar el resultado
        if (typeof result === 'object') {
            dotNotationResultElement.innerHTML = JSON.stringify(result, null, 2);
        } else {
            dotNotationResultElement.innerHTML = result;
        }
        
        // Explicar la ruta usada
        explainDotNotationPath(path);
        
    } catch (error) {
        dotNotationResultElement.innerHTML = `Error al acceder a los datos: ${error.message}`;
    }
}

/**
 * Explica la ruta de notación de punto utilizada
 * @param {string} path - Ruta de acceso utilizada
 */
function explainDotNotationPath(path) {
    const explanation = document.createElement('div');
    explanation.className = 'path-explanation';
    explanation.innerHTML = `
        <p><strong>Explicación:</strong></p>
        <p>La ruta <code>${path}</code> nos permite acceder a esta parte específica de los datos JSON.</p>
        <p>La notación de punto (<code>.</code>) accede a propiedades de un objeto, mientras que los corchetes <code>[n]</code> acceden a elementos de un array.</p>
    `;
    
    // Reemplazar la explicación anterior si existe
    const existingExplanation = dotNotationResultElement.querySelector('.path-explanation');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    dotNotationResultElement.appendChild(explanation);
}
