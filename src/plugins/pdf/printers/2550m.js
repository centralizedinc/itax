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
                            text: forms.is_avail_tax_relief == true ? 'X' : ' ',
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [210, 3, 0, 0]
                        },
                        {
                            text: forms.is_avail_tax_relief == false ? 'X' : ' ',
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [23, 3, 0, 0]
                        },
                        {
                            text: forms.avail_tax_relief == null ? ' ' : forms.avail_tax_relief,
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
            //Table 6 12A 12B Vatable Sales
            layout: "noBorders",
            table: {
                widths: [385, 132],

                body: [
                    [
                        {
                            text: forms.totalAtcAmount ? forms.totalAtcAmount : '0.00',
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
            //Table 7  13A 13B Sales to Goverment
            layout: "noBorders",
            table: {
                widths: [385, 132,],
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
                widths: [385, 132,],
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
                            text: forms.carriedOverPreviousPeriod == null ? '0.00' : forms.carriedOverPreviousPeriod % 1 == 0 ? forms.carriedOverPreviousPeriod + '.00' : forms.carriedOverPreviousPeriod,
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
                widths: [385, 132,],
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
                widths: [385, 132,],
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
                widths: [385, 132,],
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
                widths: [385, 132,],
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
                widths: [385, 132,],
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
                widths: [385, 132,],
                body: [
                    [
                        {
                            text: forms.servicesNonResidents == null ? '0.00' : forms.servicesNonResidents % 1 == 0 ? forms.servicesNonResidents + '.00' : forms.servicesNonResidents,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [270, -6, 0, 0]
                        },
                        {
                            text: forms.outputServicesNonResidents == null ? '0.00' : forms.outputServicesNonResidents % 1 == 0 ? forms.outputServicesNonResidents + '.00' : forms.outputServicesNonResidents,
                            alignment: 'right',
                            fontSize: 9,
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
                            text: forms.purchaseNotQualified == null ? '0.00' : forms.purchaseNotQualified % 1 == 0 ? forms.purchaseNotQualified + '.00' : forms.purchaseNotQualified,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [385, 133,],
                body: [
                    [
                        {
                            text: forms.purchaseOthers == null ? '0.00' : forms.purchaseOthers % 1 == 0 ? forms.purchaseOthers + '.00' : forms.purchaseOthers,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },
                        {
                            text: forms.outputPurchaseOthers == null ? '0.00' : forms.outputPurchaseOthers % 1 == 0 ? forms.outputPurchaseOthers + '.00' : forms.outputPurchaseOthers,
                            alignment: 'right',
                            fontSize: 9,
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
            //Table 25  18P     
            layout: "noBorders",
            table: {
                widths: [385, 132,],
                body: [
                    [
                        {
                            text: forms.totalCurrentPurchases == null ? '0.00' : forms.totalCurrentPurchases % 1 == 0 ? forms.totalCurrentPurchases + '.00' : forms.totalCurrentPurchases,
                            alignment: 'right',
                            fontSize: 9,
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
            //Table 26  19   
            layout: "noBorders",
            table: {
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.totalAvailableInputTax == null ? '0.00' : forms.totalAvailableInputTax % 1 == 0 ? forms.totalAvailableInputTax + '.00' : forms.totalAvailableInputTax,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.inputTaxPurchaseCapGoods == null ? '0.00' : forms.inputTaxPurchaseCapGoods % 1 == 0 ? forms.inputTaxPurchaseCapGoods + '.00' : forms.inputTaxPurchaseCapGoods,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [410, 16, 0, 0]
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.inputTaxSaleToGovt == null ? '0.00' : forms.inputTaxSaleToGovt % 1 == 0 ? forms.inputTaxSaleToGovt + '.00' : forms.inputTaxSaleToGovt,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.inputTaxAllocableToExempt == null ? '0.00' : forms.inputTaxAllocableToExempt % 1 == 0 ? forms.inputTaxAllocableToExempt + '.00' : forms.inputTaxAllocableToExempt,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.refundTcm == null ? '0.00' : forms.refundTcm % 1 == 0 ? forms.refundTcm + '.00' : forms.refundTcm,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.otherDeductionFrInputTax == null ? '0.00' : forms.otherDeductionFrInputTax % 1 == 0 ? forms.otherDeductionFrInputTax + '.00' : forms.otherDeductionFrInputTax,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.totalDeductionFrInputTax == null ? '0.00' : forms.totalDeductionFrInputTax % 1 == 0 ? forms.totalDeductionFrInputTax + '.00' : forms.totalDeductionFrInputTax,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.totalInputTax == null ? '0.00' : forms.totalInputTax % 1 == 0 ? forms.totalInputTax + '.00' : forms.totalInputTax,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.taxDue == null ? '0.00' : forms.taxDue % 1 == 0 ? forms.taxDue + '.00' : forms.taxDue,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.creditableVatWithheld == null ? '0.00' : forms.creditableVatWithheld % 1 == 0 ? forms.creditableVatWithheld + '.00' : forms.creditableVatWithheld,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.advPaySugarFlourInd == null ? '0.00' : forms.advPaySugarFlourInd % 1 == 0 ? forms.advPaySugarFlourInd + '.00' : forms.advPaySugarFlourInd,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.taxWthld == null ? '0.00' : forms.taxWthld % 1 == 0 ? forms.taxWthld + '.00' : forms.taxWthld,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.prevTaxPaid == null ? '0.00' : forms.prevTaxPaid % 1 == 0 ? forms.prevTaxPaid + '.00' : forms.prevTaxPaid,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.advPymt == null ? '0.00' : forms.advPymt % 1 == 0 ? forms.advPymt + '.00' : forms.advPymt,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.otherTaxCredits == null ? '0.00' : forms.otherTaxCredits % 1 == 0 ? forms.otherTaxCredits + '.00' : forms.otherTaxCredits,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.totalCredits == null ? '0.00' : forms.totalCredits % 1 == 0 ? forms.totalCredits + '.00' : forms.totalCredits,
                            alignment: 'right',
                            fontSize: 9,
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
                widths: [525, 130,],
                body: [
                    [

                        {
                            text: forms.amtPaybl == null ? '0.00' : forms.amtPaybl % 1 == 0 ? forms.amtPaybl + '.00' : forms.amtPaybl,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [410, -6, 0, 0]
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
                widths: [165, 118, 83, 135],
                body: [
                    [

                        {
                            text: forms.surcharge == null ? '0.00' : forms.surcharge % 1 == 0 ? forms.surcharge + '.00' : forms.surcharge,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [83, 4, 0, 0]
                        },
                        {
                            text: forms.interest == null ? '0.00' : forms.interest % 1 == 0 ? forms.interest + '.00' : forms.interest,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [23, 5, 0, 0]
                        },
                        {
                            text: forms.compromise == null ? '0.00' : forms.compromise % 1 == 0 ? forms.compromise + '.00' : forms.compromise,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [13, 5, 0, 0]
                        },
                        {
                            text: forms.penalties == null ? '0.00' : forms.penalties % 1 == 0 ? forms.penalties + '.00' : forms.penalties,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [22, 3, 0, 0]
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
                widths: [165],
                body: [
                    [

                        {
                            text: forms.totalAmountPayable == null ? '0.00' : forms.surcharge % 1 == 0 ? forms.surcharge + '.00' : forms.surcharge,
                            alignment: 'right',
                            fontSize: 9,
                            // right,down,left,up
                            margin: [83, 4, 0, 0]
                        }
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
        //                     text: "Testing",
        //                     fontSize: 9,
        //                     alignment: 'justify',
        //                     // right,down,left,up
        //                     margin: [80, 27, 0, 0]
        //                 },
        //                 {
        //                     text: "Testing",
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
