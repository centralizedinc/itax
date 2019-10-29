const form = require("../templates/1601e_template").template;
const form1 = require("../templates/1701q_template").template;
var forms = [form, form1]
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
            form: forms[details.page]
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
                    text: formatDate(forms.return_period, {
                        month: "2-digit"
                    }),
                    fontSize: 15,
                    characterSpacing: 3,
                    alignment: 'justify',
                    margin: [80, 78, 0, 0]
                },
                {
                    text: formatDate(forms.return_period, {
                        year: "numeric"
                    }),
                    fontSize: 15,
                    characterSpacing: 3,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [0, 78, 0, 0]
                },
                {
                    text: forms.amended_yn == true ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [40, 82, 0, 0]
                },
                {
                    text: forms.amended_yn == false ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [13, 82, 0, 0]
                },
                {
                    text: forms.num_of_sheet,
                    fontSize: 10,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [34, 83, 10, 0]
                },
                {
                    text: forms.taxes_withheld == true ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [40, 82, 0, 0]
                },
                {
                    text: forms.taxes_withheld == false ? 'X' : ' ',
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
            widths: [58, 45, 35, 50, 150, 100],
            body: [
                [{
                    text: mapTin(forms.taxpayer.tin, 0, 3),
                    fontSize: 16,
                    bold: true,
                    characterSpacing: 3,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [15, 7, 0, 0]
                },
                {
                    text: mapTin(forms.taxpayer.tin, 3, 6),
                    fontSize: 16,
                    characterSpacing: 3,
                    bold: true,
                    alignment: 'justified',
                    margin: [0, 7, 0, 0]
                },
                {
                    text: mapTin(forms.taxpayer.tin, 6, 9),
                    fontSize: 16,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justified',
                    margin: [0, 7, 0, 0]
                },
                {
                    text: mapTin(forms.taxpayer.tin, 9, 12),
                    fontSize: 16,
                    bold: true,
                    characterSpacing: 4,
                    alignment: 'left',
                    margin: [10, 7, 0, 0]
                },
                {
                    text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                    characterSpacing: 3,
                    fontSize: 16,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [73, 7, 0, 0]
                }, {
                    // 38 characters only
                    text: forms.taxpayer.line_business == null ? ' ' : forms.taxpayer.line_business,
                    fontSize: 16,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [50, 7, 0, 0]
                }
                ]
            ]

        }
    },

        {
            layout: "noBorders",
            table: {
                widths: [420, 10, 80],
                heights: [18],
                body: [
                    [{
                        // 72 characters 
                        text: forms.taxpayer.taxpayer_name == null ? ' ' : forms.taxpayer.taxpayer_name,
                        fontSize: 10,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [14, 5, 0, 0]
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
        layout: "noBorders",
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
        layout: "noBorders",
        table: {
            widths: [25, 30, 100, 30, 310],
            body: [
                [{
                    text: forms.category_of_agent == true ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    margin: [13, 6, 0, 0],
                    alignment: 'justify'

                },
                {
                    text: forms.category_of_agent == false ? 'X' : ' ',
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
                    text: forms.availing_tax_relief_if_yes,
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
                body:
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
            }
        })
    }

    content.push({
        alignment: 'left',
        fontSize: 10,
        width: 100,
        // 20 characters
        text: forms.total_tax_withheld_remitted,
        // right,down,left,up
        margin: [416, 8, 0, 0],
        // 14
    }, {
        alignment: 'left',
        fontSize: 10,
        width: 100,
        text: forms.prev_tax_paid_crdtb,
        // right,down,left,up
        margin: [415, 11, 0, 0],
        // 15 a
    }, {
        alignment: 'left',
        fontSize: 10,
        width: 100,
        text: forms.adv_payment,
        // right,down,left,up
        margin: [415, 1, 0, 0],
        // 15b
    }, {
        alignment: 'left',
        fontSize: 10,
        width: 100,
        text: forms.tot_tax_credits,
        // right,down,left,up
        margin: [415, 1, 0, 0],
        // 15c
    }, {
        alignment: 'left',
        fontSize: 10,
        width: 100,
        text: forms.tax_overremittance,
        // right,down,left,up
        margin: [415, 1, 0, 0],
        // 16
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
            height: [500],
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


    //                 }
    //             ]
    //         ]
    //     }
    // })

    var content1 = [{
        text: 'Unordered list',
        style: 'header'
    },
    {
        ol: [
            'item 1',
            'item 2',
            'item 3',
        ]
    },
    {
        text: '\n\nUnordered list with longer lines',
        style: 'header',
        pageBreak: 'before',
        pageOrientation: 'landscape'
    },
    {
        ol: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur ..',
            'item 3',
        ]
    },
    {
        text: '\n\nNested lists',
        style: 'header',
        pageBreak: 'before',
        pageOrientation: 'portrait'
    },
    {
        ol: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur ..',
            {
                ol: [
                    'subitem 1',
                    'subitem 2',
                    'subitem 3 - Lorem ipsum dolor sit ame...',
                    'subitem 4',
                    'subitem 5',
                ]
            },
            'item 3\nsecond line of item3',
        ]
    },
    ]

    return content;
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

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return "";
    return tin.substring(from, to);
}

export default {
    fillup
};