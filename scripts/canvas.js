// CANVAS

function initialPosition(textCanvas, lenWord) {
    const percenUnderscore = 0.07543;
    const percenSpace = 0.0431;

    const widthCanvas = textCanvas.width;
    const widthUnderscore = Math.round(widthCanvas * percenUnderscore);
    const widthSpace = Math.round(widthCanvas * percenSpace);
    
    const startUnderscore = Math.round(widthCanvas / 2) - 
                            Math.round((lenWord * widthUnderscore + (lenWord - 1) *
                            widthSpace) / 2);

    return [startUnderscore, widthUnderscore, widthSpace]    
}


function drawUnderscore(lenWord) {
    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");       
    
    if (ctx) {
        const heightCanvas = textCanvas.height;
        const percenHeight = 0.4276;
        const percenLine = 0.0197;
        const positionV = heightCanvas * percenHeight;

        let startH = 0;
        let endH = 0;
        let widthUnderscore = 0;
        let widthSpace = 0;
        
        // limpiar canvas
        textCanvas.width = textCanvas.width;

        [startH, widthUnderscore, widthSpace] = initialPosition(textCanvas, lenWord)

        ctx.lineWidth = Math.round(heightCanvas * percenLine);    
        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        for (let i = 1; i <= lenWord; i++) {
            endH = startH + widthUnderscore;

            ctx.moveTo(startH, positionV);
            ctx.lineTo(endH, positionV);

            startH = endH + widthSpace;              
        }
        ctx.stroke();
    }
}


function drawLetterHit(position, letter, lenWord) {
    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");   

    if (ctx) {
        const widthCanvas = textCanvas.width;
        const heightCanvas = textCanvas.height;
        const percenFont = 0.0862;
        const percenHeight = 0.375;
        const positionV = heightCanvas * percenHeight;

        let startH = 0;
        let endH = 0;
        let widthUnderscore = 0;
        let widthSpace = 0;
        let centerX = 0; 

        ctx.font = Math.round(widthCanvas * percenFont) + 'px Inter';

        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        ctx.textAlign = 'center';

        [startH, widthUnderscore, widthSpace] = initialPosition(textCanvas, lenWord)
        centerX = widthUnderscore / 2;        

        for (let i = 1; i <= position; i++) {
            endH = startH + widthUnderscore;
            startH = endH + widthSpace;              
        }

        ctx.fillText(letter, startH + centerX, positionV);
    }
}


function drawLetterWrong(position, letter) {
    const textCanvas = document.querySelector('#game__canvas__text');
    const ctx = textCanvas.getContext("2d");   

    if (ctx) {
        const widthCanvas = textCanvas.width;
        const heightCanvas = textCanvas.height;
        const percenFont = 0.0517;
        const percenHeight = 0.7894;
        const widthFont = Math.round(widthCanvas * percenFont);
        const centerX = Math.round((widthCanvas * percenFont) / 2); // ver
        const positionV = heightCanvas * percenHeight;
        const startH = Math.round(widthCanvas * 0.2694);

        ctx.font = Math.round(widthCanvas * percenFont) + 'px Inter';            
        ctx.strokeStyle = "#495057";
        ctx.fillStyle = "#495057"
        ctx.textAlign = 'center';


        ctx.fillText(letter, startH + (widthFont * position) + centerX, positionV);
    }
}


function drawHanged(mistake) {
    const imgCanvas = document.querySelector('#game__canvas__img');
    const ctx = imgCanvas.getContext("2d");   
    
    if (ctx) {
        const heightCanvas = imgCanvas.height;
        const widthCanvas = imgCanvas.width;
    
        ctx.lineWidth = Math.round(widthCanvas * 0.0129);
        const margin = ctx.lineWidth / 2
        const axisFirst = widthCanvas * 0.2743;
        const axisSecond = widthCanvas * 0.833;
        const longCord = heightCanvas * 0.125 ;
        const longBody = heightCanvas * 0.375;
        const radius = widthCanvas * 0.1071;
        const longLimbs = heightCanvas * 0.2;
        const angleLimbs = heightCanvas * 0.0975;
        
        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        ctx.lineCap = "round";

        switch (mistake) {
            case 1:
                drawHangedLine(ctx, axisFirst, margin, axisFirst, heightCanvas);
            break;
            case 2:
                drawHangedLine(ctx, axisFirst, margin, axisSecond, margin);
            break;
            case 3:
                drawHangedLine(ctx, axisSecond, margin, axisSecond, longCord);
            break;
            case 4:
                drawHangedHead(ctx, radius, axisSecond, longCord);
            break;
            case 5:
                drawHangedLine(ctx, 
                    axisSecond, 
                    longCord + (radius * 2), 
                    axisSecond, 
                    longCord + (radius * 2) + longBody);
            break;
            case 6:
                drawHangedLine(ctx, 
                    axisSecond, 
                    longCord + (radius * 2), 
                    axisSecond - angleLimbs, 
                    longCord + (radius * 2) + longLimbs);

            break;
            case 7:
                drawHangedLine(ctx, 
                    axisSecond, 
                    longCord + (radius * 2), 
                    axisSecond + angleLimbs, 
                    longCord + (radius * 2) + longLimbs);
            break;
            case 8:
                drawHangedLine(ctx, 
                    axisSecond, 
                    longCord + (radius * 2) + longBody, 
                    axisSecond - angleLimbs, 
                    longCord + (radius * 2) + longBody + longLimbs);
            break;
            case 9:
                drawHangedLine(ctx, 
                    axisSecond, 
                    longCord + (radius * 2) + longBody, 
                    axisSecond + angleLimbs, 
                    longCord + (radius * 2) + longBody + longLimbs);
                    drawFace(ctx, radius, axisSecond, longCord + radius, false)
                    drawFaceDead(ctx, radius, axisSecond, longCord + radius)
    
            break;
        }
    }
}


