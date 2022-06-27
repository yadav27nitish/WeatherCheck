
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp  = document.getElementById('temp');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');
const max_temp = document.getElementById('max_temp');
const min_temp = document.getElementById('min_temp');
const if_no_data = document.getElementById('if_no_data');

// for hiding yhe weathe temp in case empty city name and any exception 
//here we acessing through class name 
//const dataHide = document.querySelector('.dataHide');


//Day
const getCurrentDay = function(){
    //This function help us to get the Day.
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentTime = new Date();
    day.innerText = weekday[currentTime.getDay()];
};

//Date and Time
const getCurrentTime = function(){
    //This function help us to get the Date and time.
    var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    var year = now.getFullYear();
    
    var hours = now.getHours();
    var min = now.getMinutes();
    var shift = 'AM';
    if(hours>11){
        shift='PM';
        if(hours>12) {hours -= 12;}  // doing bcz we want time in 12h format.
    }
    if(min<10){min = '0'+min}
    today_date.innerText = `${monthNames[month]} ${day} | ${hours}:${min}${shift}`;

    
}


const getinfo = async(event)=>{
    event.preventDefault();  
    const cityValue = cityName.value;

    if(cityValue===""){
        city_name.innerText = 'Please Enter the City Name.';
        //dataHide.classList.add('dataHide');
    }else{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=46fce617d6ab37b55cec9ebcdec326b0&units=metric`;
            const res = await fetch(url);
            const data = await res.json();
            const array_Data = [data];
            //console.log(array_Data);

            city_name.innerText = `${array_Data[0].name}, ${array_Data[0].sys.country}`;
            temp.innerText = array_Data[0].main.temp;
            const tempMood = array_Data[0].weather[0].main;
            max_temp.innerText = `Max ${array_Data[0].main.temp_max}`;
            min_temp.innerText = `Min ${array_Data[0].main.temp_min}`;

            //console.log(tempMood);

            //WEATHER STATUS
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas fa-cloud-showers-water' style='color: #a4b0be;'></i>";
            } else if(tempMood == "Haze"){
                temp_status.innerHTML =
                "<i class='fas fa-smog' style='color: #a4b0be;'></i>";
            }else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }

            //dataHide.classList.remove('dataHide');

        }catch{
            city_name.innerText =  `Please enter the proper city name`;
            //dataHide.classList.add('dataHide');
        }

        
    }
}
getCurrentDay();
getCurrentTime();
submitBtn.addEventListener('click',getinfo);