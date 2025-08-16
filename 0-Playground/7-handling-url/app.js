const http = require('http')
const url = require('url')

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true)

    // on browser go to link: http://localhost:8000/about?name=shubham&id=2
    console.log(myUrl);
    /*
    Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?name=shubham&id=2',
        query: [Object: null prototype] { name: 'shubham', id: '2' },
        pathname: '/about',
        path: '/about?name=shubham&id=2',
        href: '/about?name=shubham&id=2'
    }
    */

    res.end(`Hello, ${myUrl.query.name}!`);
})

myServer.listen(8000, () => console.log("Server started"));