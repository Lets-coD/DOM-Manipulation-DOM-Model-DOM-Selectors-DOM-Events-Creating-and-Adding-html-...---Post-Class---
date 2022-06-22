const loader = document.querySelector("#loading");

//const textOutput2 = document.querySelector(".booker");



//var moviename=""
// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    //    alert("jlkfj");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 500);
}

function hideLoading() {
    loader.classList.remove("display");
}

var url = "https://employeedetails.free.beeceptor.com/my/api/path";

async function fetchHandler() {
      var booker=document.querySelector(".booker");
      booker.style.display = "none";
      var buttonitem=document.querySelector("#book-ticket-btn");
      buttonitem.style.display = "none";
      var seatselector=document.querySelector("#confirm-purchase");
      seatselector.style.display = "none";
      var success=document.querySelector("#Success");
      success.style.display = "none";

    displayLoading()
    let url='user.json'
    try {
    var ans={};
//    hideLoading()
    let res =  fetch(url).then(response=>response.json()).then(response=>displaymovie(response));

//        console.log("uyrs",ans[0]);
//        const artistIds = await fetch(...).then(...);
//        textOutput.innerText = ans;
//        return await res.json();
    } catch (error) {
//    textOutput.innerText = error;
        console.log("no",error);
    }
}
 async function fetchMovieAvailability (moviename) {
      var booker=document.querySelector(".booker");
      booker.style.display = "none";
      var buttonitem=document.querySelector("#book-ticket-btn");
      buttonitem.style.display = "none";
      var seatselector=document.querySelector("#confirm-purchase");
      seatselector.style.display = "none";
      var success=document.querySelector("#Success");
      success.style.display = "none";

//    displayLoading()
    let url='availability.json'
    try {
var griditem=document.querySelector(".booker");
      if (griditem.style.display === "block") {
        griditem.style.display = "none";
      } else {
        griditem.style.display = "block";
      }
//    hideLoading()
    let res =  fetch(url).then(response=>response.json()).then(response=>fillseat(response,moviename));

    } catch (error) {
//    textOutput.innerText = error;
        console.log("no",error);
    }
}
function displaymovie(response){
var count=0;
response.forEach((item)=>{
    count++;
    var ss="#moviename"+count;
    console.log(ss)
    const textOutput = document.querySelector(ss);
    textOutput.innerText = item.name;
});
}

function fillseat(response,moviename){
response.forEach((item)=>{
//alert(Object.values(moviename))
//alert(item.name)
    if(item.name==Object.values(moviename)){
//        alert(item.name)
        var ancestor=document.getElementById("booking_grid1");
        var descendents = ancestor.getElementsByTagName("div");
//        alert(descendents)
var totalcount=0;
//var seatselected=[]
var passed_in_array = [];

      var buttonitem=document.querySelector("#book-ticket-btn");
      buttonitem.style.display = "none";
      var seatselector=document.querySelector("#confirm-purchase");
      seatselector.style.display = "none";
      var success=document.querySelector("#Success");
      success.style.display = "none";
        var e;
        var ar=item.seat.map((item)=>parseInt(item))
        for (i = 0; i < descendents.length; ++i) {
            let count=0;
            e = descendents[i];
            let selected=parseInt(descendents[i].innerText)
//            alert(selected)
            if(ar.includes(selected)){
                e.className = "available-seat";
                e.addEventListener('click',(event)=>{
                count++;
//                border:4px outset rgb(0, 0, 0);
                  var clickedOn = event.target;
//                  // for HTML
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
            buttonitem.addEventListener('click',(event)=>{
            console.log(passed_in_array);
            let ss=""
            ss=passed_in_array.reduce((prev,item)=> prev+","+item,"");
            console.log(ss)
            var griditem=document.querySelector(".booker");
            griditem.style.display = "none";
            var showseat=document.querySelector("#showseat");
            showseat.innerText="Confirm your booking for seat numbers:"+ss;

             seatselector.style.display = "block";
             buttonitem.style.display = "none";

             var purchase=document.querySelector("#purchase");
             purchase.addEventListener('click',(event)=>{
             seatselector.style.display = "none";
             success.style.display = "block";
             var detailsseat=document.querySelector("#detailsseat");
             var detailsphonenumber=document.querySelector("#detailsphonenumber");
             var detailsemail=document.querySelector("#detailsemail");
             detailsemail.innerText="Email: "+document.querySelector("#email").value;
             detailsphonenumber.innerText="Phone number: "+document.querySelector("#phone").value;
            detailsseat.innerText="Seats: "+ss;
             })

            });
        }else{
        buttonitem.style.display = "none";
        }
                })
            }else{
            e.className = "unavailable-seat";
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
                    totalcount--;
                    passed_in_array = removeElement(passed_in_array, selected);
                    clickedOn.style.border = 'none';
                    }
        if(totalcount>0){
            buttonitem.style.display = "block";
            buttonitem.addEventListener('click',(event)=>{
            console.log(passed_in_array);
            let ss=""
            ss=passed_in_array.reduce((prev,item)=> prev+item+",","");
            console.log(ss)
            var griditem=document.querySelector(".booker");
            griditem.style.display = "none";
            var showseat=document.querySelector("#showseat");
            showseat.innerText="Confirm your booking for seat numbers:"+ss

             seatselector.style.display = "block";
             buttonitem.style.display = "none";

             var purchase=document.querySelector("#purchase");
             purchase.addEventListener('click',(event)=>{
             seatselector.style.display = "none";
             success.style.display = "block";
             var detailsseat=document.querySelector("#detailsseat");
             var detailsphonenumber=document.querySelector("#detailsphonenumber");
             var detailsemail=document.querySelector("#detailsemail");
             detailsemail.innerText="Email: "+document.querySelector("#email").value;
             detailsphonenumber.innerText="Phone number: "+document.querySelector("#phone").value;
            detailsseat.innerText="Seats: "+ss;
             })

            });
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

