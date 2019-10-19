const form = require("../templates/1701q_template").template;

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
        content: content,
        images: {
            form: form
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
    var content = [
        // 1-4
        {
            layout: "noBorders",
            table: {
                widths: [103, 50, 60, 60, 60, 60, 62],
                heights: [70],
                body: [
                    [{
                        // text: '2019',
                        text: checkField(forms.return_period_year),
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [62, 47, 0, 0]
                    },
                    {
                        text: forms.quarter == 1 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [46, 47, 0, 0]
                    },
                    {
                        text: forms.quarter == 2 ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [28, 45, 0, 0]
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
                        margin: [62, 46, 0, 0]
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [32, 46, 0, 0]
                    },
                    {
                        text: forms.num_of_sheet,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [60, 46, 0, 0]
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
                heights: 18,
                body: [
                    [{
                        text: ''
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 14,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 14,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 14,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 14,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'justify',
                        margin: [80, 0, 0, 0]
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
                        // text: 'X',
                        text: forms.taxpayer.tax_filer_type == 'SP' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [88, -6, 0, 0]
                    },
                    {
                        text: forms.taxpayer.tax_filer_type == 'PRO' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [7, -6, 0, 0]
                    }, {
                        text: forms.taxpayer.tax_filer_type == 'EST' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [72, -6, 0, 0]
                    }, {
                        text: forms.taxpayer.tax_filer_type == 'TRU' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [70, -6, 0, 0]
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
                        text: '',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [10, -63, 0, 0]
                    },
                    {
                        text: forms.atc == 'II012' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -3, 0, 0]
                    },
                    {
                        text: forms.atc == 'II014' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -3, 0, 0]
                    }, {
                        text: forms.atc == 'II013' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -3, 0, 0]
                    }

                    ],
                    [{
                        text: '',
                        // text: forms.filerType == 1 ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [88, -3, 0, 0]
                    },
                    {
                        text: forms.atc == 'II015' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [10, -5, 0, 0]
                    },
                    {
                        text: forms.atc == 'II017' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [13, -5, 0, 0]
                    }, {
                        text: forms.atc == 'II016' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [31, -5, 0, 0]
                    }],
                ]
            }
        },
        // 9-10A name
        {
            layout: "noBorders",
            table: {
                widths: [510],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 16,
                        bold: true,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [10, 6, 0, 0]
                    }],
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [455],
                heights: [9, 9],
                body: [
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == '' ? ' ' : forms.taxpayer.address,
                        fontSize: 16,
                        bold: true,
                        // right,down,left,up
                        alignment: 'justified',
                        margin: [10, 0, 0, 0]
                    }],
                    [{
                        text: ''
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
                        text: '',
                    },
                    {
                        text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == '' ? ' ' : forms.taxpayer.address_details.zipCode,
                        fontSize: 12,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [5, -16, 0, 0]
                    }]
                ]
            }
        },

        // 11-12
        {
            layout: "noBorders",
            table: {
                widths: [150, 300],
                body: [
                    [{
                        text: forms.birthday.month + "  " + forms.birthday.day + " " + " " + " " + forms.birthday.year ? forms.birthday.month + "  " + forms.birthday.day + " " + " " + " " + forms.birthday.year : '',
                        // text: '01  01  2011',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [4, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer.email_address,
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [0, 5, 0, 0]
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
                        text: forms.taxpayer.foreign_tax_no,
                        // text: '1234-5678-9000',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [3, 3, 0, 0]
                    },
                    {
                        text: forms.taxCredits == true ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [30, 3, 0, 0]
                    },
                    {
                        text: forms.taxCredits == false ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [18, 3, 0, 0]
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
                        text: forms.taxRate == 'GR' ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 3, 0, 0]
                    },
                    {
                        text: forms.method_deduction == 'ID' ? 'X' : ' ',
                        // text: 'methodofdeduction',
                        fontSize: 14,
                        alignment: 'justify',
                        margin: [18, 3, 0, 0]
                    },
                    {
                        text: forms.method_deduction == 'OSD' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 14,
                        alignment: 'justify',
                        margin: [8, 3, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.taxRate == 'GS' ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        // text: forms.filerType == 2 ? 'X' : ' ',
                        text: '',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [18, 3, 0, 0]
                    },
                    {
                        // text: forms.filerType == 3 ? 'X' : ' ',
                        text: '',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [8, 3, 0, 0]
                    }

                    ],
                ]
            }
        },
        // PART II 17-19
        {
            layout: "noBorders",
            table: {
                widths: [320, 200],
                body: [
                    [{
                        text: forms.taxpayer.spouse_tin == null ? ' ' : forms.taxpayer.spouse_tin,
                        // text: '0 1 2  -  3 4 5  -  6 7 8 ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [168, 15, 0, 0]
                    },
                    {
                        text: forms.taxpayer.spouse_rdo_code == null ? ' ' : forms.taxpayer.spouse_rdo_code,
                        // text: '0 0 0',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [140, 15, 0, 0]
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
                        text: forms.taxpayer.spouse_tax_filer_type == 'SSP' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [112, -6, 0, 0]
                    },
                    {
                        text: forms.taxpayer.spouse_tax_filer_type == 'SPRO' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 12,
                        alignment: 'justify',
                        margin: [23, -6, 0, 0]
                    }, {
                        text: forms.taxpayer.spouse_tax_filer_type == 'SCE' ? 'X' : ' ',
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
                        text: forms.spouse_atc == 'SII012' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [33, -4, 0, 0]
                    },
                    {
                        text: forms.spouse_atc == 'SII014' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -4, 0, 0]
                    },
                    {
                        text: forms.spouse_atc == 'SII013' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [10, -4, 0, 0]
                    }, {
                        text: forms.spouse_atc == 'SII011' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [8, -4, 0, 0]
                    }

                    ],
                    [{
                        // text: 'X',
                        text: forms.spouse_atc == 'SII015' ? 'X' : ' ',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [35, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc == 'SII017' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [6, -5, 0, 0]
                    },
                    {
                        text: forms.spouse_atc == 'SII016' ? 'X' : ' ',
                        // text: 'X',
                        fontSize: 10,
                        alignment: 'left',
                        margin: [10, -5, 0, 0]
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
                        text: forms.taxpayer.spouse_name == null ? ' ' : forms.taxpayer.spouse_name,
                        // text: 'SPOUSE NAME,
                        fontSize: 13,
                        // right,down,left,up
                        alignment: 'left',
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
                        text: forms.taxpayer.spouse_citizenship,
                        // text: 'FILIPINO',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [9, 5, 0, 0]
                    },
                    {
                        text: forms.taxpayer.spouse_foreign_tax_no,
                        // text: '1234-5678-9000',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [3, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_taxCredits == true ? 'X' : ' ',
                        // text: 'Y',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [29, 5, 0, 0]
                    },
                    {
                        text: forms.spouse_taxCredits == false ? 'X' : ' ',
                        // text: 'N',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [16, 5, 0, 0]
                    }]

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
                        text: forms.spouse_taxRate == 'SGR' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [43, 6, 0, 0]
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
                        text: forms.spouse_taxRate == 'SOGS' ? 'X' : ' ',
                        fontSize: 12,
                        alignment: 'left',
                        margin: [43, 4, 0, 0]
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

        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, 0, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item26a == null ? '0.00' : forms.item26a % 1 == 0 ? forms.item26a + '.00' : forms.item26a,
                        fontSize: 13,
                        margin: [0, 0, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item26b == null ? '0.00' : forms.item26b % 1 == 0 ? forms.item26b + '.00' : forms.item26b,
                        fontSize: 13,
                        margin: [0, 0, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        },


        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item27a == null ? '0.00' : forms.item27a % 1 == 0 ? forms.item26a + '.00' : forms.item27a,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item27b == null ? '0.00' : forms.item27b % 1 == 0 ? forms.item27b + '.00' : forms.item27b,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item28a == null ? '0.00' : forms.item28a % 1 == 0 ? forms.item28a + '.00' : forms.item28a,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item28b == null ? '0.00' : forms.item28b % 1 == 0 ? forms.item28b + '.00' : forms.item28b,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item29a == null ? '0.00' : forms.item29a % 1 == 0 ? forms.item29a + '.00' : forms.item29a,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item29b == null ? '0.00' : forms.item29b % 1 == 0 ? forms.item29b + '.00' : forms.item29b,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item30a == null ? '0.00' : forms.item30a % 1 == 0 ? forms.item30a + '.00' : forms.item30a,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item30b == null ? '0.00' : forms.item30b % 1 == 0 ? forms.item30b + '.00' : forms.item30b,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [300, 96, 96],
                body: [
                    [{
                        text: '',
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'

                    },

                    {
                        text: forms.item31a == null ? '0.00' : forms.item31a % 1 == 0 ? forms.item31a + '.00' : forms.item31a,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    },
                    {
                        text: forms.item31b == null ? '0.00' : forms.item31ab % 1 == 0 ? forms.item31b + '.00' : forms.item31b,
                        fontSize: 13,
                        margin: [0, -5, 0, 0],
                        alignment: 'right'
                    }]
                ]
            }
        }
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

function checkField(field) {
    if (!field) return " ";
    else return field;
}

export default {
    fillup
};
