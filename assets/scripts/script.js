// let currentPage = 1;
let activePage = 1;
// let newsIndex=0;
const newsPaper = document.querySelector(".newspaper");

const addEventToButtons = ()=>{
    let nextPage = document.querySelectorAll(".next-link")
    let previousPage = document.querySelectorAll(".previous-link")
    
    nextPage.forEach((elem)=>{
        elem.addEventListener("click", () =>{
            if(document.querySelector(`.page${activePage+1}`)!==null){
                document.querySelector(`.page${activePage}`).classList.add("hidden");
                activePage++;
                document.querySelector(`.page${activePage}`).classList.remove("hidden");
            }
        })
    })
    
    previousPage.forEach((elem)=>{
        elem.addEventListener("click", () =>{
            if(document.querySelector(`.page${activePage-1}`)!==null){
                document.querySelector(`.page${activePage}`).classList.add("hidden");
                activePage--;
                document.querySelector(`.page${activePage}`).classList.remove("hidden");
            }
        })
    })
}

let newsCollection = {
    header:{
        city:"Chennai",
        state:"TamilNadu",
        day:"Wednesday",
        month:"February",
        date:"8",
        year:"2023",
    },
    page1:[
        {
            heading:"Pak ruler, who made war, peace and news, is dead",
            subHeading:"Architect of Kargil conflict to dictator who extended peace overtures that came undone because of his intransigence, Pervez Musharraf leaves mixed legacy",
            imgSrc:"./assets/images/article1.jpg",
            imgCaption:"Pervez Musharraf with then Prime Minister Atal Bihari Vajpayee in Agra in 2001.",
            authorName:"Rezaul H Laskar",
            authorEmail:"letters@hindustantimes.com",
            location:"Chennai",
            news:"Former Pakistani military strongman Pervez Musharraf, who probably came closest to resolving the Kashmir issue with India but was also the main driver behind cross-border intrusions that triggered the Kargil conflict, died following a prolonged illness on Sunday. He was 79."
        },
        {
            heading:"Pak ruler, who made war, peace and news, is dead",
            subHeading:"Architect of Kargil conflict to dictator who extended peace overtures that came undone because of his intransigence, Pervez Musharraf leaves mixed legacy",
            imgSrc:"./assets/images/article1.jpg",
            imgCaption:"Pervez Musharraf with then Prime Minister Atal Bihari Vajpayee in Agra in 2001.",
            authorName:"Rezaul H Laskar",
            authorEmail:"letters@hindustantimes.com",
            location:"Chennai",
            news:"Former Pakistani military strongman Pervez Musharraf, who probably came closest to resolving the Kashmir issue with India but was also the main driver behind cross-border intrusions that triggered the Kargil conflict, died following a prolonged illness on Sunday. He was 79."
        },
        {
            heading:"Pak ruler, who made war, peace and news, is dead",
            subHeading:"Architect of Kargil conflict to dictator who extended peace overtures that came undone because of his intransigence, Pervez Musharraf leaves mixed legacy",
            imgSrc:"./assets/images/article1.jpg",
            imgCaption:"Pervez Musharraf with then Prime Minister Atal Bihari Vajpayee in Agra in 2001.",
            authorName:"Rezaul H Laskar",
            authorEmail:"letters@hindustantimes.com",
            location:"Chennai",
            news:"Former Pakistani military strongman Pervez Musharraf, who probably came closest to resolving the Kashmir issue with India but was also the main driver behind cross-border intrusions that triggered the Kargil conflict, died following a prolonged illness on Sunday. He was 79."
        }
    ]
};

const createNewspaper = (paperDetails)=>{
    // let details = paperDetails.news;
    if(localStorage.getItem("news")!==null){
        let localNews = JSON.parse(localStorage.getItem("news"))
        // console.log(details);
        for(const key in localNews){
            console.log(key);
            paperDetails[key] = localNews[key];
        }
        console.log(paperDetails);
    }
    let c=1;
    console.log(paperDetails.length);
    let newsLength = Object.keys(paperDetails).length;
    for(let i=1;i<newsLength;i++){
        console.log(i);
        createPage(paperDetails["header"],paperDetails["page"+i],c++);
    }
}

