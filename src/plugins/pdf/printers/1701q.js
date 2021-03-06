import forms_images from '../templates/1701q_template'
var form_images = [forms_images.page1, forms_images.page2]

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log('details.sched1.taxpayer.gross_income :', details.sched1.taxpayer.gross_income);
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
        content: content[details.pdf_page || 0],
        images: {
            form: form_images[details.pdf_page || 0]
        },
        pageSize: 'LEGAL'
    };
}
/**
 * 
 * @param {Array|Object} forms 
 */
function getContent(forms) {
    console.log("get content forms: ", forms)
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: ", forms)
    var content_page1 = [
        // 1-4
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
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [62, 46, 0, 0]
                    },
                    {
                        text: forms.quarter == 1 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [45.5, 45.5, 0, 0]
                    },
                    {
                        text: forms.quarter == 2 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [26.7, 45.5, 0, 0]
                    },
                    {
                        text: forms.quarter == 3 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [11, 45, 0, 0]
                    },
                    {
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [61.2, 46, 0, 0]
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [30.5, 46.5, 0, 0]
                    },
                    {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [55, 46, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 5-6 TIN
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
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
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
        // 7 Taxpayer Filer Type
        {
            layout: "noBorders",
            table: {
                widths: [170, 20, 70, 70],
                body: [
                    [{
                        text: forms.taxpayer.filer_type == 's' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [88, 0, 0, 0]
                    },
                    {
                        text: forms.taxpayer.filer_type == 'p' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [7, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.filer_type == 'e' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [71.5, 0, 0, 0]
                    }, {
                        text: forms.taxpayer.filer_type == 't' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'justify',
                        margin: [70, 0, 0, 0]
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
                        text: ' ',

                    },
                    {
                        text: forms.taxpayer_atc_code == 'II012' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -3, 0, 0]
                    },
                    {
                        text: forms.taxpayer_atc_code == 'II014' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -3, 0, 0]
                    }, {
                        text: forms.taxpayer_atc_code == 'II013' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -3, 0, 0]
                    }

                    ],
                    [{
                        text: ' ',

                    },
                    {
                        text: forms.taxpayer_atc_code == 'II015' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -8, 0, 0]
                    },
                    {
                        text: forms.taxpayer_atc_code == 'II017' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -8, 0, 0]
                    }, {
                        text: forms.taxpayer_atc_code == 'II016' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -8, 0, 0]
                    }
                    ],
                ]
            }
        },
        // 9-10A name
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

        // 11-12
        {
            layout: "noBorders",
            table: {
                widths: [27, 20, 40, 300],
                body: [
                    [
                        //     {
                        //     text: formatDate(forms.taxpayer.individual_details.birthDate, {
                        //         month: "2-digit"
                        //     }) + "  " + formatDate(forms.taxpayer.individual_details.birthDate, {
                        //         day: "2-digit"
                        //     }) + " " + " " + " " + formatDate(forms.taxpayer.individual_details.birthDate, {
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
        // 13-15 
        {
            layout: "noBorders",
            table: {
                widths: [195, 200, 46, 46],
                body: [
                    [{
                        text: forms.taxpayer.individual_details.citizenship,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_number,
                        // text: '1234-5678-9000',
                        fontSize: 12,
                        // right,down,left,up
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [3, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_credits == true ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [28, 6, 0, 0]
                    },
                    {
                        text: forms.taxpayer_foreign_tax_credits == false ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [16, 6, 0, 0]
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
                        // text: 'GR',
                        text: forms.taxpayer_tax_rate == 'GR' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [40, 4, 0, 0]
                    },
                    {
                        text: forms.taxpayer_method_deduction == 'ID' ? 'X' : ' ',
                        // text: 'methodofdeduction',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [18, 4, 0, 0]
                    },
                    {
                        text: forms.taxpayer_method_deduction == 'OSD' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [8, 4, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.taxpayer_tax_rate == 'GS' ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: ' ',

                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: ' ',

                    }

                    ],
                ]
            }
        },
        // PART II 17-19
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
                        text: forms.spouse_details.rdo_code == null ? ' ' : forms.spouse_details.rdo_code,
                        // text: '0 0 0',
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
        // 19
        {
            layout: "noBorders",
            table: {
                widths: [200, 100, 100],
                body: [
                    [{
                        // text: 'Xxx',
                        text: forms.spouse_details.filer_type == 'SP' || forms.spouse_details.filer_type == 'SPCE' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [112, -6, 0, 0]
                    },
                    {
                        text: forms.spouse_details.filer_type == 'P' || forms.spouse_details.filer_type == 'PCE' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [23, -6, 0, 0]
                    }, {
                        text: forms.spouse_details.filer_type == 'CE' || forms.spouse_details.filer_type == 'SPCE' || forms.spouse_details.filer_type == 'PCE' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [34, -6, 0, 0]
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
                        // text: 'XX',
                        text: forms.spouse_atc_code == 'SII012' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [34, -2, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII014' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [7, -2, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII013' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [9, -2, 0, 0]
                    }, {
                        text: forms.spouse_atc_code == 'SII011' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -2, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.spouse_atc_code == 'SII015' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [34, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII017' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [7, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc_code == 'SII016' ? 'X' : ' ',
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
        // 21 Spouse Name
        {
            layout: "noBorders",
            table: {
                widths: [500],
                body: [
                    [{
                        text: checkName(forms.spouse_details),
                        // text: 'SPOUSE NAME,
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [9, 10, 0, 0]
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
                        text: forms.spouse_details.citizenship == null ? ' ' : forms.spouse_details.citizenship,
                        fontSize: 12,
                        // right,down,left,up
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
                        text: forms.spouse_foreign_tax_credits == true ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [29, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_foreign_tax_credits == false ? 'X' : ' ',
                        // text: 'N',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [16, 5, 0, 0]
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
                        // text: 'X',
                        text: forms.spouse_tax_rate == 'SGR' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [42, 6, 0, 0]
                    },
                    {
                        text: forms.spouse_method_deduction == 'SID' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [19, 6, 0, 0]
                    },
                    {
                        text: forms.spouse_method_deduction == 'SOSD' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [9, 6, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.spouse_tax_rate == 'SOGS' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [43, 2, 0, 0]
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
                        text: forms.taxpayer_tax_payable.prev_tax_due == null ? '0' : forms.taxpayer_tax_payable.prev_tax_due % 1 == 0 ? forms.taxpayer_tax_payable.prev_tax_due + ' ' : forms.taxpayer_tax_payable.prev_tax_due,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, 1, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_payable.tax_due == null ? '0' : forms.spouse_tax_payable.tax_due % 1 == 0 ? forms.spouse_tax_payable.tax_due + ' ' : forms.spouse_tax_payable.tax_due,
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
                        text: forms.taxpayer_tax_credit == null ? '0' : forms.taxpayer_tax_credit % 1 == 0 ? forms.taxpayer_tax_credit + ' ' : forms.taxpayer_tax_credit,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -2, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_credit == null ? '0' : forms.spouse_tax_credit % 1 == 0 ? forms.spouse_tax_credit + ' ' : forms.spouse_tax_credit,
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
                        text: forms.taxpayer_tax_payable.tax_due == null ? '0' : forms.taxpayer_tax_payable.tax_due % 1 == 0 ? forms.taxpayer_tax_payable.tax_due + ' ' : forms.taxpayer_tax_payable.tax_due,
                        fontSize: 12,
                        margin: [0, -4, 0, 0],
                        characterSpacing: 1,
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_due == null ? '0' : forms.spouse_tax_due % 1 == 0 ? forms.spouse_tax_due + ' ' : forms.spouse_tax_due,
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
                        text: forms.taxpayer_tax_payable.penalties == null ? '0' : forms.taxpayer_tax_payable.penalties % 1 == 0 ? forms.taxpayer_tax_payable.penalties + ' ' : forms.taxpayer_tax_payable.penalties,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -8, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_payable.penalties == null ? '0' : forms.spouse_tax_payable.penalties % 1 == 0 ? forms.spouse_tax_payable.penalties + ' ' : forms.spouse_tax_payable.penalties,
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
                        text: forms.taxpayer_tax_payable.total_amount_payable == null ? '0' : forms.taxpayer_tax_payable.total_amount_payable % 1 == 0 ? forms.taxpayer_tax_payable.total_amount_payable + ' ' : forms.taxpayer_tax_payable.total_amount_payable,
                        fontSize: 12,
                        characterSpacing: 1,
                        margin: [0, -13, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.spouse_tax_payable.total_amount_payable == null ? '0' : forms.spouse_tax_payable.total_amount_payable % 1 == 0 ? forms.spouse_tax_payable.total_amount_payable + ' ' : forms.spouse_tax_payable.total_amount_payable,
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
                        text: forms.taxpayer_aggregate_amount_payable == null ? '0' : forms.taxpayer_aggregate_amount_payable % 1 == 0 ? forms.taxpayer_aggregate_amount_payable + ' ' : forms.taxpayer_aggregate_amount_payable,
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
                            text: "",
                            pageBreak: 'before'
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
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_sales_revenue ? forms.sched1.taxpayer.total_sales_revenue : '0',
                            // text: forms.mor_assumed ? forms.mor_assumed : '0.00',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_sales_revenue),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_sales_revenue ? forms.sched1.spouse.total_sales_revenue : '0',
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
                            // text: formatAmount(forms.sched1.taxpayer.total_sales_services),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_sales_services ? forms.sched1.taxpayer.total_sales_services : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_sales_services),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_sales_services ? forms.sched1.spouse.total_sales_services : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.gross_income),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.gross_income ? forms.sched1.taxpayer.gross_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.gross_income),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.gross_income ? forms.sched1.spouse.gross_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.total_allowable_itemized_deductions),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_allowable_itemized_deductions ? forms.sched1.taxpayer.total_allowable_itemized_deductions : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 6, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_allowable_itemized_deductions),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_allowable_itemized_deductions ? forms.sched1.spouse.total_allowable_itemized_deductions : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.total_standard_deductions),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_standard_deductions ? forms.sched1.taxpayer.total_standard_deductions : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 5, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_standard_deductions),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_standard_deductions ? forms.sched1.spouse.total_standard_deductions : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.total_net_income),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_net_income ? forms.sched1.taxpayer.total_net_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_net_income),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_net_income ? forms.sched1.spouse.total_net_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.total_taxable_income),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_taxable_income ? forms.sched1.taxpayer.total_taxable_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_taxable_income),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_taxable_income ? forms.sched1.spouse.total_taxable_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: forms.taxpayer.total_operation_income_others,
                            // text: forms.taxpayer.total_operation_income_others ? forms.taxpayer.total_operation_income_others : '0' ,
                            text: "",
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                            characterSpacing: 2,
                            margin: [154, -7, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.taxpayer.total_operation_income),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_operation_income ? forms.sched1.taxpayer.total_operation_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_operation_income),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_operation_income ? forms.sched1.spouse.total_operation_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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

                            // text: formatAmount(forms.sched1.taxpayer.amount_recieved_share),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.amount_recieved_share ? forms.sched1.taxpayer.amount_recieved_share : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.amount_recieved_share),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.amount_recieved_share ? forms.sched1.spouse.amount_recieved_share : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.total_taxable_income_date),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.total_taxable_income_date ? forms.sched1.taxpayer.total_taxable_income_date : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -5, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_taxable_income_date),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_taxable_income_date ? forms.sched1.spouse.total_taxable_income_date : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched1.taxpayer.ttotal_tax_due),
                            text: forms.sched1 && forms.sched1.taxpayer && forms.sched1.taxpayer.ttotal_tax_due ? forms.sched1.taxpayer.ttotal_tax_due : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -5, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched1.spouse.total_tax_due),
                            text: forms.sched1 && forms.sched1.spouse && forms.sched1.spouse.total_tax_due ? forms.sched1.spouse.total_tax_due : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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

                            // text: formatAmount(forms.sched2.taxpayer.total_sales_revenue),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_sales_revenue ? forms.sched2.taxpayer.total_sales_revenue : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_sales_revenue),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_sales_revenue ? forms.sched2.spouse.total_sales_revenue : '0',
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
                            // text: formatAmount(forms.sched2.taxpayer.total_operation_income),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_operation_income ? forms.sched2.taxpayer.total_operation_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_operation_income),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_operation_income ? forms.sched2.spouse.total_operation_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.total_income_quarter),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_income_quarter ? forms.sched2.taxpayer.total_income_quarter : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_income_quarter),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_income_quarter ? forms.sched2.spouse.total_income_quarter : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.previous_quarter_taxable_income),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.previous_quarter_taxable_income ? forms.sched2.taxpayer.previous_quarter_taxable_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.previous_quarter_taxable_income),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.previous_quarter_taxable_income ? forms.sched2.spouse.previous_quarter_taxable_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.total_cumulative_income),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_cumulative_income ? forms.sched2.taxpayer.total_cumulative_income : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_cumulative_income),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_cumulative_income ? forms.sched2.spouse.total_cumulative_income : '0',

                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.less_allowable_reduction),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.less_allowable_reduction ? forms.sched2.taxpayer.less_allowable_reduction : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.less_allowable_reduction),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.less_allowable_reduction ? forms.sched2.taxpayer.less_allowable_reduction : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.total_taxable_income_date),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_taxable_income_date ? forms.sched2.taxpayer.total_taxable_income_date : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_taxable_income_date),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_taxable_income_date ? forms.sched2.spouse.total_taxable_income_date : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched2.taxpayer.total_tax_due),
                            text: forms.sched2 && forms.sched2.taxpayer && forms.sched2.taxpayer.total_tax_due ? forms.sched2.taxpayer.total_tax_due : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched2.spouse.total_tax_due),
                            text: forms.sched2 && forms.sched2.spouse && forms.sched2.spouse.total_tax_due ? forms.sched2.spouse.total_tax_due : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.year_excess_credits),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.year_excess_credits ? forms.sched3.taxpayer.year_excess_credits : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 9, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.year_excess_credits),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.year_excess_credits ? forms.sched3.spouse.year_excess_credits : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.payment_previous_quarter),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.payment_previous_quarter ? forms.sched3.taxpayer.payment_previous_quarter : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.payment_previous_quarter),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.payment_previous_quarter ? forms.sched3.spouse.payment_previous_quarter : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.creditable_tax_withheld),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.creditable_tax_withheld ? forms.sched3.taxpayer.creditable_tax_withheld : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.creditable_tax_withheld),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.creditable_tax_withheld ? forms.sched3.spouse.creditable_tax_withheld : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.creditable_tax_withheld_per_bir),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.creditable_tax_withheld_per_bir ? forms.sched3.taxpayer.creditable_tax_withheld_per_bir : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.creditable_tax_withheld_per_bir),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.creditable_tax_withheld_per_bir ? forms.sched3.spouse.creditable_tax_withheld_per_bir : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.tax_paid_return),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.tax_paid_return ? forms.sched3.taxpayer.tax_paid_return : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.tax_paid_return),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.tax_paid_return ? forms.sched3.spouse.tax_paid_return : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.taxpayer_tax_payable.tax_credits),
                            text: forms.taxpayer_tax_payable && forms.taxpayer_tax_payable.tax_credits ? forms.taxpayer_tax_payable.tax_credits : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.spouse_tax_payable.tax_credits),
                            text: forms.spouse_tax_payable && forms.spouse_tax_payable.tax_credits ? forms.spouse_tax_payable.tax_credits : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.other_tax_credit),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.other_tax_credit ? forms.sched3.taxpayer.other_tax_credit : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.other_tax_credit),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.other_tax_credit ? forms.sched3.spouse.other_tax_credit : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.total_tax_credit),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.total_tax_credit ? forms.sched3.taxpayer.total_tax_credit : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.total_tax_credit),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.total_tax_credit ? forms.sched3.spouse.total_tax_credit : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched3.taxpayer.overpayment),
                            text: forms.sched3 && forms.sched3.taxpayer && forms.sched3.taxpayer.overpayment ? forms.sched3.taxpayer.overpayment : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched3.spouse.overpayment),
                            text: forms.sched3 && forms.sched3.spouse && forms.sched3.spouse.overpayment ? forms.sched3.spouse.overpayment : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.taxpayer_tax_payable.surcharge),
                            text: forms.taxpayer_tax_payable && forms.taxpayer_tax_payable.surcharge ? forms.taxpayer_tax_payable.surcharge : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.spouse_tax_payable.surcharge),
                            text: forms.spouse_tax_payable && forms.spouse_tax_payable.surcharge ? forms.spouse_tax_payable.surcharge : '0',
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
                            // text: formatAmount(forms.taxpayer_tax_payable.interest),
                            text: forms.taxpayer_tax_payable && forms.taxpayer_tax_payable.interest ? forms.taxpayer_tax_payable.interest : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -1, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.spouse_tax_payable.interest),
                            text: forms.spouse_tax_payable && forms.spouse_tax_payable.interest ? forms.spouse_tax_payable.interest : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.taxpayer_tax_payable.compromise),
                            text: forms.taxpayer_tax_payable && forms.taxpayer_tax_payable.compromise ? forms.taxpayer_tax_payable.compromise : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.spouse_tax_payable.compromise),
                            text: forms.spouse_tax_payable && forms.spouse_tax_payable.compromise ? forms.spouse_tax_payable.compromise : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.taxpayer_tax_payable.penalties),
                            text: forms.taxpayer_tax_payable && forms.taxpayer_tax_payable.penalties ? forms.taxpayer_tax_payable.penalties : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.spouse_tax_payable.penalties),
                            text: forms.spouse_tax_payable && forms.spouse_tax_payable.penalties ? forms.spouse_tax_payable.penalties : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
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
                            // text: formatAmount(forms.sched4.taxpayer.total_amount_payable),
                            text: forms.sched4 && forms.sched4.taxpayer && forms.sched4.taxpayer.total_amount_payable ? forms.sched4.taxpayer.total_amount_payable : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            // text: formatAmount(forms.sched4.spouse.total_amount_payable),
                            text: forms.sched4 && forms.sched4.spouse && forms.sched4.spouse.total_amount_payable ? forms.sched4.spouse.total_amount_payable : '0',
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 7,
                            margin: [1, -3, 0, 0]

                        }

                    ]
                ]
            }
        },

    ]

    console.log('test');
    var contents = [content_page1, content_page2]
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

