const form = require("../templates/1700_template").template;

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
                width: 600
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
    content.push({
            // layout: "noBorders",
            table: {
                // 
                widths: [103, 50, 60, 48, 82, 60, 50],
                body: [
                    [{
                            text: '01',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [49, 90, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.amendedYn == true ? 'X' : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [26, 92, 0, 0]
                        },
                        {
                            // text: forms.amendedYn == true ? 'X' : ' ',
                            text: forms.amendedYn == false ? 'X' : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [3, 92, 0, 0]
                        },
                        {
                            // text: forms.amendedYn == false ? 'X' : ' ',
                            text: forms.jointFiling == true ? 'X' : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [20, 92, 0, 0]
                        },
                        {
                            // text: forms.numOfSheet,
                            text: forms.jointFiling == false ? 'X' : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [0, 92, 0, 0]
                        },
                        {
                            // text: forms.taxes_withheld == true ? 'X' : ' ',
                            text: '6',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [0, 92, 0, 0]
                        },
                        {
                            // text: forms.taxes_withheld == false ? 'X' : ' ',
                            text: '7',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [7, 93, 0, 0]
                        }
                    ],

                ]

            }
        }, {
            // layout: "noBorders",
            table: {
                widths: [245, 160, 114],
                body: [
                    [{
                            // text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                            text: '0  1  2   -  3  4  5   -   6  7  8 ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [65, 16, 0, 0]
                        },
                        {
                            // text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                            text: '0 0 0',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [120, 16, 0, 0]
                        }, {
                            // PSOC CODE
                            // text: forms.taxpayer.psoc_code == null ? ' ' : forms.taxpayer.psoc_code,
                            text: '0  0  0  0',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [50, 16, 0, 0]
                        },

                    ]
                ]
            }
        },

        {
            // layout: "noBorders",
            table: {
                widths: [420, "*"],
                body: [
                    [{
                            // 72 characters 
                            text: forms.taxpayer.taxpayer_name == null ? ' ' : forms.taxpayer.taxpayer_name,
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [14, 13, 0, 0]
                        },
                        {
                            text: forms.taxpayer.telephone_no == null ? ' ' : forms.taxpayer.telephone_no,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [25, 3, 0, 0]
                        }
                    ]
                ]
            }
        }, {
            // layout: "noBorders",
            table: {
                widths: [420, "*"],
                body: [
                    [{
                            // 72 characters
                            text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [12, 6, 0, 0]
                        },
                        {
                            text: forms.taxpayer.zip_code == null ? ' ' : forms.taxpayer.zip_code,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'center',
                            margin: [50, 6, 0, 0]
                        }
                    ]
                ]
            }
        }, {
            // layout: "noBorders",
            table: {
                widths: [25, 30, 100, 30, 310],
                body: [
                    [{
                            text: forms.categoryOfAgent == true ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [13, 6, 0, 0],
                            alignment: 'justify'

                        },
                        {
                            text: forms.categoryOfAgent == false ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [28, 6, 0, 0],
                            alignment: 'justify'
                        },
                        {
                            text: forms.availing_tax_relief == true ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [85, 6, 0, 0],
                            alignment: 'justify'
                        }, {
                            text: forms.availing_tax_relief == false ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [20, 6, 0, 0],
                            alignment: 'justify'
                        },
                        {
                            // 30 characters
                            text: forms.internationalTreatyYn,
                            fontSize: 12,
                            // right,down,left,up
                            margin: [105, 6, 0, 0],
                            alignment: 'justify'
                        }
                    ]
                ]
            }
        }, {
            text: '\n\n\n'
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
        }, )
    }

    content.push({
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        // 20 characters
        text: forms.total_tax_withheld_remitted,
        // right,down,left,up
        margin: [416, 8, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: forms.prevTaxPaidCrdtb,
        // right,down,left,up
        margin: [415, 11, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: forms.advPayment,
        // right,down,left,up
        margin: [415, 1, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: forms.totTaxCredits,
        // right,down,left,up
        margin: [415, 1, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: forms.amtPayblCrdtb,
        // right,down,left,up
        margin: [415, 1, 0, 0],
    })
    content.push({
        layout: "noBorders",
        table: {
            widths: [131, 122, 110, 140],
            body: [
                [{
                        text: forms.surcharge,
                        fontSize: 8,
                        // right,down,left,up
                        margin: [52, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: forms.interest,
                        fontSize: 8,
                        // right,down,left,up
                        margin: [26, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: forms.compromise,
                        fontSize: 8,
                        // right,down,left,up
                        margin: [23, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: forms.penaltiesCrdtb,
                        fontSize: 8,
                        // right,down,left,up
                        margin: [28, 13, 0, 0],
                        alignment: 'justify'

                    },
                ]
            ]
        }
    })

    content.push({
        layout: "noBorders",
        table: {
            widths: [160, 100, 260],
            body: [
                [{
                        text: forms.overremittance == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        margin: [155, 8, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: forms.overremittance == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        margin: [95, 8, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: forms.total_amount_overremittance,
                        fontSize: 8,
                        // right,down,left,up
                        margin: [140, 0, 0, 0],
                        alignment: 'justify'

                    }
                ]
            ]
        }
    })

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