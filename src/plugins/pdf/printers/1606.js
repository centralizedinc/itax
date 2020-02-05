// const form = require("../templates/1606_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details printer: " + JSON.stringify(details))
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
    var content = [
        // ----> table #1 <---- //
        //table space
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [45],
                body: [
                    [{
                        text: "",

                    },],

                ]
            }
        },
        //date of transaction MM/DD/YYYY
        {
            layout: "noBorders",
            table: {
                widths: [80, 28, 17, 50, 25, 40, 30, 40, 35, 25, 25],
                body: [
                    [{
                        text: ""
                    },
                    //fromPeriod month
                    {
                        text: formatDate(forms.start_month, {
                            month: "2-digit"
                        }),

                        fontSize: 13,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [10, 0, 0, 0]
                    },
                    //fromPeriod day     
                    {
                        text: formatDate(forms.start_month, {
                            day: "2-digit"
                        }),

                        fontSize: 13,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                    },
                    //fromPeriod year
                    {
                        text: formatDate(forms.start_month, {
                            year: "numeric"
                        }),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                    },



                    //#2 amended return?
                    // amended_yn true
                    {
                        text: forms.amended_yn == true ? 'X' : ' ',
                        fontSize: 13,
                        bold: true,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [13, 4, 0, 0]
                    },
                    // amended_yn false
                    {
                        text: forms.amended_yn == false ? 'X' : ' ',
                        fontSize: 13,
                        bold: true,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [13, 5, 0, 0]
                    },
                    //#3 no. of sheets attached
                    // space
                    {
                        text: "",
                    },
                    //No. of Sheets Attached
                    {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [15, 5, 0, 0]

                    },
                    //space
                    {
                        text: "",
                    },
                    // #4 any taxes withheld?
                    // any taxes withheld? true
                    {
                        text: forms.taxes_withheld == true ? 'X' : ' ',
                        fontSize: 13,
                        bold: true,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [15, 5, 0, 0]
                    },
                    // any taxes withheld? false             
                    {
                        text: forms.taxes_withheld == false ? 'X' : ' ',
                        fontSize: 13,
                        bold: true,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [20, 5, 0, 0]
                    },

                    ]
                ]
            }
        },
        // ----> end of table #1 <---- //

        //table space
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [530],
        //         heights: [9],
        //         body: [
        //             [{
        //                 text: "",

        //             }, ],

        //         ]
        //     }
        // },



        // ----> table # 2 <--- //

        // #5 tin buyer
        {
            layout: "noBorders",
            table: {
                widths: [63, 32, 30, 33, 27, 46, 50, 32, 28, 28, 21, 40],
                body: [
                    [{
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [35, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [2, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 12),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 7, 0, 0]
                    },
                    {
                        text: "",

                    },
                    // #6 rdo code buyer
                    {
                        text: forms.taxpayer.rdo_code,
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 7, 0, 0]
                    },
                    // #7 category of withoutholding agent true
                    // {
                    //     text: forms.category_of_agent == true ? 'X' : ' ',
                    //     fontSize: 15,
                    //     bold: true,
                    //     // right,down,left,up
                    //     alignment: 'left',
                    //     margin: [1, 5, 0, 0]
                    // },
                    // #7 category of withoutholding agent false
                    // {
                    //     text: forms.category_of_agent == false ? 'X' : ' ',
                    //     fontSize: 15,
                    //     bold: true,
                    //     // right,down,left,up
                    //     alignment: 'left',
                    //     margin: [1, 5, 0, 0]
                    // },
                    // #7 tin seller
                    {
                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [22, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [2, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 7, 0, 0]
                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 12),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 2,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 7, 0, 0]
                    },

                    {
                        text: "",
                    },
                    //#8 RDO seller
                    {
                        text: forms.taxpayer.rdo_code,
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [9, 7, 0, 0]
                    },
                    ],
                ]
            }
        },

        // ----> end of table #2 <---- //

        // ----> table #3 <---- //
        {
            layout: "noBorders",
            table: {
                widths: [265, 250],
                heights: [7],
                body: [
                    [
                        // #9 buyer's name
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [7, 8, 0, 0]
                        },
                        //#10 seller's name
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [7, 8, 0, 0]
                        },

                    ]
                ]
            }
        },
        // ----> end of table #3 <---- //

        // ----> table #4 <---- //
        {
            layout: "noBorders",
            table: {
                widths: [524],
                heights: [5],
                body: [
                    [

                        {
                            text: ""
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [265, 250],
                heights: [4],
                body: [
                    [
                        // #11 buyers registered address    
                        {
                            text: forms.address == null ? ' ' : forms.address,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [5, 1, 0, 0]
                        },
                        // #12 sellers registered address
                        {
                            text: forms.address == null ? ' ' : forms.address,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [3, 1, 0, 0]
                        },
                    ]
                ]
            }
        },
        // ----> end of table #4 <---- //
        // ----> table #5 <---- //
        {
            layout: "noBorders",
            table: {
                widths: [120, 80, 130, 30, 20, 30, 30],
                heights: [10],
                body: [
                    [
                        //#13 ATC

                        {
                            text: forms.atc_code == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [93, 1, 0, 0]
                        },


                        {
                            text: forms.atc_code == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [75, 1, 0, 0]
                        },

                        {
                            text:""
                        },
                        //category

                        {
                            text: ""
                        },
                        //#14
                        {
                            text: forms.category_of_agent == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [3, 1, 0, 0]
                        },

                        {
                            text: ""
                        },
                        {
                            text: forms.category_of_agent == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [8, 1, 0, 0]
                        },

                    ]
                ]
            }
        },



        //#15 classification of property
        {
            layout: "noBorders",
            table: {
                widths: [50, 70, 70, 300],
                heights: [1],
                body: [
                    [
                        //residential
                        {
                            layout: "noBorders",
                            table: {

                                widths: [50],
                                body: [
                                    [{



                                        text: forms.classification_property == 'RES' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 7,
                                        alignment: 'left',
                                        margin: [40, -1, 0, 0]

                                    },


                                    ],
                                    [
                                        //agricultural
                                        {


                                            text: forms.classification_property == 'AGR' ? 'X' : ' ',
                                            bold: true,
                                            fontSize: 8,
                                            alignment: 'left',
                                            margin: [40, -2, 0, 0]


                                        },


                                    ]

                                ]
                            }


                        },
                        //commercial
                        {
                            layout: "noBorders",
                            table: {

                                widths: [100],
                                body: [
                                    [{



                                        text: forms.classification_property == 'COM' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 7,
                                        alignment: 'left',
                                        margin: [65, -1, 0, 0]

                                    },


                                    ],
                                    [
                                        //industrial
                                        {


                                            text: forms.classification_property == 'IND' ? 'X' : ' ',
                                            bold: true,
                                            fontSize: 8,
                                            alignment: 'left',
                                            margin: [65, -2, 0, 0]


                                        },


                                    ]

                                ]
                            }


                        },
                        //condominum residential 
                        {
                            layout: "noBorders",
                            table: {

                                widths: [70, 70],
                                body: [
                                    [{



                                        text: forms.classification_property == 'CONR' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 7,
                                        alignment: 'left',
                                        margin: [67, -1, 0, 0]

                                    },


                                    ],
                                    [
                                        //condominum commercial
                                        {


                                            text: forms.classification_property == 'CONC' ? 'X' : ' ',
                                            bold: true,
                                            fontSize: 8,
                                            alignment: 'left',
                                            margin: [67, -2, 0, 0]


                                        },


                                    ]

                                ]
                            }


                        },

                        {
                            layout: "noBorders",
                            table: {

                                widths: [295],
                                body: [
                                    [{




                                        text: forms.plsspecify == null ? ' ' : forms.plsspecify,
                                        fontSize: 12,
                                        bold: true,
                                        characterSpacing: 3,
                                        alignment: 'justify',
                                        // right,down,left,up
                                        margin: [180, -2, 0, 0]


                                    },


                                    ],


                                ]
                            }


                        },

                    ]
                ]
            }

        },
        //#16 location of property

        {
            layout: "noBorders",
            table: {
                widths: [70, 440],
                heights: [1],
                body: [
                    [
                        //space
                        {
                            text: ""
                        },
                        {
                            text: forms.location_property == null ? ' ' : forms.location_property,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [22, -3, 0, 0]


                        },


                    ]
                ]
            }

        },
        //#17 brief description of the property

        {
            layout: "noBorders",
            table: {
                widths: [200, 130, 100],
                heights: [1],
                body: [
                    [
                        //space
                        {
                            text: ""
                        },
                        {
                            text: forms.area_sold == null ? ' ' : forms.area_sold,
                            fontSize: 9,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [22, 4, 0, 0]


                        }, {
                            text: forms.tax_dec_no == null ? ' ' : forms.tax_dec_no,
                            fontSize: 9,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [22, 4, 0, 0]


                        },


                    ]
                ]
            }

        },
        //#17 continue
        {
            layout: "noBorders",
            table: {
                widths: [70, 130, 130, 160],
                heights: [1],
                body: [
                    [
                        //space
                        {
                            text: ""
                        },
                        {
                            text: forms.tct_no == null ? ' ' : forms.tct_no,
                            fontSize: 9,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [19, -4, 0, 0]


                        },
                        //spaces
                        {
                            text: ""
                        },
                        {
                            text: forms.others == null ? ' ' : forms.others,
                            fontSize: 9,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [15, -4, 0, 0]


                        },


                    ]
                ]
            }

        },
        //#18 does selling price cover and //#19 Are you availing of tax relief
        {
            layout: "noBorders",
            table: {
                widths: [90, 40, 40, 50, 40, 40, 165
                ],
                heights: [20],
                body: [
                    [
                        //space
                        {
                            text: ""
                        },

                        {
                            text: forms.selling_price_property == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [30, 7, 0, 0]
                        },

                        {
                            text: forms.selling_property == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [19, 7, 0, 0]

                        },
                        {
                            text: forms.selling_property1 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [39, 7, 0, 0]


                        },
                        {
                            text: forms.selling_property1 == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [13, 6, 0, 0]
                        },
                        //space
                        {
                            text: ""
                        },
                        {




                            text: forms.plsspecifyy == null ? ' ' : forms.plsspecifyy,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [22, 5, 0, 0]

                        }


                    ]
                ]
            }

        },
        //#20
        {
            layout: "noBorders",
            table: {
                widths: [50, 70, 70, 300],
                heights: [1],
                body: [
                    [
                        //cash
                        {
                            layout: "noBorders",
                            table: {

                                widths: [50],
                                body: [
                                    [{



                                        text: forms.description_transaction == 'CAS' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 9,
                                        alignment: 'left',
                                        margin: [13, 5, 0, 0]

                                    },


                                    ],
                                    [
                                        //Exempt
                                        {


                                            text: forms.description_transaction == 'EXE' ? 'X' : ' ',
                                            bold: true,
                                            fontSize: 9,
                                            alignment: 'left',
                                            margin: [13, -5, 0, 0]


                                        },


                                    ]

                                ]
                            }


                        },
                        //foreclosure sale
                        {
                            layout: "noBorders",
                            table: {

                                widths: [100],
                                body: [
                                    [{



                                        text: forms.description_transaction == 'FOR' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 9,
                                        alignment: 'left',
                                        margin: [47, 14, 0, 0]

                                    },


                                    ],
                                    [
                                        //installment
                                        {


                                            text: forms.description_transaction == 'INS' ? 'X' : ' ',
                                            bold: true,
                                            fontSize: 9,
                                            alignment: 'left',
                                            margin: [-45, -4, 0, 0]


                                        },


                                    ]

                                ]
                            }


                        },
                        //others
                        {
                            layout: "noBorders",
                            table: {

                                widths: [70, 70],
                                body: [
                                    [{



                                        text: forms.description_transaction == 'OTH' ? 'X' : ' ',
                                        bold: true,
                                        fontSize: 9,
                                        alignment: 'left',
                                        margin: [-30, 24, 0, 0]

                                    },


                                    ],
                                    [
                                        //condominum commercial
                                        {


                                            // text: forms.transaction_payment == 'CONC' ? 'X' : ' ',
                                            // bold: true,
                                            // fontSize: 8,
                                            // alignment: 'left',
                                            // margin: [67, -2, 0, 0]
                                            text: forms.description_transaction_specify == null ? ' ' : forms.description_transaction_specify,
                                            fontSize: 12,
                                            bold: true,
                                            characterSpacing: 3,
                                            alignment: 'justify',
                                            // right,down,left,up
                                            margin: [-130, 14, 0, 0]

                                        },


                                    ]

                                ]
                            }


                        },

                        {
                            layout: "noBorders",
                            table: {

                                widths: [304],
                                heights: [5],
                                body: [
                                    [
                                        {

//#21
                                            text: forms.selling_price ? forms.selling_price : '0.00',
                                            fontSize: 10,
                                            bold: true,
                                            alignment: 'right',
                                            // right,down,left,up
                                            margin: [1, 2, 0, 0]


                                        },



                                    ],
                                    [{
                                        //#22
                                        text: forms.cost_exp ? forms.cost_exp : '0.00',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'right',
                                        // right,down,left,up
                                        margin: [1, -4, 0, 0]
                                    },],

                                    [{
                                        //#23
                                        text: forms.mor_assumed ? forms.mor_assumed : '0.00',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'right',
                                        // right,down,left,up
                                        margin: [1, -6, 0, 0]
                                    },],
                                    [{
                                        //24
                                        text: forms.payment_inYear ? forms.payment_inYear : '0.00',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'right',
                                        // right,down,left,up
                                        margin: [1, -6, 0, 0]
                                    },],
                                    [{
                                        //#25
                                        text: forms.amount_inst ? forms.amount_inst : '0.00',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'right',
                                        // right,down,left,up
                                        margin: [1, -5, 0, 0]
                                    },],
                                    [{
                                        //#26
                                        text: forms.total_contract ? forms.total_contract : '0.00',
                                        fontSize: 10,
                                        bold: true,
                                        alignment: 'right',
                                        // right,down,left,up
                                        margin: [1, -3, 0, 0]
                                    },],
                                ]
                            }


                        },

                    ]
                ]
            }

        },

        {
            layout: "noBorders",
            //#27A
            table: {
                widths: [77, 174, 100, 145],
                heights: [13],
                body: [
                    [

                        {
//#27A
                            text: forms.tax_declaration_land == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 8, 0, 0]
                        },
                        {
//#27A
                            text: forms.A277 ? forms.A277 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 10, 0, 0]

                        },
//#27C
                        {
                            text: forms.C27 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [12, 6, 0, 0]
                        },
                       //#27C
                        {
                        text: forms.C277 ? forms.C277 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 9, 0, 0]

                        },

                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#27B
            table: {
                widths: [70, 30, 144, 20, 40, 176],
                heights: [13],
                body: [
                    [
                        //space               
                        {
//#27B
                            text: forms.B27 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, -2, 0, 0]
                        },
                        //space
                        {

                            text: "",

                        },
                        //#27B
                        {
                            text: forms.B277 ? forms.B277 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [5, -3, 0, 0]
                            
                        },
                        {
                            //#27D
                            text: forms.D27 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'right',
                            margin: [1, -3, 0, 0]
                            // text: "D",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            //27D
                            text: forms.D277 ? forms.D277 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [10, -4, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#28A
            table: {
                widths: [70, 30, 145, 30, 40, 165],
                heights: [20],
                body: [
                    [
                        //space               
                        {
//#28A
                            text: forms.A28 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 4, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            //#28A
                            text: forms.A288 ? forms.A288 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [4, 9, 0, 0]
                        },
                        {
                            //#28D
                            text: forms.D28 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [10, 6, 0, 0]
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            //#28D
                            text: forms.D288 ? forms.D288 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 8, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#28B
            table: {
                widths: [100, 153, 50, 30, 30, 118],
                heights: [13],
                body: [
                    [
                                      
                        {

                            //#28B
                            text: forms.B28 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, -8, 0, 0]
                        },
                        {
                            text: forms.B288 ? forms.B288 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 4, 0, 0]
                        },
                        {
                            text: forms.E28 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 3, 0, 0]
                            
                        },
                        {
                            text:""
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.E288 == null ? ' ' : forms.E288,
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                            
                        },


                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            //#28C
            table: {
                widths: [70, 30, 145, 30, 81, 125],
                heights: [17],
                body: [
                    [
                        //space               
                        {
                            text: forms.C28 == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 6, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            text: forms.C288 ? forms.C288: '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 5, 0, 0]
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: forms.D2888 ? forms.D2888: '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            text: forms.D28888 ? forms.D28888: '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#29
            table: {
                widths: [70, 30, 140, 30, 40, 170],
                heights: [13],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: forms.estate == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [113, -9, 0, 0]
                        },
                        {
                            text: forms.estate == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [10, -9, 0, 0]
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },


                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            //#30
            table: {
                widths: [70, 30, 140, 30, 40, 160],
               heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.taxbase ? forms.taxbase : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]
                        },


                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            //#31
            table: {
                widths: [70, 30, 140, 30, 40, 160],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.taxrate ? forms.taxrate : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -5, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#32
            table: {
                widths: [70, 30, 140, 30, 40, 160],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.taxreq ? forms.taxreq: '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -5, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#33
            table: {
                widths: [70, 30, 140, 30, 40, 160],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.taxpaid ? forms.taxpaid : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -5, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            //#34
            table: {
                widths: [70, 30, 140, 30, 40, 160],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.taxstill ? forms.taxstill : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -5, 0, 0]
                        },


                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            //#35
            table: {
                widths: [115, 106, 100, 165],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: forms.A35 ? forms.A35 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1,2, 0, 0]
                        },
                        {
                            text: forms.B35 ? forms.B35 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1,2, 0, 0]
                        },
                        {
                            text: forms.C35 ? forms.C35 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1,2, 0, 0]
                        },
                      
                        {
                            text: forms.D35 ? forms.D35 : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [5,2, 0, 0]
                        },


                    ]
                ]
            }
        },

        {
            layout: "noBorders",
            //#36
            table: {
                widths: [70, 30, 140, 30, 40, 160],
                heights:[8],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },
                        {
                            text: forms.astildue == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [87, 6, 0, 0]
                        },
                        {
                            text: forms.astildue == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [151, 5, 0, 0]
                        },
                        {
                            text: "",
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: forms.totalamountdue ? forms.totalamountdue : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },


                    ]
                ]
            }
        },


        // ---->  end of table #6  <---- //
        // ---->  table space #7, #8, #9, #10, #11 <---- //
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [320, 60, 50, 76],
        //         heights: [3],
        //         body: [
        //             [
        //                 //WB191 //space
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [320, 60, 50, 76],
        //         heights: [11],
        //         body: [
        //             [
        //                 //WB192
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [320, 60, 50, 76],
        //         heights: [6],
        //         body: [
        //             [
        //                 //WB193
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },
        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [320, 60, 50, 76],
        //         heights: [6],
        //         body: [
        //             [
        //                 //WB194
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },
        //                 {
        //                     text: "",
        //                 },
        //                 {
        //                     text: "0.00",
        //                     fontSize: 9,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 3, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // ---->  end of table space #7, #8, #9, #10, #11  <---- //
        // ----> table #12 <---- //
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [430, 105],
        //         heights: [6],
        //         body: [
        //             [

        //                 {
        //                     text: "",
        //                 },
        //                 // #12 tax required to be withheld and remitted
        //                 {
        //                     text: forms.tax_req_withld_remtd ? forms.tax_req_withld_remtd : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 0, 0, 0]
        //                 },
        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [430, 105],
        //         heights: [6],
        //         body: [
        //             [

        //                 {
        //                     text: "",
        //                 },
        //                 // #13 less: tax remitted in return previously filed, if this is an amended return
        //                 {
        //                     text: forms.less_tax_remtd_retrn ? forms.less_tax_remtd_retrn : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, -2, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [430, 105],
        //         heights: [8],
        //         body: [
        //             [
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 //#14
        //                 {
        //                     text: forms.tax_due ? forms.tax_due : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [2, -2, 0, 0]
        //                 },
        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [532],
        //         heights: [4],
        //         body: [
        //             [

        //                 {
        //                     text: "",
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [45, 105, 111, 110, 32, 100],
        //         heights: [8],
        //         body: [
        //             [
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 //15A
        //                 {

        //                     text: forms.surcharge ? forms.surcharge : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 1, 0, 0]

        //                 },
        //                 //15B
        //                 {

        //                     text: forms.interest ? forms.interest : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 1, 0, 0]

        //                 },
        //                 //15C
        //                 {

        //                     text: forms.compromise ? forms.compromise : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 1, 0, 0]

        //                 },
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 //15D
        //                 {
        //                     text: forms.penalties ? forms.penalties : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, 1, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [435, 100],
        //         heights: [7],
        //         body: [
        //             [
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 //16
        //                 {
        //                     text: forms.total_amount_payable ? forms.total_amount_payable : '0.00',
        //                     fontSize: 10,
        //                     bold: true,
        //                     alignment: 'right',
        //                     // right,down,left,up
        //                     margin: [1, -2, 0, 0]
        //                 },


        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [157, 92, 70],
        //         heights: [14],
        //         body: [
        //             [
        //                 //space
        //                 {
        //                     text: "",
        //                 },
        //                 //true #16 refunded
        //                 {
        //                     text: forms.taxpayer.overremittance == true ? 'X' : ' ',
        //                     fontSize: 13,
        //                     bold: true,
        //                     // right,down,left,up
        //                     alignment: 'left',
        //                     margin: [3, 3, 0, 0]
        //                 },
        //                 // false #16 to be issued
        //                 {
        //                     text: forms.taxpayer.overremittance == false ? 'X' : ' ',
        //                     fontSize: 13,
        //                     bold: true,
        //                     // right,down,left,up
        //                     alignment: 'left',
        //                     margin: [1, 3, 0, 0]
        //                 },


        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [530],
        //         heights: [12],
        //         body: [
        //             [
        //                 //space
        //                 {
        //                     text: "",
        //                 },

        //             ]
        //         ]
        //     }
        // },
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [19, 15, 35, 21, 15, 35, 50, 35, 28, 40, 140],
        //         heights: [8],
        //         body: [
        //             [

        //                 //frommPeriod month
        //                 {
        //                     text: formatDate(forms.start_month, {
        //                         month: "2-digit"
        //                     }),

        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-3, 1, 0, 0]
        //                 },
        //                 //fromPeriod day     
        //                 {
        //                     text: formatDate(forms.start_month, {
        //                         day: "2-digit"
        //                     }),

        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-8, 1, 0, 0]
        //                 },
        //                 //                 //fromPeriod year
        //                 {
        //                     text: formatDate(forms.start_month, {
        //                         year: "numeric"
        //                     }),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-9, 1, 0, 0]
        //                 },
        //                 //tooPeriod month
        //                 {
        //                     text: formatDate(forms.end_month, {
        //                         month: "2-digit"
        //                     }),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-2, 1, 0, 0]
        //                 },
        //                 //toPeriod day
        //                 {
        //                     text: formatDate(forms.end_month, {
        //                         day: "2-digit"
        //                     }),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-8, 1, 0, 0]
        //                 },
        //                 //toPeriod year
        //                 {
        //                     text: formatDate(forms.end_month, {
        //                         year: "numeric"
        //                     }),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 4,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-10, 1, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 0, 3),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [26, 1, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 3, 6),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [5, 1, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 6, 9),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-2, 1, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 9, 12),
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 5,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [-1, 1, 0, 0]
        //                 },
        //                 // #16 withholding agent's name
        //                 {
        //                     text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
        //                     fontSize: 10,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'justify',
        //                     // right,down,left,up
        //                     margin: [17, 1, 0, 0]
        //                 },

        //             ]
        //         ]
        //     }
        // },


        // #5 tin
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [50, 50, 45, 59, 60, 60, 45, 40],
        //         body: [
        //             [{
        //                     text: mapTin(forms.taxpayer.tin, 0, 3),
        //                     fontSize: 15,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [15, 0, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 3, 6),
        //                     fontSize: 15,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [12, 0, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 6, 9),
        //                     fontSize: 15,
        //                     bold: true,
        //                     characterSpacing: 3,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [8, 0, 0, 0]
        //                 },
        //                 {
        //                     text: mapTin(forms.taxpayer.tin, 9, 12),
        //                     fontSize: 15,
        //                     bold: true,
        //                     characterSpacing: 5,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [10, 0, 0, 0]
        //                 },
        //                 {
        //                     text: "",

        //                 },
        //table 2 amendded
        //   {
        // layout: "noBorders",
        //     table: {
        //         widths: [100,100],
        //         body: [
        //             [
        //                 {
        //                     text: forms.amended_yn == true ? 'X' : ' ',
        //                     fontSize: 15,
        //                     // right,down,left,up
        //                     alignment: 'justify',
        //                     margin: [0, 0, 0, 0]
        //                 },
        //                 {
        //                     text: forms.amended_yn == false ? 'X' : ' ',
        //                     fontSize: 12,
        //                     // right,down,left,up
        //                     alignment: 'justify',
        //                     margin: [0, 0, 0, 0]
        //                 },




        //             ],
        //         ]
        //     }
        // },










        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [100,100,100],
        //         body: [
        //             [
        //              //---> 1.> toPeriod month

        //             {
        //                 text: formatDate(forms.toPeriod, { month: "2-digit" }),
        //                 fontSize: 14,
        //                 characterSpacing: 3,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [-48, 85, 0, 0]
        //             },
        //              //---> 1.> toPeriod day                    

        //             {
        //                 text: formatDate(forms.toPeriod, { day: "2-digit" }),
        //                 fontSize: 14,
        //                 characterSpacing: 3,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [-80, 85, 0, 0]
        //             },
        //             //---> 1.> toPeriod year

        //             {
        //                 text: formatDate(forms.toPeriod, { year: "numeric" }),
        //                 fontSize: 14,
        //                 characterSpacing: 4,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [-40, -21, 0, 0]
        //             },
        //             ],
        //         ]
        //     }
        // },

        //-----------------------------------------------------------------------//

        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [50, 50],
        //         body: [
        //             [

        // //---> 1.> fromPeriod month

        //             {
        //                     text: formatDate(forms.fromPeriod, { month: "2-digit" }), 
        //                     fontSize: 15,
        //                     characterSpacing: 3,
        //                     akignment: 'justify',
        //                     // right,down,left,up
        //                     margin: [4,85 , 0, 0]
        //             },

        // //---> 1.> fromPeriod day     

        //             {
        //                 text: formatDate(forms.fromPeriod, { day: "2-digit" }), 
        //                 fontSize: 15,
        //                 characterSpacing: 3,
        //                 akignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [-27, 85, 0, 0]
        //             },


        //                     ],

        //                 ]
        //             }
        //         },





        // {
        //     //Table 3 Taxpayer
        //     layout: "noBorders",
        //     table: {
        //         widths: [395, 120],
        //         body: [
        //             [{
        //                 text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
        //                 fontSize: 12,
        //                 characterSpacing: 2.5,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [10, 15, 0, 0]
        //             },
        //             {
        //                 text: forms.taxpayer.contact_details.telno == null ? ' ' : forms.taxpayer.contact_details.telno,
        //                 fontSize: 11,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [40, 9, 0, 0]
        //             },
        //             ]
        //         ]
        //     }
        // },
        // ------------------------------------------
        // {
        //     //Table 4 Registered Address
        //     layout: "noBorders",
        //     table: {
        //         widths: [395, 120],
        //         body: [
        //             [{
        //                 text: forms.taxpayer.address == null || forms.taxpayer.address == '' ? ' ' : forms.taxpayer.address,
        //                 fontSize: 11,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [16, 8, 0, 0]
        //             },
        //             {
        //                 text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == '' ? ' ' : forms.taxpayer.address_details.zipCode,
        //                 fontSize: 11,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [84, 7, 0, -30]
        //             },
        //             ]
        //         ]
        //     }
        // },



        // Table 2
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [50,50],
        //         body: [
        //             [
        //                 {
        //                     text: forms.amended_yn == true ? 'X' : ' ',
        //                     fontSize: 15,
        //                     alignment: 'justify',
        //                     // right,down,left,up
        //                     margin: [258, -4, 0, 0]
        //                 },
        //                 {
        //                     text: forms.amended_yn == false ? 'X' : ' ',
        //                     fontSize: 15,
        //                     alignment: 'justify',
        //                     // right,down,left,up
        //                     margin: [239, -4, 0, 0]
        //                 },
        //             ],
        //         ]
        //     }
        // },
        // table 3
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [60, 30, 50, 60, 150, 236],
        //         body: [
        //             [{
        //                 text: mapTin(forms.taxpayer.tin, 0, 3),
        //                 fontSize: 14,
        //                 characterSpacing: 3,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [14,63, 0, 0]
        //             },
        //             {
        //                 text: mapTin(forms.taxpayer.tin, 3, 6),
        //                 fontSize: 14,
        //                 characterSpacing: 3,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [3, 63, 0, 0]
        //             },
        //             {
        //                 text: mapTin(forms.taxpayer.tin, 6, 9),
        //                 fontSize: 14,
        //                 characterSpacing: 2.8,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [20,63, 0, 0, 0]
        //             },
        //             {
        //                 text: mapTin(forms.taxpayer.tin, 9, 12),
        //                 fontSize: 14,
        //                 characterSpacing: 2.5,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [23, 63, 0, 0]
        //             },
        //             {
        //                 text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
        //                 fontSize: 14,
        //                 characterSpacing: 8.2,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [84, 63, 0, 0]
        //             },
        //             {
        //                 text: forms.taxpayer.line_of_business == null ? ' ' : forms.taxpayer.line_of_business,
        //                 fontSize: 13,
        //                 alignment: 'justify',
        //                 // right,down,left,up
        //                 margin: [118, 9, 0, 0]
        //             }
        //             ],



        //         ]
        //     }
        // },
        // table 4





    ]
    return content;
}

function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return "";
    return tin.substring(from, to);
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

export default {
    fillup
};