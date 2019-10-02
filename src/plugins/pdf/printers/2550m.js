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
        table: {
            widths: [158, 80, 50, 50, 150],
            body: [
                [{
                    text: forms.returnPeriod.month ? forms.returnPeriod.month : ' ',
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [139, 32, 0, 0]
                },
                {
                    text: "XXXX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [10, 32, 0, 0]
                },
                {
                    text:"X",
                    fontSize: 12,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [38, 36, 0, 0]
                },
                {
                    text: "X",
                    fontSize: 12,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [14, 36, 0, 0]
                },
                {
                    text: "XX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin: [110, 32, 0, 0]
                }],

            ]
        }
    },
        {
            table: {
                widths: [170, 100, 100],
                body: [
                    [{
                        text: "XXX XXX XXX",
                        fontSize: 15,
                        akignment: 'justify',
                        // right,down,left,up
                        margin: [26, 5, 0, 0]
                    },
                    {
                        text: "XXXX",
                        fontSize: 15,
                        akignment: 'justify',
                        // right,down,left,up
                        margin: [30, 5, 0, 0]
                    },
                    {
                        text: "X",
                        fontSize: 15,
                        akignment: 'justify',
                        // right,down,left,up
                        margin: [65, 5, 0, 0]
                    }],

                ]
            }
        })

    return content;
}

module.exports = {
    fillup
};