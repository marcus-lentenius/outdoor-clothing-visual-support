import React from 'react';
import noImage from '../../images/noImage.png'

/**
 * Creates a thumbnail of an image. 
 * Creates a div which crops the image and centers the image vertically inside
 * @param {string} src Path to image
 * @param {number, string} width Width of image and container
 * @param {number, string} height Height of the thumbnail
 * @param {function} clickEvent Callback function for click event
 * @param {param} eventParameter Parameter for the callback function
 */
const Thumbnail = ({ src, width = '100%', height, clickEvent, eventParameter }) => {
    const container = {
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden',
    }

    const image = {
        position: 'absolute',
        inset: 0,
        margin: 'auto',
    }

    return (
        <>
            <div onClick={() => {
                if (eventParameter) {
                    clickEvent(eventParameter);
                }
            }} style={container}>
                {src === '' ?
                    <img style={image}
                        id="chosen-image"
                        width={width}
                        src={noImage} />
                    :
                    <img
                        style={image}
                        id="chosen-image"
                        width={width}
                        src={src} />
                }
            </div>
        </>
    );
}

export default Thumbnail;