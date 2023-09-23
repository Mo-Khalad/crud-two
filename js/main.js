var productTitle=document.getElementById("productTitle");
var productPrices=document.getElementById("productPrices");
var productTaxes=document.getElementById("productTaxes");
var productAds=document.getElementById("productAds");
var productDisCount=document.getElementById("productDisCount");
var productCount=document.getElementById("productCount");
var btnTotal=document.getElementById("btnTotal")
var productCategorys=document.getElementById("productCategorys");
var btnCreate=document.getElementById("btnCreate");
var btnSearchTitle=document.getElementById("btnSearchTitle");
var productSearch=document.getElementById("productSearch");
var productDeleteAli=document.getElementById('productDeleteAli');
var btnSearchCategory=document.getElementById("btnSearchCaregory");
var inputs=document.getElementsByClassName("inputsProduct");
var input;
var val;
var products=[];


function getTotal()
{

    if( productPrices.value!="")
    {
        var result=(+productAds.value+ +productPrices.value + +productTaxes.value )- +productDisCount.value;

        btnTotal.innerHTML=result;
        btnTotal.style.backgroundColor="#040";
    }
    else
    {
        btnTotal.innerHTML="";
        btnTotal.style.backgroundColor="#a00d02";
    }
}



if(JSON.parse( localStorage.getItem("productsList"))!=null)
{
products=JSON.parse( localStorage.getItem("productsList"))
}
displayProduct();

btnCreate.onclick=function()
{
    if(productTitle.value!="")
    {
    if(btnCreate.innerHTML=='Create')
    {
    addProduct();
    clear();

    }

    else
    {
        updates(input);
        btnCreate.innerHTML="Create";
        productCount.style.display="block";
        clear();

    }

}

    displayProduct();
    getTotal();
    
    
}

function addProduct()
{
    var product=
    {
        title:productTitle.value,
        price:productPrices.value,
        taxes:productTaxes.value,
        ads:productAds.value,
        discount:productDisCount.value,
        count:productCount.value,
        category:productCategorys.value,
        total:btnTotal.innerHTML,
    }
   

if(productCount.value!="")
{
    for(var i=0;i<productCount.value;i++)
    {
      products.push(product);
    }
}

else
{
    products.push(product);

}


    localStorage.setItem("productsList",JSON.stringify(products))

}

function displayProduct()
{

    var trs='';
    for(var i=0;i<products.length;i++)
    {
        trs+=
        `
        <tr >
        <td class="text-Light">${i+1}</td>
        <td class="text-Light">${products[i].title}</td>
        <td class="text-Light">${products[i].price}</td>
        <td class="text-Light">${products[i].taxes}</td>
        <td class="text-Light">${products[i].ads}</td>
        <td class="text-Light">${products[i].discount}</td>
        <td class="text-Light">${products[i].total}</td>
        <td class="text-Light">${products[i].category}</td>
        <td><button onclick="deleteProduct(${i})" class ="btn2">delete</button></td>
        <td><button onclick="updateProduct(${i})" class ="btn2">update</button></td>

       </tr>
        `
        }
        

    document.getElementById("tableBody").innerHTML=trs;

    if(products.length>0)
    {
       
    productDeleteAli.innerHTML='delete Ali'
    }

    else
    {
        
    productDeleteAli.innerHTML='';
       

    }
}

function updateProduct(index)
{
   productTitle.value= products[index].title; 
   productPrices.value= products[index].price;
   productTaxes.value= products[index].taxes;
   productCategorys.value= products[index].category;
   productAds.value= products[index].ads;
   productDisCount.value= products[index].discount;
   getTotal();

input=index;
   btnCreate.innerHTML="update";
productCount.style.display="none";

}

function clear()
{
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value='';

    }

}

function deleteProduct(index)
{
  products.splice(index,1)
  displayProduct();
  localStorage.setItem("productsList",JSON.stringify(products))

}

 productDeleteAli.onclick=function()
{
   localStorage.clear()

   products.splice(0,)
   displayProduct();

//localStorage.setItem("productsList",JSON.stringify(products))
//displayProduct();
}

function updates(i)
{
    var product=
    {
        title:productTitle.value,
        price:productPrices.value,
        taxes:productTaxes.value,
        ads:productAds.value,
        discount:productDisCount.value,
        count:productCount.value,
        category:productCategorys.value,
        total:btnTotal.innerHTML,
    }

  // 



products[i]=product;
    localStorage.setItem("productsList",JSON.stringify(products))

    

}    



productSearch.onkeyup=function()
{
  val=productSearch.value;  
}


btnSearchCategory.onclick=function()
{

    var trs='';
    for(var i=0;i<products.length;i++)
    {
        if(products[i].category.includes(val))
   {
        trs+=
        `
        <tr >
        <td class="text-Light">${i+1}</td>
        <td class="text-Light">${products[i].title}</td>
        <td class="text-Light">${products[i].price}</td>
        <td class="text-Light">${products[i].taxes}</td>
        <td class="text-Light">${products[i].ads}</td>
        <td class="text-Light">${products[i].discount}</td>
        <td class="text-Light">${products[i].total}</td>
        <td class="text-Light">${products[i].category}</td>
        <td><button onclick="deleteProduct(${i})" class ="btn2">delete</button></td>
        <td><button onclick="updateProduct(${i})" class ="btn2">update</button></td>

       </tr>
        `
        }
        

    document.getElementById("tableBody").innerHTML=trs;

   }
}

btnSearchTitle.onclick=function()
{
    var trs='';
    for(var i=0;i<products.length;i++)
    {
        getTotal();
        if(products[i].title.toLowerCase().includes(val.toLowerCase()))
   {
        trs+=
        `
        <tr >
        <td class="text-Light">${i+1}</td>
        <td class="text-Light">${products[i].title}</td>
        <td class="text-Light">${products[i].price}</td>
        <td class="text-Light">${products[i].taxes}</td>
        <td class="text-Light">${products[i].ads}</td>
        <td class="text-Light">${products[i].discount}</td>
        <td class="text-Light">${products[i].total}</td>
        <td class="text-Light">${products[i].category}</td>
        <td><button onclick="deleteProduct(${i})" class ="btn2">delete</button></td>
        <td><button onclick="updateProduct(${i})" class ="btn2">update</button></td>

       </tr>
        `
        }
        

    document.getElementById("tableBody").innerHTML=trs;
   }

}


