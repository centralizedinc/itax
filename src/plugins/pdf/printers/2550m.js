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
            widths: [160, 79, 50, 50, 150],
            body: [
                [{
                    text: "12",
                    fontSize: 13,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [145, 34, 0, 0]
                },
                {
                    text: "2019",
                    fontSize: 13,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [12, 34, 0, 0]
                },
                {
                    text: "X",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [43, 39, 0, 0]
                },
                {
                    text: "X",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [21, 39, 0, 0]
                },
                {
                    text: "XX",
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
                        text: "XXX  XXX   XXX",
                        fontSize: 14,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [33, 9, 0, 0]
                    },
                    {
                        text: "XXX",
                        fontSize: 14,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [60, 9, 0, 0]
                    },
                    {
                        text: "INFRASTRUCTURE",
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
                            text: "Richard Aguilus Mulawin Bermudez",
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [18, 9, 0, 0]
                        },
                        {
                            text: "02 8700",
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
                            text: "2550M Bgy Alapapaap Mulawin Village",
                            fontSize: 11,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [16, 8, 0, 0]
                        },
                        {
                            text: "1630",
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
                            text: "X",
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [210, 5, 0, 0]
                        },
                        {
                            text: "X",
                            fontSize: 10,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [23, 5, 0, 0]
                        },
                        {
                            text: "TAX RELIEF",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, 22, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
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
                            text: "XXXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXX",
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
                            text: "XXXXX",
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
                            text: "XXXXX",
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
            //Table 14  17D
            layout: "noBorders",
            table: {
                widths: [500,],
                body: [
                    [

                        {
                            text: "XXXXX",
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
                            text: "XXXXX",
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
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, 5, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -3, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -4, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                            text: "XXXXXX",
                            fontSize: 9,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [270, -5, 0, 0]
                        },
                        {
                            text: "XXXXX",
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
                    text: "XXXXXX",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -5, 0, 0]
                },
                {
                    text: "XXXXX",
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
                    text: "XXXXXX",
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
                    text: "XXXXXX",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [270, -5, 0, 0]
                },
                {
                    text: "XXXXX",
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
                    text: "XXXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXX",
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
                    text: "XXXXXXXXXX",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [83, 5, 0, 0]
                },
                {
                    text: "XXXXXXXXXX",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [23, 5, 0, 0]
                },
                {
                    text: "XXXXXXXXXX",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [13, 5, 0, 0]
                },
                {
                    text: "XXXXX",
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
{
    //Table 54  President Signature   
    //layout: "noBorders",
    table: {
        widths: [310, 200,],
        body: [
            [
                {
                    text: "Richard Aguilus Mulawin Gutierez  ",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [80, 27, 0, 0]
                },
                {
                    text: "Junex Mastermind",
                    fontSize: 9,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [40, 30, 0, 0]
                },
            ]
        ]

    }
},
// end

        )


    return content;
}

module.exports = {
    fillup
};
