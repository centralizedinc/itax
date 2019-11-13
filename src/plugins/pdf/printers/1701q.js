const form = require("../templates/1701q_template");
var forms = [form.page1, form.page1, form.page2]
// const form1 = require("../templates/1701q_template").template;
// const form2 = require("../templates/1601e_template").template;
// var forms = [form.page1, form.page2]


/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details: " + JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ###### :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 550,
                margin: [25, 0, 0, 0]
            }]
        },
        content: content[details.pdf_page],
        images: {
            form: forms[details.pdf_page]
        },
        pageSize: 'LEGAL'
    };
}
/**
 * 
 * @param {Array|Object} forms 
 */
function getContent(forms) {
    console.log("get content forms: ", forms)
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content_page1 = [
        // 1-4
        {
            layout: "noBorders",
            table: {
                widths: [103, 50, 60, 60, 60, 60, 80],
                heights: [70],
                body: [
                    [{
                        // text: '2019',
                        text: checkField(forms.return_period_year),
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [62, 46, 0, 0]
                    },
                    {
                        text: forms.quarter == 1 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [45.5, 45.5, 0, 0]
                    },
                    {
                        text: forms.quarter == 2 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [26.7, 45.5, 0, 0]
                    },
                    {
                        text: forms.quarter == 3 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [11, 45, 0, 0]
                    },
                    {
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [61.2, 46, 0, 0]
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [30.5, 46.5, 0, 0]
                    },
                    {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [55, 46, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 5-6 TIN
        {
            layout: "noBorders",
            table: {
                widths: [158, 45, 45, 45, 55, 120],
                // heights: 18,
                body: [
                    [{
                        text: ''
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ' '
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 6,
                        alignment: 'justify',
                        margin: [81, 0, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 7 Taxpayer Filer Type
        {
            layout: "noBorders",
            table: {
                widths: [170, 20, 70, 70],
                body: [
                    [{
                        text: forms.taxpayer.filer_type == 's' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [88, 0, 0, 0]
                    },
                    {
                        text: forms.taxpayer.filer_type == 'p' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [7, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.filer_type == 'e' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [71.5, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.filer_type == 't' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [70, 0, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 8 ATC
        {
            layout: "noBorders",
            table: {
                widths: [110, 120, 120, 70],
                body: [
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.taxpayer_atc_code == 'II012' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -3, 0, 0]
                    },
                    {
                        text: forms.taxpayer_atc_code == 'II014' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -3, 0, 0]
                    }, {
                        text: forms.taxpayer_atc_code == 'II013' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -3, 0, 0]
                    }

                    ],
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.taxpayer_atc_code == 'II015' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -8, 0, 0]
                    },
                    {
                        text: forms.taxpayer_atc_code == 'II017' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -8, 0, 0]
                    }, {
                        text: forms.taxpayer_atc_code == 'II016' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -8, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 9-10A name
        {
            layout: "noBorders",
            table: {
                widths: [510],
                // heights: [16],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, 0, 0, 0]
                    }],
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [455],
                // heights: [16, 9],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == '' ? ' ' : forms.taxpayer.address,
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, 5, 0, 0]
                    }],
                    [{
                        text: ' '
                    }]
                ]
            }
        },
        //    zip
        {
            layout: "noBorders",
            table: {
                widths: [455, 50],
                body: [
                    [{
                        text: ' ',
                    },
                    {
                        text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == '' ? ' ' : forms.taxpayer.address_details.zipCode,
                        fontSize: 12,
                        characterSpacing: 5,
                        bold: true,
                        alignment: 'left',
                        margin: [5, -20, 0, 0]
                    }
                    ]
                ]
            }
        },

        // 11-12
        {
            layout: "noBorders",
            table: {
                widths: [27, 20, 40, 300],
                body: [
                    [
                        //     {
                        //     text: formatDate(forms.taxpayer.individual_details.birthDate, {
                        //         month: "2-digit"
                        //     }) + "  " + formatDate(forms.taxpayer.individual_details.birthDate, {
                        //         day: "2-digit"
                        //     }) + " " + " " + " " + formatDate(forms.taxpayer.individual_details.birthDate, {
                        //         year: "numeric"
                        //     }),
                        //     fontSize: 12,
                        //     characterSpacing: 2,
                        //     alignment: 'justify',
                        //     margin: [4, -12, 0, 0]
                        // },
                        {
                            text: formatDate(forms.taxpayer.individual_details.birthDate, {
                                month: "2-digit"
                            }),
                            bold: true,
                            characterSpacing: 5,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [3, -12, 0, 0]
                        },
                        {
                            text: formatDate(forms.taxpayer.individual_details.birthDate, {
                                day: "2-digit"
                            }),
                            bold: true,
                            fontSize: 12,
                            characterSpacing: 5,
                            alignment: 'left',
                            margin: [-8, -12, 0, 0]
                        },
                        {
                            text: formatDate(forms.taxpayer.individual_details.birthDate, {
                                year: "numeric"
                            }),
                            bold: true,
                            characterSpacing: 5,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [-10, -12, 0, 0]
                        },
                        {
                            text: forms.taxpayer.contact_details.email,
                            fontSize: 12,
                            // characterSpacing: 2,
                            bold: true,
                            alignment: 'justify',
                            margin: [0, -12, 0, 0]
                        }
                    ]
                ]
            }
        },
        // 13-15 
        {
            layout: "noBorders",
            table: {
                widths: [195, 200, 46, 46],
                body: [
                    [{
                        text: forms.taxpayer.citizenship,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_number,
                        // text: '1234-5678-9000',
                        fontSize: 12,
                        // right,down,left,up
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [3, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_credits == true ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [28, 6, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_credits == false ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [16, 6, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 16-16A 
        {
            layout: "noBorders",
            table: {
                widths: [165, 120, 210],
                body: [
                    [{
                        // text: 'GR',
                        text: forms.taxpayer_tax_rate == 'GR' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [42, 6, 0, 0]
                    },
                    {
                        text: forms.taxpayer_method_deduction == 'ID' ? 'X' : ' ',
                        // text: 'methodofdeduction',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [18, 4, 0, 0]
                    },
                    {
                        text: forms.taxpayer_method_deduction == 'OSD' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [8, 4, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.taxpayer_tax_rate == 'GS' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [42, 2, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: ' ',

                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: ' ',

                    }

                    ],
                ]
            }
        },
        // PART II 17-19
        {
            layout: "noBorders",
            table: {
                widths: [210, 45, 45, 190,],
                // widths: [90, 90, 90, 100],
                body: [
                    [{
                        text: mapTin(forms.spouse_details.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'justified',
                        margin: [168, 18, 0, 0]
                    },

                    {
                        text: mapTin(forms.spouse_details.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 4,
                        bold: true,
                        alignment: 'justified',
                        margin: [2, 18, 0, 0]
                    },
                    {
                        text: mapTin(forms.spouse_details.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'justified',
                        margin: [0, 18, 0, 0]
                    },
                    {
                        text: forms.spouse_details.rdo_code == null ? ' ' : forms.spouse_details.rdo_code,
                        // text: '0 0 0',
                        fontSize: 12,
                        characterSpacing: 6,
                        bold: true,
                        alignment: 'justify',
                        margin: [145, 18, 0, 0]
                    }
                    ]
                ]
            }
        },
        // 19
        {
            layout: "noBorders",
            table: {
                widths: [200, 100, 100],
                body: [
                    [{
                        // text: 'Xxx',
                        text: forms.spouse_details.filer_type == 'SP' || forms.spouse_details.filer_type == 'SPCE' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [112, -6, 0, 0]
                    },
                    {
                        text: forms.spouse_details.filer_type == 'P' || forms.spouse_details.filer_type == 'PCE' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [23, -6, 0, 0]
                    }, {
                        text: forms.spouse_details.filer_type == 'CE' || forms.spouse_details.filer_type == 'SPCE' || forms.spouse_details.filer_type == 'PCE' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [34, -6, 0, 0]
                    }

                    ]
                ]
            }
        },
        // 20 ATC
        {
            layout: "noBorders",
            table: {
                widths: [140, 120, 115, 110],
                body: [
                    [{
                        // text: 'XX',
                        text: forms.spouse_atc_code == 'SII012' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [34, -2, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII014' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [7, -2, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII013' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [9, -2, 0, 0]
                    }, {
                        text: forms.spouse_atc_code == 'SII011' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -2, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.spouse_atc_code == 'SII015' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [34, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII017' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [7, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII016' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [9, -5, 0, 0]
                    }, {
                        text: '',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [10, -5, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 21 Spouse Name
        {
            layout: "noBorders",
            table: {
                widths: [500],
                body: [
                    [{
                        text: checkName(forms.spouse_details.individual_details.lastName, forms.spouse_details.individual_details.firstName, forms.spouse_details.individual_details.middleName),
                        // text: 'SPOUSE NAME,
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [9, 10, 0, 0]
                    }],
                ]
            }
        },
        // 22-24
        {
            layout: "noBorders",
            table: {
                widths: [195, 200, 46, 46],
                body: [
                    [{
                        text: forms.spouse_details.citizenship == null ? ' ' : forms.spouse_details.citizenship,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [9, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_foreign_tax_number == null ? ' ' : forms.spouse_foreign_tax_number,
                        fontSize: 12,
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [3, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_foreign_tax_credits == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [29, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_foreign_tax_credits == false ? 'X' : ' ',
                        // text: 'N',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [16, 5, 0, 0]
                    }
                    ]

                ]
            }
        },
        // 25-25A
        {
            layout: "noBorders",
            table: {
                widths: [165, 120, 210],
                body: [
                    [{
                        // text: 'X',
                        text: forms.spouse_tax_rate == 'SGR' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [42, 6, 0, 0]
                    },
                    {
                        text: forms.spouse_method_deduction == 'SID' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [19, 6, 0, 0]
                    },
                    {
                        text: forms.spouse_method_deduction == 'SOSD' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [9, 6, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.spouse_tax_rate == 'SOGS' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [43, 2, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: '',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [43, -10, 0, 0]
                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: '',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [43, -10, 0, 0]
                    }

                    ],
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [510],
                heights: [20],
                body: [
                    [{
                        text: '',
                    }]
                ]
            }
        },
        // 26
        {
            layout: "noBorders",
            table: {
                widths: [305, 98, 98],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_prev_tax_due == null ? '0.00' : forms.taxpayer_prev_tax_due % 1 == 0 ? forms.taxpayer_prev_tax_due + '.00' : forms.taxpayer_prev_tax_due,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, 1, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_prev_tax_due == null ? '0.00' : forms.spouse_prev_tax_due % 1 == 0 ? forms.spouse_prev_tax_due + '.00' : forms.spouse_prev_tax_due,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, 1, 0, 0],
                        alignment: 'right'
                    }
                    ]
                ]
            }
        },
        // 27

        {
            layout: "noBorders",
            table: {
                widths: [305, 98, 98],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_tax_credit == null ? '0.00' : forms.taxpayer_tax_credit % 1 == 0 ? forms.taxpayer_tax_credit + '.00' : forms.taxpayer_tax_credit,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -2, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_credit == null ? '0.00' : forms.spouse_tax_credit % 1 == 0 ? forms.spouse_tax_credit + '.00' : forms.spouse_tax_credit,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -2, 0, 0],
                        alignment: 'right'
                    }
                    ]
                ]
            }
        },
        // 28
        {
            layout: "noBorders",
            table: {
                widths: [305, 98, 98],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_tax_due == null ? '0.00' : forms.taxpayer_tax_due % 1 == 0 ? forms.taxpayer_tax_due + '.00' : forms.taxpayer_tax_due,
                        fontSize: 12,
                        margin: [0, -4, 0, 0],
                        characterSpacing: 1,
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_due == null ? '0.00' : forms.spouse_tax_due % 1 == 0 ? forms.spouse_tax_due + '.00' : forms.spouse_tax_due,
                        fontSize: 12,
                        margin: [0, -4, 0, 0],
                        characterSpacing: 1,
                        alignment: 'right'
                    }
                    ]
                ]
            }
        },
        // 29
        {
            layout: "noBorders",
            table: {
                widths: [305, 98, 98],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_total_penalties == null ? '0.00' : forms.taxpayer_total_penalties % 1 == 0 ? forms.taxpayer_total_penalties + '.00' : forms.taxpayer_total_penalties,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -8, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_total_penalties == null ? '0.00' : forms.spouse_total_penalties % 1 == 0 ? forms.spouse_total_penalties + '.00' : forms.spouse_total_penalties,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -8, 0, 0],
                        alignment: 'right'
                    }
                    ]
                ]
            }
        },
        // 30
        {
            layout: "noBorders",
            table: {
                widths: [305, 98, 98],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_total_amount_payable == null ? '0.00' : forms.taxpayer_total_amount_payable % 1 == 0 ? forms.taxpayer_total_amount_payable + '.00' : forms.taxpayer_total_amount_payable,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -13, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_total_amount_payable == null ? '0.00' : forms.spouse_total_amount_payable % 1 == 0 ? forms.spouse_total_amount_payable + '.00' : forms.spouse_total_amount_payable,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -13, 0, 0],
                        alignment: 'right'
                    }
                    ]
                ]
            }
        },
        // 31
        {
            layout: "noBorders",
            table: {
                widths: [298, 160],
                body: [
                    [{
                        text: ' ',


                    },

                    {
                        text: forms.taxpayer_aggregate_amount_payable == null ? '0.00' : forms.taxpayer_aggregate_amount_payable % 1 == 0 ? forms.taxpayer_aggregate_amount_payable + '.00' : forms.taxpayer_aggregate_amount_payable,
                        fontSize: 12,
                        margin: [0, -17, 0, 0],
                        characterSpacing: 1,
                        alignment: 'right'
                    }
                    ]
                ]
            }
        }
    ]

    //   var content2 = [{
    //           text: 'Unordered list',
    //           style: 'header'
    //       },
    //       {
    //           ol: [
    //               'item 1',
    //               'item 2',
    //               'item 3',
    //           ]
    //       },
    //       {
    //           text: '\n\nUnordered list with longer lines',
    //           style: 'header',
    //           pageBreak: 'before',
    //           pageOrientation: 'landscape'
    //       },
    //       {
    //           ol: [
    //               'item 1',
    //               'Lorem ipsum dolor sit amet, consectetur ..',
    //               'item 3',
    //           ]
    //       },
    //       {
    //           text: '\n\nNested lists',
    //           style: 'header',
    //           pageBreak: 'before',
    //           pageOrientation: 'portrait'
    //       },
    //       {
    //           ol: [
    //               'item 1',
    //               'Lorem ipsum dolor sit amet, consectetur ..',
    //               {
    //                   ol: [
    //                       'subitem 1',
    //                       'subitem 2',
    //                       'subitem 3 - Lorem ipsum dolor sit ame...',
    //                       'subitem 4',
    //                       'subitem 5',
    //                   ]
    //               },
    //               'item 3\nsecond line of item3',
    //           ]
    //       },
    //   ]
    //   var content1 = [content2, content]
    //   return content1[forms.page];
    // content 2
    var content_page2 = [

        {
            layout: "noBorders",
            table: {
                widths: [515],
                heights: [55],
                body: [
                    [

                        {
                            text: ""
                        }

                    ]
                ]
            }
        },
        //schedule table taxpayer and tin
        {
            layout: "noBorders",
            table: {
                widths: [35, 26, 27, 400],
                // heights: 18,
                body: [
                    [

                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 12,
                            characterSpacing: 5,
                            bold: true,
                            alignment: 'justified',
                            margin: [1, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 12,
                            characterSpacing: 4,
                            bold: true,
                            alignment: 'justified',
                            margin: [-5, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'justified',
                            margin: [-5, 0, 0, 0]
                        },
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            layout: "noBorders",
                            characterSpacing: 5,
                            margin: [90, 0, 0, 0]
                        }
                    ]
                ]
            }
        },
        //space
        {
            layout: "noBorders",
            table: {
                widths: [515],
                heights: [33],
                body: [
                    [

                        {
                            text: ""
                        }


                    ]
                ]
            }
        },
        //36
        //36
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],

                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_sales_revenue),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_sales_revenue),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //37
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],

                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_sales_services),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_sales_services),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //38
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],

                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.gross_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.gross_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //39
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],

                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_allowable_itemized_deductions),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 6, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_allowable_itemized_deductions),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 6, 0, 0]

                        }



                    ]
                ]
            }
        },
        //40
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_standard_deductions),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 5, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_standard_deductions),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 5, 0, 0]

                        }

                    ]
                ]
            }
        },
        //41
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_net_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_net_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //  42
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_taxable_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_taxable_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //43
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: forms.taxpayer.total_operation_income_others,
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            characterSpacing: 2,
                            margin: [154, -7, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_operation_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_operation_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //         //44
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",

                            text: formatAmount(forms.sched1.taxpayer.amount_recieved_share),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.amount_recieved_share),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //            //45
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_taxable_income_date),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -5, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_taxable_income_date),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -5, 0, 0]

                        }

                    ]
                ]
            }
        },
        //            //46
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.ttotal_tax_due),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -5, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_tax_due),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -5, 0, 0]

                        }

                    ]
                ]
            }
        },
        //47
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",

                            text: formatAmount(forms.sched1.taxpayer.total_sales_revenue),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_sales_revenue),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 10, 0, 0]

                        }

                    ]
                ]
            }
        },
        //48
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: "",
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            characterSpacing: 2,
                            margin: [145, -7, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_operation_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_operation_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //49
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_income_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_income_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //50
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.previous_quarter_taxable_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.previous_quarter_taxable_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //51
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_cumulative_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_cumulative_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //52
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.less_allowable_reduction),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.less_allowable_reduction),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //53
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_taxable_income_date),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_taxable_income_date),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //54
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_tax_due),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_tax_due),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //55
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.year_excess_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 9, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.year_excess_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 9, 0, 0]

                        }

                    ]
                ]
            }
        },
        //56
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.payment_previous_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.payment_previous_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //57
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.creditable_tax_withheld),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.creditable_tax_withheld),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //58
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.creditable_tax_withheld_per_bir),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.creditable_tax_withheld_per_bir),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //59
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.tax_paid_return),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.tax_paid_return),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //60
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.foriegn_tax_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.foriegn_tax_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },
        //61
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: "",
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            characterSpacing: 2,
                            margin: [145, -8, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.other_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.other_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //62
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //63
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [18],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.overpayment),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.overpayment),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //64
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                heights: [19],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.surcharge),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.surcharge),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 10, 0, 0]

                        }

                    ]
                ]
            }
        },
        //65
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [19],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.interest),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -1, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.interest),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -1, 0, 0]

                        }

                    ]
                ]
            }
        },
        //66
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [19],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.compromise),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.compromise),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]

                        }

                    ]
                ]
            }
        },
        //67
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                // heights: [19],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.penalties),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.penalties),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]

                        }

                    ]
                ]
            }
        },
        //68
        {
            layout: "noBorders",
            table: {
                widths: [275, 127, 102],
                heights: [19],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.taxpayer.total_amount_payable),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched1.spouse.total_amount_payable),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },

    ]

    var contents = [content_page1, content_page1, content_page2]
    return contents;
}

function formatDate(date, type) {
    if (!date) {
        return " ";
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
function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return " ";
    return tin.substring(from, to);
}

function checkName(lastName, firstName, middleName) {
    console.log('!!!lastName :', lastName);
    console.log('!!!firstName :', firstName);
    console.log('!!!middleName :', middleName);
    var last = ""
    var first = ""
    var mid = ""
    if (lastName) {
        // forms.spouse_details.individual_details.lastName + "," + " " + forms.spouse_details.individual_details.firstName + " " + forms.spouse_details.individual_details.middleName == null ? ' ' : forms.spouse_details.individual_details.lastName + "," + " " + forms.spouse_details.individual_details.firstName + " " + forms.spouse_details.individual_details.middleName
        last = lastName
    }
    if (firstName) {
        first = firstName
    }
    if (middleName) {
        mid = middleName
    }
    var full = (last + ", " + first + " " + mid)
    console.log("checkName: " + full)
    return full
}

function checkField(field) {
    if (!field) return " ";
    else return field;
}

export default {
    fillup
};