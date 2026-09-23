var productTitle=document.getElementById("productTitle");
var productPrice=document.getElementById("productPrice");
var productTaxes=document.getElementById("productTaxes");
var productAds=document.getElementById("productAds");
var productDisCount=document.getElementById("productDisCount");
var productCount=document.getElementById("productCount");
var totalPrice=document.getElementById("totalPrice")
var productCategory=document.getElementById("productCategory");
var btnCreate=document.getElementById("btnCreate");
var btnSearchTitle=document.getElementById("btnSearchTitle");
var productSearch=document.getElementById("productSearch");
var error=document.getElementById('error')
var productDeleteAll=document.getElementById('productDeleteAll');
var btnSearchCategory=document.getElementById("btnSearchCategory");
var inputs=document.getElementsByClassName("inputsProduct");
var search = document.getElementById('search');
var searchBtns = document.getElementById("searchBtns");
var data = document.getElementById("data");
var noResults=document.getElementById("noResults");
var input;
var val;
var products=[];

//Toggle Search Buttons , Inputs And Data
function toggleContact(){
    if(products.length <= 0){
        search.classList.add("d-none");
        searchBtns.classList.add("d-none");
        data.classList.add("d-none");
    }
    else{
        search.classList.remove("d-none");
        searchBtns.classList.remove("d-none");
        data.classList.remove("d-none");
    }
}

if(JSON.parse( localStorage.getItem("productsList"))!=null){
    products=JSON.parse( localStorage.getItem("productsList"))
    search.classList.remove("d-none");
    searchBtns.classList.remove("d-none");
    data.classList.remove("d-none");
    displayProduct();
}else {
    search.classList.add("d-none");
    searchBtns.classList.add("d-none");
    data.classList.add("d-none");
}

function getTotal(){    
    if( productPrice.value!=""){
        var result=(+productAds.value+ +productPrice.value + +productTaxes.value )- +productDisCount.value;
        totalPrice.innerHTML=`${result} EGP`;
        totalPrice.style.backgroundColor="#040";
        totalPrice.style.maxWidth="40px"
    }
    else{
        totalPrice.innerHTML="0";
        totalPrice.style.backgroundColor="#a00d02";
    }
}

/* Display Products Fuction */   
function displayProduct(){
    var trs='';
    for(var i=0;i<products.length;i++){
        trs+=`
         <tr>
            <td class="text-Light">${i+1}</td>
            <td class="text-Light">${products[i].title}</td>
            <td class="text-Light">${products[i].price} EGP</td>
            <td class="text-Light">${products[i].taxes}</td>
            <td class="text-Light">${products[i].ads}</td>
            <td class="text-Light">${products[i].discount}</td>
            <td class="text-Light">${products[i].total} EGP</td>
            <td class="text-Light">${products[i].category}</td>
            <td><button onclick="deleteProduct(${i})" class ="delete">delete</button></td>
            <td><button onclick="editProduct(${i})" class="edit">edit</button></td>
        </tr> `
    }
    document.getElementById("tableBody").innerHTML=trs;

    if(products.length>0) productDeleteAll.innerHTML='delete Ali';
    else productDeleteAll.innerHTML='';
}

/* Add And Update Product Function */
function addProduct(){
    var product={
        title:productTitle.value,
        price:productPrice.value,
        taxes:productTaxes.value,
        ads:productAds.value,
        discount:productDisCount.value,
        count:productCount.value,
        category:productCategory.value,
        total:totalPrice.innerHTML,
    }
    
    if(productCount.value!=""){
        for(var i=0;i<productCount.value;i++){
          products.push(product);
        }
    } else products.push(product);
    toggleContact()
    localStorage.setItem("productsList",JSON.stringify(products))
}

function editProduct(index){        
    productTitle.value= products[index].title; 
    productPrice.value= products[index].price;
    productTaxes.value= products[index].taxes;
    productCategory.value= products[index].category;
    productAds.value= products[index].ads;
    productDisCount.value= products[index].discount;
    getTotal()
    input=index;
    btnCreate.innerHTML="update";
    productCount.style.display="none";
    error.style.opacity='none';
}

