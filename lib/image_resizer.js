export {
    resizeImage,
    getScaleDownRatio
}

const resizeImage = (image, width, height) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL(image.type);
}

const getScaleDownRatio = (image_width, image_height, target_width, target_height) => {
    const result = {width:1, height:1};
    let ratio;

    if (target_width < image_width || target_height < image_height ) {
        if ( target_width < target_height ) ratio = target_width / image_width;
        else ratio = target_height / image_height ;

        result.width  = image_width * ratio;
        result.height = image_height * ratio;
    }

    return result;
}