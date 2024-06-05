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

function showMap(iFrame){
    let map
    switch (iFrame) {
        case 1:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.253298651308!2d17.070587484120647!3d48.153743735471004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8b585229fc0ae860!2sFaculty%20of%20Informatics%20and%20Information%20Technologies%20STU!5e0!3m2!1sen!2ssk!4v1634975187582!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 2:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.651156484129!2d17.57033660646662!3d48.371818320988204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476ca0803adb09af%3A0xd9720bfe8b034517!2sMateri%C3%A1lovotechnologick%C3%A1%20fakulta%20STU!5e0!3m2!1sen!2ssk!4v1634975247128!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 3:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.69678003012!2d18.04744303146391!3d48.89812185014093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714a18af69bfe33%3A0x7b29790dd9addd!2sAlexander%20Dubcek%20University%20in%20Trencin!5e0!3m2!1sen!2ssk!4v1634975334009!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 4:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6676.852328949255!2d18.0923585573331!3d48.306034561430685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b3ee583e728a7%3A0xe70919ee435d2989!2sSlovak%20University%20of%20Agriculture!5e0!3m2!1sen!2ssk!4v1634975489821!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 5:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.294952311352!2d18.752597116522377!3d49.20281150175681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471459482d177287%3A0x278378d8bd875274!2sUniversity%20of%20%C5%BDilina!5e0!3m2!1sen!2ssk!4v1634975519370!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 6:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.318747526392!2d19.145654567979562!3d48.74444454875284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715161b9f41bc8d%3A0xf5144937567f6792!2sFaculty%20of%20Matej%20Bel%20University!5e0!3m2!1sen!2ssk!4v1634975553989!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 7:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.297812044787!2d21.2320189476981!3d48.99106330384565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473eed7bb014df5d%3A0xa5f8d568b88a1bb0!2zUHJlxaFvdnNrw6EgdW5pdmVyeml0YSB2IFByZcWhb3Zl!5e0!3m2!1sen!2ssk!4v1634975582610!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        case 8:
            map = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2182.3806613895235!2d21.250381214136635!3d48.71918767004948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ee042424efac3%3A0x760e93fdfa0f5429!2sPavol%20Jozef%20%C5%A0af%C3%A1rik%20University!5e0!3m2!1sen!2ssk!4v1634975609918!5m2!1sen!2ssk\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
            break;
        default:
            console.log(`Sorry, we are out of ${expr}.`);
    }

    const parent = document.getElementById("mapId")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    parent.innerHTML = map
}

function myFunction(param) {
    let copyText = document.getElementById(`myInput${param}`);
    copyText.innerText
    navigator.clipboard.writeText(copyText.innerText);
}
