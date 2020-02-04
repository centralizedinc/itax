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
                            margin: [0, 8, 0, 0]
                        },
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            alignment: 'justified',
                            margin: [0, 8, 0, 0]
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
                                        text: forms.atc_code == 'I' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'left',
                                        margin: [0, -2, 0, 0]
                                    }],
                                    [{
                                        text: forms.atc_code == 'C' ? 'X' : ' ',
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
                        text: mapTin(forms.buyer_details.tin, 0, 3),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [20, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.buyer_details.tin, 3, 6),
                        fontSize: 12,
                        characterSpacing: 3,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.buyer_details.tin, 6, 9),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: mapTin(forms.buyer_details.tin, 9, 12),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'left',
                        margin: [0, 8, 0, 0]
                    },
                    {
                        text: forms.buyer_details.rdo_code == null ? ' ' : forms.buyer_details.rdo_code,
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
                        text: forms.buyer_details.registered_name == null ? ' ' : forms.buyer_details.registered_name,
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
                        text: forms.buyer_details.address == null || forms.buyer_details.address == ' ' ? ' ' : forms.buyer_details.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [20, 4, 0, 0]
                    }],
                    // 13
                    [{
                        text: forms.taxpayer.individual_details.address == null || forms.taxpayer.individual_details.address == ' ' ? ' ' : forms.taxpayer.individual_details.address,
                        fontSize: 8,
                        alignment: 'left',
                        bold: true,
                        margin: [0, 5, 0, 0]
                    },
                    // 14
                    {
                        text: forms.location_of_property == null || forms.location_of_property == ' ' ? ' ' : forms.location_of_property,
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
                                        text: forms.classification_property == '1' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [1, 6, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property == '2' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, 6, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property == '3' ? 'X' : ' ',
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
                                        text: forms.classification_property == '4' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [1, -5, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property == '5' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, -5, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property == '6' ? 'X' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [0, -5, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property == 'O' ? ' ' : ' ',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [40, -5, 0, 0],
                                    },
                                    {
                                        text: forms.classification_property_specify == null ? ' ' : forms.classification_property_specify,
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
                        text: forms.tax_dec_no == null ? ' ' : forms.tax_dec_no,
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
                        text: forms.others == null ? ' ' : forms.others,
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
                        text: forms.sold_as_principal_property == true ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        text: forms.sold_as_principal_property == false ? 'X' : ' ',
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
                        text: forms.intend_construct_acquire == true ? 'X' : ' ',
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                        margin: [0, -8, 0, 0]
                    },
                    {
                        text: forms.intend_construct_acquire == false ? 'X' : ' ',
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
                                    text: forms.selling_price_cover == true ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                },
                                {
                                    text: forms.selling_price_cover == false ? 'X' : ' ',
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
                            widths: [47, 120, 200],
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
                                    text: forms.avail_tax_relief == null || forms.is_avail_tax_relief == false ? ' ' : forms.avail_tax_relief,
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
                                    text: forms.description_transaction_specify == 'CS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [1, 3, 0, 0]
                                },
                                {
                                    text: forms.description_transaction_specify == 'IS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, 3, 0, 0]
                                }],
                                [{
                                    text: forms.description_transaction_specify == 'E' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [1, -4, 0, 0]
                                },
                                {
                                    text: forms.description_transaction_specify == 'FS' ? 'X' : ' ',
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'left',
                                    margin: [0, -4, 0, 0]
                                }],
                                [{
                                    text: forms.description_transaction_specify == 'O' ? 'X' : ' ',
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
                                    text: formatAmount(forms.mortgage_assumed),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -4, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.total_payments_initial_year),
                                    fontSize: 10,
                                    bold: true,
                                    alignment: 'right',
                                    margin: [0, -8, 0, 0]
                                }],
                                [{
                                    text: ' '
                                },
                                {
                                    text: formatAmount(forms.amount_installment_month),
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
                        text: formatDate(forms.date_of_installment, { month: "2-digit" }),
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        margin: [30, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.date_of_installment, { day: "2-digit" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 6,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    },
                    {
                        text: formatDate(forms.date_of_installment, { year: "numeric" }),
                        bold: true,
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'left',
                        margin: [0, -18, 0, 0]
                    }]
                ]
            }
        },

        // 29
        {
            layout: "noBorders",
            table: {
                widths: [250, 270],
                body: [
                    [{
                        text: formatAmount(forms.item29.tax_declaration_land),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 2, 0, 0]
                    },
                    {
                        text: formatAmount(forms.item29.zonal_value),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 2, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.item29.tax_declaration_improvements),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatAmount(forms.item29.commissioner),
                        bold: true,
                        fontSize: 10,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },

        // 30
        {
            layout: "noBorders",
            table: {
                widths: [250, 270],
                body: [
                    [{
                        text: formatAmount(forms.item30.gross_selling_price),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 12, 0, 0]
                    },
                    {
                        text: formatAmount(forms.item30.bid_price),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 14, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.item30.fair_market_value),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, -2, 0, 0]
                    },
                    {
                        text: formatAmount(forms.item30.installment_collected),
                        bold: true,
                        fontSize: 10,
                        alignment: 'right',
                        margin: [0, -1, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.item30.unutilized_portion_sales),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 3, 0, 0]
                    },
                    {
                        text: formatAmount(forms.item30.others),
                        bold: true,
                        fontSize: 10,
                        alignment: 'right',
                        margin: [0, 3, 0, 0]
                    }]
                ]
            }
        },

        // computation
        {
            layout: "noBorders",
            table: {
                widths: [400, 120],
                body: [
                    [{
                        text: formatAmount(forms.computation),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatAmount(forms.computation2),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 0]
                    }],
                ]
            }
        },

        // part 2
        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: formatAmount(forms.tax_base),
                        fontSize: 10,
                        bold: true,
                        // chracterSpacing: 3,
                        alignment: 'right',
                        margin: [5, 10, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.tax_due),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 4, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.less_tax_paid),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 4, 0, 0]
                    }],
                    [{
                        text: formatAmount(forms.tax_payable_overpayment),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 3, 0, 0]
                    }],
                ]
            }
        },

        // 35
        {
            layout: "noBorders",
            table: {
                widths: [110, 100, 110, 180],
                body: [
                    [{
                        text: formatAmount(forms.surcharge),
                        fontSize: 10,
                        bold: true,
                        // chracterSpacing: 3,
                        alignment: 'right',
                        margin: [0, 10, -2, 0]
                    },
                    {
                        text: formatAmount(forms.interest),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 10, -13, 0]
                    },
                    {
                        text: formatAmount(forms.compromise),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 10, -17, 0]
                    },
                    {
                        text: formatAmount(forms.penalties),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 10, -4, 0]
                    }],
                    [{
                        text: ' '
                    },
                    {
                        text: ' '
                    },
                    {
                        text: ' '
                    },
                    {
                        text: formatAmount(forms.total_amount_payable),
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 5, -4, 0]
                    },
                    ]
                ]
            }
        },

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

                            text: formatAmount(forms.sched2.taxpayer.total_sales_revenue),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            text: "000",
                            text: formatAmount(forms.sched2.spouse.total_sales_revenue),
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
                            text: formatAmount(forms.sched2.taxpayer.total_operation_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.total_operation_income),
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
                            text: formatAmount(forms.sched2.taxpayer.total_income_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.total_income_quarter),
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
                            text: formatAmount(forms.sched2.taxpayer.previous_quarter_taxable_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.previous_quarter_taxable_income),
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
                            text: formatAmount(forms.sched2.taxpayer.total_cumulative_income),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.total_cumulative_income),
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
                            text: formatAmount(forms.sched2.taxpayer.less_allowable_reduction),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.less_allowable_reduction),
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
                            text: formatAmount(forms.sched2.taxpayer.total_taxable_income_date),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.total_taxable_income_date),
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
                            text: formatAmount(forms.sched2.taxpayer.total_tax_due),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched2.spouse.total_tax_due),
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
                            text: formatAmount(forms.sched3.taxpayer.year_excess_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 9, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.year_excess_credits),
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
                            text: formatAmount(forms.sched3.taxpayer.payment_previous_quarter),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.payment_previous_quarter),
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
                            text: formatAmount(forms.sched3.taxpayer.creditable_tax_withheld),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.creditable_tax_withheld),
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
                            text: formatAmount(forms.sched3.taxpayer.creditable_tax_withheld_per_bir),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.creditable_tax_withheld_per_bir),
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
                            text: formatAmount(forms.sched3.taxpayer.tax_paid_return),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.tax_paid_return),
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
                            text: formatAmount(forms.sched3.taxpayer.foriegn_tax_credits),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.foriegn_tax_credits),
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
                            text: formatAmount(forms.sched3.taxpayer.other_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.other_tax_credit),
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
                            text: formatAmount(forms.sched3.taxpayer.total_tax_credit),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.total_tax_credit),
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
                            text: formatAmount(forms.sched3.taxpayer.overpayment),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched3.spouse.overpayment),
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
                            text: formatAmount(forms.sched4.taxpayer.surcharge),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, 10, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched4.spouse.surcharge),
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
                            text: formatAmount(forms.sched4.taxpayer.interest),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -1, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched4.spouse.interest),
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
                            text: formatAmount(forms.sched4.taxpayer.compromise),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -2, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched4.spouse.compromise),
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
                            text: formatAmount(forms.sched4.taxpayer.penalties),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -4, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched4.spouse.penalties),
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
                            text: formatAmount(forms.sched4.taxpayer.total_amount_payable),
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            characterSpacing: 6,
                            margin: [1, -3, 0, 0]
                        },
                        {
                            // text: "000",
                            text: formatAmount(forms.sched4.spouse.total_amount_payable),
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