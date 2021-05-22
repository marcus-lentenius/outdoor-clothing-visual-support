import boots from '../images/pictogram/boots.png'
import cap from '../images/pictogram/cap.png'
import gloves from '../images/pictogram/gloves.png'
import rainCoat from '../images/pictogram/rainCoat.png'
import sandals from '../images/pictogram/sandals.png'
import scarf from '../images/pictogram/scarf.png'
import shoes from '../images/pictogram/shoes.png'
import winterHat from '../images/pictogram/winterHat.png'
import winterJacket from '../images/pictogram/winterJacket.png'










export const listOfPictogram = () => {
    const arr = [];

    arr.push({ url: boots });
    arr.push({
        url: cap
    });
    arr.push({
        url: gloves
    });
    arr.push({
        url: rainCoat
    });
    arr.push({
        url: sandals
    });
    arr.push({
        url: scarf
    });
    arr.push({
        url: shoes
    });
    arr.push({
        url: winterHat
    });
    arr.push({
        url: winterJacket
    });
    return arr;
}