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
		if(val.includes('<script src="https://blobfischforever.github.io/domrenderer/renderer.js"></script>')){
			localStorage.setItem(key,val.replace('<script src="https://blobfischforever.github.io/domrenderer/renderer.js"></script>',""));
			console.log("cleaned");
		}else{
			console.log("clean");
		}
	}
}
