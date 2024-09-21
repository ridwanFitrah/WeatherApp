// start function untuk menampilkan lokasi kita sesuai koordinat kita ssat ini//
function succes(position) {
    const lat=position.coords.latitude

    const lon=position.coords.longitude

     getWeather(lat,lon)
     displayWeekWeather(lat,lon)
}
if(navigator.geolocation){
    // Cek apakah browser mendukung Geolocation API//
    navigator.geolocation.getCurrentPosition(succes);
}
// end function untuk menampilkan lokasi kita sesuai koordinatnya cuacanya//

// start function untuk mencari lokasi kita sesuai data apinya//
function getWeather(lat,lon){
   return fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=5871f220194c994b44193fd6be93659f&limit=5&units=metric&lat=${lat}&lon=${lon}`)
   .then(response=>{
    //menguraikan data response sebagai json//
    if(!response.ok){
        throw new Error(console.log('ahhahahahhahahahha'))
    }
    return response.json()
   })
   // menguraikan data dari return response diatas//
   .then(data=>{
     const weather=document.querySelector('.conten')
     weather.innerHTML= updateCity(data)
     const tempStatus=document.querySelector('.media-Icontemp')
    tempStatus.innerHTML=weatherStatus(data)
    weatherIcon(data);
   })
}


// start untuk mencari data suatu wilayah//
const searchButton=document.querySelector('.search-button')
searchButton.addEventListener('click',async function (){
try{
const input=document.querySelector('.input-keyword')
const Cities= await getCity(input.value)
// console.log(Cities) 
//tambah background cuacanya
weatherIcon(Cities);
//update nama kota nya
const conten=document.querySelector('.media-container')
conten.innerHTML=updateCity(Cities)

const tempStatus=document.querySelector('.media-Icontemp')
tempStatus.innerHTML=weatherStatus(Cities)
}
catch(x){
    return x;
}
    
})

// start function untuk mencari nama tempat sesuai dengan apinya sesuai kondisi cuacanya//
function getCity(keyword){
    return fetch('https://api.openweathermap.org/data/2.5/weather?&appid=5871f220194c994b44193fd6be93659f&limit=5&units=metric&q='+keyword)
    .then(response=>{
        // console.log(response)
        if(!response.ok){
            throw new Error(swal(`city or country ${response.statusText}`))
        };
        inputdisplayWeekWeather(keyword);
        return response.json()
    })
}
//end//

// start function untuk menampilkan icon sesuai kondisi cuacanya//
function weatherIcon(w){
    const weather=w.weather[0].main;
    const weatherDescription=w.weather[0].description;
    const updateIcon= document.querySelector('.media-container')
    updateIcon.classList.remove('rain','overcast','clearsky','fewclouds','haze')
    setTimeout(() => {
    if(weather==="Rain"){
     updateIcon.classList.add('rain')   
    }
    else if(weather ==="Clouds"){
        if(weatherDescription ==="overcast clouds"){
            updateIcon.classList.add('overcast');
            console.log(updateIcon)
        }
        else{
            updateIcon.classList.add('fewclouds');
        }
    }
    else if(weather==="Clear"){
        if(weatherDescription==="clear sky"){
       updateIcon.classList.add('clearsky');
       console.log(updateIcon)
        }
    }
    else if(weather==="Haze"){
        updateIcon.classList.add('haze')
    }
}, 500)
   
}

// end function untuk menampilkan icon sesuai kondisi cuacanya//

// start function untuk mendpatkan perkiraan cuaca pada waktu sesuai kooordinat tertentu//
function displayWeekWeather(lat,lon){
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?&appid=5871f220194c994b44193fd6be93659f&limit=5&units=metric&lat=${lat}&lon=${lon}`)
   .then(response=>{
    //menguraikan data response sebagai json//
    if(!response.ok){
        throw new Error("lokasi tidak akurat")
    }
    return response.json()
   })
   .then(data=>{
    console.log(data)
  
    let card='';
    const balana=data.list.slice(0,6)
    console.log(balana)
    balana.forEach(day => {
        const updateUI=updateWeather(day)
        card += updateUI
        const updateW=document.querySelector('.media-update-weather')
        updateW.innerHTML=card;
    });  
})
}
// end function untuk mendpatkan perkiraan cuaca pada waktu sesuai kooordinat tertentu//

// start function untuk mendpatkan perkiraan cuaca pada waktu sesuai inputan.value tertentu//
function inputdisplayWeekWeather(keyword){
    return fetch('https://api.openweathermap.org/data/2.5/forecast?&appid=5871f220194c994b44193fd6be93659f&limit=5&units=metric&q='+keyword)
   .then(response=>{
    //menguraikan data response sebagai json//
    if(!response.ok){
        throw new Error(swal("lokasi tidak ditemukan"))
    }
    return response.json()
   })
   .then(data=>{
    console.log(data)
  
    let card='';
    const balana=data.list.slice(0,6)
    console.log(balana)
    balana.forEach(day => {
        const updateUI=updateWeather(day)
        card += updateUI
        const updateW=document.querySelector('.media-update-weather')
        updateW.innerHTML=card;
    }); 
 
})
}
// end function untuk mendpatkan perkiraan cuaca pada waktu sesuai inputan.value tertentu//

// // 
function updateWeather(day){

        const dateTime=day.dt_txt
        const date=new Date(dateTime)
        let ampm=(date.getHours() >=12)? "PM":"AM";
        const result=`${date.getHours()} ${ampm}`
        console.log(result)     
    return` 
            <div class="col-4 col-md-2 p-0">  
            <h2>${result}</h2>
            <h1>${Math.round(day.main.temp)}<span>°c</span></h1>
            <p>${day.weather[0].description}</p>
            </div>
    
           `
}
function updateCity(data){
    return `
            <h2 class="text-center temperature ">${Math.round(data.main.temp)}<span>°c</span></h2>
            <h5 class="text-body-secondary text-center status"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg> ${data.name}, ${data.sys.country}</h5>
      
            <h2 class="text-body-secondary text-center status">${data.weather[0].main}</h2>
            <h2 class="text-body-secondary text-center status">${data.weather[0].description}</h2>
            `
        }



function weatherStatus(x){
    return ` 
             <h5 class="time-clock text-center">00:00:00</h5>
             <h2 class="text-center">${Math.round(x.main.temp)}<span>°c</span></h2>
            <h5 class="text-body-secondary text-center status"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg> ${x.name}, ${x.sys.country}</h5>
            <h2 class="text-body-secondary text-center status">${x.weather[0].main}</h2>
            <div class="row md-4 my-3">
            <div class="col ms-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>  
            </svg>
            <span class="wind-speed">${x.wind.speed}<span> Km/h</span></span>
            </div>
            <div class="col">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-droplet " viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                    <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                </svg>
                <span class="humidity">${x.main.humidity}<span>%</span></span>
            </div>
             </div>
             <div class="row md-4 my-3">
            <div class="col ms-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-crosshair2" viewBox="0 0 16 16">
            <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
            </svg>
                <span class="humidity">Lat: ${x.coord.lat}</span>
            </div>
            <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-crosshair2" viewBox="0 0 16 16">
            <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
            </svg>
                <span class="humidity">Lon: ${x.coord.lon}</span>
            </div>
           </div>
            </div>`
}