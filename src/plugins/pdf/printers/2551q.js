const form = require("../templates/2551q_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details: " + JSON.stringify(details))
    var content = getContent(details);
    var x = 0
    console.log('get content ###### :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 600,
                margin: [10, 0, 0, 0]
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
        // right,down,left,up
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [68],
                body: [
                    [{
                        text: ' '
                    }]
                ]
            }
        },
        // row 1 item 1, 2, 3, 4 & 5
        { 
            layout: "noBorders",
            table: {
                widths: [190, 20, 26, 40, 25, 45, 40, 100],
                body: [
                    [
                        // right,down,left,up
                        // item 1
                        {
                            
                            layout: "noBorders",
                            table: {
                                widths: [55, 60, 40],
                                body: [
                                    [{
                                        text: forms.accounting_type == true ? 'X' : ' ',
                                        fontSize: 12,
                                        bold: true,
                                        alignment: 'justified',
                                        // right,down,left,up
                                        margin: [52, 0, 0, 0]
                                    },
                                    {
                                        text: forms.accounting_type == false ? 'X' : ' ',
                                        fontSize: 12,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [60, 0, 0, 0]
                                    },
                                    {
                                       text: ' ',
                                    }],
                                    //  item 2
                                    [{
                                        text: ' ',

                                    },
                                    {
                                        text: forms.end_month,
                                        fontSize: 12,
                                        characterSpacing: 6,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [45, 0, 0, 0]
                                    },
                                    {
                                        text: forms.return_period_year,
                                        fontSize: 12,
                                        bold: true,
                                        characterSpacing: 6,
                                        alignment: 'justified',
                                        margin: [-2, 0, 0, 0]
                                    }]
                                ]
                            }
                           
                        },
                         //item 3 
                        {
                            text: forms.quarter == 1 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [10, 15, 0, 0]
                        },
                        {
                            text: forms.quarter == 2 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [22, 15, 0, 0]
                        },
                        {
                            text: forms.quarter == 3 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [32, 15, 0, 0]
                        },
                        {
                            text: forms.quarter == 4 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [25, 14, 0, 0]
                        },
                        // item 4
                        {
                            text: forms.amended_yn == true ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [45, 15, 0, 0]
                        },
                        {
                            text: forms.amended_yn == false ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [35, 15, 0, 0]
                        },
                        // item 5
                        {
                            text: forms.num_of_sheet,
                            fontSize: 12,
                            alignment: 'justified',
                            characterSpacing: 12,
                            margin: [81, 20, 0, 0]
                        }
                    ]
                ]
            }
        },
        // row 2 item 6 & 7
        {
            layout: "noBorders",
            table: {
                widths: [175,35,50,50,50,150],
                body:[
                    [
                        {
                            text:" "
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 0, 3),
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [6, 12, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 3, 6),
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [16, 12, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 6, 9),
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [16, 12, 0, 0]
                        },
                        {
                            text: mapTin(forms.taxpayer.tin, 9, 12),
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [14, 12, 0, 0]
                        },
                        {
                            text: forms.taxpayer.rdo_code == null ? ' ' : forms.taxpayer.rdo_code,
                            fontSize: 12,
                            characterSpacing: 4,
                            alignment: 'justified',
                            margin: [108, 12, 0, 0]
                        },
                    ]
                ]
            }
        },
        // row 3 item 8
        {
            layout: "noBorders",
            table: {
                widths: [535],
                body:[
                    [
                        {
                            text: forms.taxpayer.registered_name == null ? ' ' : forms.taxpayer.registered_name,
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [0, 12, 0, 0] 
                        }
                    ]
                ]
            }
        },
        // row 3 item 9 & 9a
        {
            layout: "noBorders",
            table: {
                widths: [480,50],
                heights:[42],
                body:[
                    [
                        {
                            text: forms.taxpayer.address == null || forms.taxpayer.address == ' ' ? ' ' : forms.taxpayer.address,
                            characterSpacing: 2,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [0, 12, 0, 0] 
                        },
                        {
                            text: forms.taxpayer.address_details.zipCode == null || forms.taxpayer.address_details.zipCode == ' ' ? '1234' : forms.taxpayer.address_details.zipCode,
                            characterSpacing: 4,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [6, 26, 0, 0] 
                        }
                    ]
                ]
            }
        },
        // row 4 item 10 & 11 
        {
            layout: "noBorders",
            table:{
                widths: [145, 380],
                body:[
                    [
                        {
                            text: forms.taxpayer.contact_details.telno == null || forms.taxpayer.contact_details.telno == ' ' ? ' ' : forms.taxpayer.contact_details.telno,
                            characterSpacing: 2,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [0, 10, 0, 0] 
                        },
                        {
                            text: forms.taxpayer.contact_details.email == null || forms.taxpayer.contact_details.email == ' ' ? ' ' : forms.taxpayer.contact_details.email,
                            characterSpacing: 2,
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [4, 10, 0, 0] 
                        }
                    ]
                ]
            }
        },
        // row 5 item 12 & 12a
        {
            layout: "noBorders",
            table:{
                widths: [140,20,30,320],
                body:[
                    [
                        {
                            text: ' '
                        },
                        {
                            text: forms.is_avail_tax_relief == true ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [8, -2, 0, 0] 
                        },
                        {
                            text: forms.is_avail_tax_relief == false ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [22, -2, 0, 0] 
                        },
                        {
                            text: forms.avail_tax_relief == null || forms.avail_tax_relief == '' ? ' ' : forms.avail_tax_relief,
                            fontSize: 12,
                            characterSpacing: 2,
                            alignment: 'justified',
                            margin: [110, 0, 0, 0] 
                        },

                    ]
                ]
            }
        },
        // row 6 item 13
        {
            layout: "noBorders",
            table:{
                widths: [160, 150],
                body:[
                    [
                        {
                            text: forms.tax_rate == 'GITR' ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [145, 18, 0, 0]

                        },
                        {
                            text: forms.tax_rate == 'ITR' ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'justified',
                            margin: [142, 18, 0, 0]  
                        }
                    ]
                ]
            }
        },
        // row 7 item 14 to 24
        {
            layout: "noBorders",
            table:{
            widths:[325, 208],
            body:[
                // item 14
                [
                    
                    {
                        text: " "
                    },
                    {
                        text: formatAmount(forms.sched1_tax_due),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,20,0,0]
                    }
                ],
                // item 15
                [
                    
                    {
                        text: " "
                    },
                    {
                        text: formatAmount(forms.tax_withheld),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,12,0,0]
                    }
                ],
                // item 16
                [
                    
                    {
                        text: " "
                    },
                    {
                        text: formatAmount(forms.prev_tax_paid),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 17
                [
                    
                    {
                        text: forms.other_tax_credits_specify==null?' ':forms.other_tax_credits_specify,
                        fontSize: 12,
                        alignment: 'justified',
                        margin: [185,0,0,0]
                    },
                    {
                        text: formatAmount(forms.other_tax_credits),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 18
                [
                    
                    {
                        text: " "
                    },
                    {
                        text: formatAmount(forms.total_tax_credits),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 19
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.tot_tax_overpayment),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 20
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.surcharge),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,12,0,0]
                    }
                ],
                // item 21
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.interest),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 22
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.compromise),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 23
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.penalties),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
                // item 24
                [
                    
                    {
                        text: ""
                    },
                    {
                        text: formatAmount(forms.total_amount_payable),
                        fontSize: 12,
                        characterSpacing: 8,
                        alignment: 'right',
                        margin: [0,0,0,0]
                    }
                ],
            ]
        }
    },
    // item checkboxs
    {
        layout: "noBorders",
table: {
widths: [150,20,80],
body:[
    [
        {
            text: " "
        },
        {
            text: forms.over_remittance =="refunded" ?"X": " ",
            fontSize: 12,
            alignment: 'justified',
            margin: [6, -5, 0, 0] 
        },
        {
            text: forms.over_remittance == 'certificate'?"X": ' ',
            fontSize: 12,
            alignment: 'justified',
            margin: [75, -5, 0, 0] 
        }
    ]
]
}
    },




        // ******************  end of page 1  ****************** //

    ]
    return content;
}


function formatDate(date, type) {
    if (!date) {
        return " ";
    }
    if (type === 'dateonly') type = { year: "numeric", month: "long", day: "2-digit" };
    var dt = new Date(date).toLocaleString("en-US", type ? type : {
        hour12: true,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit"
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

function overRemittance(data){
    console.log("over remittance data: " + JSON.stringify(data))

}

export default {
    fillup
}