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
                widths: [535],
                heights: [55],
                body: [
                    [{
                        text: "",

                    }, ],

                ]
            }
        },
///////////////////////////// ---> Table 1  <--- ///////////////////////////////
        //date of transaction MM/YYYY
        {
            layout: "noBorders",
            table: {
                widths: [25, 75 , 54, 40, 34, 58, 83, 104,],
                body: [
                    [
                        //fromPeriod month
                        {
                            text: formatDate(forms.start_month, {
                                month: "2-digit"
                            }),

                            fontSize: 13,
                            bold: true,
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [10, 6, 0, 0]
                        },
                        // //fromPeriod day     
                        // {
                        //     text: formatDate(forms.start_month, {
                        //         day: "2-digit"
                        //     }),

                        //     fontSize: 13,
                        //     bold: true,
                        //     characterSpacing: 3,
                        //     alignment: 'left',
                        //     // right,down,left,up
                        //     margin: [1, 6, 0, 0]
                        // },
                        //fromPeriod year
                        {
                            text: formatDate(forms.start_month, {
                                year: "numeric"
                            }),
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [6, 6, 0, 0]
                        },

                        //#2 amended return?
                        // amended_yn true
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [26, 11, 0, 0]
                        },
                        // amended_yn false
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [11, 12, 0, 0]
                        },
                        // #3 any taxes withheld?
                        // any taxes withheld? true
                        {
                            text: forms.any_tax_withheld == true ? 'X' : ' ',
                            fontSize: 11,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [35, 13, 0, 0]
                        },
                        // any taxes withheld? false             
                        {
                            text: forms.any_tax_withheld == false ? 'X' : ' ',
                            fontSize: 11,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [33, 13, 0, 0]
                        },
                        //#4 no. of sheets attached
                       {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 11,
                        bold: true,
                        characterSpacing: 7,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [69, 10, 0, 0]
                    
                        },
                        // space 5. ATC
                        {
                            text: "",
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



//////////////////////// ----> table # 2 <--- ////////////////////////////////

        // #6 Taxpayer identification #7 Rdo Code
        {
            layout: "noBorders",
            table: {
                widths: [170, 44, 45, 51, 75, 105,],
                heights: [10,],
                body: [
                    [
                        //6.Tax Payers Identification Tin//
                        // space
                        {
                            text: "",
                        },

                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [16, 10, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [21, 10, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [24, 10, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [23, 10, 0, 0]
                        },
                        
                        // #7 Rdo Code 
                        {
                            text: forms.taxpayer.rdo_code,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [79, 10, 0, 0]
                        },
                        ////////// ----> End Table 2 <----- //////////
                    ]]
                }
            },
 //////////////////////////// ------> Table 3 <------ ///////////////////////////                       
///////// #8 Witholding Agent's Name 
              
        {
            layout: "noBorders",
            table: {
                widths: [535, ],
                heights: [8,],
                body: [
                    [
                        // # witholding agents name
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [8, 8, 0, 0]
                        },
                        
                    ]
                ]
            }
        },
//////////////////////// ----> end of table #3 <---- ////////////////////////////

////////////////////////// ----> table #4 <---- /////////////////////////////////
/////////////// #9 Registered Address       
{
    layout: "noBorders",
    table: {
        widths: [535,],
        heights: [17,],
        body: [
            [
                // #9 registered address    
                {
                    text: forms.address == null ? ' ' : forms.address,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 2,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [2, 9, 0, 0]
                },
                
            ]
        ]
    }
},

        /////////////////////// --> End table 4 <-- ///////////////////
        //////////////////// -----> table 5 Registered Address2 //////////////////
        {
            layout: "noBorders",
            table: {
                widths: [400, 126 ],
                heights: [10,],
                body: [
                    [
                        // space
                        {
                            text: "",
                        },
                        // #11 registered address2
                        // {
                        //     text: forms.address == null ? ' ' : forms.address,
                        //     fontSize: 10,
                        //     bold: true,
                        //     characterSpacing: 3,
                        //     alignment: 'justify',
                        //     // right,down,left,up
                        //     margin: [5, 1, 0, 0]
                        // },
                        // #9A ZIP code
                        {
                            text: forms.taxpayer.zip_code == null ? ' ' : forms.taxpayer.zip_code,
                            fontSize: 11,
                            bold: true,
                            characterSpacing: 4,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [82, -1, 0, 0]
                        },
                    ]
                ]
            }
        },
        ///////////////////////// ----> end of table #5 <---- ////////////////
////////////////////////////// ----> table #6 <---- /////////////////////////////////
/////////// #10 contact number #11 category of witholding agent       
{
            layout: "noBorders",
            table: {
                widths: [52, 160, 150,50,87,],
                heights: [7,],
                body: [
                    [
                        //#10 contact number
                        {
                            text: ""
                        },

                        {
                            text: forms.taxpayer.contact_details.telno == null ? ' ' : forms.taxpayer.contact_details.telno,
                            fontSize: 11,
                            characterSpacing: 2,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [20 , 0, 0, 0]
                        },
                        {
                            text: ""
                        },
                        //#11category witholding
                        {
                            text: forms.category_of_agent == true ? 'X' : ' ',
                            fontSize: 10,
                            characterSpacing: 2,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [16, 4, 0, 0]
                        },
                        
                        {
                            text: forms.category_of_agent == false ? 'X' : ' ',
                            fontSize: 10,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [28.5, 4, 0, 0]
                        },

                    ]
                ]
            }
        },

///////////////////////////////////////// End of table 6 ////////////////////////////////
//////////////////// table 7 /////////////////////////////
{
    layout: "noBorders",
    table: {
        widths: [535],
        heights: [7],
        body: [
            [
                // #12 Email Address 
                {
                    text: forms.taxpayer.contact_details.email,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 2,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [66, -2, 0, 0]
                },
                
            ]
        ]
    }
},
/////////////////////////// End table 7//////////////////////////
//////////////////////// Table 8///////////////////////////////////////
{
    layout: "noBorders",
    table: {
        widths: [120, 30, 37, 80, 232 ],
        heights: [4],
        body: [
            [
                //////////#13 tax relief
                {
                    text: ""
                },
                {
                    text: forms.is_avail_tax_relief == true ? 'X' : ' ',
                    fontSize: 10,
                    bold: true,
                    // right,down,left,up
                    alignment: 'left',
                    margin: [7, 5, 0, 0]
                },
                
                {
                    text: forms.is_avail_tax_relief == false ? 'X' : ' ',
                    fontSize: 10,
                    bold: true,
                    // right,down,left,up
                    alignment: 'left',
                    margin: [11.5, 5, 0, 0]
                },
                {
                    text: ""
                },
                {
                    text: forms.avail_tax_relief == null ? ' ' : forms.avail_tax_relief,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [8, 1, 0, 0]
                },
            ]  
        ]
    }
},


//////////////////////// End table 8 ////////////////////////

//////////////////////////////////////////////////////////////////////////// Part II - Computation of Tax  
{
    //#14 Total Amount of Compensation 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: [20,],
        body: [
            [

                {
                    text: formatAmount(forms.compensation),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8,
                    // right,down,left,up
                    margin: [3, 15, 3, 0],
                }
            ]
        ]

    }
},

{
    //#15 Statutory Minimum Wage 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: [16,],
        body: [
            [

                {
                    text: formatAmount(forms.statutory_minimum_wage),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8,
                    // right,down,left,up
                    margin: [0, 10, 2, 0]
                }
            ]
        ]

    }
},

{
    //#16 Holiday Pay, Overtime 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: [9,],
        body: [
            [

                {
                    text: formatAmount(forms.hazard_pay),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8,
                    // right,down,left,up
                    margin: [0, 2, 2, 0]
                }
            ]
        ]

    }
},

{
    //#17 13th Month Pay 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: [10],
        body: [
            [

                {
                    text: formatAmount(forms.other_benefits),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8, 
                    // right,down,left,up
                    margin: [0,2, 3, 0]
                }
            ]
        ]

    }
},


