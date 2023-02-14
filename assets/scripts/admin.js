const newsPaper = document.querySelector(".newspaper");

let authors = ["Rezaul H Laskar", "Ritu Maria Johny", "Arun Kumar", "Timoty Henny", "Ashwini Vaishnaw"];
let authorEmails = ["rezaul@morningtimes.com", "ritu.maria@morningtimes.com", "arun.kumar@morningtimes.com", "timoty.henry@morningtimes.com", "ashwini.vishnaw@morningtimes.com"];

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

var options = {
    debug: 'info',
    modules: {
        toolbar: toolbarOptions
    },
    placeholder: "Compose news...",
    // readOnly: true,
    theme: 'snow'
};


var editor = new Quill('#editor', options);
let editors=[];
let allNews = {};

const addNewsButton = document.querySelector('.addNewsButton');
addNewsButton.addEventListener('click',()=>{
    let rand = Math.floor((Math.random() * authors.length) + 1);
    console.log(rand);
    const page = document.getElementById('pageSelect').value;
    let article = {
        heading:document.getElementById('heading').value,
        subHeading:document.getElementById('subHeading').value,
        imgSrc:document.getElementById('imgSrc').value,
        imgCaption:document.getElementById('imgCaption').value,
        authorName:authors[rand-1],
        authorEmail:authorEmails[rand-1],
        location:document.getElementById('location').value,
        news:editor.root.innerHTML,
    }
    console.log(article);
    // let newsList ={};
    // if(localStorage.getItem("news")!==null)
    //     newsList = JSON.parse(localStorage.getItem("news"));
    // console.log(newsList);
    if(allNews["page"+page]){
        allNews["page"+page].push(article);
    }else{
        allNews["page"+page]=[];
        allNews["page"+page].push(article);
    }
    console.log(allNews);
    // localStorage.setItem("news", JSON.stringify(newsList));
    // console.log(JSON.parse(localStorage.getItem("news")));
    clearForm();
    listAccordions(page);
    addAccordionAction();
})

const submitNewsButton = document.querySelector(".submitNewsButton");
submitNewsButton.addEventListener("click", () =>{
    let newsList ={};
    if(localStorage.getItem("news")!==null)
        newsList = JSON.parse(localStorage.getItem("news"));
    console.log(newsList);
    let len = Object.keys(allNews).length;
    for(let i=1;i<=len;i++){
        if(allNews["page"+i].length>=4){
            newsList["page"+i] = allNews["page"+i]
        }else{
            alert(`Add atleast 4 news article in page ${i}`);
        }
    }
    localStorage.setItem("news", JSON.stringify(newsList));
    console.log(JSON.parse(localStorage.getItem("news")));
})

const clearForm = () =>{
    document.getElementById('heading').value="";
    document.getElementById('subHeading').value="";
    document.getElementById('imgSrc').value="";
    document.getElementById('imgCaption').value="";
    document.getElementById('location').value="";
    editor.root.innerHTML="";
}

const addPage = ()=>{
    let newPage = Object.keys(allNews).length+1;
    const pageSelect = document.querySelector("#pageSelect");
    // console.log(pageSelect.value, newPage);
    if(pageSelect.value != newPage){
        console.log("In if");
        addOnePageOption();
        pageSelect.value = newPage;
        // allNews["page"+newPage] =[];
    }
    listAccordions(newPage);
    addAccordionAction();
}

const addPageButton = document.querySelector(".add-page-button");
addPageButton.addEventListener("click",addPage);

const addAccordionAction = () =>{
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
}

const listAccordions =(page)=>{
    // let newsList = {};
    // if(localStorage.getItem("news")!==null){
    console.log(page);
    if(allNews!=={}){
        // newsList = JSON.parse(localStorage.getItem("news"));
        const accordionCollection = document.querySelector(".accordion-collection");
        accordionCollection.innerHTML="";
        if(allNews["page"+page]){
            let newsData = allNews["page"+page];
            console.log(newsData);
            for(let i=0;i<newsData.length;i++){
                addAccordion(newsData[i],i);
            }
        }
    }
}

const addAccordion = (data,i)=>{
    // console.log(data);
    const accordionCollection = document.querySelector(".accordion-collection");
    let accordion = "";
    accordion = `
        <button class="accordion">${data.heading}</button>
        <div class="panel">
            <div class="card2">
                <div class="inputDivision">
                    <label for="heading">News Heading</label>
                    <input type="text" name="heading" id="heading" placeholder="News Heading.." class="textInput" value="${data.heading}">
                </div>
                <div class="inputDivision">
                    <label for="subHeading">News Description</label>
                    <input type="text" name="subHeading" id="subHeading" placeholder="News Description.." class="textInput" value="${data.subHeading}">
                </div>
                <div class="inputDivision">
                    <label for="ingSrc">Image Source URL</label>
                    <input type="url" name="imgSrc" id="imgSrc" pattern="https://.*" title="Image Source URL" placeholder="Image Source Link.." class="textInput" value="${data.imgSrc}">
                </div>
                <div class="inputDivision">
                    <label for="imgCaption">Image Caption</label>
                    <input type="text" name="imgCaption" id="imgCaption" placeholder="Image Caption.." class="textInput" value="${data.imgCaption}">
                </div>
                <div class="inputDivision">
                    <label for="location">News Location</label>
                    <input type="text" name="location" id="location" placeholder="News Location.." class="textInput" value="${data.location}">
                </div>
                <div class="inputDivision">
                    <label for="editor${i+2}">News</label>
                    <div id="editor${i+2}" class="editors">
                    </div>
                </div>
            </div>
        </div>
    `
    // console.log(accordionCollection);
    // console.log(accordion);
    accordionCollection.innerHTML+=accordion;
    var editori = new Quill("#editor"+(i+2), options);
    editors.push(editori);
    editors[i].pasteHTML(data.news);
    // console.log(editors[i].root.innerHTML);
}

const addPageOptions = ()=>{
    const pageSelect = document.querySelector("#pageSelect");
    let newsLength = Object.keys(allNews).length;
    if(newsLength==0)newsLength=1;
    for (var i = 1; i<=newsLength; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        pageSelect.appendChild(opt);
    }
    console.log(pageSelect);
}

const addOnePageOption = () =>{
    const pageSelect = document.querySelector("#pageSelect");
    let newsLength = Object.keys(allNews).length+1;
    var opt = document.createElement('option');
    opt.value = newsLength;
    opt.innerHTML = newsLength;
    pageSelect.appendChild(opt);
}

document.addEventListener("DOMContentLoaded",()=>{
    const newsData = JSON.parse(localStorage.getItem("news"))
    for(const key in newsData){
        console.log(key);
        allNews[key] = newsData[key];
    }
    console.log(allNews);
    addPageOptions();
    listAccordions(1);
    addAccordionAction();
    const pageOption = document.querySelector("#pageSelect");
    pageOption.addEventListener("change",(e)=>{
        listAccordions(e.target.value);
        addAccordionAction();
    })
})