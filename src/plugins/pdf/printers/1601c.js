const form = require("../templates/1601c_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */

function fillup(details) {
    console.log('fillup details :', JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ############## :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 600,
                margin: [10, 0, 0, 5]
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
                heights: [65],
                body: [
                    [{
                        text: ''
                    }]
                ]
            }
        },
        // GENERAL
        {
            layout: "noBorders",
            table: {
                widths: [11, 22, 65, 25, 20, 10, 20, 35, 15, 10, 28, 55, 30],
                heights: [10],
                body: [
                    [{
                        text: '',
                    },
                    {
                        text: 'XX',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: 'XXXX',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'X',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'X',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'X',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'X',
                        fontSize: 14,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'XX',
                        fontSize: 14,
                        characterSpacing: 3,
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
                heights: [8],
                body: [
                    [{
                        text: ''
                    }]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [200, 43, 50, 50, 50, 65, 40],
                heights: [20],
                body: [
                    [
                        {
                            text: '',
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
                            text: '',
                        },
                        {
                            text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                            fontSize: 14,
                            characterSpacing: 3,
                            bold: true,
                            alignment: 'left',
                            margin: [10, 0, 0, 0]
                        }]
                ]
            }
        },

        // 8
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [22],
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
        // 9
        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == '' ? ' ' : forms.taxpayer.address,
                        fontSize: 14,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [8, 0, 0, 0]
                    }]
                    // [{
                    //     text: 'sss',
                    //     fontSize: 14,
                    //     characterSpacing: 3,
                    //     bold: true,
                    //     alignment: 'left',
                    //     margin: [8, 0, 0, 0]
                    // }]
                ]
            }
        },
        // 9A
        {
            layout: "noBorders",
            table: {
                widths: [490, 60],
                body: [
                    [{
                        text: ''
                    },
                    {
                        text: '4102', fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },
        // 10-11
        {
            layout: "noBorders",
            table: {
                widths: [68, 160, 160, 35, 20, 10],
                body: [
                    [
                        {
                            text: '',
                        },
                        {
                            text: '09177094935',
                            fontSize: 12,
                            characterSpacing: 6,
                            alignment: 'left',
                            margin: [0, -2, 0, 0]
                        },
                        {
                            text: '',
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            characterSpacing: 3,
                            alignment: 'left',
                            margin: [0, -4, 0, 0]
                        }, {
                            text: '',
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            characterSpacing: 3,
                            alignment: 'left',
                            margin: [0, -4, 0, 0]
                        }
                    ]
                ]
            }
        },
        // 12
        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: 'fquiocho@centralizedinc.com',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [100, 0, 0, 0]
                    }]
                ]
            }
        },
        // 13
        {
            layout: "noBorders",
            table: {
                widths: [138, 35, 20, 90, 30, 40],
                heights: [23],
                body: [
                    [{
                        text: '',
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: '',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    }
                    ]
                ]
            }
        },
        // Part II
        {
            layout: "noBorders",
            table: {
                widths: [338, 200],
                body: [
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(forms.compensation),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, 0, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(forms.statutory_minimum_wage),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, 3, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -3, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -4, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -4, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -3, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                    [{
                        text: '',
                    },
                    {
                        text: formatAmount(1000000000.00),
                        fontSize: 14,
                        characterSpacing: 5.5,
                        alignment: 'right',
                        margin: [0, -5, 0, 0],
                    }],
                ]
            }
        },



        // ******************  end of page 1  ****************** //
    ]
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
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
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