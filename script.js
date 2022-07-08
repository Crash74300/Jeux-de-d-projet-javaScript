

//Déclaration des variables//
let j1 = "";
let j2 = "";
var total1 = 0;
var total2 = 0;
var cumul = 0;
var chiffre = 0;
var score1 = document.querySelector('#score1');
var score2 = document.querySelector('#score2');
var stock1 = document.querySelector('#point1');
var stock2 = document.querySelector('#point2');
var current = 1;
var shadow1 = document.querySelector('.j1');
var shadow2 = document.querySelector('.j2');
const newGame = document.querySelector('#new');
const dé = document.querySelector('#bouton-jeux');
const val = document.querySelector('#bouton-val');
const cube = document.querySelector('.cube');
const regles = document.querySelector('#bouton-regles');


dé.style.display = 'none';
val.style.display = 'none';


//son//
var casse = document.createElement("audio");
casse.src = "./son/casse.mp3";

var applaudissement = document.createElement("audio");
applaudissement.src = "./son/applaudissement.mp3";

var musique = document.createElement("audio");
musique.src = "./son/musique.mp3";

//Fonctions nouvelle partie//

function Game() {
  musique.play();
  dé.style.display = 'block';
  val.style.display = 'block';
  dé.disabled = false;
  val.disabled = false;
  total1 = 0;
  score1.textContent = total1;
  total2 = 0;
  score2.textContent = total2;
  cumul = 0;
  stock1.textContent = cumul;
  stock2.textContent = cumul;
  shadow()
//Demander le nom du joueur 1//
  j1 = prompt('Prénom du joueur 1');
//Si aucun nom n'est entré, par default ce sera joueur 1//
  if(j1.length<1){
    j1 = "Joueur 1";
  };
//Demander le nom du joueur 2//
  j2 = prompt('Prénom du joueur 2');
//Si aucun nom n'est entré, par default ce sera joueur 2//
  if(j2.length<1){
    j2 = "Joueur 2";
  };
//Selecteur de la classe nom pour modifier le text avec le nom des joueurs//
  let nom1 = document.querySelector('.nom1');
  let nom2 = document.querySelector('.nom2');
  nom1.textContent = j1;
  nom2.textContent = j2;
  return;
}
function shadow(){
if(current == 1){
  shadow1.style.boxShadow = '5px 5px 5px red';
  shadow1.style.transform = 'scale(1.5)';
  shadow2.style.boxShadow = '5px 5px 5px black';
  shadow2.style.transform = 'scale(1)';
}else{
  shadow1.style.boxShadow = '5px 5px 5px black';
  shadow1.style.transform = 'scale(1)';
  shadow2.style.boxShadow = '5px 5px 5px red';
  shadow2.style.transform = 'scale(1.5)';

}};
//Ecoute le clic sur le bouton nouvelle partie//

newGame.addEventListener("click", () => {
  Game();
}, false);

regles.addEventListener("click", () => {
  window.confirm("Bienvenue à la taverne de Dédé! Le joueur 1 lance le dé le premier, le but étant d'atteindre le score de 50 points. Vous pouvez lancer le dé plusieurs fois de suite ce qui va cumuler les points dans le stock. Le bouton stocker les points ajoute votre stock dans le score. Attention, si le dé tombe sur le 1 votre stock est vidé et le tour passe au joueur suivant. ")
}, false);

val.addEventListener("click", () => {
  stocker();
}, false);

// Lancer les dés//

dé.addEventListener("click", () => {
    dé.disabled = true;
    val.disabled = true;
    let result = lancer(1,6);
    reload();
    setTimeout(() => {
      rotation(result);
    }, 2000);
    

  if (current == 1){
    if(result == 1){
      return perdu()}else
    {
  cumul = cumul + result;
  setTimeout(() => {
    stock1.textContent = cumul;
  }, 4000);
  setTimeout(() => {
    dé.disabled = false;
    val.disabled = false;
  }, 4000);
    }
  }else{
    if(result == 1){

      return perdu();
    }else{
      setTimeout(() => {
      cumul = cumul + result;
        stock2.textContent = cumul;
      }, 4000);
      setTimeout(() => {
        dé.disabled = false;
        val.disabled = false;
      }, 4000);
    }}}, false);
 
    /*joueur suivant*/

function next(){
  if(total1 >= 50 || total2 >= 50){
    return win();
};
  
  if(current == 1){
    notification();
    current = 2;
    cumul = 0;
    stock1.textContent = cumul;
    shadow()

  }else{
    notification();
    dé.disabled = false;
    current = 1;
    cumul = 0;
    stock2.textContent = cumul;
    shadow()
  }
}

/*Perdu*/

function perdu(){
  setTimeout(() => {
    casse.play()
    next();
    dé.disabled = false;
    val.disabled = false;
    }, 4000);
 
  
}

/*Lancer les dés*/

function lancer(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return result;
};

/*Stocker les points*/
function stocker() {
  if(current == 1){
    total1 = total1 + cumul;
    score1.textContent = total1;
    next();
    }else{
      total2 = total2 + cumul;
    score2.textContent = total2;
    next()
    }
  };

/*Gagné!*/
function win() {

  if(current == 1){
    window.alert(j1 + ' a gagné!!');
  }else{
    window.alert(j2 + ' a gagné!!');
  }
  total1=0;
  score1.textContent = total1;
  stock1.textContent = total1;
  total2=0
  score2.textContent = total2;
  stock2.textContent = total2;
  cumul = 0;
  applaudissement.play();
};

/*Notification*/
const toast = document.querySelector('#notification');

function notification(){
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
};

function reload(){
  console.log('ok');
  cube.style.transform = 'rotateX(10deg) rotateY(10deg) rotateZ(20deg) ';
  cube.style.transition = 'transform 2s ease-in-out';
}

/*Rotation du dé*/

function rotation(chiffre) {

  if(chiffre == 1){ 
 
     cube.style.transform = 'rotateX(180deg) rotateY(180deg) rotateZ(720deg) '; 
  }
  if(chiffre == 2){
 
    cube.style.transform = 'rotateX(720deg) rotateY(180deg) rotateZ(720deg) ';
  }
  if(chiffre == 3){

    cube.style.transform = 'rotateX(720deg) rotateY(270deg) rotateZ(720deg) ';
  }
  if(chiffre == 4){

    cube.style.transform = 'rotateX(180deg) rotateY(630deg) rotateZ(720deg) ';
  }
  if(chiffre == 5){

    cube.style.transform = 'rotateX(990deg) rotateY(180deg) rotateZ(720deg) ';
  }
  if(chiffre == 6){
 
    cube.style.transform = 'rotateX(810deg) rotateY(180deg) rotateZ(720deg) ';
  }
  cube.style.transition = 'transform 2s ease-in-out';
}

