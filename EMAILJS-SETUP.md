# 📧 Configuración de EmailJS - Guía Paso a Paso

## 🎯 Objetivo
Configurar EmailJS para que el formulario de contacto envíe emails reales a **niltorrents99@gmail.com**

## 📋 Pasos de Configuración

### **Paso 1: Crear Cuenta en EmailJS**
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"**
3. Regístrate con tu email (puedes usar niltorrents99@gmail.com)
4. Confirma tu email

### **Paso 2: Configurar Servicio de Email**
1. **Inicia sesión** en EmailJS
2. Ve a **"Email Services"** en el dashboard
3. Haz clic en **"Add New Service"**
4. Selecciona **"Gmail"** (recomendado)
5. **Conecta tu cuenta Gmail** (niltorrents99@gmail.com)
6. **Copia el Service ID** (algo como: service_xxxxxxx)

### **Paso 3: Crear Plantilla de Email**
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. **Configura la plantilla** así:

```
Asunto: Nueva consulta desde la web de enfermería

De: {{from_name}}
Teléfono: {{phone}}
Email: {{from_email}}
Servicio solicitado: {{service}}

Mensaje:
{{message}}

---
Enviado desde el formulario de contacto de la web
```

4. **Guarda** y **copia el Template ID** (algo como: template_xxxxxxx)

### **Paso 4: Obtener User ID**
1. Ve a **"Account"** en el dashboard
2. **Copia tu User ID** (algo como: user_xxxxxxxxxxxxxxx)

### **Paso 5: Configurar las Credenciales**
1. **Abre** el archivo `emailjs-config.js`
2. **Reemplaza** los valores:

```javascript
const EMAILJS_CONFIG = {
    USER_ID: 'tu_user_id_real',      // El User ID que copiaste
    SERVICE_ID: 'tu_service_id_real', // El Service ID que copiaste
    TEMPLATE_ID: 'tu_template_id_real' // El Template ID que copiaste
};
```

### **Ejemplo de Configuración:**
```javascript
const EMAILJS_CONFIG = {
    USER_ID: 'user_abc123def456',
    SERVICE_ID: 'service_gmail_xyz789',
    TEMPLATE_ID: 'template_contact_form'
};
```

## 🧪 **Probar la Configuración**

1. **Guarda** todos los archivos
2. **Recarga** la página web
3. **Completa** el formulario de contacto
4. **Envía** una consulta de prueba
5. **Revisa** tu email (niltorrents99@gmail.com)

## ✅ **Verificación**

### **Si funciona correctamente:**
- ✅ Aparece mensaje: "¡Gracias por su consulta!"
- ✅ Recibes email en niltorrents99@gmail.com
- ✅ El formulario se resetea

### **Si hay problemas:**
- ❌ Mensaje: "EmailJS no está configurado"
- ❌ Mensaje: "Hubo un error al enviar"
- ❌ No llega email

## 🔧 **Solución de Problemas**

### **Error: "EmailJS no está configurado"**
- Verifica que hayas reemplazado los valores en `emailjs-config.js`
- Asegúrate de que no digan "TU_USER_ID_AQUI"

### **Error: "Hubo un error al enviar"**
- Verifica que los IDs sean correctos
- Revisa la consola del navegador (F12) para más detalles
- Asegúrate de que el servicio Gmail esté conectado

### **No llega el email**
- Revisa la carpeta de spam
- Verifica que la plantilla esté configurada correctamente
- Comprueba que el servicio Gmail esté activo

## 💰 **Límites Gratuitos**

- **200 emails/mes** gratis
- Perfecto para una página de enfermería
- Si necesitas más, hay planes de pago desde $15/mes

## 🔒 **Seguridad**

- ✅ **Seguro**: EmailJS maneja la autenticación
- ✅ **Sin servidor**: Todo funciona desde el navegador
- ✅ **HTTPS**: Conexión encriptada

## 📞 **Soporte**

Si tienes problemas:
1. Revisa esta guía paso a paso
2. Verifica la consola del navegador
3. Consulta la documentación de EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

---

**¡Una vez configurado, recibirás todas las consultas directamente en tu email!** 📧