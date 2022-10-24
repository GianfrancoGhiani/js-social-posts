
/*
Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*

Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS
 1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
Consigli del giorno:
> Ragioniamo come sempre a step.
> Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
> console.log() è nostro amico.
> Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2022-05-15" //li ho modificati per non ottenere solo date maggiori di un anno
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": ''
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2022-03-05" //li ho modificati per non ottenere solo date maggiori di un anno
    }
];

/*
creo una funzione che associ ad ogni chiave dell'oggetto post il contenitore nel html e ne trasferisca il valore

creo array per ogni tipo di contenitore e dentro ci assegno i valori ciclando i due array html-oggetto assieme
assegno id al post con dataset
*/
function myElemCreation(htmlcont, classToAdd){
    const element = document.createElement(`${htmlcont}`);
    element.className = `${classToAdd}`;
    return element
};

const likedPost = [];
function postGenerator(txtcontent, media, name, propic, likes, date, id){
    function like(){
        let newlikes = likes;
        postLikesBtn.classList.toggle('like-button--liked');
        likedPost.push(id);
        const toRemove = document.getElementById('like-counter-1');
        postLikesCounterText.remove(toRemove);
        newlikes += 1;
        postLikesCounterText.innerHTML = `Piace a <b id="like-counter-2" class="js-likes-counter">${newlikes}</b> persone`;
        postLikesCounter.append(postLikesCounterText);
        console.log(likedPost);
        postLikesCTA.removeEventListener('click', like);

        postLikesCTA.addEventListener('click', dislike);
    };
    function dislike(){
        const toRemove = document.getElementById('like-counter-2');
        postLikesCounterText.remove(toRemove);
        postLikesCounterText.innerHTML = `Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone`;
        postLikesCounter.append(postLikesCounterText);

        postLikesCTA.addEventListener('click', like);

        if (likedPost.includes(id)){
            for (let [i,elem] of likedPost.entries()){
                if (elem == id){
                    likedPost.splice(i, 1);
                }
            }
        }
        console.log(likedPost)
    };
    
    const divPost = myElemCreation('div', 'post');
    const postHeader = myElemCreation('div','post__header');
    const postMeta = myElemCreation('div', 'post-meta');
    const postProPicCont = myElemCreation('div', 'post-meta__icon');
    const postProPic = myElemCreation('img', 'profile-pic');
    postProPic.src = `${propic}`;
    postProPicCont.append(postProPic);
    postMeta.append(postProPicCont);

    const postUserDateCont = myElemCreation('div', 'post-meta__data');
    const postUser = myElemCreation('div', 'post-meta__author');
    postUser.innerText = `${name}`;
    const postDate = myElemCreation('div', 'post-meta__time');
    postDate.innerText = `${date}`;
    postUserDateCont.append(postUser);
    postUserDateCont.append(postDate);
    postMeta.append(postUserDateCont);
    postHeader.append(postMeta);

    const postText = myElemCreation('div', 'post__text');
    postText.innerText = `${txtcontent}`;
    const postImgCont = myElemCreation('div', 'post__image');
    const postImg = myElemCreation('img', '');
    postImg.src = `${media}`;
    postImgCont.append(postImg);

    const postFooter = myElemCreation('div', 'post__footer');
    const postLikes = myElemCreation('div', 'likes js-likes');
    const postLikesCTA = myElemCreation('div', 'likes__cta');
    
    postLikesCTA.addEventListener('click', like);
    

    const postLikesBtn = myElemCreation('a', 'like-button  js-like-button');
    const postLikesIcon = myElemCreation('i', 'like-button__icon fas fa-thumbs-up');
    const postLikesText = myElemCreation('span', 'like-button__label');
    postLikesText.innerText =` Mi Piace`;
    postLikesBtn.append(postLikesIcon);
    postLikesBtn.append(postLikesText);
    postLikesCTA.append(postLikesBtn);

    const postLikesCounter = myElemCreation('div', 'likes__counter');
    const postLikesCounterText = myElemCreation('p','js-likes-counter');
    postLikesCounterText.innerHTML = `Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone`;
    postLikesCounter.append(postLikesCounterText);

    postLikes.append(postLikesCTA);
    postLikes.append(postLikesCounter);
    postFooter.append(postLikes);

    divPost.append(postHeader);
    divPost.append(postText);
    divPost.append(postImgCont);
    divPost.append(postFooter);
    return divPost
}
const page = document.getElementById('container');

posts.forEach((value)=>{

    const date = new Date();
    let creationTime;
    const created = value.created.split('-');
    if ((date.getFullYear() - created[0] >= 1)){
        creationTime = `${date.getFullYear() - created[0]} anno fa`;
    } else if ((date.getMonth() - created[1] < 12) && (date.getMonth() - created[1] > 1)){
        creationTime = `${date.getMonth() - created[1]} mesi fa`;
    } else {
        creationTime = `${date.getDay() - created[2]} giorni fa `;
    }
    
    let post = postGenerator(value.content,value.media, value.author.name, value.author.image, value.likes, creationTime, value.id);
    post.dataset.id = `${value.id}`;
    page.append(post);
});
