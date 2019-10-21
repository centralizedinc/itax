const form = require("../templates/1600wp_template").template;

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
                heights: [80],
                body: [
                    [{
                        text: "",

                    }, ],

                ]
            }
        },
        //#1 for the period MM/DD/YYYY
        {
            layout: "noBorders",
            table: {
                widths: [22, 24, 48, 26, 20, 60, 30, 30, 60, 30, 20, 30, 30],
                body: [
                    [
                        //fromPeriod month
                        {
                            text: formatDate(forms.fromPeriod, {
                                month: "2-digit"
                            }),

                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, 0, 0, 0]
                        },
                        //fromPeriod day     
                        {
                            text: formatDate(forms.fromPeriod, {
                                day: "2-digit"
                            }),

                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        //fromPeriod year
                        {
                            text: formatDate(forms.fromPeriod, {
                                year: "numeric"
                            }),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        //toPeriod month
                        {
                            text: formatDate(forms.toPeriod, {
                                month: "2-digit"
                            }),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [8, 0, 0, 0]
                        },
                        //toPeriod day
                        {
                            text: formatDate(forms.toPeriod, {
                                day: "2-digit"
                            }),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        //toPeriod year
                        {
                            text: formatDate(forms.toPeriod, {
                                year: "numeric"
                            }),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        //#2 amended return?
                        // amended_yn true
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [10, 0, 0, 0]
                        },
                        // amended_yn false
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 0, 0, 0]
                        },
                        //#3 no. of sheets attached
                        // space
                        {
                            text: "",
                        },
                        //No. of Sheets Attached
                        {
                            text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 4,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [3, 0, 0, 0]

                        },
                        //space
                        {
                            text: "",
                        },
                        // #4 any taxes withheld?
                        // any taxes withheld? true
                        {
                            text: forms.taxes_withheld == true ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [8, 0, 0, 0]
                        },
                        // any taxes withheld? false             
                        {
                            text: forms.taxes_withheld == false ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [10, 0, 0, 0]
                        },

                    ]
                ]
            }
        },
        // ----> end of table #1 <---- //

        //table space
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [9],
                body: [
                    [{
                        text: "",

                    }, ],

                ]
            }
        },



        // ----> table # 2 <--- //

        // #5 tin
        {
            layout: "noBorders",
            table: {
                widths: [50, 50, 45, 59, 60, 60, 45, 40],
                body: [
                    [{
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [15, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [12, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [8, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [10, 0, 0, 0]
                        },
                        {
                            text: "",

                        },
                        // #6 rdo code
                        {
                            text: forms.taxpayer.rdo_code,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [16, 0, 0, 0]
                        },
                        // #7 category of withoutholding agent true
                        {
                            text: forms.taxpayer.category_withholding_agent == true ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [27, 5, 0, 0]
                        },
                        // #7 category of withoutholding agent false
                        {
                            text: forms.taxpayer.category_withholding_agent == false ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [26, 5, 0, 0]
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
                widths: [530],
                heights: [11],
                body: [
                    [
                        // #8 withholding agent's name
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [7, 5, 0, 0]
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
                widths: [470, 58],
                heights: [10],
                body: [
                    [
                        // #9 registered address    
                        {
                            text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [6, 8, 0, 0]
                        },
                        // #10 zip code
                        {
                            text: forms.taxpayer.zip_code,
                            fontSize: 15,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [8, 8, 0, 0]
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
                widths: [120, 45, 40, 46, 245],
                heights: [18],
                body: [
                    [
                        //     
                        {
                            text: "",
                        },
                        {
                            text: forms.availing_tax_relief == true ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [12, 5, 0, 0]
                        },
                        // any taxes withheld? false             
                        {
                            text: forms.availing_tax_relief == false ? 'X' : ' ',
                            fontSize: 15,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [13, 5, 0, 0]
                        },
                        {
                            text: "",
                        },
                        {
                            text: forms.internationalTreatyYn == null ? ' ' : forms.internationalTreatyYn,
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [12, 3, 0, 0]
                        },
                    ]
                ]
            }
        },

        // ----> end of table #5 <---- //
        // ---->  table #6  <---- //
        {
            layout: "noBorders",
            table: {
                widths: [532],
                heights: [18],
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
                widths: [532],
                heights: [15],
                body: [
                    [
                        //WB191
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
                widths: [532],
                heights: [11],
                body: [
                    [
                        //WB192
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
                widths: [532],
                heights: [13],
                body: [
                    [
                        //WB193
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
                widths: [532],
                heights: [10],
                body: [
                    [
                        //WB194
                        {
                            text: "",
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
                            text: forms.taxpayer.required_withheld_and_remitted ? forms.taxpayer.required_withheld_and_remitted : '0.00',
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
                            text: forms.taxpayer.less_tax_remitted ? forms.taxpayer.less_tax_remitted : '0.00',
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
                            text: forms.taxpayer.tax_still_due ? forms.taxpayer.tax_still_due : '0.00',
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

                            text: forms.taxpayer.surcharge ? forms.taxpayer.surcharge : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]

                        },
                        //15B
                        {

                            text: forms.taxpayer.interest ? forms.taxpayer.interest : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]

                        },
                        //15C
                        {

                            text: forms.taxpayer.compromise ? forms.taxpayer.compromise : '0.00',
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
                            text: forms.taxpayer.taxrequiredtobewithheld ? forms.taxpayer.taxrequiredtobewithheld : '0.00',
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
                            text: forms.taxpayer.taxrequiredtobewithheld16 ? forms.taxpayer.taxrequiredtobewithheld16 : '0.00',
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
                            text: formatDate(forms.frommPeriod, {
                                month: "2-digit"
                            }),

                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-3, 0, 0, 0]
                        },
                        //fromPeriod day     
                        {
                            text: formatDate(forms.frommPeriod, {
                                day: "2-digit"
                            }),

                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-8, 0, 0, 0]
                        },
                        //                 //fromPeriod year
                        {
                            text: formatDate(forms.frommPeriod, {
                                year: "numeric"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-9, 0, 0, 0]
                        },
                        //tooPeriod month
                        {
                            text: formatDate(forms.tooPeriod, {
                                month: "2-digit"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-2, 0, 0, 0]
                        },
                        //toPeriod day
                        {
                            text: formatDate(forms.tooPeriod, {
                                day: "2-digit"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-8, 0, 0, 0]
                        },
                        //toPeriod year
                        {
                            text: formatDate(forms.tooPeriod, {
                                year: "numeric"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-10, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [26, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [5, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-2, 0, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [-1, 0, 0, 0]
                        },
                          // #16 withholding agent's name
                          {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [17, 0, 0, 0]
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