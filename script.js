class Book {
    constructor (title,author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages
    }

    getSummary(){
        return `Книга ${this.title} від автора ${this.author}, має ${this.pages} сторінок`
    }
}

let booksArray = [new Book('Гаррі Поттер 1', 'Джоан Роулінг', 800), new Book('Гаррі Поттер 2', 'Джоан Роулінг', 400 ), new Book('Гаррі Поттер 3', 'Джоан Роулінг', 600 ), new Book('Гаррі Поттер 4', 'Джоан Роулінг', 870 )]
//Callback
const printTitle = (book) =>{
    return book.getSummary();
}
function processBooks(booksArray, printTitle){
    booksArray.forEach(el => console.log(printTitle(el))
     )
}
processBooks(booksArray, printTitle);
//Currying
function createPageRangeChecker(minPages){
    return function (book){
        return book.pages >= minPages;
    }
}
const isEpicLength = createPageRangeChecker(700);
console.log(isEpicLength(booksArray[2]));
//Memoization

function calculateReadingTimeBase(pages){
        return pages/60;
}

function memoize (func){
    let cache = {};
    
    return function(arg) {
        if (cache[arg] !== undefined) {
            return cache[arg];
        }
        const result = func(arg);
        cache[arg] = result;
        return result;
    }
}
let calculateReadingTime = memoize(calculateReadingTimeBase);
console.log(calculateReadingTime(booksArray[0].pages));
console.log(calculateReadingTime(booksArray[0].pages));

// роботу простого кафе замовлення напоїв

class Cafe{
    constructor (){
        if(Cafe.instance){
            return Cafe.instance;
        }

        this.menu = {};
        Cafe.instance = this;
    }

    addBeverage(name, description){
        this.menu[name] = { name, description };
    }

    showMenu() {
        console.log('Меню кафе:');
        Object.values(this.menu).forEach(item => {
            console.log(` - ${item.name} - ${item.description}`);
        });
    }
}

class Beverage {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
    list() {return `Напій ${this.name} - ${this.description}`};
}

class BeverageFactory {
    static createBeverage(name) {
        const cafe = new Cafe();

        const drink = cafe.menu[name];
        if(!drink) {
            throw new Error (`Напій ${this.name} відсутній в меню!`);
        }
        return new Beverage(drink.name, drink.description);
    }
}

const cafe = new Cafe();

cafe.addBeverage('Кава', 'з молоком');
cafe.addBeverage('Чай', 'заварний з лимоном');
cafe.addBeverage('Какао', 'дитяче');

cafe.showMenu();

const drink1 = BeverageFactory.createBeverage('Кава');
const drink2 = BeverageFactory.createBeverage('Чай');
const drink3 = BeverageFactory.createBeverage('Какао');

console.log(drink1.list());
console.log(drink2.list());
console.log(drink3.list());

const cafe2 = new Cafe();
console.log(cafe === cafe2);
