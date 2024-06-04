// Hash Change on Url

//hash change on scroll
function updateFragId(){
    var items = importantWindow.querySelectorAll('div.hero');
    var pageData = {}
    for(let section of items){
        // looks for the nearest bouding rectangle among all the <div>s from the parent <div class='hero'>
        var rect = section.getBoundingClientRect().y;
        var pageData = {id:section.id, rect:rect}
        //Bounding range parameters
    if(pageData.rect > -200 && pageData.rect < 400){
        //secondary range to avoid scrolling conflicts
        if(pageData.rect > -100 && pageData.rect <100){
            console.log(location.hash);
            //checks if bounding ID is not equal to current location.hash
            if(pageData.id !== location.hash){
                fragmentId = pageData.id;

                //removing class 'active' from <a> tags
               links.forEach((element) => {
                element.classList.remove('active');
               })

               //Looking for <a> tags that contain the hash that is within the browser view
                const underline = document.querySelector(`a[href$='#${pageData.id}']`);
                // apply 'active' class onto the <a> tag
                underline.classList.add('active');
               // added timeout on changing location.hash to avoid conflict on link clicks
               setTimeout(() => {location.hash = fragmentId;}, 500)
            }
            else{
                return;
            }
        }
        }
    }
    
}

//hash change on first time load/refresh
window.addEventListener('load', () => {
    location.hash = 'home'; 
    });

//hash change on history change(assuming it's on the same website)
function scrolltoId(hash){
    hash = hash.replace('#', '');
    var access = document.getElementById(`${hash}`);
    access.scrollIntoView();
}
function locationHashChanged( e ) {

    scrolltoId(location.hash);

}

window.onhashchange = locationHashChanged;
//event listener for hash change on scroll
var importantWindow = document.getElementById("scroll-id");
importantWindow.addEventListener('scroll', updateFragId);
var links = document.querySelectorAll('a');



// ----website css effects----




//blur-blob effect
const blob = document.getElementById('blob');
const bleb = document.getElementById('sub-blob');
const blab = document.getElementById('green-blob')
document.onpointermove = event =>{
    const {clientX, clientY} = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    },{duration:3000, fill: "forwards"})

    bleb.animate({
        left: `${clientX}px`,
        top:`${clientY}px`
    },{duration: 5000, fill: "forwards"})

    blab.animate({
        left: `${clientX}px`,
        top:`${clientY}px`
    },{duration: 8000, fill: "forwards"})

}



