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

        {
            // layout: "noBorders",
            table: {
                widths: [190, 20, 40, 30, 20, 20, 20, 20],
                body: [
                    [
                        {
                            layout: "noBorders",
                            table: {
                                widths: [30, 85, 80],
                                body: [
                                    [{
                                        text: ' ',
                                    },
                                    {
                                        text: forms.accounting_type == true ? 'X' : ' ',
                                        fontSize: 12,
                                        bold: true,
                                        alignment: 'justified',
                                        margin: [15, 0, 0, 0]
                                    },
                                    {
                                        text: forms.accounting_type == false ? 'X' : ' ',
                                        fontSize: 12,
                                        bold: true,
                                        alignment: 'right',
                                        margin: [0, 0, 80, 0]
                                    }],
                                    [{
                                        text: ' ',

                                    },
                                    {
                                        text: forms.end_month,
                                        fontSize: 12,
                                        characterSpacing: 6,
                                        bold: true,
                                        alignment: 'right',
                                        margin: [0, 0, 0, 0]
                                    },
                                    {
                                        text: forms.return_period_year,
                                        fontSize: 12,
                                        bold: true,
                                        characterSpacing: 6,
                                        alignment: 'justified',
                                        margin: [0, 0, 0, 0]
                                    }]
                                ]
                            }
                            //3 
                        },

                        {
                            text: forms.quarter == 1 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: forms.quarter == 2 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: forms.quarter == 3 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: forms.quarter == 4 ? 'X' : ' ',
                            fontSize: 12,
                            alignment: 'left',
                            margin: [0, 0, 0, 0]
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

export default {
    fillup
}