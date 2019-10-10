export default {

    install(Vue) {
        Vue.mixin({
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                formatTIN(tin) {

                    return tin && tin.length == 13 ? `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, 9)}-${tin.substring(9, 13)}` : tin
                },
                formatDate(date, type) {
                    if (!date) {
                        return "";
                    }
                    var dt = new Date(date).toLocaleString("en-US", type ? type : {
                        hour12: true,
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    return dt;
                },
                getBase64(img, callback) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => callback(reader.result));
                    reader.readAsDataURL(img);
                },
                formatDtYear(dt) {
                    if (!dt) return ""
                    var date = new Date(dt);
                    var month = date.getMonth() + 1;
                    var newDT = date.getFullYear();
                    return newDT;
                },
                formatDtMonth(dt) {
                    if (!dt) return ""
                    var date = new Date(dt);
                    var month = date.getMonth() + 1;
                    return month;
                },
                formatDtDay(dt) {
                    if (!dt) return ""
                    var date = new Date(dt);
                    var day = date.getDate();
                    return day;
                },
                computeSum(data){
                    var total = 0
                    console.log("compute sum data: " + JSON.stringify(data))
                    data.forEach(element => {
                        console.log('for each element: ' + JSON.stringify(element))
                        if(element == null || element == undefined ){
                            console.log("element null or undefined: " + element)
                        element = 0
                        }
                        total += element
                    }); 
                    console.log("compute sum mixin: " + total)
                    return total
                }
            },
        })
    }
}