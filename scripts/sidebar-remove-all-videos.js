
var arr = [];
var str = "";
const removeSidebarVideos = async () => {
	let peaces = [];
	let pri = "";
	await document
		.querySelectorAll("h1, h2, h3, h4, h5, h6")
		.forEach(sidebarVideo => { 
				peaces = sidebarVideo.innerHTML.replace(/[^a-zA-Z ]/g, "");
				peaces = peaces.replace(/\b(\w*span\w*)\b/g, "");
				peaces = peaces.replace(/\b(\w*classmwheadline\w*)\b/g, "");
				peaces = peaces.replace(/\b(\w*title\w*)\b/g, "");
				peaces = peaces.replace(/\b(\w*section\w*)\b/g, "");	
				peaces = peaces.replace(/\b(\w*id\w*)\b/g, "").split(" ");	
					peaces.forEach(peace => {
						pri += peace;
					})
					arr.push(pri);
					pri = "";
				})
		await remDup();
		//got through the field
		arr.forEach(word => {
			str += ("#" + word + " ")
		})

		//console.log(str);

		await updateWords();
}

const remDup = () => {
	let pri = [];
	let f;
	for(let i=0;i<arr.length;i++){
		pri.push(arr[i]);
		f = arr.indexOf(arr[i]);
		if(f===-1){
			pri.push(arr[i])
		}
	}
	arr = pri;console.log(pri)
}

var t = "color:#F00;background-Color:#000;";
var b = "display:true; top:0px; left:0px; width:400px; height:500px; overflow-x:hidden; background-Color:#000a; position: fixed; "
var c = "display:true; top:0px; left:400px; cursor:pointer; background-Color:#0f00; position: fixed; "
var d = "display:true; color:#00f; font-size:20px; background-Color:#0f0a; position: relative; "
var e = "display:true; top:0px; left:300px; cursor:pointer; background-Color:#0f00; position: relative; "
var f = "display:true; top:0px; left:340px; cursor:pointer; background-Color:#0ffa; position: absolute; "

function updateWords() {
    var nodeParent = document.createElement("Div"); 
    var closeButton = document.createElement("Div");// Create a <li> node 
    var copyButton = document.createElement("Div");
    var closeIcon = document.createElement("SPAN");
    var copyIcon = document.createElement("SPAN");

    closeButton.setAttribute("style" , c);
    nodeParent.appendChild(closeButton);

	copyButton.setAttribute("style" , f);
    nodeParent.appendChild(copyButton);

    closeIcon.setAttribute("style" , d);
    copyIcon.setAttribute("style" , d);
    var textnode = document.createTextNode("Close");   // Create a text node
    var textnodeCopy = document.createTextNode("Copy");   // Create a text node

    closeIcon.addEventListener('click',() => {
    	if (nodeParent.style.left <= "-400px"){
    		nodeParent.style.left = "0px"
    		
    		closeIcon.removeChild(textnode);
    		textnode = document.createTextNode("close"); 
    		closeIcon.appendChild(textnode);
    		closeButton.appendChild(closeIcon);
    		closeButton.style.left = "400px";
    	}else{
    		nodeParent.style.left = "-400px";
    		
    		closeIcon.removeChild(textnode);
    		textnode = document.createTextNode("open");
    		closeIcon.appendChild(textnode);
    		closeButton.appendChild(closeIcon); 
			closeButton.style.left = "0px";
    	}
    });

    copyIcon.addEventListener('click', () => {
	   var el = document.createElement('textarea');
	   // Set value (string to be copied)
	   el.value = str;
	   //console.log(el.value);
	   // Set non-editable to avoid focus and move outside of view
	   el.setAttribute('readonly', '');
	   el.style = {position: 'absolute', left: '-9999px'};
	   document.body.appendChild(el);
	   // Select text inside element
	   el.select();
	   // Copy text to clipboard
	   document.execCommand('copy');
	   // Remove temporary element
	   document.body.removeChild(el);
    })

    closeIcon.appendChild(textnode);
    closeButton.appendChild(closeIcon);

    copyIcon.appendChild(textnodeCopy);
    copyButton.appendChild(copyIcon);

    nodeParent.setAttribute("style" , b)
    nodeParent.style.zIndex = 25000; 

    arr.forEach(item => {
	    var node = document.createElement("SPAN");                 // Create a <span> node
	    var textnode = document.createTextNode("#" + item + " ");         // Create a text node
	    node.appendChild(textnode);   

	    node.setAttribute("style" , t)
	    nodeParent.appendChild(node);
    })

    document.getElementsByTagName("html")[0].appendChild(nodeParent);

}

window.addEventListener('resize', removeSidebarVideos());
