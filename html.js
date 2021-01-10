// Adds data to the HTML template
function generateHTML(jsonObj, nav) {
  return `<!DOCTYPE html>
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
}

module.exports = generateHTML;
