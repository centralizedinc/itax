// const form = require("../templates/2550q_template").template;

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
        // images: {
        //     form: form
        // },
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

            widths: [90, 50],
            body: [
                [{
                    text: forms.yearended == true ? 'X' : ' ',
                    fontSize: 15,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [50, 58, 0, 0]
                },
                {
                    text: forms.yearended == false ? 'X' : ' ',
                    fontSize: 12,
                    // right,down,left,up
                    alignment: 'justify',
                    margin: [10, 58, 0, 0]
                },

                ],

            ]

        }
    },

        /////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [50, 100],
                body: [
                    [
                        {
                            text: forms.month ? forms.month : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [70, -10, 0, 0]
                        },
                        {
                            text: forms.year ? forms.year : ' ',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [40, -10, 0, 0]
                        },
                    ]
                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [50, 50, 50, 50],
                body: [
                    [
                        {
                            text: forms.quarter == 1 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [194, -33, 0, 0]
                        },
                        {
                            text: forms.quarter == 2 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [136, -18, 0, 0]
                        },
                        {
                            text: forms.quarter == 3 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [108, -33, 0, 0]
                        },
                        {
                            text: forms.quarter == 4 ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [50, -18, 0, 0]
                        },
                    ]
                ]
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [100, 300, 80, 80],
                body: [
                    [
                        {
                            text: forms.dateFiled1 && forms.dateFiled1.month ? forms.dateFiled1.month : '',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [330, -36, 0, 0]
                        },
                        {
                            text: forms.dateFiled1 && forms.dateFiled1.year ? forms.dateFiled1.year : '',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [240, -36, 0, 0]
                        },
                        {
                            text: forms.dateFiled1 && forms.dateFiled2.month ? forms.dateFiled2.month : '',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [-85, -24, 0, 0]
                        },
                        {
                            text: forms.dateFiled2 && forms.dateFiled1.year ? forms.dateFiled2.year : '',
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [-155, -25, 0, 0]
                        },
                    ]
                ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////       

        {
            layout: "noBorders",
            table: {

                widths: [90, 50],
                body: [
                    [{
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [442, -40, 0, 0]
                    },
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [345, -26, 0, 0]
                    },

                    ],

                ]

            }
        },

        //////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {

                widths: [90, 50],
                body: [
                    [{
                        text: forms.shortperiod == true ? 'X' : ' ',
                        fontSize: 15,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [510, -45, 0, 0]
                    },
                    {
                        text: forms.shortperiod == false ? 'X' : ' ',
                        fontSize: 12,
                        // right,down,left,up
                        alignment: 'justify',
                        margin: [412, -30, 0, 0]
                    },

                    ],

                ]

            }
        },
        /////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {

                widths: [100, 100, 100],
                body: [
                    [
                        {
                            text: forms.taxpayer.tin == null ? ' ' : forms.taxpayer.tin,
                            fontSize: 14,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [22, -17, 0, 0]
                        },
                        {
                            text: forms.taxpayer.tin1 == null ? ' ' : forms.taxpayer.tin1,
                            fontSize: 14,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [-47, -17, 0, 0]
                        },
                        {
                            text: forms.taxpayer.tin2 == null ? ' ' : forms.taxpayer.tin2,
                            fontSize: 14,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [-115, -17, 0, 0]
                        },
                    ],

                ]

            }
        },

        //////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {

                widths: [300],
                body: [
                    [
                        {
                            text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [227, -22, 0, 0]
                        },

                    ],

                ]

            }
        },

        ////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {

                widths: [400],
                body: [
                    [
                        {
                            text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                            fontSize: 15,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [326, -25, 0, 0]
                        },

                    ],

                ]

            }
        },
        /////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [
                        {
                            // 38 characters only
                            text: forms.taxpayer.line_business == null ? ' ' : forms.taxpayer.line_business,
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [410, -25, 0, 0]
                        }
                    ]
                ]
            }
        },
        //////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [
                        {
                            // 72 characters 
                            text: forms.taxpayer.taxpayer_name == null ? ' ' : forms.taxpayer.taxpayer_name,
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [14, -5, 0, 0]
                        },
                    ]
                ]
            }
        },

        ///////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [
                        {
                            text: forms.taxpayer.telephone_no == null ? ' ' : forms.taxpayer.telephone_no,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [420, -16, 0, 0]
                        }
                    ]
                ]
            }
        },

        ///////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [
                        {
                            // 72 characters
                            text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                            fontSize: 10,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [12, 6, 0, 0]
                        }
                    ]
                ]
            }
        },



        //////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [600,],
                body: [
                    [
                        {
                            text: forms.taxpayer.zip_code == null ? ' ' : forms.taxpayer.zip_code,
                            fontSize: 12,
                            // right,down,left,up
                            alignment: 'justify',
                            margin: [487, -17, 0, 0]
                        }
                    ]
                ]
            }
        },


        /////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [420, 100],
                body: [
                    [
                        {
                            text: forms.availing_tax_relief == true ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [124, 0, 0, 0],
                            alignment: 'justify'
                        }, {
                            text: forms.availing_tax_relief == false ? 'X' : ' ',
                            fontSize: 12,
                            // right,down,left,up
                            margin: [-262, 0, 0, 0],
                            alignment: 'justify'
                        },
                    ]
                ]
            }
        },

        ///////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [420],
                body: [
                    [
                        {
                            // 30 characters
                            text: forms.internationalTreatyYn,
                            fontSize: 12,
                            // right,down,left,up
                            margin: [285, -22, 0, 0],
                            alignment: 'justify'
                        }
                    ]
                ]
            }
        },

        //----------------------------------------------------------------------

        //15 Vatable Sales/Receipt-Privqte (Sch.1)
        {
            layout: "noBorders",
            table: {
                widths: [375, 135,],

                body: [
                    [
                        {
                            text: forms.totalAtcAmount ? forms.totalAtcAmount : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 8, 0, 0]
                        },
                        {
                            text: forms.totalAtcOutput ? forms.totalAtcOutput : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 8, 0, 0]
                        },
                    ]
                ]
            }
        },

        //--------------------------------------------------------
        // 16 Sale to Government
        {
            layout: "noBorders",
            table: {
                widths: [375, 135,],

                body: [
                    [
                        {
                            text: forms.salesGovAmount ? forms.salesGovAmount : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                        {
                            text: forms.salesGovOutput ? forms.salesGovOutput : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },





        //--------------------------------------------------------
        // 17 Zero Rated Sales/Receipts

        {
            layout: "noBorders",
            table: {
                widths: [375],

                body: [
                    [
                        {
                            text: forms.zeroRatedSales ? forms.zeroRatedSales : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },

                    ]
                ]
            }
        },

        //---------------------------------------------------------
        //18 Exempt Sales/Receipts
        {
            layout: "noBorders",
            table: {
                widths: [375],

                body: [
                    [
                        {
                            text: forms.exemptSales18 ? forms.exemptSales18 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },

                    ]
                ]
            }
        },

        //---------------------------------------------------------
        //19 Total Sales/Receipts and Output Tax Due
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.totalSales19a ? forms.totalSales19a : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.totalSales19b ? forms.totalSales19b : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },

        //--------------------------------------------------------
        //20 Less Allowable input tax
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.inputTaxcarried ? forms.inputTaxcarried : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 3, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.inputTaxdeferred ? forms.inputTaxdeferred : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.transitionalInputtax ? forms.transitionalInputtax : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.presumptiveInputtax ? forms.presumptiveInputtax : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -3, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.others ? forms.others : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.totalSum ? forms.totalSum : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        //---------------------------------------------------------
        //21 Current Transactions
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.purCapgoodsa ? forms.purCapgoodsa : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 3, 0, 0]
                        },
                        {
                            text: forms.purCapgoodsb ? forms.purCapgoodsb : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 3, 0, 0]
                        },
                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.purCapgoodsc ? forms.purCapgoodsc : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                        {
                            text: forms.purCapgoodsd ? forms.purCapgoodsd : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.domesticPursere ? forms.domesticPurserf : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.domesticPurserf ? forms.domesticPurserf : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.domesticPursere ? forms.importationCapgoodsg : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.domesticPurserf ? forms.importationCapgoodsh : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.domesticPursere ? forms.domPurservicei : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.domesticPurserf ? forms.domPurservicej : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.servicesRenderedk ? forms.servicesRenderedl : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.servicesRenderedk ? forms.servicesRenderedl : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375],

                body: [
                    [
                        {
                            text: forms.purNotqualified ? forms.purNotqualifie : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375, 135],

                body: [
                    [
                        {
                            text: forms.servicesRenderedk ? forms.othersn : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                        {
                            text: forms.servicesRenderedk ? forms.otherso : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [375],

                body: [
                    [
                        {
                            text: forms.sumItems ? forms.sumItems : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.sumItems22 ? forms.sumItems22 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.inputTaxpurcapital23 ? forms.inputTaxpurcapital23 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 12, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.inputTaxonsalegov ? forms.inputTaxonsalegov : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.inputTaxallocable ? forms.inputTaxallocable : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.vatRefundclaimed ? forms.vatRefundclaimed : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.others23 ? forms.others23 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.totalSum23 ? forms.totalSum23 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.totalAllowable24 ? forms.totalAllowable24 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.totalNetvatpay ? forms.totalNetvatpay : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.monthlyVatpaytwo ? forms.monthlyVatpaytwo : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,lef


                            margin: [0, 4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.credVattaxwithheld ? forms.credVattaxwithheld : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.advancePaysugar ? forms.advancePaysugar : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.vatwithheldSalestogov ? forms.vatwithheldSalestogov : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.vatpaidReturnprevfiled ? forms.vatpaidReturnprevfiled : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -7, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.advancePaymade ? forms.advancePaymade : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.others26G ? forms.others26G : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -4, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.sum26h ? forms.sum26h : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.tax ? forms.tax : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -6, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [160],

                body: [
                    [
                        {
                            text: forms.surcharge ? forms.surcharge : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 5, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [266],

                body: [
                    [
                        {
                            text: forms.interest ? forms.interest : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -14, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [376],

                body: [
                    [
                        {
                            text: forms.compromise ? forms.compromise : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -18, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.a28D ? forms.a28D : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -25, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [518],

                body: [
                    [
                        {
                            text: forms.sum29 ? forms.sum29 : '0.00',
                            fontSize: 9,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -15, 0, 0]
                        },
                    ]
                ]
            }
        },



        //---------------------------------------------------------
        {
            layout: "noBorders",
            table: {
                widths: [25, 30, 100, 30, 310],
                body: [
                    [
                        //{
                        //         text: forms.categoryOfAgent == true ? 'X' : ' ',
                        //         fontSize: 12,
                        //         // right,down,left,up
                        //         margin: [13, 6, 0, 0],
                        //         alignment: 'justify'

                        //     },
                        //     {
                        //         text: forms.categoryOfAgent == false ? 'X' : ' ',
                        //         fontSize: 12,
                        //         // right,down,left,up
                        //         margin: [28, 6, 0, 0],
                        //         alignment: 'justify'
                        //     },
                        // {
                        //     text: forms.availing_tax_relief == true ? 'X' : ' ',
                        //     fontSize: 12,
                        //     // right,down,left,up
                        //     margin: [85, 6, 0, 0],
                        //     alignment: 'justify'
                        // }, {
                        //     text: forms.availing_tax_relief == false ? 'X' : ' ',
                        //     fontSize: 12,
                        //     // right,down,left,up
                        //     margin: [20, 6, 0, 0],
                        //     alignment: 'justify'
                        // },

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

export default {
    fillup
};