
import { readFileSync } from 'fs';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(image: string) {
    let background = 'rgba(0,0,0,.74)';
    let foreground = '#000';

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: url(${image});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .label {
        background: ${foreground};
        color: white;
        display:inline-block;
        font-family: 'Inter', sans-serif;
        font-size: 50px;
        font-style: normal;
        padding: 15px 20px;
        border-radius: 10px;
        position: fixed;
        border: .5px solid #fff;
    }

    .label.logo {
        left: 60px;
        bottom: 60px;
        padding: 5px;
        text-align: center;
    }

    .logo img {
        display:block;
        margin: 0 -65px 0 0;
    }

    .label.price {
        right: 60px;
        bottom: 60px;
    }

    .label.logo svg {
        margin-bottom: -4px;
    }
    
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    let { image, price } = parsedReq;

    let priceHtml = price && price !== 'undefined' ? '<div class="label price">'+price+'</div>' : '';
    
    if( image === 'undefined' ){
        image = 'https://nft.kodadot.xyz/kodadot_carbonless.jpg';
    }

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss( image )}
    </style>
    <body>
        <div>
            <div class="imageWrapper">    
               ${ priceHtml }
               <div class="label logo">
                    <img src="https://raw.githubusercontent.com/kodadot/kodadot-presskit/main/v3/KODA_v3.png" height=80 />
               </div>
            </div>
        </div>
    </body>
</html>`;
}

// function getImage(src: string) {
//     return `<img
//         class="image"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//     />`
// }
