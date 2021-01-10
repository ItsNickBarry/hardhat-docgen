// Adds data to the HTML template
function generateHTML(json) {
  return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <title> ${json.name}</title>

    </head>

    <body class="h-screen bg-gray-100 px-4 py-6">

        <div class="w-full space-y-6 md:max-w-screen-sm lg:max-w-screen-md m-auto">
            <h1 class="text-2xl text-center font-bold">${json.name} </br>
                <code>${json.source}</code>
            </h1>
            <div class="w-full">
            <h3 class="text-xl">Events</h3>
               <code>${JSON.stringify(json.events)}</code>
            </div>
            <div class="w-full">
            <h3 class="text-xl">State Variable</h3>
                <code>${JSON.stringify(json.stateVariables)}</code>
            </div>
            <div class="w-full">
            <h3 class="text-xl">Methods</h3>
                <code>${JSON.stringify(json.methods)}</code>
            </div>
        </div>
    </body>

    </html>`;
}

module.exports = generateHTML;
