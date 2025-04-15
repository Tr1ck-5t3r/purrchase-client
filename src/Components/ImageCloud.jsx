import { Suspense } from "react";

import articleimgfive from '../Assets/articleimgtwo.png'

function ImageCloud(image) {
    return (
        <Suspense fallback={<img src={articleimgfive}/>}>
            <img
            src={"https://res.cloudinary.com/dgz60odkx/image/upload/v1732201087/" + image.src}
            alt="Lazy Loaded Image"
            className="h-full w-auto justify-self-center"
            />
        </Suspense>
    );
}

export default ImageCloud
