document.addEventListener("DOMContentLoaded", () => {
  // Esto se ejecuta cuando la página ya está cargada, así evitamos errores con el DOM.
  const form = document.getElementById("contactForm");
  const resetBtn = document.getElementById("resetBtn");
  const formMessage = document.getElementById("formMessage");

  // Reglas de validación para cada campo del formulario.
  const validators = {
    nombre: {
      label: "Nombre",
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
      min: 3,
      max: 40,
      required: true,
    },
    apellidos: {
      label: "Apellidos",
      regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
      min: 4,
      max: 60,
      required: true,
    },
    email: {
      label: "Correo electrónico",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      min: 5,
      max: 120,
      required: true,
    },
    telefono: {
      label: "Teléfono",
      regex: /^\d{9}$/,
      min: 9,
      max: 9,
      required: true,
    },
  };

  // Función para limpiar el estado visual de un campo cuando todo va bien.
  function clearFieldState(fieldName) {
    const field = document.getElementById(fieldName);
    const feedback = document.querySelector(`[data-error-for="${fieldName}"]`);

    if (field) {
      field.classList.remove("is-invalid");
      field.setAttribute("aria-invalid", "false");
    }

    if (feedback) {
      feedback.textContent = "";
      feedback.classList.remove("visible");
    }
  }

  // Función para mostrar el mensaje de error del campo que falla.
  function setFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const feedback = document.querySelector(`[data-error-for="${fieldName}"]`);

    if (field) {
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
    }

    if (feedback) {
      feedback.textContent = message;
      feedback.classList.add("visible");
    }
  }

  // Limpia el mensaje general del formulario para que no quede raro.
  function clearFormMessage() {
    if (!formMessage) return;
    formMessage.className = "alert mt-3 d-none";
    formMessage.textContent = "";
  }

  // Muestra un mensaje de éxito o error al final del formulario.
  function showFormMessage(type, text) {
    if (!formMessage) return;
    formMessage.className = `alert mt-3 ${type === "success" ? "alert-success" : "alert-danger"}`;
    formMessage.textContent = text;
    formMessage.classList.remove("d-none");
  }

  // Esta función valida un campo concreto y devuelve true o false.
  function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const rules = validators[fieldName];

    if (!field || !rules) return true;

    const value = field.value.trim();

    if (!value && rules.required) {
      setFieldError(fieldName, `${rules.label} es obligatorio.`);
      return false;
    }

    if (value && !rules.regex.test(value)) {
      setFieldError(fieldName, `${rules.label} no tiene un formato válido.`);
      return false;
    }

    if (value.length < rules.min || value.length > rules.max) {
      setFieldError(
        fieldName,
        `${rules.label} debe tener entre ${rules.min} y ${rules.max} caracteres.`
      );
      return false;
    }

    clearFieldState(fieldName);
    return true;
  }

  // Escuchamos los eventos de cada input para validar al instante.
  Object.keys(validators).forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (!field) return;

    field.addEventListener("input", () => {
      validateField(fieldName);
    });

    field.addEventListener("blur", () => {
      validateField(fieldName);
    });
  });

  // Aquí se controla el submit del formulario, evitando el envío si falla algo.
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFormMessage();

      let valid = true;
      Object.keys(validators).forEach((fieldName) => {
        if (!validateField(fieldName)) {
          valid = false;
        }
      });

      if (!valid) {
        showFormMessage("error", "Por favor, corrige los errores del formulario antes de enviarlo.");
        return;
      }

      showFormMessage("success", "Formulario enviado correctamente. ¡Gracias por contactar con MasterD!");
      form.reset();
      Object.keys(validators).forEach(clearFieldState);
    });
  }

  // Botón de limpiar: vacía los campos y resetea los estilos.
  if (resetBtn) {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      form.reset();
      Object.keys(validators).forEach(clearFieldState);
      clearFormMessage();
    });
  }

  // Coordenadas por defecto de la sede de MasterD en Madrid.
  const defaultCoords = [40.4167754, -3.7037902];

  // Aquí se inicializa el mapa con Leaflet.
  const mapContainer = document.getElementById("map");
  if (mapContainer && typeof L !== "undefined") {
    const map = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView(defaultCoords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker(defaultCoords).addTo(map);

    function updateMapPosition(lat, lng, zoom = 14) {
      const coords = [lat, lng];
      map.setView(coords, zoom);
      marker.setLatLng(coords);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMapPosition(latitude, longitude, 15);
        },
        () => {
          updateMapPosition(defaultCoords[0], defaultCoords[1], 13);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      updateMapPosition(defaultCoords[0], defaultCoords[1], 13);
    }
  }
});
