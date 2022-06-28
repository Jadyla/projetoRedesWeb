let labelIPInX = [];
let dataIPInY = [];
let timer;

const ctx = document.getElementById('sensor1').getContext('2d');

const sensor1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelIPInX,
        datasets: [{
            label: '# of Votes',
            data: dataIPInY,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
               
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Data/Hora'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Quantidade de Datagrmas'
                }
            }
        }
    }
});


//funcao para receber e buscar o ip ajax
function buscarIP() {
    let ip =  document.getElementById("recebeIp").value;
    //alert(data.ip);
    $.ajax({
        url: "../sensor1.php",
        method: "POST",
        data: { ip: ip},
        success: function (response) {
            console.log(response);
            var dateTime = new Date();
            labelIPInX.push(dateTime.toLocaleTimeString());
            dataIPInY.push(parseInt(response));
            sensor1.update();
        }
    })
}

//funcao para parar o monitoramento
document.getElementById("btnParar").addEventListener('click',function(){
    console.log("Parando Monitoramento!!");
    clearInterval(timer);
});

//funcao para iniciar monitoramento
document.getElementById("btnIniciar").addEventListener('click',function(){

    let ip = document.getElementById("recebeIp").value;
    
    console.log("Iniciando o Monitoramento!" + ip);
    timer = setInterval(buscarIP,2000);
    
    console.log("Timer " + timer);
});

