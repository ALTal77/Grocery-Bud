"use strict";

let groceryForm=document.querySelector('.grocery-form');
let aleert=document.querySelector('.alert');
let grocery=document.getElementById('grocery');
let groceryContainer=document.querySelector('.grocery-container');
let groceryItem=document.querySelectorAll('.text');
let submit=document.getElementById('submit');
let clear=document.getElementById('clear');

let editItem;
let editFlag=false;
let editId='';

window.addEventListener('DOMContentLoaded',()=>{
submit.addEventListener('click',()=>{
    const value=grocery.value;
    if(value && !editFlag){
        function displayItem(item){    
            grocery.value='';
            const id= new Date().getTime().toString();
            displayAlert('Item Added');
            addToLocalStorage(id,value);
            return groceryContainer.innerHTML+=`
            <div class="text d-flex justify-content-around mt-3 " data-id="${id}">
            <div class=""><h4 class="d-flex flex-row text-capitalize title ">${item}</h4></div>
            <div>
                <i class="bi bi-pencil-square text-success editBtn" tabindex="0" ></i>
                <i class="bi bi-trash-fill text-danger deleteBtn" tabindex="1"></i>
            </div>
            </div>
            `;
        }
        displayItem(value);
        clear.classList.remove('clear-items');
        clear.classList.add('show-clear');
        setBcakToDefault();
        let deleteBtn=document.querySelectorAll('.deleteBtn');
        let editBtn=document.querySelectorAll('.editBtn');
        
        deleteBtn.forEach(btn=>{
           btn.addEventListener('click',function ada(event){
                let element = event.currentTarget.parentElement.parentElement;
                let id=element.dataset.id;
                element.remove();
                if(groceryItem.length>0){
                    clear.classList.add('clear-items');
                    clear.classList.remove('show-clear');
                }
                displayAlert('Item Removed');
                setBcakToDefault(); 
                removeFromLocalStorage(id);
        }) 
        })
        editBtn.forEach(btn=>{
           btn.addEventListener('click',(event)=>{
            let element = event.currentTarget.parentElement.parentElement;
            let title=document.querySelector('.title');
            title=title.innerHTML;
            editItem=title;
            grocery.value=editItem;
            submit.innerHTML='Edit';
            editFlag=true;
            editId=element.dataset.id;
        }) 
        })   
    }
    else if(value && editFlag){
        editItem=value;
        submit.addEventListener('click',()=>{
            function displayItem(item){    
            const id= new Date().getTime().toString();
            grocery.value='';
            return groceryContainer.innerHTML=`
            <div class="text d-flex justify-content-around mt-3 " data-id="${id}">
            <div class=""><h4 class="d-flex flex-row text-capitalize title ">${item}</h4></div>
            <div>
                <i class="bi bi-pencil-square text-success editBtn" id=""></i>
                <i class="bi bi-trash-fill text-danger deleteBtn" id=""></i>
            </div>
            </div>
            `;
        }
        editLocalStorage(editId,value);
        displayItem(editItem);
        displayAlert('Value Changed');
        clear.classList.remove('clear-items');
        clear.classList.add('show-clear');
        setBcakToDefault();
        let deleteBtn=document.querySelectorAll('.deleteBtn');
        let editBtn=document.querySelectorAll('.editBtn');
        
        deleteBtn.forEach(btn=>{
           btn.addEventListener('click',function ada(event){
                let element = event.currentTarget.parentElement.parentElement;
                let id=element.dataset.id;
                element.remove();
                if(groceryItem.length>0){
                    clear.classList.add('clear-items');
                    clear.classList.remove('show-clear');
                }
                displayAlert('Item Removed');
                setBcakToDefault(); 
                removeFromLocalStorage(id);
        }) 
        })
        editBtn.forEach(btn=>{
           btn.addEventListener('click',(event)=>{
            let element = event.currentTarget.parentElement.parentElement;
            let title=document.querySelector('.title');
            title=title.innerHTML;
            editItem=title;
            grocery.value=editItem;
            submit.innerHTML='Edit';
            editFlag=true;
            editId=element.dataset.id;
        }) 
        })   
        
        })
       
    }
    else{
        displayAlert('Please Enter Item');
    } 
});

})

function displayAlert(text){
    aleert.innerHTML=text;
    aleert.classList.add('show-alert');

    setTimeout(()=>{
        aleert.innerHTML='';
        aleert.classList.remove('show-alert')
    },1500)
}

clear.onclick= function clearItems() {
    groceryContainer.innerHTML='';
    clear.classList.add('clear-items');
    clear.classList.remove('show-clear');
    displayAlert('Empty List');
    localStorage.removeItem('list');
}
 
function setBcakToDefault(){
    grocery.value='';
    editFlag=false;
    editId='';
    submit.innerHTML='Submit';
}

function addToLocalStorage(id,value){
    const grocery={id,value}
    let items=getLocalStorage();
  //  console.log(items);
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}

function removeFromLocalStorage(id){
    let items=getLocalStorage();
    items=items.filter((item)=>{
        if(item.id!==id)
            return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id,value){
    let items=getLocalStorage();
    items=items.map((item)=>{
        if(item.id===id){
            item.value=value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}
// Setup Items
function setupItems(){
    item=getLocalStorage();
    if(item.length > 0){
        
    }
}

//localStorage.clear();

function setupItems(){
    let items = getLocalStorage();
    items.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('text', 'd-flex', 'justify-content-around', 'mt-3');
        itemElement.setAttribute('data-id', item.id);
        itemElement.innerHTML = `
            <div class="">
                <h4 class="d-flex flex-row text-capitalize title">${item.value}</h4>
            </div>
            <div>
                <i class="bi bi-pencil-square text-success editBtn" id=""></i>
                <i class="bi bi-trash-fill text-danger deleteBtn" id=""></i>
            </div>
        `;
        groceryContainer.appendChild(itemElement);
    });
    clear.classList.remove('clear-items');
        clear.classList.add('show-clear');
        setBcakToDefault();
        let deleteBtn=document.querySelectorAll('.deleteBtn');
        let editBtn=document.querySelectorAll('.editBtn');
        
        deleteBtn.forEach(btn=>{
           btn.addEventListener('click',function ada(event){
                let element = event.currentTarget.parentElement.parentElement;
                let id=element.dataset.id;
                element.remove();
                if(groceryItem.length>0){
                    clear.classList.add('clear-items');
                    clear.classList.remove('show-clear');
                }
                displayAlert('Item Removed');
                setBcakToDefault(); 
                removeFromLocalStorage(id);
        }) 
        })
        editBtn.forEach(btn=>{
           btn.addEventListener('click',(event)=>{
            let element = event.currentTarget.parentElement.parentElement;
            let title=document.querySelector('.title');
            title=title.innerHTML;
            editItem=title;
            grocery.value=editItem;
            submit.innerHTML='Edit';
            editFlag=true;
            editId=element.dataset.id;
        }) 
        })   
        let itemss = getLocalStorage();
        if (itemss.length > 0) {
            itemss.forEach(item => {
                // إضافة العنصر للـ groceryContainer
            });
            clear.classList.add('show-clear');
        } else {
            clear.classList.remove('show-clear');
        }
}

setupItems();