function drawHangedLine(ctx, xOrigin, yOrigin, xFinal, yFinal) {
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.lineTo(xFinal, yFinal);
    ctx.stroke();
    ctx.closePath();
}


function drawHangedHead(ctx, radius, centerX, longCord) {

    let centerY = longCord + radius;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);    
    ctx.stroke();
    ctx.closePath();
    drawFace(ctx, radius, centerX, centerY, true);
}


function drawFace(ctx, radius, centerX, centerY, draw) {
    ctx.lineWidth = radius * 0.0952;
    const eyeSeparation =  radius * 0.4128;
    const eyeHeight = radius * 0.3175;
    const mouthHeight = radius * 0.07;
    
    if (draw) {
        
        drawEye(ctx, centerX - eyeSeparation, centerY - eyeHeight, radius * 0.20)

        drawEye(ctx, centerX + eyeSeparation, centerY - eyeHeight, radius * 0.20)
    
        ctx.beginPath();
        ctx.arc(centerX, centerY + mouthHeight, radius * 0.5, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();

    } else {

        const cornerLeftX = centerX - eyeSeparation - radius * 0.20 - ctx.lineWidth / 2;
        const cornerLeftY = centerY - eyeHeight - radius * 0.20 - ctx.lineWidth / 2;
        const cornerRightX = centerX + eyeSeparation + radius * 0.20 + ctx.lineWidth / 2;
        const cornerBottom = centerY + mouthHeight + radius * 0.5 + ctx.lineWidth / 2;
        const faceWidth = cornerRightX - cornerLeftX;
        const faceHight = cornerBottom - cornerLeftY;
    
        ctx.clearRect(cornerLeftX, cornerLeftY, faceWidth, faceHight);    
    }
}


function drawEye(ctx, centerX, centerY, radius) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
} 


function drawFaceDead(ctx, radius, centerX, centerY) {
    ctx.lineWidth = radius * 0.1270;
    const eyeLine = radius * 0.20;
    const eyeSeparation =  radius * 0.4128;
    const eyeHeight = radius * 0.3175;
    const mouthHeight = radius * 0.31;
    const mouthWidth = radius * 0.5;
    let x0;
    let y0;
    let x1;
    let y1;

    // left eye
    drawEyeDead(ctx, centerX - eyeSeparation, centerY - eyeHeight, eyeLine)

    // right eye
    drawEyeDead(ctx, centerX + eyeSeparation, centerY - eyeHeight, eyeLine)

    // mouth
    x0 = centerX  - mouthWidth;
    y0 = centerY + mouthHeight;
    x1 = centerX  + mouthWidth;
    y1 = y0;
    drawHangedLine(ctx, x0, y0, x1, y1);

}


function drawEyeDead(ctx, centerX, centerY, eyeLine) {
    let x0;
    let y0;
    let x1;
    let y1;

    x0 = centerX - eyeLine;
    y0 = centerY - eyeLine;
    x1 = centerX + eyeLine;
    y1 = centerY + eyeLine;
    drawHangedLine(ctx, x0, y0, x1, y1);

    x0 = centerX + eyeLine;
    y0 = centerY - eyeLine;
    x1 = centerX - eyeLine;
    y1 = centerY + eyeLine;
    drawHangedLine(ctx, x0, y0, x1, y1);
}


function drawEndMessage(success) {
    const imgCanvas = document.querySelector('#game__canvas__img');
    const ctx = imgCanvas.getContext("2d");   

    if (ctx) {
        const widthCanvas = imgCanvas.width;
        const heightCanvas = imgCanvas.height;
        const percenFont = 0.1500;
        const percenClear = 0.2272;
        const heightFont = Math.round(widthCanvas * percenFont);
        const clearFont = heightFont * percenClear;
        const positionV = heightCanvas / 1.600;
        const centerX = widthCanvas / 2;
        ctx.textAlign = 'center';

        ctx.font =  heightFont + 'px Inter';
        ctx.strokeStyle = success ? 'green' : 'red';
        ctx.fillStyle = success ? 'green' : 'red';
        
        if (success) {
            ctx.clearRect(0, positionV - heightFont + clearFont, widthCanvas, heightFont * 2);    
            ctx.fillText('Ganaste', centerX, positionV);
            ctx.fillText('felicidades!', centerX, positionV + Math.round(widthCanvas * percenFont));
        } else {
            ctx.clearRect(0, positionV - heightFont + clearFont, widthCanvas, heightFont);    
            ctx.fillText('Fin del juego!', centerX, positionV);
        }
    }
}


function drawHangedReset() {
    const imgCanvas = document.querySelector('#game__canvas__img');
    const ctx = imgCanvas.getContext("2d");   
    imgCanvas.width = imgCanvas.width;

    if (ctx) {
        const heightCanvas = imgCanvas.height;
        const widthCanvas = imgCanvas.width;
        const percenLine =  0.0172;

        ctx.lineWidth = Math.round(widthCanvas * percenLine);
        const margin = ctx.lineWidth / 2
        ctx.strokeStyle = "#0A3871";
        ctx.fillStyle = "#0A3871"
        ctx.lineCap = "round";
       
        drawHangedLine(ctx, 0 + margin, heightCanvas - margin, widthCanvas - margin,
                       heightCanvas - margin);

    }
}
