//criando um array com as músicas
let musicas = [
    //objeto musica 0
    {
        titulo: 'I Hear a Symphony',
        artista: 'Cody Fry',
        src: 'audio/I Hear a Symphony (320 kbps).mp3',
        img: 'img/i hear a symphony.jpg'
    },
    //objeto musica 1
    {
        titulo: 'Love Like You',
        artista: 'Rebecca Sugar',
        src: 'audio/Love Like You (feat. Rebecca Sugar) (End Credits) (320 kbps).mp3', img: 'img/steven universe.jpg'
    },

    //objeto musica 2
    {
        titulo: 'Until I Found You',
        artista: 'Stephen Sanchez',
        src: 'audio/Stephen Sanchez - Until I Found You (Official Music Video) (320 kbps).mp3',
        img: 'img/until i found you.png'
    }
];

//selecionando tags e classes e trazendo para o javasript

//declarando musica para a tag audio
let musica = document.querySelector('audio');

//declarando o index como 0, ou seja sempre a playlist vai comecar pela música 0 do array
let indexMusica = 0;

//declarando a duração da musica para a classe fim
let duracaoMusica = document.querySelector('.fim');

//declarando imagem para a tag img
let imagem = document.querySelector('img');

//declarando o nome da musica para a classe descricao e a tag h2
let nomeMusica = document.querySelector('.descricao h2');

//declarando o nome do artista para a classe descricao e a tag i
let nomeArtista = document.querySelector('.descricao i');

// renderizar utilizando já o array
renderizarMusica(indexMusica);

// não vai mais precisar dessa linha de código ja que ele está dentro da função renderizarMusica
// //alterar da valor da música para o total dela
// duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

//Eventos

//criar o evento de clique no botão play
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

//criar o evento de clique no botão pause
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

//criar evento para verificar se está tocando a música
musica.addEventListener('timeupdate', atualizarBarra);

//criado o evento de clique no botão de anterior e criando uma função anonima ou arrow function
document.querySelector('.anterior').addEventListener('click', () => {
    //trocar de musica, index -1
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

//criado o evento de clique no botão de próximo e criando uma função anonima ou arrow function
document.querySelector('.proxima').addEventListener('click', () => {
    //trocar de musica, index +1
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});


//Funçoes

//criando a função renderizar música com o parâmetro index, pois cada objeto (música) dentro do array tem seu index; 0, 1, 2.
function renderizarMusica(index) {
    //substituindo a propriedade src da tag audio pelo atributo src dentro da array música
    musica.setAttribute('src', musicas[index].src);
    // quando a musica for carregada executando uma função anonima ou arrow function
    musica.addEventListener('loadeddata', () => {
        //mudar as variaveis
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

//função para dar play na música
function tocarMusica() {
    musica.play();
    //aparecer botão de pause quando tocar a música
    document.querySelector('.botao-pause').style.display = 'block';
    //esconder o botão de play
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    //esconder botão de pause quando tocar a música
    document.querySelector('.botao-pause').style.display = 'none';
    //aparecer o botão de play
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress')
    //atualizar a barra
    //usamos o duration que retorna quantos segundos tem a música
    //usamos o currentTime que retorna o estado atual da música, ou seja quando a música estiver na metade ele irá retornar o valor da metade de segundos da duração
    //depois dividimos por cem para obter o valor em porcentage
    //Math.floor para arredondar o valor da porcentagem
    //E irá atualizar a barra através da largura utilizando o .style
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    //atualizar o tempo
    let tempoDecorrido = document.querySelector('.inicio');
    //vamos mudar o conteudo do texto dela
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinuto = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    //consição para aparecer dois digitos para segundo Ex: 9 segundos, vai ficar 09 segundos
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }
    //retornar o campo minuto e segundo de forma correta
    return campoMinuto + ':' + campoSegundos;
}

