
require('../css/demo1.scss');
require('../assets/font-awesome-4.7.0/scss/font-awesome.scss');

const hello = () => {
	console.log('hello');
}

hello();

let promise = new Promise((resolve,reject) => {
	resolve('fuck');
})

promise.then(r => {
	console.log(r)
})

class Fuck {
	
	static userName = 'lilei';
	
	constructor(){
		
	}
	
	static getAge(){
		return 30;
	}
	
}

console.log(Fuck.userName)
console.log(Fuck.getAge())