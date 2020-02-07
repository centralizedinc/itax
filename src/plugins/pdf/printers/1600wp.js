const form = require("../templates/1600wp_template").template;
var form_list = [form, form]
/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details printer: " + JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ###### :', content);
    
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 600
            }]
        },
        content: content,
        pageMargins: [0,30,0,0],
        images: {
            form: form
        },
        pageSize: 'LEGAL',
        
    };
}

/**
 * 
 * @param {Array|Object} forms 
 */
function getContent(forms) {
    console.log("get content forms: " + JSON.stringify(forms.sched1))
    var x = 0
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content = [], widths = [], body = [], datas = []
    // ---------------------------------------------------------------------------------------------------
    // grid v2
     // initialize datas
     for (let a = 0; a < 100; a++) {
        datas[a] = []
        for (let b = 0; b < 34; b++){
            if(a==0){
                datas[a][b] = { text: `${b}`,fontSize: 8, styles: 'cell', color: 'green', bold: true };
            }else if(a!==0 && b==0){
                datas[a][b] = { text: `${a}`,fontSize: 8, styles: 'cell', color: 'blue', bold: true };
            }
            else if(a!== 0 && b>=33){
                datas[a][b] = { text: `${a}`,fontSize: 8, styles: 'cell', color: 'blue', bold: true };
            }
            else{
                datas[a][b] = { text: " ",fontSize: 8, styles: 'cell', color: '#e1e1e1', bold: true };
            }
        }
         
    }

    // setup data
    datas[13][1] = {
        text: "h123123123",
        characterSpacing: 9,
        colSpan: 23,
        rowSpan: 2,
        // noWrap: true,
        // right,down,left,up
        margin:[0,0,0,0]
    }

    datas[10][27] = {
        text: "1117",
        colSpan: 3
    }

    // Setup widths
    for (let a = 0; a < 34; a++) widths.push(10);

    // setup body
    for (let a = 0; a < 100; a++) {
        var col_datas = [];
        for (let b = 0; b < 34; b++) col_datas.push(datas[a][b]);
        body.push(col_datas)
    }
    console.log('widths :', widths);
    // console.log('widths :', widths);
    content.push({
        
        // layout: "lightHorizontalLines",
        // layout: "noBorders",
        table: {
            widths,
            body
        },
        layout: {
            hLineWidth: function (i, node) {
                return 0.1;
            },
            vLineWidth: function (i, node) {
                return  0.1;
            },
            hLineColor: function (i, node) {
                return 'red';
            },
            vLineColor: function (i, node) {
                return 'red';
            },
        },
        styles: {
            cell: {
                color: '#FFF',
                opacity: `100%`
            }
        }
    })
    // -----------------------------------------------------------------------------------------------
    // grid v1
    // // initialize datas
    // for (let a = 0; a < 100; a++) {
    //     datas[a] = []
    //     for (let b = 0; b < 30; b++) datas[a][b] = { text: `${a},${b}`,fontSize: 8, styles: 'cell', color: '#e1e1e1', bold: true };
    // }

    // // setup data
    // datas[10][1] = {
    //     text: "hey123123123123",
    //     colSpan: 12,
    //     rowSpan: 0,
    //     // noWrap: true,
    //     // right,down,left,up
    //     margin:[0,0,0,0]
    // }

    // datas[10][27] = {
    //     text: "1117",
    //     colSpan: 3
    // }

    // // Setup widths
    // for (let a = 0; a < 30; a++) widths.push(20);

    // // setup body
    // for (let a = 0; a < 100; a++) {
    //     var col_datas = [];
    //     for (let b = 0; b < 30; b++) col_datas.push(datas[a][b]);
    //     body.push(col_datas)
    // }
    // console.log('widths :', widths);
    // // console.log('widths :', widths);
    // content.push({
    //     // layout: "lightHorizontalLines",
    //     // layout: "noBorders",
    //     table: {
    //         widths,
    //         body
    //     },
    //     layout: {
    //         hLineWidth: function (i, node) {
    //             return 0.1;
    //         },
    //         vLineWidth: function (i, node) {
    //             return  0.1;
    //         },
    //         hLineColor: function (i, node) {
    //             return 'gray';
    //         },
    //         vLineColor: function (i, node) {
    //             return 'gray';
    //         },
    //     },
    //     styles: {
    //         cell: {
    //             color: '#FFF',
    //             opacity: `100%`
    //         }
    //     }
    // })
    // ----------------------------------------------------------------------------------------------------
    // grid v0
    // for(x= 0 ; x <= 100; x++){
    // content.push({
    //     layout: "noBorders",
    //     table: {

    //         widths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,],
    //         body:
    //             [
    //                 [
    //                     { text: "", noWrap: true },
    //                     { text: "B", noWrap: true },
    //                     { text: "C", noWrap: true },
    //                     { text: 'D', noWrap: true },
    //                     { text: 'E', noWrap: true },
    //                     { text: "F", noWrap: true },
    //                     { text: "G", noWrap: true },
    //                     { text: "H", noWrap: true },
    //                     // 2
    //                     { text: "A", noWrap: true },
    //                     { text: "B", noWrap: true },
    //                     { text: "C", noWrap: true },
    //                     { text: 'D', noWrap: true },
    //                     { text: 'E', noWrap: true },
    //                     { text: "F", noWrap: true },
    //                     { text: "G", noWrap: true },
    //                     { text: "H", noWrap: true },
    //                     // 3{text: "A",noWrap: true},
    //                     { text: "B", noWrap: true },
    //                     { text: "C", noWrap: true },
    //                     { text: 'D', noWrap: true },
    //                     { text: 'E', noWrap: true },
    //                     { text: "F", noWrap: true },
    //                     { text: "G", noWrap: true },
    //                     { text: "H", noWrap: true },
    //                     // 2
    //                     { text: "A", noWrap: true },
    //                     { text: "B", noWrap: true },
    //                     { text: "C", noWrap: true },
    //                     { text: 'D', noWrap: true },
    //                     { text: 'E', noWrap: true },
    //                     { text: "F", noWrap: true },

    //                 ],

    //             ]

    //     }
    // })
    // }
    return content;
}

function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return "";
    return tin.substring(from, to);
}

function formatDate(date, type) {
    console.log('date :', date);
    if (!date) {
        return "";
    }
    if (type === 'dateonly') type = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    };
    var dt = new Date(date).toLocaleString("en-US", type ? type : {
        hour12: true,
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
    return dt;
}

export default {
    fillup
};