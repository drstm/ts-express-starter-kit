## Starter kit for express and typescript

To be very clear, this is an opinionated idea of how to integrate the express framework with typescript (and connect to mysql). This is not necessarily the best way to do it, instead it is what works best for me and a layout whose organization makes sense to me.

### Dependencies

A lot of it is standard express dependencies with additional packages for type support. 

* The first departure from a standard express pattern is in routes handled by [express-enrouten](https://github.com/krakenjs/express-enrouten) 
* I have added in [lodash](https://lodash.com/) because I felt it helped me not reinvent the wheel despite some of the features being added into newer versions of javascript. 
* [Moment](http://momentjs.com) is super useful for any datetime needs and I eventually find myself installing this sooner or later
* [Sequelize](https://github.com/sequelize/sequelize) and sequelize-cli[https://github.com/sequelize/cli] are used to create the structure inside the `db` folder. The `connection.ts` file provides an object connected to the db as specified in the root `config` folder.

### Run

For local testing I prefer to use [nodemon](https://www.npmjs.com/package/nodemon) as: `nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts`

Other than that `npm run start` is enough. It builds the project using `tsc` into a `dist` folder serves it.

### Contributing

I would love to know if I can make this setup any easier, feel free to make a PR to improve it!

