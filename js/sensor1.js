const labelIPInX = [];
const dataIPInY = [];
const dataIPInY2 = [];
var timer;

const ctx2 = document.getElementById('sensor1').getContext('2d');
const myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labelIPInX,
        datasets: [
            {
                label: 'Total de Datagramas Recebidos',
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
                label: 'Datagramas UDP recebidos',
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
                stacked: true,
                title: {
                  display: true,
                  text: 'Porcentagem'
                }
            },
            y: {
                display: true,
                stacked: true,
                title: {
                    display: true,
                    text: 'Datagramas'
                }
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
            //console.log(response);
            if (response == "sucesso"){
                console.log("FOIIIII");
                document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + ip + "</b>";
                document.querySelector("#erro").innerHTML = "";
                buttonIniciar.disabled = false;
                buttonParar.disabled = false;
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
            }else{
                console.log("OLHA O ERRO AE");
                buttonIniciar.disabled = true;
                buttonParar.disabled = true;
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
                document.querySelector("#printaIp").innerHTML = "IP em consulta: ";
                document.querySelector("#erro").innerHTML = "<b>ERRO</b> na consulta (infome outro <b>IP</b>)";
            }
        }
    })
    
})


//adicionando eventos nos botões
document.getElementById("btnIniciar").addEventListener('click',function (){
    console.log("Iniciando o monitoramento!!");
    timer = setInterval(snmpGet, 5000); //aqui será definido o intervalo de tempo para gerar gráfico
});

document.getElementById("btnParar").addEventListener('click',function (){
    console.log("Parando o monitoramento!!");
    clearInterval(timer);
});


//requisição SNMP
function snmpGet(){
    $.ajax({
        url: "../sensor1.php",
        method: "POST",
        data: { ip: ip},
        success: function (response){
            let infos = JSON.parse(response);

            dataIPInY.push(parseInt(infos.total));
            dataIPInY2.push(parseInt(infos.udp));

            labelIPInX.push(infos.porcent + "%");

            myChart.update();
        } 
    })
}

let buttonReiniciar = document.querySelector('#btnReiniciar');
buttonReiniciar.addEventListener('click', function click(e){
    document.location.reload(true);
})