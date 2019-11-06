const form = require("../templates/2000ot_template").template;

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
                widths: [500],
                heights: [54],
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
                widths: [85, 15, 10, 40, 55, 15, 20, 10, 60, 25, 52, 60],
                heights: [25],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatDate(forms.return_period, { month: "2-digit" }),
                        bold: true,
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatDate(forms.return_period, { day: "2-digit" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 5,
                        alignment: 'justified',
                        margin: [-5, 0, 0, 0]
                    },
                    {
                        text: formatDate(forms.return_period, { year: "numeric" }),
                        bold: true,
                        characterSpacing: 3,
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ' '
                    },
                    {
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ' ',
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ' ',
                    },
                    {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 6,
                        alignment: 'justified',
                        margin: [2, 2, 0, 0]
                    },
                    {
                        text: ' '
                    },
                    {
                        text: forms.atc_code == null ? ' ' : forms.atc_code,
                        fontSize: 12,
                        characterSpacing: 6,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 2, 0, 0]
                    }
                    ]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [80, 45, 35, 60, 130, 140],
                heights: [25],
                body: [
                    [{
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'justified',
                        margin: [2, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 6,
                        alignment: 'justified',
                        margin: [2, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 13),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [12, 0, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 12,
                        characterSpacing: 8,
                        bold: true,
                        alignment: 'justified',
                        margin: [45, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.contact_details.telno == null ? ' ' : forms.taxpayer.contact_details.telno,
                        fontSize: 12,
                        bold: true,
                        alignment: 'left',
                        characterSpacing: 3,
                        margin: [30, 0, 0, 0]
                    }]
                ]
            }
        },
        //
        {
            layout: "noBorders",
            table: {
                widths: [500],
                heights: [25],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 14,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'justified',
                        margin: [40, 0, 0, 0]
                    }]
                ]
            }
        },
        // 
        {
            layout: "noBorders",
            table: {
                widths: [460, 80],
                heights: [23],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 12,
                        alignment: 'left',
                        bold: true,
                        margin: [40, 3, 0, 0]
                    },
                    {
                        text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == ' ' ? ' ' : forms.taxpayer.address_details.zipCode,
                        fontSize: 12,
                        alignment: 'justified',
                        characterSpacing: 4,
                        margin: [25, 3, 0, 0]
                    }]
                ]
            }
        },


        {
            layout: "noBorders",
            table: {
                widths: [25, 250, 40],
                // heights: [15],
                body: [
                    [{
                        text: forms.natureOfTransaction == 'real_property_capital' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [24, 10, 0, 0],
                    }, {
                        text: ' '
                    },
                    {
                        text: forms.natureOfTransaction == 'shares_stock' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, 10, 0, 0]

                    }],
                    [{
                        text: forms.natureOfTransaction == 'real_property_ordinary' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [23, -4, 0, 0]
                    },
                    {
                        text: ' '
                    }, {
                        text: ' '
                    }]
                ]
            }
        },



        {
            layout: "noBorders",
            table: {
                widths: [260, 260],
                body: [
                    [{
                        text: forms.seller == null ? ' ' : forms.seller,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    },
                    {
                        text: forms.buyer == null ? ' ' : forms.buyer,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    }]
                ]
            }
        },



        {
            layout: "noBorders",
            table: {
                widths: [260, 260],
                // heights: [20],
                body: [
                    [{
                        text: forms.sellerTin == null ? ' ' : forms.sellerTin,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 6, 0, 0],
                    },
                    {
                        text: forms.buyerTin == null ? ' ' : forms.buyerTin,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 6, 0, 0],
                    }]

                ]
            }
        },


        // 12
        {
            layout: "noBorders",
            table: {
                widths: [530],
                // heights: [4],
                body: [
                    [{
                        text: forms.propertySold == 'real_property' ? 'X' : ' ',
                        fontSize: 8,
                        bold: true,
                        alignment: 'justified',
                        margin: [24, 14, 0, 0],
                    }]

                ]
            }
        },

        // 12
        {
            layout: "noBorders",
            table: {
                widths: [90, 310, 70, 40],
                heights: [15],
                body: [
                    [{
                        text: ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: forms.locationOfRealProp == null ? ' ' : forms.locationOfRealProp,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: forms.rdoRealProp == null ? ' ' : forms.rdoRealProp,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [45, 20, 58, 20, 42, 10],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'R' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [2, 0, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'C' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'CR' ? 'X' : ' ',
                        fontSize: 9,
                        bold: true,
                        alignment: 'justified',
                        margin: [2, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [45, 20, 58, 20, 42, 45, 46, 64, 115],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'A' ? 'X' : ' ',
                        fontSize: 9,
                        alignment: 'justified',
                        margin: [2, -5, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'I' ? 'X' : ' ',
                        fontSize: 9,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'CC' ? 'X' : ' ',
                        fontSize: 9,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.realPropertyClass == 'O' ? 'X' : ' ',
                        fontSize: 9,
                        alignment: 'justified',
                        margin: [2, -5, 0, 0],
                    },
                    {
                        text: forms.others == null ? ' ' : forms.others,
                        fontSize: 9,
                        alignment: 'justified',
                        margin: [2, -8, 0, 0],
                    }]

                ]
            }
        },
        // 12G
        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 10, 140, 8, 120],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.areaOfProperty == null ? ' ' : forms.areaOfProperty,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -4, 0, 0],
                    }, {
                        text: ' ',

                    },
                    {
                        text: forms.tctNo == null ? ' ' : forms.tctNo,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -4, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.taxDecNo == null ? ' ' : forms.taxDecNo,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -4, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 15, 128],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.sellingPrice),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 1, 0, 0],
                    }, {
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.fairMarketValue),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 1, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: forms.propertySold == 'shares_stock' ? 'X' : ' ',
                        fontSize: 8,
                        bold: true,
                        alignment: 'justified',
                        margin: [24, -5, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [150, 370],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.stockname == null ? ' ' : forms.stockname,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [150, 370],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.stockTin == null ? ' ' : forms.stockTin,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -5, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [120, 120, 150, 120],
                // heights: [30],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.sharesSold == null ? ' ' : forms.sharesSold,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -8, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: forms.stockCertNo == null ? ' ' : forms.stockCertNo,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -6, 0, 0],
                    }]

                ]
            }
        },
        // 12K
        {
            layout: "noBorders",
            table: {
                widths: [110, 120, 150, 120],
                // heights: [10],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.parValueShares),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 5, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.dstPaid),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 7, 0, 0],
                    }]
                ]
            }
        },



        // PART III
        {
            layout: "noBorders",
            table: {
                widths: [370, 150],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.realPropertyTaxBase),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 17, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 150],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatAmount(forms.sharesStockTaxBase),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [450, 70],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.taxRate == null ? ' ' : forms.taxRate,
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -4, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [360, 160],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatAmount(forms.tax_due),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -8, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 150],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: formatAmount(forms.prevTaxPaid),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -12, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 150],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        // if this is amended return
                        text: formatAmount(forms.prev_tax_due),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -15, 0, 0],
                    }]
                ]
            }
        },
        // 19


        {
            layout: "noBorders",
            table: {
                widths: [8, 95, 10, 95, 10, 95, 8, 150],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.surcharge),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -2, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.interest),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -2, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.compromise),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -2, 0, 0],
                    },
                    {
                        text: ' ',

                    },
                    {
                        // 19D
                        text: formatAmount(forms.penalties),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -2, 0, 0],
                    }]
                ]
            }
        },
        // 20
        {
            layout: "noBorders",
            table: {
                widths: [370, 150],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: formatAmount(forms.total_amount_payable),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -4, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [175, 68, 100],
                body: [
                    [{
                        text: ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: ' ',
                        fontSize: 11,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: ' ',
                        fontSize: 11,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    }]
                ]
            }
        },
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