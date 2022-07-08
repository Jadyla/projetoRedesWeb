//Ouvir quando o botão de busca for clicado
var button = document.querySelector('#busca');
button.addEventListener('click', function click(e){
    var carrega = document.querySelector("#carregar");
    carrega.setAttribute('class', 'spinner-border');
    carrega.setAttribute('role', 'status');
    var seRespondeu = 0;

    document.querySelector("#erro").innerHTML = "";
    let ip =  document.getElementById("recebeIp").value;
    document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + ip + "</b>";


    var tempo = 1;
    var intervalo = window.setInterval(function() {
        document.querySelector(".contagem").innerHTML = tempo++;
    }, 1000);

        //alert(data.ip);
        $.ajax({
            url: "../sensor3.php",
            method: "POST",
            data: { ip: ip},
            success: function (response) {
                clearInterval(intervalo); //vai parar o cronômetro
                seRespondeu = 1;
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
                var infos = JSON.parse(response);
                if (infos.so == "Windows"){
                    var img = document.querySelector("#imgSO");
                    img.setAttribute('src', '../img/windows.png');
                }else{
                    var img = document.querySelector("#imgSO");
                    img.setAttribute('src', '../img/linux.png');
                    console.log(infos);
                }
                document.querySelector("#so").innerHTML = "<b>" + "Sistema Operacional: " + "</b>" + infos.so;
                document.querySelector("#nome").innerHTML = "<b>" + "Nome: " + "</b>" + infos.nome;
                document.querySelector("#hardware").innerHTML = "<b>" + "Hardware: " + "</b>" + infos.hard;
                document.querySelector("#software").innerHTML = "<b>" + "Software: " + "</b>" + infos.soft;
            },
            error: function (request, status, error) {
                document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + "ERRO" + "</b>";
                clearInterval(intervalo);
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
            }
        })
        window.setTimeout(function() {
            //vai limitar em 10 seguntos a falta de retorno
            if (seRespondeu = 1){
                carrega.setAttribute('class', '');
                carrega.setAttribute('role', '');
                clearInterval(intervalo);
                document.querySelector("#printaIp").innerHTML = "IP em consulta: ";
                document.querySelector("#erro").innerHTML = "ERRO na consulta";

                var img = document.querySelector("#imgSO");
                img.setAttribute('src', '../img/vazio.png');
                document.querySelector("#so").innerHTML = "";
                document.querySelector("#nome").innerHTML = "" ;
                document.querySelector("#hardware").innerHTML = "";
                document.querySelector("#software").innerHTML = "";
            }
        }, 10000);
    
})