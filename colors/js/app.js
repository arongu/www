import {
    uiInit,
    div_main
} from "./view.js"

import {
    getScaleDownRatio
} from "../../lib/image_resizer.js";

const image_house  = "../../lib/pix/triumph.jpg";
const image_leaves = "../../lib/pix/green_leaves.jpg";

let div_main_width,
    div_main_height,
    image;

const resizeHandler = () => {
    getDivMainWidthAndHeight();
}

const getDivMainWidthAndHeight = () => {
    div_main_width  = div_main.offsetWidth;
    div_main_height = div_main.offsetHeight
}

const openImage = (image_path) => {
    return new Promise((resolve) => {
        image = new Image();
        image.onload = () => resolve(image);
        image.src = image_path;
    });
}

const addImage = (image) => {
    image.width  = div_main_width;
    image.height = div_main_height;
    div_main.appendChild(image);
    return image;
}

const scaleImage = (image) => {
    const ratio = getScaleDownRatio(image.naturalWidth, image.naturalHeight, div_main_width, div_main_height);
    if ( ratio.height !== 1 || ratio.width !==1 ) {
        image.width = ratio.width;
        image.height = ratio.height;
    }
}

/* app */
const init = () => {
    uiInit();
    new ResizeObserver(resizeHandler).observe(div_main);
}

init();
openImage(image_leaves).then(addImage).then(scaleImage);

