const labelIPInX = [];
const dataIPInY = [];
const dataIPInY2 = [];
var timer;

const ctx2 = document.getElementById('sensor4').getContext('2d');
const myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labelIPInX,
        datasets: [
            {
                label: 'Datagramas UDP recebidos',
                data: dataIPInY,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2
            },
            {
                label: 'Datagramas UDP enviados',
                data: dataIPInY2,
                backgroundColor: [
                    '#4169E1',
                ],
                borderColor: [
                    '#4169E1',
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
                  text: 'Hora'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Contagem'
                },
                //beginAtZero: true,
                //type: 'logarithmic',
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

//objetos para gerar diferença na quantidade de datagramas UDP, e não somente o valor
let antigoR = {}, antigoE = {}, atualR = {}, atualE = {}, aux = {};
antigoR.prop = 0;
antigoE.prop = 0;
aux.prop = 0;

//adicionando eventos nos botões
document.getElementById("btnIniciar").addEventListener('click',function (){
    console.log("Iniciando o monitoramento!!");
    timer = setInterval(snmpGet, 5000); //aqui será definido o intervalo de tempo paragerar gráfico
});

document.getElementById("btnParar").addEventListener('click',function (){
    console.log("Parando o monitoramento!!");
    clearInterval(timer);
});


//requisição SNMP
function snmpGet(){
    $.ajax({
        url: "../sensor4.php",
        method: "POST",
        data: { ip: ip},
        success: function (response){
            let infos = JSON.parse(response);

            if (aux.prop == 0){
                //se for a primeira vez que está pegando o valor, vai retornar zero para a diferença
                antigoR.prop = infos.recebidos;
                antigoE.prop = infos.enviados;
                diferencaR = parseInt(infos.recebidos) - antigoR.prop;
                diferencaE = parseInt(infos.enviados) - antigoE.prop;
                aux.prop = 1;
            }else{
                //depois disso vai pegar o atual menos o anterior
                diferencaR = parseInt(infos.recebidos) - antigoR.prop;
                diferencaE = parseInt(infos.enviados) - antigoE.prop;
            }

            dataIPInY.push(parseInt(diferencaR));
            dataIPInY2.push(parseInt(diferencaE));

            var dateTime = new Date();
            labelIPInX.push(dateTime.toLocaleTimeString());

            antigoR.prop = infos.recebidos;
            antigoE.prop = infos.enviados;

            myChart.update();
        } 
    })
}

