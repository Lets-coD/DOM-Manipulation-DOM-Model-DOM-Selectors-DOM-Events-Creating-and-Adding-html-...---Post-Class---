window.onload = () => {
passed_in_array=[]
   displayLoading();
document.getElementById("book-ticket-btn").addEventListener('click',(event)=>{
    var success=document.querySelector("#Success");
    success.style.display = "none";
    var element = document.getElementById("booking_grid2");
    while ( element.firstChild ) element.removeChild( element.firstChild );
    var element = document.getElementById("booking_grid1");
    while ( element.firstChild ) element.removeChild( element.firstChild );

    console.log(passed_in_array);
    let ss=""
    ss=passed_in_array.reduce((prev,item)=> prev+item+",","");
    console.log(ss)

    seatSelection.style.display = "none";
    ss=ss.substring(0,ss.length-1)
    console.log(ss)
    var confirmpurchase=document.querySelector("#confirm-purchase");
    confirmpurchase.style.display = "block";
    var conf = document.getElementById("confirm-purchase");
    var h3 = document.createElement("h3");
    h3.innerHTML="Confirm your booking for seat numbers:"+ss
    conf.appendChild(h3)
    var f = document.createElement("form");
    f.setAttribute("id","customer-detail-form");
    var newLabel1 = document.createElement("Label");
    newLabel1.innerHTML = "Email";
    f.appendChild(newLabel1)
    var in1 = document.createElement("input");
    in1.setAttribute("id","email")
    in1.setAttribute("type", "text");
    in1.setAttribute("required","");
    f.appendChild(in1)
    var newLabel2 = document.createElement("Label");
    newLabel2.innerHTML = "Phone Number";
    f.appendChild(newLabel2)
    var in2 = document.createElement("input");
    in2.setAttribute("id","phone")
    in2.setAttribute("type", "text");
    in2.setAttribute("required", "");
    f.appendChild(in2)
    var bu = document.createElement("input");
    bu.setAttribute("type", "submit");
    bu.setAttribute("value", "Submit");
    f.appendChild(bu)
    conf.appendChild(f)
    bu.addEventListener('click',(event)=>{
    success.style.display = "block";
    var detailsseat=document.querySelector("#detailsseat");
    var detailsphonenumber=document.querySelector("#detailsphonenumber");
    var detailsemail=document.querySelector("#detailsemail");
    detailsemail.innerText="Email: "+document.querySelector("#email").value;
    detailsphonenumber.innerText="Phone number: "+document.querySelector("#phone").value;
    detailsseat.innerText="Seats: "+ss;
    var element = document.getElementById("customer-detail-form");
    while ( element.firstChild ) element.removeChild( element.firstChild );
    var element = document.getElementById("confirm-purchase");
    while ( element.firstChild ) element.removeChild( element.firstChild );
})
})
};


function displayLoading() {
    var body = document.querySelector("#start");
    var div = document.createElement("div");
    div.innerHTML += "Loading";
    div.style.width="2rem"
    div.style.height="2rem"
    div.style.border="5px solid #f3f3f3"
    div.style.borderTop="6px solid #9c41f2"
    div.style.borderRadius="100%"
    div.style.margin="auto"
    div.style.animation="spin 1s infinite linear"
    div.style.transform="transform: rotate(0deg); transform: rotate(360deg);";
    document.body.appendChild(div);
    setTimeout(() => {
    div.parentNode.removeChild(div);
    fetchHandler();
    }, 500);
}

function fetchHandler() {
    let url='user.json'
    try {
    let res =  fetch(url).then(response=>response.json()).then(response=>displaymovie(response));
    } catch (error) {
        console.log(error);
    }
}

function displaymovie(response){
var navbar=document.querySelector(".movie-img-wrapper");
navbar.style.display = "block";
var count=0;
response.forEach((item)=>{
    count++;
    var ss="#moviename"+count;
    console.log(ss)
    const textOutput = document.querySelector(ss);
    textOutput.innerText = item.name;
});
}

function fetchMovieAvailability (moviename) {

    let url='availability.json'
    try {
    let res =   fetch(url).then(response=>response.json()).then(response=>fillseat(response,moviename));
    } catch (error) {
        console.log(error);
    }
}

