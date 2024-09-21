const d=new Date()
const tanggal=document.querySelector('.time-date')
tanggal.innerHTML=d.toDateString()

function startTime(){
    const today=new Date()
    let hours=today.getHours()
    let ampm=(today.getHours() >=12)? "PM":"AM";
    let minute=today.getMinutes()
    let second =today.getSeconds()
    hours=checkTime(hours);
    minute=checkTime(minute);
    second=checkTime(second);
    document.querySelector('.time-clock').innerHTML=`${hours} : ${minute} : ${second} ${ampm}`
    
}
setInterval(startTime,1000);
function checkTime(i){
    if(i<10){
        i="0"+i
    };
    return i;
}

function greeTing(){
    const greting=document.querySelector('.greeting')
    const date=new Date()
    const hour=date.getHours()
    if(hour<=11){
    greting.innerHTML="Good Morning"
    }
    else if(hour>=12 && hour<=18){
    greting.innerHTML="Good Afternoon"
    }
    else if(hour>=19){
        greting.innerHTML="Good Evening"
    }
}
greeTing();