function checkName(details) {
    var fullname = " ";
    if (details && details.individual_details) {
        fullname = "";
        if (details.individual_details.lastName) fullname += `${details.individual_details.lastName}, `;
        if (details.individual_details.firstName) fullname += details.individual_details.firstName;
        if (details.individual_details.middleName) fullname += ` ${details.individual_details.middleName}`;
    }
    return fullname
    // console.log('!!!lastName :', lastName);
    // console.log('!!!firstName :', firstName);
    // console.log('!!!middleName :', middleName);
    // var last = ""
    // var first = ""
    // var mid = ""
    // if (lastName) {
    //     // forms.spouse_details.individual_details.lastName + "," + " " + forms.spouse_details.individual_details.firstName + " " + forms.spouse_details.individual_details.middleName == null ? ' ' : forms.spouse_details.individual_details.lastName + "," + " " + forms.spouse_details.individual_details.firstName + " " + forms.spouse_details.individual_details.middleName
    //     last = lastName
    // }
    // if (firstName) {
    //     first = firstName
    // }
    // if (middleName) {
    //     mid = middleName
    // }
    // var full = (last + ", " + first + " " + mid)
    // console.log("checkName: " + full)
    // return full
}

function checkField(field) {
    if (!field) return " ";
    else return field;
}

export default {
    fillup
};