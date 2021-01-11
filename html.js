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

        <div class="w-full space-y-10 md:max-w-screen-sm lg:max-w-screen-md m-auto">
            <code class="space-y-4">
                <h1 class="text-xl">
                    name: ${json.name} </br>
                    source: ${json.source} </br>
                    author: ${json.author}
                </h1>

                <h2 class="text-lg">
                    title: ${json.title}
                </h2>
            
                <p>details: ${json.details}</p>
                <p>notice: ${json.notice}</p>
            </code>
            
            <div class="w-full">
                <pre class="text-lg">events:</pre>
               <pre>${formatJson(json.events)}</pre>
            </div>

            <div class="w-full">
                <pre class="text-lg">stateVariables:</pre>
                <pre>${formatJson(json.stateVariables)}</pre>
            </div>
            
            <div class="w-full">
                <pre class="text-lg">methods:</pre>
                <pre>${formatJson(json.methods)}</pre>
            </div>
        </div>
    </body>

    </html>`;
}

const formatJson = (json) => JSON.stringify(json, undefined, 2);

module.exports = generateHTML;
