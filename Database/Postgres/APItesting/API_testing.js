
import http from 'k6/http';
import {sleep} from 'k6'


export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '10s', target: 1},
        {duration: '10s', target: 10},
        {duration: '10s', target: 100}, 
        {duration: '10s', target: 1000},
        {duration: '10s', target: 0}, 

    ]
};
let headers = { 'Content-Type': 'application/json' };

const productsCount = 1000011;
const stylesCount = 1958102;
const photos = 5655463; 

const randomInt = (count) => {
    return Math.floor(Math.random() * count) + 1
}

const randomPageCount = (first, last) => {
    return Math.floor(Math.random() * (last - first + 1)) + first;
  };

var page = randomPageCount(1, 20);
var count = randomPageCount(1, 20);

export default () => {
    const productsUrl = `http://localhost:4000/products?page=${page}&count=${count}`;  
    const stylesUrl = `http://localhost:4000/product/product_id=${randomInt(productsCount)}/styles`;

    http.batch([['GET', productsUrl], ['GET', stylesUrl]]);
    sleep(1);
};