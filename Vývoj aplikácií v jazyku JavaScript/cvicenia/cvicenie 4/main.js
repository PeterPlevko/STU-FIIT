//vytvorte jednoduchu funkciu vracajucu Promise, ktora bude nieco dlho vykonavat (setTimeout)
// -||- nech robi nieco trochu ine
// spojte spracovanie promisov

let fnBigCompute = function(p) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('result processed');
            if(p !== 4) resolve(p + 1);
            else reject('boom');
        }, 5000);
    });
};

let fnBigComputeA = function(p) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('result processed');
            if(p !== 4) resolve(p + 'a');
            else reject('boom');
        }, 5000);
    });
};

fnBigCompute(0).then(fnBigComputeA).then(data => console.log(data));
