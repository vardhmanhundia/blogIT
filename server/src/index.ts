import {server} from "./graphql/main";

server.listen().then(({url}) => console.log(`Server ready on ${url}`));
