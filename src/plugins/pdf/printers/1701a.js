// const form_page1 = require("../templates/1701a_template").page1;
// const form_page2 = require("../templates/1701a_template").page2;
const form = require("../templates/1701a_template");

var forms = [form.page1, form.page2]
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
        images: {
            form: forms[details.pdf_page]
            // form: form_page1
        },
        pageSize: 'LEGAL'
    };
}
/**
 * 
 * @param {Array|Object} forms 
 */
function getContent(forms) {
    console.log("get content forms: " + JSON.stringify(forms))
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content = [
         // #5 tin
         {
            layout: "noBorders",
            table: {
                widths: [50, 50, 45, 59, 60, 60, 45, 40],
                body: [
                    [{
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [15, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [12, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [8, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [10, 0, 0, 0]
                        },
                        {
                            text: "",

                        },
                        // #6 rdo code
                        {
                            text: forms.taxpayer.rdo_code,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [16, 0, 0, 0]
                        },
                        // #7 category of withoutholding agent true
                        {
                            text: forms.category_of_agent == true ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [27, 5, 0, 0]
                        },
                        // #7 category of withoutholding agent false
                        {
                            text: forms.category_of_agent == false ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [26, 5, 0, 0]
                        },
                    ],
                ]
            }
        },
    ]
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