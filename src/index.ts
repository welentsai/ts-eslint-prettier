// import { Canvas } from 'canvas'
import { JSDOM } from 'jsdom'
import 'global-jsdom/register'

import 'canvas-5-polyfill'

// const nodeCanvas = new Canvas(120, 120)
// const ctx = nodeCanvas.getContext('2d')

// square outline
const path1 = new Path2D();
path1.rect(10, 10, 100, 100);
// ctx.stroke();

const a = 12
const b = 17

// -------------- JSDOM ------------------------------
// Create a virtual DOM environment
const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const { window } = jsdom
const { document } = window

// global.document = document
// global.window = window



const showProduct: (first: number, second: number) => number = (first, second) => {
    return first * second
}

const getExcalidrawLibrary = async () => {
    const library = (await import('@excalidraw/excalidraw'))
    return library
}

const myText = [{
    type: "text",
    x: 100,
    y: 100,
    text: "HELLO WORLD!",
}]

getExcalidrawLibrary().then(
    library => {
        const myElements = library.convertToExcalidrawElements([{
            type: "text",
            x: 100,
            y: 100,
            text: "HELLO WORLD!",
        }])


        console.log(myElements)

        console.log('yes here')
    }
)

console.log(`The product is %d`, showProduct(a, b))