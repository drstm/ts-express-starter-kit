// basic route for a GET / request

module.exports = (router: any) => {
    router.get('/', async (request: any, response: any) => {
        response.send('Hello World!');
    });
}