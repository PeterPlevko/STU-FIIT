//https://stackoverflow.com/questions/21447269/how-to-limit-the-length-of-text-in-a-paragraph/21447588
function truncateText(selector, maxLength) {
    let element = document.getElementById(selector);
    let truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}

function randomBackground() {
    var c = document.createElement('canvas'),
        ctx = c.getContext('2d'),
        cw = c.width = document.body.clientWidth;
        ch = c.height = document.body.clientHeight + 500;

    ctx.fillStyle = "#0B0C10";
    ctx.fillRect(0, 0, cw, ch);
    for(var i=0;i<300;i++){
        ctx.strokeStyle = "rgba(102, 252, 241, 0.2)";
        ctx.lineWidth = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(Math.floor(Math.random()*(cw)) , Math.floor(Math.random()*(ch)), Math.floor(Math.random()*(100)+20), 0 ,2*Math.PI);
        ctx.stroke();
    }

    document.body.style.background = 'url(' + c.toDataURL() + ')';
}