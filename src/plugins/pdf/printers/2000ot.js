const form = require("../templates/2000ot_template").template;

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */

function fillup(details) {
    console.log('fillup details :', JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ############## :', content);
    return {
        background: function (page) {
            return [{
                image: "form",
                width: 600,
                margin: [10, 0, 0, 5]
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
    var content = []
    content.push(
        {
            layout: "noBorders",
            table: {
                widths: [500],
                heights: [55],
                body: [
                    [{
                        text: ''
                    }]
                ]
            }
        },
        // GENERAL
        {
            layout: "noBorders",
            table: {
                widths: [80, 20, 20, 35, 50, 15, 20, 10, 60, 25, 55, 60],
                heights: [25],
                body: [
                    [{
                        text: '',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]

                    },
                    {
                        text: forms.returnPeriod.month == null ? ' ' : forms.returnPeriod.month,
                        // text: '08',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [3, 0, 0, 0]
                    },
                    {
                        text: forms.returnPeriodDay == null ? ' ' : forms.returnPeriodDay,
                        // text: '08',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: forms.returnPeriod.year == null ? ' ' : forms.returnPeriod.year,
                        // text: '2019',
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: forms.amendedYn == true ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: forms.amendedYn == false ? 'X' : ' ',
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '',
                    },
                    {
                        text: forms.numOfSheet == null ? ' ' : forms.numOfSheet,
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: 'II1015',
                        fontSize: 14,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    }
                    ]
                ]
            }
        },
        // PART 1
        {
            layout: "noBorders",
            table: {
                widths: [290, 130, 200],
                heights: [25],
                body: [
                    [{
                        text: '143-456-789' + '- 000',
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [40, 0, 0, 0]
                    },
                    {
                        text: '01B',
                        fontSize: 14,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }, {
                        text: '0469705407',
                        fontSize: 14,
                        bold: true,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]
                    }]
                ]
            }
        },
        //
        {
            layout: "noBorders",
            table: {
                widths: [500],
                heights: [25],
                body: [
                    [{
                        text: 'FRANCHEZCA T. QUIOCHO',
                        fontSize: 14,
                        bold: true,
                        alignment: 'justified',
                        margin: [40, 0, 0, 0]
                    }]
                ]
            }
        },
        // 
        {
            layout: "noBorders",
            table: {
                widths: [450, 100],
                heights: [15],
                body: [
                    [{
                        text: 'BLK 14 LOT 19 MAHOGANY DRV MEADOWOOD EXECUTIVE VILLAGE PANAPAAN BACOOR CITY',
                        fontSize: 9,
                        alignment: 'left',
                        bold: true,
                        margin: [40, 3, 0, 0]
                    },
                    {
                        text: '4102',
                        fontSize: 14,
                        alignment: 'left',
                        margin: [40, 0, 0, 0]
                    }]
                ]
            }
        },
        // Part II
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [10],
                body: [
                    [{
                        text: '',

                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [20, 250, 10],
                heights: [15],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    }, {
                        text: ''
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [15, 0, 0, 0]

                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [20, 250, 10],
                heights: [8],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -8, 0, 0]
                    },
                    {
                        text: ''
                    }, {
                        text: ''
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [260, 260],
                // heights: [5],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [1],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [260, 260],
                heights: [20],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [30, 0, 0, 0],
                    }]

                ]
            }
        },


        // 12
        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [4],
                body: [
                    [{
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 4, 0, 0],
                    }]

                ]
            }
        },
        // 12
        {
            layout: "noBorders",
            table: {
                widths: [90, 310, 70, 30],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [10, -3, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [45, 20, 58, 20, 42, 10],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [45, 20, 58, 20, 42, 45, 46, 64, 115],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    },
                    {
                        text: 'xx',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -5, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 10, 140, 8, 120],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }, {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [43, 160, 10, 140],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }, {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 4, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                body: [
                    [{
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [150, 370],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [150, 370],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [120, 120, 150, 120],
                heights: [30],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [120, 120, 150, 120],
                heights: [10],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [12],
                body: [
                    [{
                        text: '',
                        fontSize: 12,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]

                ]
            }
        },

        // PART III
        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [450, 60],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, -2, 0, 0],
                    }]

                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 160],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'XX',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [530],
                heights: [10],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [8, 95, 10, 95, 10, 95, 8, 155],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [22, -3, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },

        {
            layout: "noBorders",
            table: {
                widths: [370, 170],
                body: [
                    [{
                        text: '',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    },
                    {
                        text: 'X',
                        fontSize: 10,
                        bold: true,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0],
                    }]
                ]
            }
        },



    );
    return content;
}


module.exports = {
    fillup
};
