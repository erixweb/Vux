<>
    <script only:server>
        console.log("Fetched main page")
    </script>

    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vux Compile</title>
            <link rel="stylesheet" href="styles.css" />
            <script src="index.js"></script>
        </head>
        <body>
            <Header />
            <main>
                <script only:server>
                    console.log("Succesfully rendered main element")
                </script>
            </main>
        </body>
    </html>
</>