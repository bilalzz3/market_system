let title = document.getElementById('title');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//get total
function getTotal(){
    if (price.value != ''){
        let result = (+price.value ) - +discount.value; 
        total.innerHTML = result;
        total.style.background = 'rgb(0, 100, 0)'
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(151, 23, 0)'
    }
}

//create product


let datapro ;

if (localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase(),
        price : price.value,
        time : new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
}),
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    }

    if(title.value != ''&& price.value != ''&& newpro.count < 101){
          if (mood == 'create'){

    if(newpro.count > 1){
        for(let i = 0 ; i < newpro.count ; i ++  ){
            datapro.unshift(newpro);
        }    
    }else{
        datapro.unshift(newpro);
    }

    }else{
    datapro[tmp] = newpro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block'
    }
    cleardata()
    }



    //save in localstorage
    localStorage.setItem('product',   JSON.stringify(datapro)  )
    
    showdata()
}

// clear inputs

function cleardata(){
    title.value = '';
    price.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//read 

function showdata()
{
    getTotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++ ){
        table +=`<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].time}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].category}</td>
        <td>${datapro[i].total}</td>
        <td><button onclick= "updatedata(${i})" id="update">update</button></td>
        <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
        </tr>`
        ;
    }
    
    document.getElementById('tbody').innerHTML = table ;
    let btndelete = document.getElementById('deleteall');
    if(datapro.length > 0){ 
        btndelete.innerHTML = `
        <button onclick = "deleteall()">Delete All (${datapro.length})</button>
        `
    }else{
        btndelete.innerHTML = '';
    }
}
 showdata()


//delete
function deletedata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro);
    showdata()
}


//delete all
function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata()
}

// update

function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    title.focus()
}

//search
let searchmood = 'title';

function getsearchmood(id)
{
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchmood = 'title';
        search.placeholder = 'search by title';
    }
    else{
        searchmood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus()
    search.value = '';
    showdata()
}


function searchdata(value)
{
    let table = '';
    if(searchmood == 'title' )
    {
        for( let i = 0; i < datapro.length; i++ ){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].time}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].category}</td>
                    <td>${datapro[i].total}</td>
                    <td><button onclick= "updatedata(${i})" id="update">update</button></td>
                    <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
                    </tr>`
        ;
            }

        }


Sddd


    }

    else{
        for( let i = 0; i < datapro.length; i++ ){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].time}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td>${datapro[i].total}</td>
                <td><button onclick= "updatedata(${i})" id="update">update</button></td>
                <td><button onclick= "deletedata(${i})" id="delete">delete</button></td>
                </tr>`
        ;
            }

        }

    }
    document.getElementById('tbody').innerHTML = table ;

}


let btnup = document.getElementById('up');

window.onscroll = function () {
    if (window.scrollY >= 400) {
        btnup.style.display = 'block';
    } else {
        btnup.style.display = 'none';
    }
};


    // scroll button

    btnup.onclick = function(){
        scroll({
            left:0,
            top:0,
            behavior:"smooth"
        })
    }

    

let inputs = document.querySelectorAll('#inputs input');

inputs.forEach(function(input, index) {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                submit.click();
            }
        }
    });
});

 