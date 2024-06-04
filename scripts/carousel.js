const slides = document.querySelectorAll('.proj-li');
console.log(slides);
slides.forEach((slide, indx)=>{
    slide.style.transform = `translateX(${(indx * 120)}%)`;
});


let curSlide = 0

let maxSlide = slides.length - 1;

const nextSlide = document.querySelector('.btn-next');
const prevSlide = document.querySelector('.btn-prev');
nextSlide.addEventListener("click", () =>{
    if(curSlide + 1 === maxSlide){
        nextSlide.disabled = true;
        nextSlide.classList.add("disabled");
    }
    prevSlide.disabled = false;
    prevSlide.classList.remove("disabled");

    curSlide++;
    
    slides.forEach((slide, indx) =>{
        slide.style.transform = `translateX(${120 * (indx - curSlide)}%)`;
    });

});


prevSlide.addEventListener("click", () =>{
    if(curSlide - 1 <= 0){
        prevSlide.disabled = true;
        prevSlide.classList.add("disabled");
    }

    nextSlide.disabled = false;
    nextSlide.classList.remove("disabled");
    curSlide--;
    
    slides.forEach((slide, indx) =>{
        slide.style.transform = `translateX(${120 * (indx - curSlide)}%)`;
    });

});