function updateProduct(index){
    productCount.style.display="block";
       var product={
         title:productTitle.value,
         price:productPrice.value,
         taxes:productTaxes.value,
         ads:productAds.value,
         discount:productDisCount.value,
         count:productCount.value,
         category:productCategory.value,
         total:totalPrice.innerHTML,
    }
    products[index]=product;   
    localStorage.setItem("productsList",JSON.stringify(products))
    displayProduct()
}    
   
btnCreate.onclick=function(){
     if(productTitle.value!="" && productPrice.value!="" && productCategory.value!= "" ){
        error.style.opacity ='0'
            if(btnCreate.innerHTML==='Create'){
                addProduct()
            }else{
                btnCreate.innerHTML='Create'
                updateProduct(input)
            }    
            displayProduct();
            clear();
            getTotal(); 
    }else {
        error.innerHTML ='Fields Are Required' 
        error.style.opacity ='1'
        setTimeout(function(){
            error.style.opacity ='0'
        },1000)
    }
}

/* Clear All Inputs */   
function clear(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}

/* Delete Functions*/

// Remove One Product 
function deleteProduct(index){
  products.splice(index,1)
  displayProduct();
  localStorage.setItem("productsList",JSON.stringify(products))
  toggleContact();
}
// Remove All Products
 productDeleteAll.onclick=function(){
    products.splice(0,);
    toggleContact()
    localStorage.clear();
    displayProduct();
}

/* Search Functions */ 
productSearch.onkeyup=function(){
  val=productSearch.value;  
  
  if(productSearch.value === ''){
    data.classList.remove("d-none");
    productDeleteAll.classList.remove("d-none");
    noResults.classList.add("d-none");
    displayProduct()
  }
}

// Search By Categories
btnSearchCategory.onclick=function(){
   var trs='';
   for(var i=0;i<products.length;i++){
        if(products[i].category.includes(val)){
        trs+=`
        <tr >
        <td class="text-Light">${i+1}</td>
        <td class="text-Light">${products[i].title}</td>
        <td class="text-Light">${products[i].price}</td>
        <td class="text-Light">${products[i].taxes}</td>
        <td class="text-Light">${products[i].ads}</td>
        <td class="text-Light">${products[i].discount}</td>
        <td class="text-Light">${products[i].total}</td>
        <td class="text-Light">${products[i].category}</td>
        <td><button onclick="deleteProduct(${i})" class ="delete">delete</button></td>
        <td><button onclick="editProduct(${i})" class ="edit">edit</button></td>
       </tr>
        `
        }
      document.getElementById("tableBody").innerHTML=trs;
   }
   
  if(trs==='' && productSearch.value!=''){
    productDeleteAll.classList.add("d-none");
    data.classList.add("d-none"); 
    noResults.classList.remove("d-none");
  }else{
    data.classList.remove("d-none");
    productDeleteAll.classList.remove("d-none");
    noResults.classList.add("d-none");
  }
}

// Search By Titles
btnSearchTitle.onclick=function(){
    var trs='';
    for(var i=0;i<products.length;i++){
        if(products[i].title.toLowerCase().includes(val.toLowerCase())){
        trs+= `
        <tr >
        <td class="text-Light">${i+1}</td>
        <td class="text-Light">${products[i].title}</td>
        <td class="text-Light">${products[i].price}</td>
        <td class="text-Light">${products[i].taxes}</td>
        <td class="text-Light">${products[i].ads}</td>
        <td class="text-Light">${products[i].discount}</td>
        <td class="text-Light">${products[i].total}</td>
        <td class="text-Light">${products[i].category}</td>
        <td><button onclick="deleteProduct(${i})" class ="delete">delete</button></td>
        <td><button onclick="editProduct(${i})" class ="edit">edit</button></td>
       </tr>
        `
        }     
        document.getElementById("tableBody").innerHTML=trs;
   }
  
   if(trs==='' && productSearch.value!=''){
     productDeleteAll.classList.add("d-none");
     data.classList.add("d-none"); 
     noResults.classList.remove("d-none");
   }else{
     data.classList.remove("d-none");
     productDeleteAll.classList.remove("d-none");
     noResults.classList.add("d-none");
   }
}

