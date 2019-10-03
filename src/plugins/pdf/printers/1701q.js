const form = require("../templates/1701q_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details: " + JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ###### :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 550,
                margin: [25, 0, 0, 0]
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
    console.log("get content forms: " + forms)
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content = []
    content.push(
        // 1-4
        {
            layout: "noBorders",
            table: {
                widths: [103, 50, 60, 60, 60, 60, 62],
                body: [
                    [{
                        text: '2019',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [62, 47, 0, 0]
                    },
                    {
                        text: forms.quarter == 1 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [46, 47, 0, 0]
                    },
                    {
                        text: forms.quarter == 2 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [28, 45, 0, 0]
                    },
                    {
                        text: forms.quarter == 3 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [11, 45, 0, 0]
                    },
                    {
                        text: forms.amendedYn == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [62, 46, 0, 0]
                    },
                    {
                        text: forms.amendedYn == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [32, 46, 0, 0]
                    },
                    {
                        text: forms.numOfSheet,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [60, 46, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 5-7 TIN
        {
            layout: "noBorders",
            table: {
                widths: [380, 120],
                body: [
                    [{
                        text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                        // text: '0 1 2  -  3 4 5  -  6 7 8 ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [164, 9, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        // text: '0 0 0',
                        fontSize: 16,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [80, 9, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 7 Taxpayer Filer Type
        {
            layout: "noBorders",
            table: {
                widths: [170, 20, 70, 70],
                body: [
                    [{
                        // text: 'X',
                        text: forms.taxpayer.tax_filer_type == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [88, -6, 0, 0]
                    },
                    {
                        text: forms.taxpayer.tax_filer_type == 2 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [7, -6, 0, 0]
                    }, {
                        text: forms.taxpayer.tax_filer_type == 3 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [72, -6, 0, 0]
                    }, {
                        text: forms.taxpayer.tax_filer_type == 4 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [70, -6, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 8 ATC
        {
            layout: "noBorders",
            table: {
                widths: [110, 120, 120, 70],
                body: [
                    [{
                        text: '',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [10, -63, 0, 60]
                    },
                    {
                        text: forms.atc == 1 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -3, 0, 0]
                    },
                    {
                        text: forms.atc == 2 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -3, 0, 0]
                    }, {
                        text: forms.atc == 3 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -3, 0, 0]
                    }

                    ],
                    [{
                        text: '',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [88, -3, 0, 0]
                    },
                    {
                        text: forms.atc == 4 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -5, 0, 0]
                    },
                    {
                        text: forms.atc == 5 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -5, 0, 0]
                    }, {
                        text: forms.atc == 6 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -5, 0, 0]
                    }],
                ]
            }
        },
        // 9-10A name
        {
            layout: "noBorders",
            table: {
                widths: [400, 100],
                body: [
                    [{
                        text: forms.taxpayer.taxpayer_name == null ? ' ' : forms.taxpayer.taxpayer_name,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [10, 6, 0, 0]
                    },
                    {
                        text: ''
                    }
                    ],
                    [{
                        text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [10, 6, 0, 0]
                    },
                    {
                        text: ''
                    }],
                    [{
                        text: '',
                        fontSize: 12,
                    },
                    {
                        // text: "4012",
                        text: forms.taxpayer.zip_code == null ? ' ' : forms.taxpayer.zip_code,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [60, 0, 0, 0]
                    }],
                ]
            }
        },

        // 11-12
        {
            layout: "noBorders",
            table: {
                widths: [90, 300],
                body: [
                    [{
                        text: forms.birthday.month + "  " + forms.birthday.day + " " + forms.birthday.year,
                        // text: '01  01  2011',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer.email_address,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [22, 5, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 13-15 
        {
            layout: "noBorders",
            table: {
                widths: [195, 200, 46, 46],
                body: [
                    [{
                        text: forms.taxpayer.citizenship,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 3, 0, 0]
                    },
                    {
                        text: forms.taxpayer.foreign_tax_no,
                        // text: '1234-5678-9000',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [3, 3, 0, 0]
                    },
                    {
                        text: forms.taxCredits == 1 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [30, 3, 0, 0]
                    },
                    {
                        text: forms.taxCredits == 2 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [18, 3, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 16-16A 
        {
            layout: "noBorders",
            table: {
                widths: [165, 120, 210],
                body: [
                    [{
                        // text: 'X',
                        text: forms.taxRate == 1 ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 3, 0, 0]
                    },
                    {
                        text: forms.taxRate == 2 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        alignment: 'justify',
                        margin: [18, 3, 0, 0]
                    },
                    {
                        text: forms.method_deduction == 1 ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        alignment: 'justify',
                        margin: [8, 3, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.method_deduction == 2 ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: '',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [18, 3, 0, 0]
                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: '',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [8, 3, 0, 0]
                    }

                    ],
                ]
            }
        },
        // PART II 17-19
        {
            layout: "noBorders",
            table: {
                widths: [320, 200],
                body: [
                    [{
                        // text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                        text: '0 1 2  -  3 4 5  -  6 7 8 ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [168, 15, 0, 0]
                    },
                    {
                        // text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        text: '0 0 0',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [140, 15, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 19
        {
            layout: "noBorders",
            table: {
                widths: [200, 100, 100],
                body: [
                    [{
                        text: 'X',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [112, -6, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [25, -6, 0, 0]
                    }, {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [32, -6, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 20 ATC
        {
            layout: "noBorders",
            table: {
                widths: [140, 120, 115, 110],
                body: [
                    [{
                        text: 'X',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [35, -2, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -2, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -2, 0, 0]
                    }, {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [10, -2, 0, 0]
                    }

                    ],
                    [{
                        text: 'X',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [35, -5, 0, 60]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -5, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -5, 0, 0]
                    }, {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: '',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [10, -5, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 21 Spouse Name
        {
            layout: "noBorders",
            table: {
                widths: [500],
                body: [
                    [{
                        // text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                        text: 'VENUS VENUS VENUS VENUS BELO BELO BELO',
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'center',
                        margin: [9, -52, 0, 0]
                    }],
                ]
            }
        },
        // 22-24
        {
            layout: "noBorders",
            table: {
                widths: [195, 200, 46, 46],
                body: [
                    [{
                        // text: forms.citizenship,
                        text: 'FILIPINO',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, -33, 0, 0]
                    },
                    {
                        // text: forms.email,
                        text: '1234-5678-9000',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [3, -33, 0, 0]
                    },
                    {
                        // text: forms.email,
                        text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [30, -33, 0, 0]
                    },
                    {
                        // text: forms.email,
                        text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [18, -33, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 25-25A
        {
            layout: "noBorders",
            table: {
                widths: [165, 120, 210],
                body: [
                    [{
                        text: 'X',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [43, -10, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [18, -10, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: 'X',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [8, -10, 0, 0]
                    }

                    ],
                    [{
                        text: 'X',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [43, 3, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: '',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [43, -10, 0, 0]
                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: '',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [43, -10, 0, 0]
                    }

                    ],
                ]
            }
        },

    )
    // forms.tax_computation.forEach(element => {
    for (var x = 0; x < 22; x++) {
        content.push({
            layout: "noBorders",
            table: {
                widths: [220, 40, 82, 42, 115],
                body: [
                    [{
                        // 48 characters only
                        text: ' ',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [0, 0, 0, 0],
                        alignment: 'center'

                    },
                    {
                        text: ' ',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [0, 0, 0, 0],
                        alignment: 'center'
                    },
                    {
                        text: ' ',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [0, 0, 0, 0],
                        alignment: 'center'
                    }, {
                        text: ' ',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [0, 0, 0, 0],
                        alignment: 'center'
                    },
                    {
                        text: ' ',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [0, 0, 0, 0],
                        alignment: 'center'
                    }
                    ]
                ]
            }
        })
    }

    content.push({
        layout: "noBorders",
        table: {
            widths: ['auto', 'auto'],
            body: [
                [{
                    text: '1 000 000',
                    fontSize: 12,
                    // right,down,left,up
                    margin: [330, -268, 0, 0],
                    alignment: 'left'

                },
                {
                    text: '1 000 000',
                    fontSize: 12,
                    // right,down,left,up
                    margin: [50, -268, 0, 0],
                    alignment: 'left'

                }
                ]
            ]
        }
    })




    // content.push({
    //     alignment: 'justify',
    //     fontSize: 10,
    //     width: 100,
    //     // 20 characters
    //     text: 'forms.total_tax_withheld_remitted',
    //     // text: forms.total_tax_withheld_remitted,
    //     // right,down,left,up
    //     margin: [416, 8, 0, 0],
    // }, {
    //     alignment: 'justify',
    //     fontSize: 10,
    //     width: 100,
    //     text: 'forms.prevTaxPaidCrdtb',
    //     // right,down,left,up
    //     margin: [415, 11, 0, 0],
    // }, {
    //     alignment: 'justify',
    //     fontSize: 10,
    //     width: 100,
    //     text: 'forms.advPayment',
    //     // right,down,left,up
    //     margin: [415, 1, 0, 0],
    // }, {
    //     alignment: 'justify',
    //     fontSize: 10,
    //     width: 100,
    //     text: 'forms.totTaxCredits',
    //     // right,down,left,up
    //     margin: [415, 1, 0, 0],
    // }, {
    //     alignment: 'justify',
    //     fontSize: 10,
    //     width: 100,
    //     text: 'forms.amtPayblCrdtb',
    //     // right,down,left,up
    //     margin: [415, 1, 0, 0],
    // })
    // content.push({
    //     layout: "noBorders",
    //     table: {
    //         widths: [131, 122, 110, 140],
    //         body: [
    //             [{
    //                     text: 'forms.surcharge',
    //                     fontSize: 8,
    //                     // right,down,left,up
    //                     margin: [52, 13, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: 'forms.interest',
    //                     fontSize: 8,
    //                     // right,down,left,up
    //                     margin: [26, 13, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: 'forms.compromise',
    //                     fontSize: 8,
    //                     // right,down,left,up
    //                     margin: [23, 13, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: 'forms.penaltiesCrdtb',
    //                     fontSize: 8,
    //                     // right,down,left,up
    //                     margin: [28, 13, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //             ]
    //         ]
    //     }
    // })

    // content.push({
    //     layout: "noBorders",
    //     table: {
    //         widths: [160, 100, 260],
    //         body: [
    //             [{
    //                     text: forms.overremittance == true ? 'X' : ' ',
    //                     fontSize: 12,
    //                     // right,down,left,up
    //                     margin: [155, 8, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: forms.overremittance == false ? 'X' : ' ',
    //                     fontSize: 12,
    //                     // right,down,left,up
    //                     margin: [95, 8, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: forms.total_amount_overremittance,
    //                     fontSize: 8,
    //                     // right,down,left,up
    //                     margin: [140, 0, 0, 0],
    //                     alignment: 'justify'

    //                 }
    //             ]
    //         ]
    //     }
    // })

    // -------------To be Continue
    // content.push({
    //     text: "\n\n"
    // }, {
    //     // layout: "noBorders",
    //     table: {
    //         widths: [310, 100],
    //         body: [
    //             [{
    //                     text: 'X',
    //                     fontSize: 12,
    //                     // right,down,left,up
    //                     margin: [155, 8, 0, 0],
    //                     alignment: 'justify'

    //                 },
    //                 {
    //                     text: 'X',
    //                     fontSize: 12,
    //                     // right,down,left,up
    //                     margin: [95, 8, 0, 0],
    //                     alignment: 'justify'

    //                 }
    //             ]
    //         ]
    //     }
    // })
    return content;
}

module.exports = {
    fillup
};