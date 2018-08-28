window.onload =function()
{
	var arrayOfObjects; 
	var lengthOfArray;
	var arrayOfKeys;      
	chrome.storage.local.get('main_array',function(myobj){ arrayOfObjects = myobj['main_array'];});       
	chrome.storage.local.get('lengthOfMain_array',function(myobj){ lengthOfArray = myobj['lengthOfMain_array'];});
	chrome.storage.local.get('keys_of_objects',function(myobj){ arrayOfKeys = myobj['keys_of_objects'];});
	setTimeout(function(){
		for (let i = 0; i < lengthOfArray; i++)
		 {
			var url_div = document.createElement('div');
			url_div.classList.add("url_divs");
			url_div.innerHTML= "<a href ="+arrayOfObjects[i][arrayOfKeys[i]]+">"+arrayOfObjects[i][arrayOfKeys[i]]+"</a>"+"&nbsp" + "<section> <button class=restore >Restore</button>"+"&nbsp"+"&nbsp"+"<button class=delete1>Delete</button></section> ";
			document.body.appendChild(url_div);
		}
	},0);

}
var restore = document.getElementsByClassName('restore');
var delete1 = document.getElementsByClassName('delete1');

setTimeout(function()
{
	var length_restore = restore.length;
	for(let i =0;i<length_restore;i++)
	{
		restore[i].addEventListener("click",restore_f,false);
	}
},500);
setTimeout(function()
{
	var length_delete1 = delete1.length;
	for(let i =0;i<length_delete1;i++)
	{
		delete1[i].addEventListener("click",delete1_f,false);
	}
},500);
//to open the address in a new tab
function restore_f(){
	chrome.tabs.create({url:this.parentElement.parentElement.childNodes[0].href});
}
//to delete the address from the list of tabs
function delete1_f(){
	var url_selec_tab = this.parentElement.parentElement.childNodes[0].href;
	var to_close = this.parentElement.parentElement;
	var arrayOfObjects = []; 
	var lengthOfArray;
	var arrayOfKeys =[];      
	chrome.storage.local.get('main_array',function(myobj){ arrayOfObjects = myobj['main_array'];});       
	chrome.storage.local.get('lengthOfMain_array',function(myobj){ lengthOfArray = myobj['lengthOfMain_array']; });
	chrome.storage.local.get('keys_of_objects',function(myobj){ arrayOfKeys = myobj['keys_of_objects'];});
	setTimeout(function(){
	for(let i=0;i<lengthOfArray;i++)
	{	
		if(arrayOfObjects[i][arrayOfKeys[i]] == url_selec_tab)
		{
			arrayOfObjects.splice(i,1);
			arrayOfKeys.splice(i,1);
			lengthOfArray-=1;
	} 
	}},1000);
	setTimeout(function() {
		chrome.storage.local.set({"lengthOfMain_array":lengthOfArray});
		chrome.storage.local.set({'main_array':arrayOfObjects});
		chrome.storage.local.set({'keys_of_objects':arrayOfKeys});
		to_close.remove();
		 console.log(arrayOfObjects);
		 console.log(arrayOfKeys);
	},2000);
}
	