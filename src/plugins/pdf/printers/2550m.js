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
    console.log("get content forms: " + forms)
    var _forms = Array.isArray(forms) ? forms : [forms];
    console.log("get _form data: " + JSON.stringify(_forms))
    var content = []
    content.push({
        table:{
            width: [100,100,100,100,100],
            body:[
                [{
                    text: "XX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[142,32,0,0]
                },
                {
                    text: "XXXX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[10,32,0,0]
                },
                {
                    text: "X",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[65,35,0,0]
                },
                {
                    text: "X",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[18,35,0,0]
                },
                {
                    text: "XX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[140,32,0,0]
                }],
                
            ]
        }        
    },
    {
        table:{
            width: [100,100,100],
            body:[
                [{
                    text: "XX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[142,10,0,0]
                },
                {
                    text: "XXXX",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[10,0,0,0]
                },
                {
                    text: "X",
                    fontSize: 15,
                    akignment: 'justify',
                    // right,down,left,up
                    margin:[65,0,0,0]
                }],
                
            ]
        }
    })

    return content;
}

module.exports = {
    fillup
};