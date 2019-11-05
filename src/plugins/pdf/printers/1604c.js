const form = require("../templates/1604c_template").template;

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
                heights: [75],
                body: [
                    [{
                        text: "",

                    },],

                ]
            }
        },
        //1# For the Year 20YY
        {
            layout: "noBorders",
            table: {
                widths: [80, 75, 50, 50, 35, 40, 80
                    , 36, 40],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: formatDate(forms.start_month, {
                                year: "numeric"
                            }),
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 10,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [3, 3, 0, 0]
                        },

                        //space

                        {
                            text: "",

                        },
                        //#2 amended return?
                        // amended_yn true
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [32, 4, 0, 0]
                        },
                        // amended_yn false
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [25, 4, 0, 0]
                        },

                        {

                            text: ""
                        },

                        {
                            text: "",
                        },

                        {
                            text: ""
                        },
                        //#3 Number of Sheet/s Attached
                        {
                            text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 8,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [8, 5, 0, 0]
                        },

                    ]
                ]
            }
        },
//Taxpayer TIN
        {
            layout: "noBorders",
            table: {
                widths: [170, 50, 50, 50, 77, 60, 40],
                heights: [36],
                body: [
                    [{
                        text: ""
                    },
                    {

                        text: mapTin(forms.taxpayer.tin, 0, 3),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 5,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [15, 16, 0, 0]

                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 3, 6),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 5,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [15, 16, 0, 0]

                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 6, 9),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 5,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [15, 16, 0, 0]

                    },
                    {
                        text: mapTin(forms.taxpayer.tin, 9, 12),
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 5,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [15, 16, 0, 0]

                    },
                    // #5 rdo code buyer
                    {
                        text: ""
                    },

                    {

                        text: forms.taxpayer.rdo_code,
                        fontSize: 13,
                        bold: true,
                        characterSpacing: 4,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [4, 16, 0, 0]
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
                widths: [265],
                heights: [7],
                body: [
                    [
                        // #6 Agent's Names
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [1, 8, 0, 0]
                        },

                    ]
                ]
            }
        },
        // ----> end of table #3 <---- //

        // ----> table #4 <---- //
        // {
        //     // layout: "noBorders",
        //     table: {
        //         widths: [524],
        //        heights: [0],
        //         body: [
        //             [

        //                 {
        //                   text:" "
        //                 },


        //             ]
        //         ]
        //     }
        // },
        {
            layout: "noBorders",
            table: {
                widths: [524],
                heights: [30],
                body: [
                    [

                        {
                            text: forms.taxpayer.registered_address == null ? ' ' : forms.taxpayer.registered_address,
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [1, 13, 0, 0]
                        },


                    ]
                ]
            }
        },
        {
            layout: "noBorders",
            table: {
                widths: [265, 200, 70],
                heights: [15],
                body: [
                    [

                        {
                            text: " "

                        },

                        {
                            // text: forms.address == null ? ' ' : forms.address,

                            text: " "
                        },
                        {

                            text: forms.taxpayer.zip_code,
                            fontSize: 11,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [12, 1, 0, 0]
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
                widths: [116, 50, 40, 30, 20, 180, 20],
                heights: [10],
                body: [
                    [


                        {
                            text: ""
                        },


                        {

                            text: forms.category_of_agent == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [6, 1, 0, 0]
                        },

                        {
                            text: forms.category_of_agent == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [12, 1, 0, 0]
                        },


                        {
                            text: ""
                        },

                        {
                            text: ""
                        },

                        {
                            text: forms.top_withholding_agent == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [154, 1, 0, 0]

                        },
                        {
                            text: forms.top_withholding_agent == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [16, 1, 0, 0]
                        },

                    ]
                ]
            }
        },



        {
            layout: "noBorders",
            table: {
                widths: [130, 400],
                heights: [30],
                body: [
                    [

                        {

                            text: forms.taxpayer.contact,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [6, 15, 0, 0]
                        },
                        {


                            text: forms.taxpayer.email,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, 13, 0, 0]


                        },


                    ]
                ]
            }

        },


        {
            //#11
            layout: "noBorders",
            table: {
                widths: [200, 140, 95, 21, 50],
                heights: [1],
                body: [
                    [

                        {
                            text: forms.is_refund_released == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [167, 4, 0, 0]
                        },
                        {
                            text: forms.is_refund_released == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [6, 4, 0, 0]

                        },

                        //fromPeriod month
                        {
                            text: formatDate(forms.date_of_refund, {
                                month: "2-digit"
                            }),

                            fontSize: 13,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [75, 0, 0, 0]
                        },
                        //fromPeriod day     
                        {
                            text: formatDate(forms.date_of_refund, {
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
                            text: formatDate(forms.date_of_refund, {
                                year: "numeric"
                            }),
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, 0, 0, 0]
                        },





                    ]
                ]
            }

        },

        {
            //#12
            layout: "noBorders",
            table: {
                widths: [95, 240, 200],
                heights: [10],
                body: [
                    [


                        {
                            text: ""
                        },

                        {
                            text: formatAmount(forms.total_overremittance_amount),
                            fontSize: 13,
                            bold: true,

                            characterSpacing: 8,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 1, 0, 0]
                        },

                        {
                            //1
                            // text: forms.start_monthe ? forms.start_monthe : '00',
                            text: formatDate(forms.overremittance_first_crediting_month, {
                                month: "2-digit"
                            }),
                            fontSize: 13,
                            bold: true,
                            alignment: 'left',
                            characterSpacing: 5,
                            // right,down,left,up
                            margin: [170, 1, 0, 0]


                        },



                    ]
                ]
            }

        },
        {
            layout: "noBorders",
            table: {
                widths: [70, 130, 130, 160],
                heights: [29],
                body: [
                    [

                        {
                            text: " "
                        },
                        {
                            text: " "

                        },

                        {
                            text: " "
                        },
                        {
                            text: " "


                        },


                    ]
                ]
            }

        },
        {
            layout: "noBorders",
            table: {
                widths: [35, 125, 120, 115, 110],
                body: [
                    [

                        {
                            text: " "
                        },
                        //1
                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, 2, 0, 0]

                        },
                        //1
                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, 2, 0, 0]
                        },
                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, 2, 0, 0]


                        },
                        {
                            //1
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, 2, 0, 0]


                        },


                    ]
                ]
            }

        },

        {
            layout: "noBorders",
            table: {
                widths: [35, 125, 120, 115, 110],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]

                        },

                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]


                        },
                        {
                            //2
                            text: forms.a ? forms.a : '0.00',
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
            table: {
                widths: [35, 125, 120, 115, 110],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //3
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //3
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //3
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //3
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //4
                            text: "",
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]

                        },

                        {
                            //4
                            text: "",
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            //4
                            text: "",
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]


                        },
                        {
                            //4
                            text: forms.a ? forms.a : '0.00',
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
            table: {
                widths: [35, 125, 120, 115, 110],
                heights: [9],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //5
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //5
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //5
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //5
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //6
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //6
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //6
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //6
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //7
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //7
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //7
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //7
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //8
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //8
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //9
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //10
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //10
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //10
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //10
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //11
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //11
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //11
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //11
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //12
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //12
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //12
                            text: '',
                            fontSize: 10,
                            bold: true,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]


                        },
                        {
                            //12
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 125, 120, 115, 110],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            text: ""

                        },

                        {
                            text: ""
                        },
                        {
                            text: ""


                        },
                        {
                            //13
                            text: forms.a ? forms.a : '0.00',
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
            //spacer
            table: {
                widths: [35, 125, 120, 115, 110],
                heights: [25],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            text: ""

                        },

                        {
                            text: ""
                        },
                        {
                            text: ""


                        },
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
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            //1
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]
                        },

                        {
                            //1
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]
                        },
                        {
                            //1
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]


                        },



                    ]
                ]
            }

        },
        {
            layout: "noBorders",
            table: {
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //2
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //2
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //2
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //3
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //3
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //3
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //4
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //4
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //4
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //5
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]

                        },

                        {
                            //5
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            //5
                            text: forms.a ? forms.a : '0.00',
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
            table: {
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //6
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]

                        },

                        {
                            //6
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            //6
                            text: forms.a ? forms.a : '0.00',
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
            table: {
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //7
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]

                        },

                        {
                            //7
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]
                        },
                        {
                            //7
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]


                        },


                    ]
                ]
            }

        },
        {
            layout: "noBorders",
            table: {
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //8
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //8
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //8
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //9
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]

                        },

                        {
                            //9
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]
                        },
                        {
                            //9
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -1, 0, 0]


                        },


                    ]
                ]
            }

        },
        {
            layout: "noBorders",
            table: {
                widths: [35, 160, 160, 160],
                heights: [7],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //10
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]

                        },

                        {
                            //10
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -3, 0, 0]
                        },
                        {
                            //10
                            text: forms.a ? forms.a : '0.00',
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
            table: {
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //11
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //11
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //11
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //12
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //12
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //12
                            text: forms.a ? forms.a : '0.00',
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
                widths: [35, 160, 160, 160],
                heights: [8],
                body: [
                    [

                        {
                            text: ""
                        },
                        {
                            //total
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]

                        },

                        {
                            //total
                            text: forms.a ? forms.a : '0.00',
                            fontSize: 10,
                            bold: true,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -2, 0, 0]
                        },
                        {
                            //total
                            text: forms.a ? forms.a : '0.00',
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