const a = 12
const b = 17

const showProduct: (first: number, second: number) => number = (first, second) => {
    return first * second
}

console.log(`The product is %d`, showProduct(a, b))