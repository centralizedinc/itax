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
    console.log("get content forms: " + JSON.stringify(forms))
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
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

        {

            layout: "noBorders",
            table: {
                widths: [80, 20, 15, 40, 50, 15, 20, 10, 60, 25, 55, 60],
                body: [
                    [{
                        text: '',
                        fontsize: 12,
                        alignment: 'left',
                        margin: [0, 0, 0, 0]

                    },
                    {
                        text: '10',
                        fontsize: 12,
                        alignment: 'left',
                        margin: [3, 0, 0, 0]
                    },
                    {
                        text: '08',
                        fontsize: 12,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: '2019',
                        fontsize: 12,
                        alignment: 'justified',
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ''
                    },
                    {
                        text: 'x',
                    },
                    {
                        text: '',
                    },
                    {
                        text: 'x',
                    },
                    {
                        text: '',
                    },
                    {
                        text: '04',
                    },
                    {
                        text: ''
                    },
                    {
                        text: 'II1015'
                    }
                    ]
                ]
            }
        });
    return content;
}


module.exports = {
    fillup
};
