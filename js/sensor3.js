//Ouvir quando o botão de busca for clicado
var button = document.querySelector('#busca');
button.addEventListener('click', function click(e){

    var carrega = document.querySelector("#carregar");
    carrega.setAttribute('class', 'spinner-border');
    carrega.setAttribute('role', 'status');

    document.querySelector("#erro").innerHTML = "";
    let ip =  document.getElementById("recebeIp").value;
    document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + ip + "</b>";

        //alert(data.ip);
        $.ajax({
            url: "../consultaIp.php",
            method: "POST",
            data: { ip: ip},
            success: function (response) {
                if (response == "sucesso"){
                    $.ajax({
                        url: "../sensor3.php",
                        method: "POST",
                        data: { ip: ip},
                        success: function (response) {
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
                        }
                    })
                }else{
                    carrega.setAttribute('class', '');
                    carrega.setAttribute('role', '');
                    document.querySelector("#printaIp").innerHTML = "IP em consulta: ";
                    document.querySelector("#erro").innerHTML = "<b>ERRO</b> na consulta (infome outro <b>IP</b>)";

                    var img = document.querySelector("#imgSO");
                    img.setAttribute('src', '../img/vazio.png');
                    document.querySelector("#so").innerHTML = "";
                    document.querySelector("#nome").innerHTML = "";
                    document.querySelector("#hardware").innerHTML = "";
                    document.querySelector("#software").innerHTML = "";
                }
            }
        })
})

let buttonReiniciar = document.querySelector('#btnReiniciar');
buttonReiniciar.addEventListener('click', function click(e){
    document.location.reload(true);
})