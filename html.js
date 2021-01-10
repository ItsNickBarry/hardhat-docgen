const fs = require('fs');
const jsonFiles = require('./json');

// Adds data to the HTML template and creates file
function createHTML(jsonObj, nav) {
  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <title> ${jsonObj.name}</title>
        
    </head>
    
    <body class="h-screen bg-gray-100 px-4 py-6">
        
        <div class="w-full space-y-6 md:max-w-screen-sm lg:max-w-screen-md m-auto">
            <nav class="space-x-4 mb-16">
            ${nav}
            </nav>
            <h1 class="text-2xl text-center font-bold">${jsonObj.name} </br>
                <code>${jsonObj.source}</code>
            </h1>
            <div class="w-full">
            <h3 class="text-xl">Events</h3>
               <code>${JSON.stringify(jsonObj.events)}</code>
            </div>
            <div class="w-full">
            <h3 class="text-xl">State Variable</h3>
                <code>${JSON.stringify(jsonObj.stateVariables)}</code>
            </div>
            <div class="w-full">
            <h3 class="text-xl">Methods</h3>
                <code>${JSON.stringify(jsonObj.methods)}</code>
            </div>
        </div>
    </body>
    
    </html>`;

  //
  fs.writeFile(
    `./${jsonObj.source.split('/')[0]}_${jsonObj.name}.html`,
    htmlContent,
    (error) => {
      console.log(error);
    }
  );
}

// Creates a string of Nav links to each file
let navLinks = '';
Object.keys(jsonFiles).forEach((key) => {
  navLinks += `<a class="border-gray-500 border py-2 px-4 rounded" href="./${
    jsonFiles[key].source.split('/')[0]
  }_${jsonFiles[key].name}.html">${jsonFiles[key].name} - 
  ${jsonFiles[key].source}
  </a>`;
});

// Runs the createHTML for/with each jsonFile
Object.keys(jsonFiles).forEach((key) => createHTML(jsonFiles[key], navLinks));
