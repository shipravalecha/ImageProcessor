const App = require('./App');
const port = 8080;
App.listen(port, () => {
    console.log('Server is up and running at port ${port}');
});
