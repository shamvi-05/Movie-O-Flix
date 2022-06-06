
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    return str.replace( /(<([^>]+)>)/ig, '');
}

const jokes = document.querySelector('#jokes');
const form = document.querySelector('#searchForm');
const resultDiv = document.querySelector('#searchResult')

//FORM SUBMISSION EVENT LISTENER
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // API CALL
    resultDiv.innerText="";

    const searchTerm = document.querySelector('#searchText').value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    console.log(res)
    
    const bestMatch = res.data[0].show
    console.log(bestMatch);
    
    // ALL API DATA
    var id = bestMatch.id;
    var image = bestMatch.image.medium
    
    var l=bestMatch.language;
    // const premeired = bestMatch.image.medium
   
    var name = bestMatch.name;
    
     
    // console.log(name)
    var gen=bestMatch.genres;
    // console.log(gen);
    var rating = "Ratings: "+bestMatch.rating.average+" ⭐️" 
    var summary = bestMatch.summary
    var more=bestMatch.url
    
    // console.log(more);
 
    // CREATE DOM ELEMENTS HERE
    var img = document.createElement('IMG'); 
    img.src = image;
    var h1 = document.createElement('H1');
    h1.innerText = name;
    var p1 = document.createElement('p');
    p1.innerText = removeTags(summary);
    var lang=document.createElement('p');
    lang.innerText="Language:  "+l;
    var p2 = document.createElement('p');
    p2.innerText = rating ;
    var m=document.createElement('p');
    if(gen.length==0)
      { m.innerText=" ";}
    else{
       str=JSON.stringify(gen);
       str=str.replace(/[^a-zA-Z ]/g, "    ");
    
    
       m.innerText="Genre:" + str;}
    var u=document.createElement('a');
    u.title = "Wanna know more!";
    u.href = more;
    u.innerText = u.title;
    
   

    // STYLE CREATED ELEMENTS HERE
    h1.style.fontSize = '30px';
    h1.style.color='black';
    h1.style.strong;
    p1.style.fontFamily= 'Sans Serif';
    p1.style.fontSize= '20px';
    p1.style.small;
    p1.style.fontStyle='italic'
    p1.style.color='black';
    p1.style.fontWeight= '40'
    lang.style.fontWeight= '40'
    lang.style.color='black';
    lang.style.fontSize = '20px';
    m.style.wordSpacing = "10px";
    p2.style.color='black';
    p2.style.fontSize = '20px';
    m.style.fontWeight= '40'
    m.style.color='black';
    m.style.fontSize = '20px';
    u.style.fontWeight= '40'
    u.style.color='black';
    u.style.fontSize = '20px';

    
    // APPEND ELEMENTS TO WEB PAGE
    resultDiv.append(img)
    resultDiv.append(h1)
    resultDiv.append(p1)
    resultDiv.append(lang)
    resultDiv.append(m)
    resultDiv.append(p2)
    resultDiv.append(u)
    resultDiv.append("\n")
    
    
        form.reset();

    

    
}).catch(function(){
       
    alert("Please Check the name and try again!")})
  
 

