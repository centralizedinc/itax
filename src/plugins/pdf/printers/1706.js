const form = require("../templates/1706_template").template;

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
                heights: [60],
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
                widths: [53, 23, 20, 54, 34, 25, 32, 35, 60, 10],
                body: [
                    [
                        {
                            text: ' ',
                        },
                        {
                            text: formatDate(forms.return_period, { month: "2-digit" }),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            margin: [5, 6, 0, 0]
                        },
                        {
                            text: formatDate(forms.return_period, { day: "2-digit" }),
                            bold: true,
                            fontSize: 12,
                            characterSpacing: 6,
                            alignment: 'left',
                            margin: [0, 6, 0, 0]
                        },
                        {
                            text: formatDate(forms.return_period, { year: "numeric" }),
                            bold: true,
                            fontSize: 12,
                            characterSpacing: 4,
                            alignment: 'left',
                            margin: [0, 6, 0, 0]
                        },
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'justified',
                            margin: [0, 6, 0, 0]
                        },
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'justified',
                            margin: [0, 6, 0, 0]
                        },
                        {
                            text: ' ',
                        },
                        {
                            text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                            fontSize: 12,
                            characterSpacing: 6,
                            bold: true,
                            alignment: 'justified',
                            margin: [5, 6, 0, 0]
                        },
                        {
                            text: ' '
                        },
                        [{
                            layout: "noBorders",
                            table: {
                                body: [
                                    [{
                                        text: forms.atc_code == 0 ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'left',
                                        margin: [0, -2, 0, 0]
                                    }],
                                    [{
                                        text: forms.atc_code == 1 ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'left',
                                        margin: [0, -6, 0, 0]
                                    }]
                                ]
                            },
                        }]
                    ]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [56, 32, 30, 36, 80, 50, 32, 30, 38, 80],
                heights: [22],
                body: [
                    [{
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [25, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 12),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [30, 8, 0, 0]
                    },
                    // item 7 & 8 buyer//
                    {
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [20, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 12),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                        fontSize: 12,
                        characterSpacing: 8,
                        bold: true,
                        alignment: 'left',
                        margin: [40, 8, 0, 0]
                    }]
                ]
            }
        },
        // 9 - 14
        {
            layout: "noBorders",
            table: {
                widths: [240, 280],
                heights: [23, 18, 0],
                body: [
                    [{
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 12,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 4, 0, 0]
                    },
                    // 10
                    {
                        text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                        fontSize: 12,
                        bold: true,
                        alignment: 'left',
                        margin: [20, 4, 0, 0]
                    }],
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [0, 4, 0, 0]
                    },
                    // 12
                    {
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [20, 4, 0, 0]
                    }],
                    // 13
                    [{
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [0, 5, 0, 0]
                    },
                    // 14
                    {
                        text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [20, 5, 0, 0]
                    }]
                ]
            }
        },

        // 15 -
        {
            layout: "noBorders",
            table: {
                widths: [520],
                body: [
                    [
                        [{
                            layout: "noBorders",
                            table: {
                                widths: [90, 78, 80, 120, 100],
                                body: [
                                    [{
                                        text: forms.real_property_class == 'R' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [1, 6, 0, 0],
                                    },
                                    {
                                        text: forms.real_property_class == 'C' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, 6, 0, 0],
                                    },
                                    {
                                        text: forms.real_property_class == 'CR' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, 6, 0, 0],
                                    },
                                    {
                                        text: ' '
                                    },
                                    {
                                        text: ' '
                                    }],
                                    [{
                                        text: forms.real_property_class == 'A' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [1, -5, 0, 0],
                                    },
                                    {
                                        text: forms.real_property_class == 'I' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, -5, 0, 0],
                                    },
                                    {
                                        text: forms.real_property_class == 'CC' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, -5, 0, 0],
                                    },
                                    {
                                        text: forms.real_property_class == 'O' ? ' ' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [40, -5, 0, 0],
                                    },
                                    {
                                        text: forms.others == null ? ' ' : forms.others,
                                        fontSize: 10,
                                        alignment: 'justified',
                                        margin: [0, -8, 0, 0],
                                    }]
                                ]
                            },
                        }]
                    ]
                ]
            }
        },

        // 16 -
        {
            layout: "noBorders",
            table: {
                widths: [390, 130],
                body: [
                    [{
                        text: forms.area_sold == null ? ' ' : forms.area_sold,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [220, -4, 0, 0],
                    },
                    {
                        text: forms.tax_dec == null ? ' ' : forms.tax_dec,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -4, 0, 0],
                    }],
                    [{
                        text: forms.tct_no == null ? ' ' : forms.tct_no,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [70, -5, 0, 0],
                    },
                    {
                        text: forms.desc_prop_others == null ? ' ' : forms.desc_prop_others,
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -4, 0, 0],
                    }]
                ]
            }
        },

        // 17
        {
            layout: "noBorders",
            table: {
                widths: [340, 45, 40],
                body: [
                    [{
                        text: ' '
                    },
                    {
                        text: forms.principal_res_yn == true ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        text: forms.principal_res_yn == false ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    }]
                ]
            }
        },

        // 18
        {
            layout: "noBorders",
            table: {
                widths: [442, 32, 40],
                body: [
                    [{
                        text: ' '
                    },
                    {
                        text: forms.new_principal_res == true ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -8, 0, 0]
                    },
                    {
                        text: forms.new_principal_res == false ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -8, 0, 0]
                    }]
                ]
            }
        },

        // 19 - 20
        {
            layout: "noBorders",
            table: {
                widths: [210, 300],
                body: [
                    [{
                        layout: "noBorders",
                        table: {
                            widths: [47, 40],
                            body: [
                                [{
                                    text: forms.more_than_one_prop == true ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                },
                                {
                                    text: forms.more_than_one_prop == false ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                }]
                            ]
                        }
                    },
                    {
                        layout: "noBorders",
                        table: {
                            widths: [47, 120, 100],
                            body: [
                                [{
                                    text: forms.is_avail_tax_relief == true ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [10, -4, 0, 0]
                                },
                                {
                                    text: forms.is_avail_tax_relief == false ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                },
                                {
                                    text: forms.yes_avail_tax_relief == null ? ' ' : forms.yes_avail_tax_relief,
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -5, 0, 0]
                                }]
                            ]
                        }
                    }]
                ]
            }
        },

        // 21
        {
            layout: "noBorders",
            table: {
                widths: [160, 300],
                body: [
                    [{
                        layout: "noBorders",
                        table: {
                            widths: [48, 80],
                            body: [
                                [{
                                    text: forms.description_transaction == 'CS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [1, 3, 0, 0]
                                },
                                {
                                    text: forms.description_transaction == 'IS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, 3, 0, 0]
                                }],
                                [{
                                    text: forms.description_transaction == 'E' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [1, -4, 0, 0]
                                },
                                {
                                    text: forms.description_transaction == 'FS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                }],
                                [{
                                    text: forms.description_transaction == 'O' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [1, -3, 0, 0]
                                },
                                {
                                    text: ' '
                                }]
                            ]
                        }
                    },
                    {
                        layout: "noBorders",
                        table: {
                            widths: [170, 180],
                            body: [
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.selling_price),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, 3, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.cost_expenses),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -2, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.mortgage),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -4, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.total_payments),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -8, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.amt_periodic_payment),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -12, 0, 0]
                                }]
                            ]
                        }
                    }],

                ]
            }
        },

        // Others, 27, 28
        {
            layout: "noBorders",
            table: {
                widths: [240, 135, 50, 20, 80],
                body: [
                    [{
                        text: forms.is_exempt == null ? ' ' : forms.is_exempt,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -24, 0, 0]
                    },
                    {
                        text: forms.no_of_installments == null ? ' ' : forms.no_of_installments,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        characterSpacing: 6,
                        margin: [16, -16, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { month: "2-digit" }),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [30, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { day: "2-digit" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { year: "numeric" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    }]
                ]
            }
        },

        // Others, 27, 28
        {
            layout: "noBorders",
            table: {
                widths: [240, 135, 50, 20, 80],
                body: [
                    [{
                        text: forms.is_exempt == null ? ' ' : forms.is_exempt,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -24, 0, 0]
                    },
                    {
                        text: forms.no_of_installments == null ? ' ' : forms.no_of_installments,
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        characterSpacing: 6,
                        margin: [16, -16, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { month: "2-digit" }),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [30, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { day: "2-digit" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.doi, { year: "numeric" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    }]
                ]
            }
        }



















        // ***************** end of form ***************** //
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