//Set up the extension on install or on update
chrome.runtime.onInstalled.addListener(
	function(details)
	{
		if(details.reason == "install")
		{
			var arrayOfObjects = []; //array of objects would contain objects with key value pairs, with values as urls of the webpages
			var lengthOfArray = 0;
			var arrayOfKeys = [];
			chrome.storage.local.set({"main_array":arrayOfObjects});
			chrome.storage.local.set({"lengthOfMain_array":lengthOfArray});
			chrome.storage.local.set({"keys_of_objects":arrayOfKeys});
		}
		else if (details.reason == "update")
		{
			var arrayOfObjects; 
			var lengthOfArray;
			var arrayOfKeys;      
			chrome.storage.local.get('main_array',function(myobj){	arrayOfObjects = myobj['main_array']; });       
			chrome.storage.local.get('lengthOfMain_array',function(myobj){ lengthOfArray = myobj['lengthOfMain_array']; });
			chrome.storage.local.get('keys_of_objects',function(myobj){ arrayOfKeys = myobj['keys_of_objects']; }); 
		}
	}
)
//When new window opens, open the extension
chrome.windows.onCreated.addListener(
	function(window)
		{	
			setTimeout(function(){chrome.tabs.create({url:"/home.html"});},1500);
		}
);
//When extension icon is clicked, save the active tabs
chrome.browserAction.onClicked.addListener(
function(tab)
	{	
		var url_of_tabs = [];
		var arrayOfObjects; 
		var lengthOfArray;
		var arrayOfKeys;      
		chrome.storage.local.get('main_array',function(myobj){	arrayOfObjects = myobj['main_array'];});       
		chrome.storage.local.get('lengthOfMain_array',function(myobj){ lengthOfArray = myobj['lengthOfMain_array']; });
		chrome.storage.local.get('keys_of_objects',function(myobj){ arrayOfKeys = myobj['keys_of_objects']; });  
		chrome.tabs.query( {currentWindow:true } && {pinned : false } ,function(listOfActiveTabs)
		{
			console.log(listOfActiveTabs);
			//Finding url from the object provided 
			var len = listOfActiveTabs.length;
			var match= [];
			var new_len=0;
			//Checking if url exists previously, reject if yes && save if not;
			for(let i =0 ;i<len;i++)
			{   
				for(let k=0;k<lengthOfArray;k++)
				{
					match[i] =false;
					if(listOfActiveTabs[i].url == arrayOfObjects[k][arrayOfKeys[k]])
					{
						match[i] = true;
						break;
					}
				}
				if(match[i] != true)
				{
					url_of_tabs.push(listOfActiveTabs[i].url);
					new_len+=1;
				}
			}
		setTimeout(function(){
			lengthOfArray +=new_len;
			chrome.storage.local.set({'lengthOfMain_array':lengthOfArray});
				for(let j=lengthOfArray-new_len,x=0;j<lengthOfArray, x<new_len;j++,x++)
				{  
					var obj = {};
					arrayOfObjects[j] = obj;
					arrayOfKeys[j] = j;
					obj[arrayOfKeys[j]] = url_of_tabs[x];
					chrome.storage.local.set(arrayOfObjects[j]);
					chrome.storage.local.set({'main_array':arrayOfObjects});
					chrome.storage.local.set({'keys_of_objects':arrayOfKeys});
				}
				console.log(arrayOfObjects);
				console.log(arrayOfKeys);
			},1500);
		});
		setTimeout(function(){chrome.tabs.create({url:"/home.html"});},1500);
	}
);

