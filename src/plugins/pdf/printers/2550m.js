const form = require("../templates/2550m_template").template;

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
    console.log("get content forms: " + JSON.stringify(forms))
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content = []
    content.push({
        layout: "noBorders",
        table: {
            widths: [162, 79, 49, 49, 150],
            body: [
                [{
                    text: forms.returnPeriod.month ? forms.returnPeriod.month : ' ',
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [145, 34, 0, 0]
                },
                {
                    text: forms.returnPeriod.year ? forms.returnPeriod.year : ' ',
                    fontSize: 13,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [12, 34, 0, 0]
                },
                {
                    text: forms.amendedYn == true ? 'X' : ' ',
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [42, 39, 0, 0]
                },
                {
                    text: forms.amendedYn == false ? 'X' : ' ',
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [20, 39, 0, 0]
                },
                {
                    text: forms.numOfSheet ? forms.numOfSheet : ' ',
                    fontSize: 12,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [120, 34, 0, 0]
                }],

            ]
        }
    },
        {

            layout: "noBorders",
            table: {
                widths: [170, 100, 236],
                body: [
                    [{
                        text: forms.taxpayer.tin ? forms.taxpayer.tin : ' ',
                        fontSize: 14,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [33, 9, 0, 0]
                    },
                    {
                        text: forms.taxpayer.rdo_code ? forms.taxpayer.rdo_code : ' ',
                        fontSize: 14,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [60, 9, 0, 0]
                    },
                    {
                        text: forms.taxpayer.line_of_business ? forms.taxpayer.line_of_business : ' ',
                        fontSize: 13,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [118, 9, 0, 0]
                    }],



                ]
            }
        },
        {
            //Table 3 Taxpayer
            layout: "noBorders",
            table: {
                widths: [395, 120],
                body: [
                    [
                        {
                            text: forms.taxpayer.registered_name ? forms.taxpayer.registered_name : ' ',
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [18, 9, 0, 0]
                        },
                        {
                            text: forms.taxpayer.contact_details.telno ? forms.taxpayer.contact_details.telno : ' ',
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [40, 9, 0, 0]
                        },
                    ]
                ]
            }
        },
        // ------------------------------------------
        {
            //Table 4 Registered Address
            layout: "noBorders",
            table: {
                widths: [395, 120],
                body: [
                    [
                        {
                            text: forms.taxpayer.address ? forms.taxpayer.address : ' ',
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [16, 8, 0, 0]
                        },
                        {
                            text: forms.taxpayer.address_details.zipCode,
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [84, 7, 0, -30]
                        },
                    ]
                ]
            }
        },

        // --------------------------------------------
        {
            //Table 5  Tax Relief
            layout: "noBorders",
            table: {
                widths: [230, 50, 226],
                body: [
                    [
                        {
                            text: forms.specialRate == true ? 'X' : ' ',
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [210, 3, 0, 0]
                        },
                        {
                            text: forms.specialRate == false ? 'X' : ' ',
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [23, 3, 0, 0]
                        },
                        {
                            text: forms.specialRateYn,
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [64, 2, 0, 0]
                        },

                    ]
                ]
            }
        },

        // --------------------------------------------
        {
            //Table 6  Vatable Sales
            layout: "noBorders",
            table: {
                widths: [385, 130,],

                body: [
                    [
                        {
                            text: forms.totalAtcAmount?forms.totalAtcAmount:'0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [270, 22, 0, 0]
                        },
                        {
                            text: forms.totalAtcOutput,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, 22, 0, 0]
                        },


                    ]
                ]
            }
        },
        // --------------------------------------------
        {
            //Table 7  Sales to Goverment
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.salesGovAmount,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },
                        {
                            text: forms.salesGovOutput,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -5, 0, 0]
                        },
                    ]
                ]
            }
        },

        // --------------------------------------------
        {
            //Table 8  Zero Rated Sales
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.zeroRatedAmount,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },

                    ]
                ]
            }

        },

        // --------------------------------------------
        {
            //Table 9  Exempt Sales Receipts
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.exemptAmount,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },

                    ]
                ]
            }

        },

        // --------------------------------------------
        {
            //Table 10  Total Sales Receipts    
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.totalSales,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: forms.totalOutputTax,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -4, 0, 0]
                        },
                    ]
                ]

            }
        },

        // --------------------------------------------
        {
            //Table 11  Less Allowable 
            layout: "noBorders",
            table: {
                widths: [500, 130,],
                body: [
                    [
                        {
                            text: forms.carriedOverPreviousPeriod,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, 2, 0, 0]
                        },

                    ]
                ]
            }

        },

        // --------------------------------------------
        {
            //Table 12  17B
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: forms.txbleGoodsServices,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, -3, 0, 0]
                        },
                    ]
                ]
            }
        },
        // --------------------------------------------
        {
            //Table 13  17C
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: forms.transInputTax,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        // --------------------------------------------
        {
            //Table 14  17D
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: forms.presumpInputTax,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        // --------------------------------------------
        {
            //Table 15  17E
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: forms.otherAllowableLessInputTax,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        // --------------------------------------------
        {
            //Table 16  17F
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: forms.totalAllowableLessInputTax,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [410, -5, 0, 0]
                        },
                    ]
                ]

            },
            // --------------------------------------------

        },
        // --------------------------------
        {
            //Table 17  18A and 18B     
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.purCapGoodsNotExceed,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, 5, 0, 0]
                        },
                        {
                            text: forms.outputCapGoodsNotExceed,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, 5, 0, 0]
                        },
                    ]
                ]

            }
        },
        // start--------------------------------
        {
            //Table 18  18C and 18D   
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.purCapGoodsExceed,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -3, 0, 0]
                        },
                        {
                            text: forms.outputPurCapGoodsExceed,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -3, 0, 0]
                        },
                    ]
                ]

            }
        },
        // end
        // start--------------------------------
        {
            //Table 19  18E and 18F   
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.domesticPurchaseGoods,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: forms.outputDomesticPurchaseGoods,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -4, 0, 0]
                        },
                    ]
                ]

            }
        },
        // end
        // start--------------------------------
        {
            //Table 20  18G and 18H   
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.importationGoods,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: forms.outputImportationGoods,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -4, 0, 0]
                        },
                    ]
                ]

            }
        },
        // end\
        // start--------------------------------
        {
            //Table 21  18I and 18J   
            layout: "noBorders",
            table: {
                widths: [385, 130,],
                body: [
                    [
                        {
                            text: forms.domesticPurchaseService,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },
                        {
                            text: forms.outputDomesticPurchaseService,
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, -5, 0, 0]
                        },
                    ]
                ]

            }
        },
        // end
