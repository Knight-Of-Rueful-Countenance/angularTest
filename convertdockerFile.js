const gitignoreToDockerignore = require('gitignore-to-dockerignore')
const fs = require('fs')

fs.readFile('.gitignore', 'utf8', function(err, contents) {
	fs.writeFile(".dockerignore", gitignoreToDockerignore(contents), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Success!");
	}); 
});