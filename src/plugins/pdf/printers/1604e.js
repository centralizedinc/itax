const form = require("../templates/1604e_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details: " + JSON.stringify(details))
    var content = getContent(details);
    var x = 0
    console.log('get content ###### :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 600,
                margin: [10, 0, 0, 3]
            }]
        },
        content: content,
        images: {
            form: form
        },
        pageSize: 'LEGAL'
    };
}
/**
 * 
 * @param {Array|Object} forms 
 */
function getContent(forms) {
    console.log('forms.return_period :', forms.return_period);
    var content = [
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [83],
                body: [
                    [{
                        text: ' '
                    }]
                ]
            }
        },
        // GENERAL
        {
            layout: "noBorders",
            table: {
                widths: [135, 120, 43, 30, 150, 40],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatDate(forms.returnPeriod, { year: "2-digit" }),
                        fontSize: 15,
                        characterSpacing: 6,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }, {
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }, {
                        text: ' '
                    }, {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 15,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },
        // 
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [10],
                body: [
                    [{
                        text: ' '
                    }]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [195, 46, 48, 50, 50, 62, 50],
                heights: [25],
                body: [
                    [
                        {
                            text: ' ',
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 14,
                            characterSpacing: 4,
                            bold: true,
                            alignment: 'justified',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 14,
                            characterSpacing: 4,
                            bold: true,
                            alignment: 'justified',
                            margin: [0, 0, 0, 0]
                        }, {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 13),
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ' ',
                        },
                        {
                            text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                            fontSize: 14,
                            characterSpacing: 6,
                            bold: true,
                            alignment: 'left',
                            margin: [10, 0, 0, 0]
                        }]
                ]
            }
        },

        // 6
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [28],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 14,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [10, 0, 0, 0]
                    }]
                ]
            }
        },
        // 7
        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 14,
                        bold: true,
                        alignment: 'left',
                        margin: [8, 0, 0, 0]
                    }]
                ]
            }
        },
        // 7A
        {
            layout: "noBorders",
            table: {
                widths: [485, 60],
                body: [
                    [{
                        text: ' '
                    },
                    {
                        text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == ' ' ? ' ' : forms.taxpayer.address_details.zipCode,
                        fontSize: 12,
                        characterSpacing: 8,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },
        // 8
        {
            layout: "noBorders",
            table: {
                widths: [138, 53, 60, 170, 42, 30],
                heights: [28],
                body: [
                    [
                        {
                            text: ' ',
                        },
                        {
                            text: forms.category_of_agent == true ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: forms.category_of_agent == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ' ',
                        },
                        {
                            text: forms.top_withholding_agent == true ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: forms.top_withholding_agent == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                    ]
                ]
            }
        },
        // 9
        {
            layout: "noBorders",
            table: {
                widths: [145, 380],
                body: [
                    [{
                        text: forms.taxpayer.contact_details.telno == null ? ' ' : forms.taxpayer.contact_details.telno,
                        fontSize: 12,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: forms.taxpayer.contact_details.email == null ? ' ' : forms.taxpayer.contact_details.email,
                        fontSize: 12,
                        characterSpacing: 2,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },
        // Part II
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [65],
                body: [
                    [{
                        text: ' '
                    }]
                ]
            }
        }]

    // sched1 Part II
    for (var x = 0; x < 5; x++) {
        content.push({
            layout: "noBorders",
            table: {
                widths: [50, 70, 70, 70, 78, 78, 75],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatDate(forms.sched1.date_remittance),
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: forms.sched1 == undefined || forms.sched1[x].drawee_Bank_Code == null || forms.sched1[x].drawee_Bank_Code == undefined ? "undefined" : forms.sched1[x].drawee_Bank_Code,
                        fontSize: 10,
                        characterSpacing: 2,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: forms.sched1.tra_ror_ar_num,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatAmount(forms.sched1.tax_withheld),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatAmount(forms.sched1.penalties),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatAmount(forms.sched1.tot_amt_remitted),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        })
    }





    // ******************  end of page 1  ****************** //

    return content;
}


function formatDate(date, type) {
    if (!date) {
        return " ";
    }
    if (type === 'dateonly') type = { year: "numeric", month: "long", day: "2-digit" };
    var dt = new Date(date).toLocaleString("en-US", type ? type : {
        hour12: true,
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit"
    });
    return dt;
}

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return " ";
    return tin.substring(from, to);
}

function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export default {
    fillup
}