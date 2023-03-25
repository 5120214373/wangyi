export const mycount = function(a){
    let time = a
    let i = 0
    for (i = 0; ; i++) {
        if (time < 10000) {
            break;
        }
        time = parseInt(time / 10000)
    }
    let count = ['', '万', '亿', '万亿']
    return time + count[i]
}