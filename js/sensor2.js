const labelIPInX = [];
const dataIPInY = [];
var timer;

const ctx2 = document.getElementById('sensor2').getContext('2d');
const myChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labelIPInX,
        datasets: [{
            label: 'Quantidade de Processos',
            data: dataIPInY,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2
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
                    text: 'Quantidade de Processos'
                },
                //beginAtZero: true,
                // type: 'logarithmic',
                // min: 100000,
                // max: 300000,
            }
        }
    }
});

//desabilitar botoes até receber ip
let buttonIniciar = document.querySelector("#btnIniciar");
buttonIniciar.disabled = true;
let buttonParar = document.querySelector("#btnParar");
buttonParar.disabled = true;

let ip;

//quando clicar no botão buscar
var button = document.querySelector('#busca');
button.addEventListener('click', function click(e){
    ip =  document.getElementById("recebeIp").value;

    var carrega = document.querySelector("#carregar");
    carrega.setAttribute('class', 'spinner-border');
    carrega.setAttribute('role', 'status');

    

    $.ajax({
        url: "../consultaIp.php",
        method: "POST",
        data: { ip: ip},
        success: function (response){
            //5 segundos antes de fornecer a resposta
            window.setTimeout(function() {
                document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + ip + "</b>";
                buttonIniciar.disabled = false;
                buttonParar.disabled = false;
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
            }, 5000);
        }
    })
})

//Adicionando eventos nos botões
document.getElementById("btnIniciar").addEventListener('click',function (){
    console.log("Iniciando o monitoramento!!");
    timer = setInterval(snmpGet,5000);
});

document.getElementById("btnParar").addEventListener('click',function (){
    console.log("Parando o monitoramento!!");
    clearInterval(timer);
});

//Requisição SNMP
function snmpGet(){
    $.ajax({
        url: "../sensor2.php",
        method: "POST",
        data: { ip: ip},
        success: function (response){
            console.log(response);
            var dateTime = new Date();
            labelIPInX.push(dateTime.toLocaleTimeString());
            dataIPInY.push(parseInt(response));
            myChart.update();
        } 
    })
}