{
    //#18 De Minimis Benefits 
   layout: "noBorders",
    table: {
        widths: [535],
        heights: 9,
        body: [
            [

                {
                    text: formatAmount(forms.minimis_benefits),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8,
                    // right,down,left,up
                    margin: [0, 2, 3, 0]
                }
            ]
        ]

    }
},
{
    //#19 SSS, GSIS 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 9,
        body: [
            [

                {
                    text: formatAmount(forms.mandatory_contribution),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 3, 3, 0]
                }
            ]
        ]

    }
},

{
    //#20 Other Non Taxable Compensation
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 9,
        body: [
            [

                {
                    text: formatAmount(forms.other_taxable_compensation),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0, 3, 0]
                }
            ]
        ]

    }
},


{
    //#21 Total non taxable compensation
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 9,
        body: [
            [

                {
                    text: formatAmount(forms.non_taxable_compensation),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0, 3, 0]
                }
            ]
        ]

    }
},

{
    //#22 Total taxable compensation 
    layout: "noBorders",
    table: {
        widths: [535],
        heigts: 12,
        body: [
            [

                {
                    text: formatAmount(forms.total_taxable_compensation),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0, 3, 0]
                }
            ]
        ]

    }
},

{
    //#23 Less: Taxable compensation 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 8,
        body: [
            [

                {
                    text: formatAmount(forms.less_taxable_compensation ),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0, 3, 0]
                }
            ]
        ]

    }
},

