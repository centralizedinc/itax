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
            //layout: "noBorders",
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
            //layout: "noBorders",
            table: {
                widths: [23, 19, 50, 54, 40, 54, 40, 80,],
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
                            margin: [8, 6, 0, 0]
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
                            characterSpacing: 5,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [2, 6, 0, 0]
                        },

                        //#2 amended return?
                        // amended_yn true
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [18.5, 7.5, 0, 0]
                        },
                        // amended_yn false
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [2.5, 7.5, 0, 0]
                        },
                        // #3 any taxes withheld?
                        // any taxes withheld? true
                        {
                            text: forms.any_tax_withheld == true ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [25.5, 9, 0, 0]
                        },
                        // any taxes withheld? false             
                        {
                            text: forms.any_tax_withheld == false ? 'X' : ' ',
                            fontSize: 12,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [2, 9, 0, 0]
                        },
                        //#4 no. of sheets attached
                       {
                        text: forms.num_of_sheet == null ? ' ' : forms.num_of_sheet,
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 4,
                        // right,down,left,up
                        alignment: 'left',
                        margin: [55, 7.5, 0, 0]
                    
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
                widths: [150, 32, 30, 33, 27, 46,],
                body: [
                    [
                        //6.Tax Payers Identification Tin//
                        // space
                        {
                            text: "",
                        },

                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            fontSize: 10,
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
                        
                        // #7 Rdo Code 
                        {
                            text: forms.taxpayer.rdo_code,
                            fontSize: 13,
                            bold: true,
                            characterSpacing: 2,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, 7, 0, 0]
                        },
                        ////////// ----> End Table 2 <----- //////////

 //////////////////////////// ------> Table 3 <------ ///////////////////////////                       
///////// #8 Witholding Agent's Name 
              
        {
            layout: "noBorders",
            table: {
                widths: [265, ],
                heights: [7],
                body: [
                    [
                        // # witholding agents name
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
//////////////////////// ----> end of table #3 <---- ////////////////////////////

////////////////////////// ----> table #4 <---- /////////////////////////////////
/////////////// #9 Registered Address       
{
    layout: "noBorders",
    table: {
        widths: [265,],
        heights: [4],
        body: [
            [
                // #9 registered address    
                {
                    text: forms.address == null ? ' ' : forms.address,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [5, 1, 0, 0]
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
                widths: [265, 250],
                heights: [4],
                body: [
                    [
                        // #11 registered address2
                        {
                            text: forms.address == null ? ' ' : forms.address,
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 3,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [5, 1, 0, 0]
                        },
                        // #9A ZIP code
                        {
                            text: form.taxpayer.zip_code == null ? ' ' : form.taxpayer.zip_code,
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
        ///////////////////////// ----> end of table #5 <---- ////////////////
////////////////////////////// ----> table #6 <---- /////////////////////////////////
/////////// #10 contact number #11 category of witholding agent       
{
            layout: "noBorders",
            table: {
                widths: [120, 80, 50,50,50],
                heights: [10],
                body: [
                    [
                        //#10 contact number
                        {
                            text: ""
                        },

                        {
                            text: form.taxpayer.contact_details == null ? ' ' : form.taxpayer.contact_details,
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [140 , 9, 0, 0]
                        },
                        {
                            text: ""
                        },
                        //#11category witholding
                        {
                            text: forms.categoryofwithholding_agent == true ? 'X' : ' ',
                            fontSize: 13,
                            bold: true,
                            // right,down,left,up
                            alignment: 'left',
                            margin: [93, 1, 0, 0]
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

///////////////////////////////////////// End of table 6 ////////////////////////////////
//////////////////// table 7 /////////////////////////////
{
    layout: "noBorders",
    table: {
        widths: [265,],
        heights: [4],
        body: [
            [
                // #12 Email Address 
                {
                    text: form.email == null ? ' ' : form.email,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [5, 1, 0, 0]
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
        widths: [50, 50, 50, 50, 50, ],
        heights: [4],
        body: [
            [
                //////////#13 tax relief
                {
                    text: ""
                },
                {
                    text: form.avail_tax_relief == true ? 'X' : ' ',
                    fontSize: 13,
                    bold: true,
                    // right,down,left,up
                    alignment: 'left',
                    margin: [93, 1, 0, 0]
                },
                
                {
                    text: form.avail_tax_relief == false ? 'X' : ' ',
                    fontSize: 13,
                    bold: true,
                    // right,down,left,up
                    alignment: 'left',
                    margin: [8, 1, 0, 0]
                },
                {
                    text: ""
                },
                {
                    text: form.avail_tax_relief == null ? ' ' : form.avail_tax_relief,
                    fontSize: 10,
                    bold: true,
                    characterSpacing: 3,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [5, 1, 0, 0]
                },
            ]  
        ]
    }
},


//////////////////////// End table 8 ////////////////////////

////////////////// Part II - Computation of Tax  
{
    //#14 Total Amount of Compensation 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.compensation),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#15 Statutory Minimum Wage 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.statutory_minimum_wage),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#16 Holiday Pay, Overtime 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.hazard_pay),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#17 13th Month Pay 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.other_benefit),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#18 De Minimis Benefits 
   layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.minimis_benefits),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#19 SSS, GSIS 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.mandatory_contribution),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#20 Other Non Taxable Compensation
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.other_taxable_compensation),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#21 Total non taxable compensation
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.non_taxable_compensation),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#22 Total taxable compensation 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.total_taxable_compensation),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#23 Less: Taxable compensation 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.less_taxable_compensation ),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#24 Net Taxable compensation 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.net_taxable_required),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#25 Total tax witheld 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.total_taxes_witheld),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#26 Add/(less): Adjustment of taxes 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.adjustment),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#27 taxes witheld remittance 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.tax_required_remittance),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#28 Less: tax remitted return 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.tax_remitted_previously),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#29 Other remittance made 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.other_payments_made),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#30 Total tax remittance
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.total_payments_made),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#31 Tax Still Due
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
      // use to compute penalties
                    text: formatAmount(form.tax_due),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
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
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.surcharge),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#33 Interest 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.interest),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#34 compromise 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.compromise),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#35 Total penalties 
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.penalties),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},

{
    //#36 Total Amount still due     
    layout: "noBorders",
    table: {
        widths: [500],
        body: [
            [

                {
                    text: formatAmount(form.total_amount_payables),
                    alignment: 'right',
                    fontSize: 9,
                    // right,down,left,up
                    margin: [0, -4, 0, 0]
                }
            ]
        ]

    }
},


       





    ]
]}
} 
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
