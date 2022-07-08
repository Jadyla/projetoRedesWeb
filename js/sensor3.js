//Ouvir quando o botão de busca for clicado
var button = document.querySelector('#busca');
button.addEventListener('click', function click(e){
    let ip =  document.getElementById("recebeIp").value;
    document.querySelector("#printaIp").innerHTML = "IP em consulta: " + "<b>" + ip + "</b>";
    //alert(data.ip);
    $.ajax({
        url: "../sensor3.php",
        method: "POST",
        data: { ip: ip},
        success: function (response) {
            var infos = JSON.parse(response);
            console.log(response);
            if (infos.so == "Windows"){
                var img = document.querySelector("#imgSO");
                img.setAttribute('src', '../img/windows.png');
            }else{
                var img = document.querySelector("#imgSO");
                img.setAttribute('src', '../img/linux.png');
                console.log(infos);
            }
            document.querySelector("#so").innerHTML = "Sistema Operacional: " + infos.so;
            document.querySelector("#nome").innerHTML = "Nome: " + infos.nome;
            document.querySelector("#hardware").innerHTML = "Hardware: " + infos.hard;
            document.querySelector("#software").innerHTML = "Software: " + infos.soft;
        }
    })
})