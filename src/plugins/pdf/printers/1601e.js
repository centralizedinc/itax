const form = require("../templates/1601e_template").template;

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
            layout: "noBorders",
            table: {
                // 
                widths: [103, 50, 60, 50, 80, 60, 50],
                body: [
                    [{
                            text: forms.month ? forms.month : '00',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [80, 78, 0, 0]
                        }, {
                            text: 'YYYY',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [0, 78, 0, 0]
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [40, 82, 0, 0]
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [13, 82, 0, 0]
                        },
                        {
                            text: '00',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [33, 82, 10, 0]
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [40, 82, 0, 0]
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [25, 82, 0, 0]
                        }
                    ],

                ]

            }
        }, {
            layout: "noBorders",
            table: {
                widths: [200, 150, 158],
                body: [
                    [{
                            text: '### - ### - ### - ###',
                            fontSize: 19,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [15, 5, 0, 0]
                        },
                        {
                            text: '###',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [85, 7, 0, 0]
                        }, {
                            text: '38 characters',
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [50, 6, 0, 0]
                        }
                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [420, "*"],
                body: [
                    [{
                            text: '72 characters only',
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [14, 5, 0, 0]
                        },
                        {
                            text: '44443334444',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [25, 3, 0, 0]
                        }
                    ]
                ]
            }
        }, {
            layout: "noBorders",
            table: {
                widths: [420, "*"],
                body: [
                    [{
                            text: '72 characters',
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [12, 6, 0, 0]
                        },
                        {
                            text: '12345',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'center',
                            margin: [50, 6, 0, 0]
                        }
                    ]
                ]
            }
        }, {
            layout: "noBorders",
            table: {
                widths: [25, 30, 100, 30, 310],
                body: [
                    [{
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [13, 6, 0, 0],
                            alignment: 'justify'

                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [28, 6, 0, 0],
                            alignment: 'justify'
                        },
                        {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [85, 6, 0, 0],
                            alignment: 'justify'
                        }, {
                            text: 'X',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [20, 6, 0, 0],
                            alignment: 'justify'
                        },
                        {
                            text: '30 characters',
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
                            text: '48 characters only',
                            fontSize: 8,
                            // right,down,left,up
                            margin: [0, 0, 0, 0],
                            alignment: 'center'

                        },
                        {
                            text: 'ATC',
                            fontSize: 8,
                            // right,down,left,up
                            margin: [0, 0, 0, 0],
                            alignment: 'center'
                        },
                        {
                            text: 'Tax Base',
                            fontSize: 8,
                            // right,down,left,up
                            margin: [0, 0, 0, 0],
                            alignment: 'center'
                        }, {
                            text: 'Tax Rate',
                            fontSize: 8,
                            // right,down,left,up
                            margin: [0, 0, 0, 0],
                            alignment: 'center'
                        },
                        {
                            text: 'Withheld',
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
        text: "(14) 20 characters",
        // right,down,left,up
        margin: [416, 8, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: "(15A) 20 characters",
        // right,down,left,up
        margin: [415, 11, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: "(15B) 20 characters",
        // right,down,left,up
        margin: [415, 1, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: "(15C) 20 characters",
        // right,down,left,up
        margin: [415, 1, 0, 0],
    }, {
        alignment: 'justify',
        fontSize: 10,
        width: 100,
        text: "(16) 20 characters",
        // right,down,left,up
        margin: [415, 1, 0, 0],
    })
    content.push({
        layout: "noBorders",
        table: {
            widths: [131, 122, 110, 140],
            body: [
                [{
                        text: '(17A)',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [52, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: '(17B)',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [26, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: '(17C)',
                        fontSize: 8,
                        // right,down,left,up
                        margin: [23, 13, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: '(17D)',
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
                        text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        margin: [155, 8, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        margin: [95, 8, 0, 0],
                        alignment: 'justify'

                    },
                    {
                        text: '(18)',
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