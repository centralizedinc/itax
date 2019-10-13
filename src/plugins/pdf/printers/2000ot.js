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
    console.log('forms.returnPeriod :', forms.returnPeriod);
    var content = [
        {
            layout: "noBorders",
            table: {
                widths: [500],
                heights: [54],
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
                widths: [80, 20, 16, 40, 46, 15, 20, 10, 60, 25, 55, 60],
                heights: [22],
                body: [
                    [{
                        text: '',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]

                    },
                    {
                        text: formatDate(forms.returnPeriod, { month: "2-digit" }),
                        bold: true,
                        fontSize: 14,
                        alignment: 'left',
                        margin: [3, 0, 0, 0]
                    },
                    {
                        text: formatDate(forms.returnPeriod, { day: "2-digit" }),
                        bold: true,
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatDate(forms.returnPeriod, { year: "numeric" }),
                        bold: true,
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: forms.amendedYn == true ? 'X' : ' ',
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: forms.amendedYn == false ? 'X' : ' ',
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: forms.numOfSheet == null ? ' ' : forms.numOfSheet,
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [2, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: forms.atc == null ? ' ' : forms.atc,
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    }
                    ]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [80, 45, 35, 60, 170, 100],
                heights: [26],
                body: [
                    [{
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 16,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 16,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 16,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 13),
                        fontSize: 16,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'left',
                        margin: [10, 0, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 16,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [45, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.contact_details.telno == null ? ' ' : forms.taxpayer.contact_details.telno,
                        fontSize: 14,
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
                widths: [500],
                heights: [25],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 16,
                        bold: true,
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
                widths: [450, 100],
                heights: [15],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == '' ? ' ' : forms.taxpayer.address,
                        fontSize: 16,
                        alignment: 'left',
                        bold: true,
                        margin: [40, 3, 0, 0]
                    },
                    {
                        text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == '' ? ' ' : forms.taxpayer.address_details.zipCode,
                        fontSize: 16,
                        alignment: 'left',
                        margin: [40, 3, 0, 0]
                    }]
                ]
            }
        },
        // Part II
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [8],
                body: [
                    [{
                        text: '',

                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [20, 250, 10],
                heights: [15],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    }, {
                        text: ''
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [15, 0, 0, 0]

                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [20, 250, 10],
                heights: [8],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -8, 0, 0]
                    },
                    {
                        text: ''
                    }, {
                        text: ''
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [260, 260],
                // heights: [5],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
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
                widths: [530],
                heights: [1],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
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
                heights: [20],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    }]

                ]
            }
        },


        // 12
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [4],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 4, 0, 0],
                    }]

                ]
            }
        },
        // 12
        {
            layout: "noBorders",
            table: {
                widths: [90, 310, 70, 30],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 12,
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
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
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
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'xx',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 10, 140, 8, 120],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }, {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 10, 140],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }, {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
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
                        text: 'X',
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
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
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
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [120, 120, 150, 120],
                heights: [30],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [120, 120, 150, 120],
                heights: [10],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [10],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]

                ]
            }
        },

        // PART III
        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 2, 0, 0],
                    },
                    {
                        text: forms.realPropertyTaxBase == null ? '0.00' : forms.realPropertyTaxBase % 1 == 0 ? forms.realPropertyTaxBase + '.00' : forms.realPropertyTaxBase,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: forms.sharesStockTaxBase == null ? '0.00' : forms.sharesStockTaxBase % 1 == 0 ? forms.sharesStockTaxBase + '.00' : forms.purCapGoodsExceed,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [450, 60],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: forms.taxRate == null ? '0.00' : forms.taxRate % 1 == 0 ? forms.taxRate + '.00' : forms.taxRate,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: forms.taxDue == null ? '0.00' : forms.taxDue % 1 == 0 ? forms.taxDue + '.00' : forms.taxDue,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -4, 0, 0],
                    },
                    {
                        text: forms.prevTaxPaid == null ? '0.00' : forms.prevTaxPaid % 1 == 0 ? forms.prevTaxPaid + '.00' : forms.prevTaxPaid,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -3, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        // if this is amended return
                        text: forms.realPropertyTaxBase == null ? '0.00' : forms.realPropertyTaxBase % 1 == 0 ? forms.purCapGoodsExceed + '.00' : forms.purCapGoodsExceed,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [10],
                body: [
                    [{
                        text: '',
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
                widths: [8, 95, 10, 95, 10, 95, 8, 155],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: forms.surcharge == null ? '0.00' : forms.surcharge % 1 == 0 ? forms.surcharge + '.00' : forms.surcharge,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: forms.interest == null ? '0.00' : forms.interest % 1 == 0 ? forms.interest + '.00' : forms.interest,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: forms.compromise == null ? '0.00' : forms.compromise % 1 == 0 ? forms.compromise + '.00' : forms.compromise,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        // 19D
                        text: forms.realPropertyTaxBase == null ? '0.00' : forms.realPropertyTaxBase % 1 == 0 ? forms.purCapGoodsExceed + '.00' : forms.purCapGoodsExceed,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 170],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: forms.totalAmountPayable == null ? '0.00' : forms.totalAmountPayable % 1 == 0 ? forms.totalAmountPayable + '.00' : forms.totalAmountPayable,
                        fontSize: 11,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
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
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 11,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
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
        return "";
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
    if (!tin || from === null || to === null) return "";
    return tin.substring(from, to);
}

module.exports = {
    fillup
};
