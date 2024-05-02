import { Rectangle } from "pixi.js";

export interface IHitbox {

    getHitbox(): Rectangle
}

export function checkCollision(objA: IHitbox, objB: IHitbox): Rectangle | null {

    const rectA = objA.getHitbox();
    const rectB = objB.getHitbox();

    const rightMostLeft = rectA.left < rectB.left ? rectB.left : rectA.left;
    const leftMostRight = rectA.right > rectB.right ? rectB.right : rectA.right;
    const bottomMostTop = rectA.top < rectB.top ? rectB.top : rectA.top;
    const topMostBottom = rectA.bottom > rectB.bottom ? rectB.bottom : rectA.bottom;

    const makesSenseHorizontral = rightMostLeft < leftMostRight;
    const makesSenseVertical = bottomMostTop < topMostBottom;
    
    if (makesSenseHorizontral && makesSenseVertical) {
        
        const rectVal = new Rectangle();
        rectVal.x = rightMostLeft;
        rectVal.y = bottomMostTop
        rectVal.width = leftMostRight - rightMostLeft;
        rectVal.height = topMostBottom - bottomMostTop;

        return rectVal;
    } else {
        return null;
    }

}