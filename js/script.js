const buscarEndereco = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.status == 200)
            return await response.json();
        else
            throw Error(`Request failed with status: ${response.status}`);
    } catch (erro) {
        return erro;
    }
}

const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

document.addEventListener("DOMContentLoaded", () => {

    const cep = document.getElementById("cep");
    cep.addEventListener("keypress", (e) => {
        if (numeros.includes(e.key)) {
            if (cep.value.length == 5) {
                cep.value += '-';
            }
        } else
            e.preventDefault();
    });

    document.getElementById("buscar").addEventListener("click", () => {
        buscarEndereco(document.getElementById("cep").value)
            .then((response) => {
                if (response.erro == "true")
                    throw Error("Cep não corresponde a um endereço valido.");

                document.getElementById("estado").value = response.estado;
                document.getElementById("cidade").value = response.localidade;
                document.getElementById("bairro").value = response.bairro;
                document.getElementById("logradouro").value = response.logradouro;

            }).catch((erro) => {
                alert(erro);
            });
    })

    document.getElementById("limpar").addEventListener("click", () => {
        document.getElementById("cep").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("logradouro").value = "";
    })
});