function fillseat(response,moviename){
      var seatSelection=document.querySelector("#seatSelection");
      seatSelection.style.display = "block";
      var buttonitem=document.querySelector("#book-ticket-btn");
      buttonitem.style.display = "none";
      passed_in_array.length=0
      var element = document.getElementById("booking_grid2");
      while ( element.firstChild ) element.removeChild( element.firstChild );
      var element = document.getElementById("booking_grid1");
      while ( element.firstChild ) element.removeChild( element.firstChild );

      var success=document.querySelector("#Success");
      success.style.display = "none";

      var a1=[1,2,3,4,5,6,7,8,9,10,11,12]
      var a2=[13,14,15,16,17,18,19,20,21,22,23,24]
      response.forEach((item)=>{
        if(item.name==Object.values(moviename)){
                var totalcount=0;
//                var passed_in_array = [];
                var booking1=document.getElementById("booking_grid1");
                var ar=item.seat.map((item)=>parseInt(item))
                for(var i=0;i<a1.length;i++){
                  if(ar.includes(a1[i])){
                   var element=document.createElement("div")
                   let node = document.createTextNode (""+a1[i]);
                   element.style.backgroundColor="green"
                   element.style.color="  color: #fff"
                   element.style.padding="20px"
                   element.style.fontSize="150%"
                   element.style.border="0px"
                   element.appendChild(node)
                   booking1.appendChild(element)
                  }else{
                   var element=document.createElement("div")
                   let node = document.createTextNode (""+a1[i]);
                   element.style.backgroundColor="red"
                   element.style.color="  color: #fff"
                   element.style.padding="20px"
                   element.style.fontSize="150%"
                   element.style.border="0px"
                   element.appendChild(node)
                   booking1.appendChild(element)
                  }
                }
                var ancestor=document.getElementById("booking_grid1");
                var descendents = ancestor.getElementsByTagName("div");
                for (i = 0; i < descendents.length; ++i) {
                    let count=0;
                    e = descendents[i];
                    let selected=parseInt(descendents[i].innerText)
                    if(ar.includes(selected)){
                        e.className = "available-seat";
                        e.addEventListener('click',(event)=>{
                          count++;
                          var clickedOn = event.target;
                            if(count%2==1){
                            totalcount++;
                            passed_in_array.push(selected)
                            clickedOn.style.border = '4px outset rgb(0, 0, 0)';
                            }else{
                            totalcount--
                            passed_in_array = removeElement(passed_in_array, selected);
                            clickedOn.style.border = 'none';
                            }
                            if(totalcount>0){
                              buttonitem.style.display = "block";
                            }else{
                            buttonitem.style.display = "none";
                           }
                        })
                    }else{
                        e.className = "unavailable-seat";
                    }
                }
                var booking2=document.getElementById("booking_grid2");
                for(var i=0;i<a2.length;i++){
                  if(ar.includes(a2[i])){
                   var element=document.createElement("div")
                   let node = document.createTextNode (""+a2[i]);
                   element.style.backgroundColor="green"
                   element.style.color="  color: #fff"
                   element.style.padding="20px"
                   element.style.fontSize="150%"
                   element.style.border="0px"
                   element.appendChild(node)
                   booking2.appendChild(element)
                  }else{
                   var element=document.createElement("div")
                   let node = document.createTextNode (""+a2[i]);
                   element.style.backgroundColor="red"
                   element.style.color="  color: #fff"
                   element.style.padding="20px"
                   element.style.fontSize="150%"
                   element.style.border="0px"
                   element.appendChild(node)
                   booking2.appendChild(element)
                  }
                }
                ancestor=document.getElementById("booking_grid2");
                descendents = ancestor.getElementsByTagName("div");
                for (i = 0; i < descendents.length; ++i) {
                    let count=0;
                    e = descendents[i];
                    let selected=parseInt(descendents[i].innerText)
                    if(ar.includes(selected)){
                        e.className = "available-seat";
                        e.addEventListener('click',(event)=>{
                          count++;
                          var clickedOn = event.target;
                            if(count%2==1){
                            totalcount++;
                            passed_in_array.push(selected)
                            clickedOn.style.border = '4px outset rgb(0, 0, 0)';
                            }else{
                            totalcount--
                            passed_in_array = removeElement(passed_in_array, selected);
                            clickedOn.style.border = 'none';
                            }
                            if(totalcount>0){
                              buttonitem.style.display = "block";
                            }else{
                            buttonitem.style.display = "none";
                           }
                        })
                    }else{
                        e.className = "unavailable-seat";
                    }
                }
            let removeElement = (array, n) => {
            let newArray = [];
              for (let i = 0; i < array.length; i++) {
                if (array[i] !== n) {
                  newArray.push(array[i]);
                }
              }
              return newArray;
            };

        }
      })
}



//