{
    //#24 Net Taxable compensation 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 8,
        body: [
            [

                {
                    text: formatAmount(forms.net_taxable_required),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 3, 3, 0]
                }
            ]
        ]

    }
},

{
    //#25 Total tax witheld 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 8,
        body: [
            [

                {
                    text: formatAmount(forms.total_taxes_witheld),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 3, 3, 0]
                }
            ]
        ]

    }
},

{
    //#26 Add/(less): Adjustment of taxes 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 8,
        body: [
            [

                {
                    text: formatAmount(forms.adjustment),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 1, 2, 0]
                }
            ]
        ]

    }
},

{
    //#27 taxes witheld remittance 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 9,
        body: [
            [

                {
                    text: formatAmount(forms.tax_required_remittance),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 2, 3, 0]
                }
            ]
        ]

    }
},

{
    //#28 Less: tax remitted return 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.tax_remitted_previously),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0, 2, 0]
                }
            ]
        ]

    }
},
{
    //#29 Other remittance made 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.other_payments_made),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 0,3, 0]
                }
            ]
        ]

    }
},

{
    //#30 Total tax remittance
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.total_payments_made),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 2, 2, 0]
                }
            ]
        ]

    }
},

{
    //#31 Tax Still Due
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
      // use to compute penalties
                    text: formatAmount(forms.tax_due),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 2, 2, 0]
                }
            ]
        ]

    }
},

//////// Addtional Penalties /////////
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

{
    //#32 Surcharge 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.surcharge),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 2, 2, 0]
                }
            ]
        ]

    }
},

{
    //#33 Interest 
    layout: "noBorders",
    table: {
        widths: [535],
        heights:10,
        body: [
            [

                {
                    text: formatAmount(forms.interest),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 1, 1, 0]
                }
            ]
        ]

    }
},

{
    //#34 compromise 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.compromise),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 1, 1, 0]
                }
            ]
        ]

    }
},

{
    //#35 Total penalties 
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.penalties),
                    alignment: 'right',
                    characterSpacing: 8,
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, 1, 1, 0]
                }
            ]
        ]

    }
},

{
    //#36 Total Amount still due     
    layout: "noBorders",
    table: {
        widths: [535],
        heights: 10,
        body: [
            [

                {
                    text: formatAmount(forms.total_amount_payable),
                    alignment: 'right',
                    fontSize: 9,
                    characterSpacing: 8,
                    // right,down,left,up
                    margin: [0, 1, 1,  0]
                }
            ]
        ]

    }
},

       





//     ]
// ]}
// } 
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
