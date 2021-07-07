
var secili = document.querySelector(".category");
var sliderItems = document.querySelector(".cs-hidden");
var ul=document.querySelector(".ul");
var secilimb=document.querySelector(".category-mob");
var buttonSelected=document.querySelector(".slider");
var alertLoading=document.querySelector(".alertt");
var closeButton=document.querySelector(".close-btn");
var card=document.querySelector(".card");
var checkControl=document.querySelector(".checkIcon");
buttonSelected.addEventListener('click',(e)=>{
    var ss=e.target.id;
    ul.classList.add("cs-hidden")
    if(ss==="buy-btn"){
        alertLoading.classList.add("show");
        alertLoading.classList.remove("hide");
        alertLoading.classList.add("showAlert");
        alertLoading.classList.remove("d-none");
        alertLoading.classList.add("d-inline")
        setTimeout(function(){
            alertLoading.classList.remove("show");
            alertLoading.classList.add("hide");
            alertLoading.classList.add("d-none")
        },4000);
     
    }
})
closeButton.addEventListener('click',()=>{
    alertLoading.classList.remove("show");
    alertLoading.classList.add("hide");
    alertLoading.classList.add("d-none")
})
secilimb.addEventListener('click',(e)=>{
    let selectedmb = e.target;
    let limb = e.target.classList.value.split(' ');
    let selectedkeysmb = e.target.getAttribute("key");
    const elmb=[...selectedmb.parentElement.children];
    
   
    
    changeSelected(elmb);
 
    productShow(selectedkeysmb);
    
   

    if (limb[0] == "list") {
        selectedmb.classList.add("selected") 
          
    }
    

})
secili.addEventListener('click',selectedItems)
function selectedItems(e){
   
    let selected = e.target;
    let li = e.target.classList.value.split(' ');
    let selectedkeys = e.target.getAttribute("key");
    const el=[...selected.parentElement.children]; 
    
    changeSelected(el);
 
    productShow(selectedkeys);
    
   

    if (li[0] == "list") {
        selected.classList.add("selected")  

    }
    

}

const changeSelected = (nes) => {
    console.log("ss",nes)
    nes.forEach(item => {
        console.log(item)
        if (item.classList.contains("selected")) {
            item.classList.remove("selected")
        }
    })


}
const listshow = () => {
    
    fetch('../product-list.json').then(res => res.json()).then(data => {

        console.log(data)
        let gelen = data.responses[0][0].params.userCategories;
      
        var html = "";
        html +=
            `
						
							<li class="list selected" key="0">${gelen[0]}</li>
							<li class="list" key="1">${gelen[1]}</li>
							<li class="list" key="2">${gelen[2]}</li>
							<li class="list" key="3">${gelen[3]}</li>
							<li class="list" key="4">${gelen[4]}</li>
							<li class="list" key="5">${gelen[5]}</li>
						     
					
					`
        ul.innerHTML += html;
    })
}

const productShow = (getKeys) => {
   
    var id = getKeys;
    fetch('../product-list.json').then(res => res.json()).then(data => {
        let gelen = data.responses[0][0].params.recommendedProducts;
        console.log(gelen)
        var values = Object.values(gelen);
        const getData = values[id];
        console.log("data", getData)
        var cargo;
        var btn=`<span class="d-none"><span/>`;
        var name;
        var html = "";
        var overlay="overlay";
        var dataOriginal;
        var src;
        var itemNameEdit;
        var itemName;
        var lazy;
        var priceFont="font-size: 1.5em";
        getData.forEach((item,key) => {
              //lazyload mobilde  butonlar olmadıgı icin kullanamadım.
              dataOriginal=`src=./img/lazy.gif`;
              src=`data-original=${item.image}`; 
            if(key<=3){
                lazy="";
                dataOriginal=`data-original=./img/lazy.gif`;
                src=`src=${item.image}`; 
            }
            else{
                lazy="lazy";
            }
           
              itemNameEdit = item.name.split(" ");
             for (let i = 0; i < itemNameEdit.length; i++) {
                itemNameEdit[i] = itemNameEdit[i].charAt(0).toUpperCase() + itemNameEdit[i].slice(1).toLowerCase().replace(/\s+/g, ' ');;
            
            }
             itemName = itemNameEdit.join(" ");
             
             if(itemName.length>55){
                name=itemName.slice(0,51)+"..."
               
             }
            else if(itemName.length>45){
                name=itemName+="<br/>"
              
            }
            else if(itemName.length<30){
              name=  itemName+="<br/><br/>"
             
            }
             if(itemName.length<25){
                name=itemName+="<br/><br/><br/><br/><br/>"
            }
            

            
           
            if(item.params.shippingFee==="FREE"){
              
               cargo=`<span class="text-muted "><i class="fas fa-shipping-fast text-success  fa-1x mt-4"></i> Ücretsiz Kargo<span/>`
            }
            else{
                console.log("ücretli")
              cargo=`<span class="text-info">Ücretli Kargo<span/>`
            }
           
            const mediaQuery = window.matchMedia('(max-width: 992px)')
            if (mediaQuery.matches) {
                dataOriginal=` `
                src=`src=${item.image}` 
                var boxclass=`style="width:160px; height:220px"`
                var imgSlide=`style="height: 220px; width:150px"`;
                overlay="d-none";
                card.classList.remove("mx-5");
                card.classList.remove("my-3");
                card.style.height="100vh";
                const mediaQuery = window.matchMedia('(max-width: 768px)')
                if (mediaQuery.matches) {
                checkControl.style.display="none"
                closeButton.style.display="none"
                }
                var namesmall=`font-size:10px`;
                priceFont="";
                if(itemName.length>=25){
                    name=itemName.slice(0,25)+"..."
                   
                 }
                btn=`<a class="btn btn-primary my-2 text-center d-block" style="height: 32px;"  id="buy-btn">Sepete Ekle</a>`;
                if(item.params.shippingFee==="FREE"){
                    
                    cargo=`<span class="text-muted my-4 py-4">Ücretsiz Kargo<span/>`
                 }
                 else{
                    cargo=`<span class="text-primary">Ücretli Kargo<span/>`
                 }
            }
            html +=
                `
                            <li class="item-${item.productId} ">
								<div class="box" ${boxclass}>
									<div class="slide-img "${imgSlide}>
										<img class="dynamic ${lazy}"  alt="${item.params.sellerNick}" 
                                        ${dataOriginal} ${src}
                                        />
										<div class=" ${overlay} ">
											<!--buy-btn------>
											<button href="#" class="buy-btn" id="buy-btn" >Sepete Ekle</button>
										</div>
									</div>
									<div class="detail-box">
										<!--type-------->
										<div class="type">
											<a href="${item.url}" style="text-decoration:none; ${namesmall}">${name}</a>
										</div>
										<!--price-------->
                                        <span class="d-block load p-1 my-2 font-weight-bold" style="background-color: #dcdee0bb; ${priceFont} 
                                        border-radius: 5px;" >
                                        ${item.price} TL</span>
                                        ${cargo}
                                        ${btn}
                                     
                                        
                                    </div>
                                 
								</div>
							</li>
      
      `;
            
        })
        
        sliderItems.innerHTML=html
       

    })
}

productShow(0);
listshow();

url="https://github.com/mmyildirim/getProduct.git"
fetch(`${url}`,{
  method: 'GET',
  origin:"http://127.0.0.1:5500",
  headers: { 'Content-Type': 'application/json'},
  
}).then(res => res.json()).then(data => {
    let gelen = data.responses[0][0].params.recommendedProducts;
    console.log("uzaktan",gelen)});
