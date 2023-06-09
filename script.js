const cardsContainer=document.getElementById('cards-container');
const showBtn=document.getElementById('show');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');
const currentEl=document.getElementById('current');
const hideBtn=document.getElementById('hide');
const addContainer=document.getElementById('add-container');
const addCardBtn=document.getElementById('add-card');
const questionEl=document.getElementById('question');
const answerEl=document.getElementById('answer');
const cardsEl=[]
const cardsData=getCardsData();
let currentActiveCard=0;
function createCards(){
    cardsData.forEach((data, index)=>createCard(data, index));
}
function createCard(data, index){
    const card=document.createElement('div');
    card.classList.add('card');
    if(index===0){
        card.classList.add('active');
    }
    card.innerHTML=`
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', ()=>{
        card.classList.toggle('show-answer');
    });
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}
function updateCurrentText(){
    currentEl.innerText=`${currentActiveCard+1}/${cardsEl.length}`;
}
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'));
    return cards===null?[]:cards;
}
function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}
createCards();
nextBtn.addEventListener('click', ()=>{
    cardsEl[currentActiveCard].className='card left';
    currentActiveCard++;
    if(currentActiveCard>cardsEl.length-1){
        currentActiveCard=cardsEl.length-1;
    }
    cardsEl[currentActiveCard].className='card active';
    updateCurrentText();
})
prevBtn.addEventListener('click', ()=>{
    cardsEl[currentActiveCard].className='card right';
    currentActiveCard--;
    if(currentActiveCard<0){
        currentActiveCard=0;
    }
    cardsEl[currentActiveCard].className='card active';
    updateCurrentText();
})
showBtn.addEventListener('click', ()=>{
    addContainer.classList.add('show');
});
hideBtn.addEventListener('click', ()=>{
    addContainer.classList.remove('show');
});
addCardBtn.addEventListener('click', ()=>{
    const question=questionEl.value;
    const answer=answerEl.value;
    if(question.trim()&&answer.trim()){
        const newCard={question, answer};
        createCard(newCard);
        questionEl.value='';
        answerEl.value='';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});