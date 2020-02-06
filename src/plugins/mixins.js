export default {

    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    rdo_interval: {}
                }
            },
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                formatTIN(tin) {

                    if (tin) {

                        tin = tin.toString().replace(/-/g, '')
                    }
                    if (tin && tin.length > 3 && tin.length < 7) {
                        return `${tin.substring(0, 3)}-${tin.substring(3, tin.length)}`
                    } else if (tin && tin.length > 6 && tin.length < 10) {
                        return `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, tin.length)}`
                    } else if (tin && tin.length > 9) {
                        return `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, 9)}-${tin.substring(9, tin.length)}`
                    } else {
                        return tin
                    }
                    //  {
                    //     return tin && tin.length == 13 ? `${tin.substring(0, 3)}-${tin.substring(3, 6)}-${tin.substring(6, 9)}-${tin.substring(9, 13)}` : tin
                    // }


                },
                formatAmount(amount, show_sign) {
                    // return amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ',') : '0.00'
                    if (!amount || isNaN(amount)) return show_sign ? "₱ 0.00" : "0.00";
                    var parts = parseFloat(amount).toFixed(2).toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return show_sign ? `₱ ${parts.join(".")}` : parts.join(".");
                },
                formatDate(date, type) {
                    if (!date) {
                        return " ";
                    }
                    if (type === 'dateonly') type = { year: "numeric", month: "long", day: "2-digit" };
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
                computeSum(data) {
                    var total = 0
                    // console.log("compute sum data: " + JSON.stringify(data))
                    if (data && data.length)
                        total = data.reduce((t, c) => {
                            return (t || 0) + (c || 0);
                        });
                    // console.log("compute sum mixin: " + total)
                    return total
                },
                currencyFormater(value) {
                    return `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                },
                currencyParser(value) {
                    return value.replace(/\₱\s?|(,*)/g, '')
                }
            },
        })
    }
}