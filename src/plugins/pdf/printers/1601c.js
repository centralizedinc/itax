const form = require("../templates/1601c_template").template;

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

                    }, ],

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
                            text: forms.any_tax_withheld == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [15, 5, 0, 0]
                        },
                        // any taxes withheld? false             
                        {
                            text: forms.any_tax_withheld == false ? 'X' : ' ',
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
                            text: forms.atc == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [93, 1, 0, 0]
                        },


                        {
                            text: forms.atc == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [75, 1, 0, 0]
                        },

                        {
                            text: forms.categoryofwithholding_agent == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [93, 1, 0, 0]
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
                            text: forms.loc_property == null ? ' ' : forms.loc_property,
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
                    text: forms.area_sold_sqm == null ? ' ' : forms.area_sold_sqm,
                    fontSize: 9,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [22,4, 0, 0]


                },{
                    text: forms.tax_doc_no == null ? ' ' : forms.tax_doc_no,
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
                    text: forms.tct == null ? ' ' : forms.tct,
                    fontSize: 9,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [19,-4, 0, 0]


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
//#18 does selling price cover
{
    // layout: "noBorders",
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
                        text: forms.category_of_agent == true ? 'X' : ' ',
                        fontSize: 13,
                        bold: true,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [3, 1, 0, 0]
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
                {
                    text: ""
                },
                {
                    text: ""
                },
                {
                    text: ""
                }


            ]
        ]
    }

},

        // ----> end of table #5 <---- //
        // ---->  table #6  <---- //
        {
            layout: "noBorders",
            table: {
                widths: [533],
                heights: [21],
                body: [
                    [
                        //space               
                        {
                            text: "",
                        },

                    ]
                ]
            }
        },

        // ---->  end of table #6  <---- //
        // ---->  table space #7, #8, #9, #10, #11 <---- //
        {
            layout: "noBorders",
            table: {
                widths: [320, 60, 50, 76],
                heights: [3],
                body: [
                    [
                        //WB191 //space
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                        },
                        //space
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
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
            table: {
                widths: [320, 60, 50, 76],
                heights: [11],
                body: [
                    [
                        //WB192
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
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
            table: {
                widths: [320, 60, 50, 76],
                heights: [6],
                body: [
                    [
                        //WB193
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
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
            table: {
                widths: [320, 60, 50, 76],
                heights: [6],
                body: [
                    [
                        //WB194
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            text: "0.00",
                            fontSize: 9,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 3, 0, 0]
                        },

                    ]
                ]
            }
        },
        // ---->  end of table space #7, #8, #9, #10, #11  <---- //
        // ----> table #12 <---- //
        {
            layout: "noBorders",
            table: {
                widths: [430, 105],
                heights: [6],
                body: [
                    [

                        {
                            text: "",
                        },
                        // #12 tax required to be withheld and remitted
                        {
                            text: forms.tax_req_withld_remtd ? forms.tax_req_withld_remtd : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 0, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [430, 105],
                heights: [6],
                body: [
                    [

                        {
                            text: "",
                        },
                        // #13 less: tax remitted in return previously filed, if this is an amended return
                        {
                            text: forms.less_tax_remtd_retrn ? forms.less_tax_remtd_retrn : '0.00',
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
        {
            layout: "noBorders",
            table: {
                widths: [430, 105],
                heights: [8],
                body: [
                    [
                        //space
                        {
                            text: "",
                        },
                        //#14
                        {
                            text: forms.tax_due ? forms.tax_due : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [2, -2, 0, 0]
                        },
                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [532],
                heights: [4],
                body: [
                    [

                        {
                            text: "",
                        },

                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [45, 105, 111, 110, 32, 100],
                heights: [8],
                body: [
                    [
                        //space
                        {
                            text: "",
                        },
                        //15A
                        {

                            text: forms.surcharge ? forms.surcharge : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]

                        },
                        //15B
                        {

                            text: forms.interest ? forms.interest : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]

                        },
                        //15C
                        {

                            text: forms.compromise ? forms.compromise : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]

                        },
                        //space
                        {
                            text: "",
                        },
                        //15D
                        {
                            text: forms.penalties ? forms.penalties : '0.00',
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
            table: {
                widths: [435, 100],
                heights: [7],
                body: [
                    [
                        //space
                        {
                            text: "",
                        },
                        //16
                        {
                            text: forms.total_amount_payable ? forms.total_amount_payable : '0.00',
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
        {
            layout: "noBorders",
            table: {
                widths: [157, 92, 70],
                heights: [14],
                body: [
                    [
                        //space
                        {
                            text: "",
                        },
                        //true #16 refunded
                        {
                            text: forms.taxpayer.overremittance == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [3, 3, 0, 0]
                        },
                        // false #16 to be issued
                        {
                            text: forms.taxpayer.overremittance == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [1, 3, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [12],
                body: [
                    [
                        //space
                        {
                            text: "",
                        },

                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [19, 15, 35, 21, 15, 35, 50, 35, 28, 40, 140],
                heights: [8],
                body: [
                    [

                        //frommPeriod month
                        {
                            text: formatDate(forms.start_month, {
                                month: "2-digit"
                            }),

                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-3, 1, 0, 0]
                        },
                        //fromPeriod day     
                        {
                            text: formatDate(forms.start_month, {
                                day: "2-digit"
                            }),

                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-8, 1, 0, 0]
                        },
                        //                 //fromPeriod year
                        {
                            text: formatDate(forms.start_month, {
                                year: "numeric"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-9, 1, 0, 0]
                        },
                        //tooPeriod month
                        {
                            text: formatDate(forms.end_month, {
                                month: "2-digit"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-2, 1, 0, 0]
                        },
                        //toPeriod day
                        {
                            text: formatDate(forms.end_month, {
                                day: "2-digit"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-8, 1, 0, 0]
                        },
                        //toPeriod year
                        {
                            text: formatDate(forms.end_month, {
                                year: "numeric"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-10, 1, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [26, 1, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [5, 1, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-2, 1, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-1, 1, 0, 0]
                        },
                        // #16 withholding agent's name
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, 1, 0, 0]
                        },

                    ]
                ]
            }
        },


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