const createPage = (header,paperDetails,c)=>{
    console.log(paperDetails);
    let page ="";
    c===1?
    page = `<div class="page${c}">`:
    page = `<div class="page${c} hidden">`;
    page += c===1?
    addFirstHeader(header,c):
    addHeader(header,c);
    page += c===1?
    addFirstFooter():
    addFooter();
    page += "</div>";
    console.log(page);
    newsPaper.innerHTML+=page;
    let main = document.querySelector(`.page${c} .main-content`);
    addNews(paperDetails,main);
}

const addFirstHeader = (details,c)=>{
    return `<header class="main-header">
        <div class="main-header-info">
            <div class="location">
                ${details.city}, ${details.state}
            </div>
            <div class="date">
                ${details.day}, &nbsp;<b>${details.month} ${details.date}</b>, ${details.year}
            </div>
        </div>
        <div class="main-header-title-box">
            <div class="main-header-title-content">
                <div class="main-header-title">
                    MORNING TIMES
                </div>
                <div class="main-header-phase">
                    New Day, New Times
                </div>
            </div>
        </div>
        <hr class="header-bottom-line">
        <hr class="header-bottom-line">
        <hr class="header-bottom-line">
    </header>
    <main class="main-content">`
}

const addHeader = (details,c) => {
    return `
    <header class="main-header">
        <div class="main-header-info">
            <div class="location">
                ${details.city}, ${details.state}
            </div>
            <div class="page">
                Page ${c}
            </div>
            <div class="date">
                ${details.day}, &nbsp;<b>${details.month} ${details.date}</b>, ${details.year}
            </div>
        </div>
    </header>
    <main class="main-content">
    `
}

const addFirstFooter = ()=>{
    return `
    </main>
    <footer class="footer-first">
        <a href="#" class="next-link">Next Page</a>
    </footer>
    `
}

const addFooter = ()=>{
    return `
    </main>
    <footer class="footer">
        <a href="#" class="previous-link">Previous Page</a>
        <a href="#" class="next-link">Next Page</a>
    </footer>
    `
}

const addNews = (details, main)=>{
    console.log(details);
    
    console.log(localStorage.getItem("news"))
    let newsIndex=0;
    while(newsIndex<details.length){
        let currentNews = details[newsIndex];
        addArticleToPage(
            currentNews.heading,
            currentNews.subHeading,
            currentNews.imgSrc,
            currentNews.imgCaption,
            currentNews.authorName,
            currentNews.authorEmail,
            currentNews.location,
            currentNews.news,
            main
        );
        newsIndex++;
    }
    // if(newsIndex<details.length){
    //     main.removeChild(main.lastElementChild);
    //     newsIndex--;
    //     currentPage++;
    //     createPage(newsCollection);
    // }
    addEventToButtons();
}

const addArticleToPage = (
    heading,
    subHeading,
    imgSrc,
    imgCaption,
    authorName,
    authorEmail,
    location,
    news,
    main
)=>{
    let article=`<div class="article">
        <div class="news-header1">${heading}</div>
        ${subHeading!==""?
        `<div class="sub-header">
            ${subHeading}
        </div>` : ``}
        ${imgSrc!==""?`<figure>
            <img class="article1-img" src=${imgSrc} alt="${imgCaption}">
            <figcaption>${imgCaption}</figcaption>
        </figure>`:""}
        <div class="news-content-1">
            <div class="news-content-col-1">
                ${authorName!==""?
                    `<div class="news-author">
                        <hr class="header-bottom-line">
                        <p class="author-name">${authorName}</p>
                        <hr class="header-bottom-line">
                        <p class="author-email">${authorEmail}</p>
                    </div>`:""
                }
                <div class="news-text-1">
                ${location!==""?
                    `<p class="first-para"><b>${location} :</b></p>`:
                    ""
                }
                    ${news}
                </div>
            </div>
        </div>
    </div>
    `
    main.innerHTML+=article;
}


createNewspaper(newsCollection);