// start--------------------------------
{
    //Table 22  18K and 18L   
    layout: "noBorders",
    table: {
        widths: [385, 130,],
        body: [
            [
                {
                    text: forms.servicesNonResidents,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -5, 0, 0]
                },
                {
                    text: forms.outputServicesNonResidents,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [17, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 23  18M    
    layout: "noBorders",
    table: {
        widths: [385, 130,],
        body: [
            [
                {
                    text: forms.purchaseNotQualified,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -5, 0, 0]
                },
                
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 24  18N and 18O   
    layout: "noBorders",
    table: {
        widths: [385, 130,],
        body: [
            [
                {
                    text: forms.purchaseOthers,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -5, 0, 0]
                },
                {
                    text: forms.outputPurchaseOthers,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [17, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 25  18P     
    layout: "noBorders",
    table: {
        widths: [385, 130,],
        body: [
            [
                {
                    text: forms.totalCurrentPurchases,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -4, 0, 0]
                },
                
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 26  19   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.totalAvailableInputTax,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 27  20A   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.inputTaxPurchaseCapGoods,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, 15, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 28  20B   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.inputTaxSaleToGovt,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 29  20C   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.inputTaxAllocableToExempt,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 30  20D   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.refundTcm,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 31  20E   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.otherDeductionFrInputTax,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 32  20F   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.totalDeductionFrInputTax,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 33  21   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.totalInputTax,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 34  22   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.taxDue,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 35  23A   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.creditableVatWithheld,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, 4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 36  23B   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.advPaySugarFlourInd,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 37  23C   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.taxWthld,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 38  23D   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.prevTaxPaid,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 39  23E   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.advPymt,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 40  23F   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.otherTaxCredits,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 42  23G   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.totalCredits,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -4, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 43  24   
    layout: "noBorders",
    table: {
        widths: [520, 130,],
        body: [
            [
               
                {
                    text: forms.amtPaybl,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [410, -5, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
{
    //Table 44  25 A B C D 
    layout: "noBorders",
    table: {
        widths: [160, 118,83,130],
        body: [
            [
               
                {
                    text: forms.surcharge,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [83, 5, 0, 0]
                },
                {
                    text: forms.interest,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [23, 5, 0, 0]
                },
                {
                    text: forms.compromise,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [13, 5, 0, 0]
                },
                {
                    text: forms.penalties,
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [22, 3, 0, 0]
                },
            ]
        ]

    }
},
// end
// start--------------------------------
// {
//     //Table 54  President Signature   
//     //layout: "noBorders",
//     table: {
//         widths: [310, 200,],
//         body: [
//             [
//                 {
//                     text: "Richard Aguilus Mulawin Gutierez  ",
//                     fontSize: 9,
//                     alignment: 'justify',
//                     // right,down,left,up
//                     margin: [80, 27, 0, 0]
//                 },
//                 {
//                     text: "Junex Mastermind",
//                     fontSize: 9,
//                     alignment: 'justify',
//                     // right,down,left,up
//                     margin: [40, 30, 0, 0]
//                 },
//             ]
//         ]

//     }
// },
// end

        )


    return content;
}

module.exports = {
    fillup
};
