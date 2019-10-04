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
    content.push({
        layout: "noBorders",
        table: {
            // 
            widths: [103, 50, 60, 42, 62, 60, 50],
            body: [
                [{
                    text: forms.year ? forms.year : ' ' ,
                    fontSize: 12,
                    // text: forms.birthday.month ? forms.birthday.month : ' ',
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [72, 80, 0, 0]
                },
                {
                    // text: forms.year ? forms.year : ' ',
                    text: forms.amendedYn == true ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [41, 82, 0, 0]
                },
                {
                    // text: forms.amendedYn == true ? 'X' : ' ',
                    text: forms.amendedYn == false ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [17, 83, 0, 0]
                },
                {

                    text: forms.joint_filing == true ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [27, 83, 0, 0]
                },
                {

                    text: forms.joint_filing == false ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [11, 83, 0, 0]
                },
                {

                    text: forms.source_of_income == 0 ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [24, 82, 0, 0]
                },
                {

                    text: forms.source_of_income == 1 ? 'X' : ' ',
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
            // TIN
            table: {
                widths: [245, 160, 90],
                body: [
                    [{
                        text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                        // text: '0  1  2   -  3  4  5   -   6  7  8 ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [83, 15, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        // text: '0 0 0',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [120, 14, 0, 0]
                    }, {
                        // PSOC CODE
                        text: forms.taxpayer.psoc_code == null ? ' ' : forms.taxpayer.psoc_code,
                        // text: '0  0  0  0',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [42, 14, 0, 0]
                    },

                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [230, 230, 33],
                body: [
                    [{
                        // 72 characters 
                        text: forms.taxpayer.contact_details.last == null ? ' ' : forms.taxpayer.contact_details.last,
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 6, 0, 0]
                    },
                    {
                        // 72 characters 
                        text: forms.taxpayer.contact_details.first == null ? ' ' : forms.taxpayer.contact_details.first,
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [10, 6, 0, 0]
                    },
                    {
                        // 72 characters 
                        text: forms.taxpayer.contact_details.middle == null ? ' ' : forms.taxpayer.contact_details.middle,
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [10, 6, 0, 0]
                    },
                    ]
                ]
            }
        }, 
        {
            layout: "noBorders",
            table: {
                widths: [508],
                heights: [55],
                body: [
                    [{
                        // ADDRESS
                        text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [0, 8, 0, 0]
                    }
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [35, 35 ,70, 350],
                body: [
                    [
                        {
                            text: forms.birthday.month ? forms.birthday.month : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 7, 0, 0]
                        },
                        {
                            text: forms.birthday.day ? forms.birthday.day : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [4, 7, 0, 0]
                        },
                        {
                            text: forms.birthday.year ? forms.birthday.year : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 7, 0, 0]
                        },
                        {
                            text: forms.taxpayer.email_address == null ? ' ' : forms.taxpayer.email_address,
                            // text: '0 0 0',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [170, 50, 50, 70, 130],
                body: [
                    [
                        {
                            text: forms.taxpayer.telephone_no == null ? ' ' : forms.taxpayer.telephone_no,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [8, 3, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.civil_status == 0 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [13, 3, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.civil_status == 1 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [24, 3, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.civil_status == 2 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [36, 3, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.civil_status == 3 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [70, 3, 0, 0]
                        }
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [170, 50, 270],
                body: [
                    [
                        {
                            text: forms.taxpayer.claiming_add_exemp == true ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [161, -2, 0, 0]
                        },
                        {
                            text: forms.taxpayer.claiming_add_exemp == false ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [32, -2, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.no_dependents == null ? ' ' : forms.taxpayer.no_dependents,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [238, -1, 0, 0]
                        }
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [230, 230, 33],
                body: [
                    [{
                        // 72 characters 
                        text: forms.taxpayer.spouse_name_last == null ? ' ' : forms.taxpayer.spouse_name_last,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [5, 13, 0, 0]
                    },
                    {
                        // 72 characters 
                        text: forms.taxpayer.spouse_name_first== null ? ' ' : forms.taxpayer.spouse_name_first,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [10, 13, 0, 0]
                    },
                    {
                        // 72 characters 
                        text: forms.taxpayer.spouse_name_middle == null ? ' ' : forms.taxpayer.spouse_name_middle,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [15, 13, 0, 0]
                    },
                    ]
                ]
            }
        }, 
        {
            layout: "noBorders",
            // TIN
            table: {
                widths: [322, 160],
                body: [
                    [{
                        text: forms.taxpayer.spouse_tin == null ? ' ' : forms.taxpayer.spouse_tin,
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [75, -2, 0, 0]
                    },
                    {
                        // 72 characters 
                        text: forms.taxpayer.spouse_contact_number == null ? ' ' : forms.taxpayer.spouse_contact_number,
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [20, -2, 0, 0]
                    },

                    ]
                ]
            }
        },{
            layout: "noBorders",
            table: {
                widths: [35, 35, 70, 350],
                body: [
                    [
                        {
                            text: forms.sbirthday.month ? forms.sbirthday.month : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 7, 0, 0]
                        },
                        {
                            text: forms.sbirthday.day ? forms.sbirthday.day : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [4, 7, 0, 0]
                        },
                        {
                            text: forms.sbirthday.year ? forms.sbirthday.year : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 7, 0, 0]
                        },
                        {
                            text: forms.taxpayer.spouse_email == null ? ' ' : forms.taxpayer.spouse_email,
                            // text: '0 0 0',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [10, 6, 0, 0]
                        },
                    ]
                ]
            }
        },{
            layout: "noBorders",
            table: {
                widths: [170, 50, 270],
                body: [
                    [
                        {
                            text: forms.taxpayer.spouse_claiming_add_exemp == true ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [161, -4, 0, 0]
                        },
                        {
                            text: forms.taxpayer.spouse_claiming_add_exemp == false ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [30, -4, 0, 0]
                        },
                        {
                            // text: forms.year ? forms.year : ' ',
                            text: forms.taxpayer.spouse_no_dependents == null ? ' ' : forms.taxpayer.spouse_no_dependents,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [238, -4, 0, 0]
                        }
                    ]
                ]
            }
        },
        // total payable
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.tax_filer_tax_due == null ? ' ' : forms.tax_filer_tax_due,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, 6, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.spouse_tax_due == null ? ' ' : forms.spouse_tax_due,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -3, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.total_income_tax_due == null ? ' ' : forms.total_income_tax_due,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -3, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.less_tax_credits == null ? ' ' : forms.less_tax_credits,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -6, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.spouse_less_tax_credits == null ? ' ' : forms.spouse_less_tax_credits,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -6, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.net_tax_payable == null ? ' ' : forms.net_tax_payable,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -5, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.portion_tax_payable == null ? ' ' : forms.portion_tax_payable,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -5, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.total_penalties == null ? ' ' : forms.total_penalties,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -5, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [508],
                // heights: [0],
                body: [
                    [{
                        
                        text: forms.total_amount_payable == null ? ' ' : forms.total_amount_payable,
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [403, -3, 0, 0]
                    }    
                    ]
                ]
            }
        },
        {
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
        })
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