const selectElement = document.getElementById('SelectCiudades');
selectElement.addEventListener('change', displayData);

async function fetchData(latitud, longitud) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=25153e2e94aa1b62fb1e91e29b544298`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw 'Error al obtener los datos';
    }
  }
  
  async function displayData() {
    try { 
      const opcion = document.getElementById('SelectCiudades');
      let valor = opcion.value;
      let [latitud, longitud] = valor.split(',');
  
      let data = await fetchData(latitud, longitud);
  
      let dataContainer = document.getElementById('data-container');
      dataContainer.innerHTML = ''
      let contenidoTabla = `
        <div class="card">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top" alt="clima">
          <div class="card-body">
            <h3>${data.name}</h3>
            <p class="card-text">
              Temperatura: ${Math.round((data.main.temp)-273.15)} °C<br>
              Viento: ${data.wind.speed} k/h<br>
              Latitud: ${data.coord.lat} <br>
              Longitud: ${data.coord.lon} <br>
              Pais: ${data.sys.country}
            </p>
          </div>
        </div>
        `;
      dataContainer.insertAdjacentHTML('beforeend',contenidoTabla)
     
    } catch (error) {
      console.error(error);
    }
  }
  
  displayData();
  