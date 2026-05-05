const dataContainer = document.getElementById("data");
const btnCrear = document.getElementById("btn-crear");
const btnForm = document.querySelector(".formulario");
const btnMandar = document.querySelector(".btn-mandar");
const nombre = document.querySelector(".nombre");
const apellido = document.querySelector(".apellido");
const fecha = document.querySelector(".fecha");
const descripcion = document.querySelector(".descripcion");
const imagen = document.querySelector(".imagen");

btnCrear.addEventListener("click", () => {
  if (btnForm.style.display === "none") {
    btnForm.style.display = "flex";
  } else {
    btnForm.style.display = "none";
  }
});

btnMandar.addEventListener("click", () => {
  postData()
});

async function postData() {
  try {
    const response = await fetch("http://localhost:3000/malecon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nombre.value,
        lastname: apellido.value,
        birthDate: fecha.value,
        photo: imagen.value,
        description: descripcion.value
      }),
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    const resultado = await response.json();
    console.log("Éxito:", resultado);
  } catch (err) {
    console.error("error al enviar");
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const data = await getData();

  data.forEach((element) => {
    const card = document.createElement("div");
    const { name, lastname, photo, birthDate, description, color } = element;
    card.innerHTML = `
        <div class="bg-${color ? color : "cyan"}-200 rounded-lg p-3 flex flex-col items-center">
          <h3 class="font-bold text-xl mb-2 uppercase">${name} ${lastname}</h3>
          <figure class="flex items-center">
            <img
              class="rounded-lg h-80"
              src="${photo}"
              alt="${name} ${lastname}"
            />
          </figure>
          <span class="text-gray-500 text-lg">Age: ${birthDate}</span>

          <article>
            <p class="text-justify">
             ${description}
            </p>
          </article>
          <div
            class="flex w-full flex-col md:flex-row gap-2 justify-between mt-3"
          >
            <button
              class="bg-orange-300 rounded-lg py-2 px-4 hover:bg-orange-600 hover:text-stone-100 cursor-pointer w-full md:w-42"
            >
              Editar
            </button>
            <button
              class="bg-red-300 rounded-lg py-2 px-4 hover:bg-red-600 hover:text-stone-100 cursor-pointer w-full md:w-42"
            >
              Eliminar
            </button>
          </div>
        </div>
        `;
    dataContainer.appendChild(card);
  });
});

async function getData() {
  const response = await fetch("http://localhost:3000/malecon");
  const data = await response.json();
  return data;
}
