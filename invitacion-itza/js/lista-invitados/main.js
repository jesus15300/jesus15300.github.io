const loader = document.getElementById("loader");

const sortButton = document.getElementById("sortingModeButton");
let sortDirection	= 'desc';

obtenerInvitadosConfirmados(loader)
  .then((data) => {
    invitados = data.confirmados;
    numeroVisitas = data.numeroVisitas;
    numeroConfirmados = data.numeroConfirmados;
    console.log(invitados);
  })
  .then(() => {
    const info = document.getElementById("info");
    info.innerHTML = `${numeroConfirmados} invitados confirmados - ${numeroVisitas} vistas a la invitación`;

		initializeSorting(invitados);
		
		sortField.addEventListener("change", sortAndRender);
		sortButton.addEventListener("click", changeSortDirection);
    
  });
function initializeSorting(invitados){
	const excludedFields = ["id", "valido"];
	// Obtenemos los nombres de las propiedades
	const fields = Object.keys(invitados[0]);
	const basicFields = fields.filter(field => typeof invitados[0][field] !== "object" && !excludedFields.includes(field));

	//llenamos las opciones del select
	const sortField = document.getElementById("sortField");
	basicFields.forEach(field => {
			const option = document.createElement("option");
			option.value = field;
			option.textContent = field.charAt(0).toUpperCase() + field.slice(1);
			sortField.appendChild(option);
	});
	const icon = sortButton.querySelector("i");
	icon.className = sortDirection === 'asc' ? "fa fa-sort-amount-asc" : "fa fa-sort-amount-desc";

	sortField.value = "fechaConfirmacion";
	sortAndRender();
}
const sortAndRender = () => {
	const field = sortField.value;
	const sortedData = [...invitados].sort((a, b) => {
			if (a[field] === null || b[field] === null) return 0;
			if (typeof a[field] === "string") {
				if(sortDirection === 'asc') 
					return a[field].localeCompare(b[field]);
				return b[field].localeCompare(a[field]);
			}
			if(sortDirection === 'asc') 
				return a[field] > b[field] ? 1 : -1;
			return a[field] < b[field] ? 1 : -1;
	});
	renderList(sortedData);
};
	
const changeSortDirection = () => {
	const icon = sortButton.querySelector("i");
	const isAscending = icon.classList.contains("fa-sort-amount-asc");
	// Cambiar la dirección de ordenamiento
	sortDirection = isAscending ? 'desc' : 'asc';
	icon.className = isAscending ? "fa fa-sort-amount-desc" : "fa fa-sort-amount-asc";
	sortAndRender();
}
const renderList = (data) => {
	const guestListContainer = document.getElementById("guest-list");
	guestListContainer.innerHTML = "";
	data.forEach((invitado) => {
		const card = document.createElement("div");
		card.className = "guest-card";
		card.innerHTML = `
				<h3>${invitado.nombre}</h3>
				<p>
					<strong>Acompañantes:</strong> <span class="highlight">${getStringOrDefault(invitado.acompanantes,"No definido")}</span>
				</p>
				<p><strong>Fecha de Confirmación:</strong> ${stilizeDate(invitado.fechaConfirmacion).capitalize(1)}</p>
				<p><strong>Tipo de Invitación:</strong> ${invitado.invitacion.nombre}</p>
			`;
		guestListContainer.appendChild(card);
	});
	
}

// Función para obtener un valor por defecto
function getStringOrDefault(value, defaultValue) {
  return value ? value : defaultValue;
}
// Función para dar formato a la fecha
function stilizeDate(date) {
  const fecha = new Date(date);
  const opciones = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let fechaFormateada = fecha.toLocaleDateString("es-MX", opciones);
  return date ? fechaFormateada : "No definido";
}

// función para poner mayúscula la primera letra de cada palabra
Object.defineProperty(String.prototype, "capitalize", {
  value: function (wordIndex = -1) {
    // Si wordIndex es -1, capitaliza todas las palabras
    return this.split(" ")
      .map((word, index) => {
        if (wordIndex === -1 || index === wordIndex) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word;
      })
      .join(" ");
  },
  enumerable: false,
});
