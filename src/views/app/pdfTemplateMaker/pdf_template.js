
/**
 *
 * @param {Object} record
 * @param {Array<Object>} pages_data
 * @returns {Promise<Document>}
 */
function fillup(record, pages_data) {
    console.log('##### record :', record);
    console.log('##### pages_data :', pages_data);
    var document = {
        content: [],
        pageSize: 'LEGAL'
    };
    if (pages_data && pages_data.length) {
        var content = getContent(record, pages_data);
        console.log('##### contents :', content);
        if (content && content.length) document.content = content;
        var images = pages_data.map(v => v.background_image || null)
        console.log('##### background_images :', images);
        if (images && images.length) {
            var actions = [];
            images.forEach(img_url => {
                if (img_url) actions.push(getBase64ImageFromURL(img_url));
                else actions.push(Promise.resolve(null))
            })
            console.log('##### actions :', actions);
            return new Promise((resolve, reject) => {
                Promise.all(actions)
                    .then((result_images) => {
                        console.log('##### result_images :', result_images);
                        document.background = function (page) {
                            if (result_images[page - 1])
                                return [{
                                    image: result_images[page - 1],
                                    width: 600
                                }]
                            else return null
                        }
                        resolve(document)
                    }).catch((error) => {
                        reject({ error })
                    });
            })
        }
    }
    return Promise.resolve(document)
}

/**
 * @param {Object} record 
 * @param {Array<Object>} pages 
 */
function getContent(record, pages) {
    var content = [];
    pages.forEach((page, page_index) => {
        var widths = [], body = [], datas = [], rows = 100, cols = 30;
        // initialize datas
        for (let a = 0; a < rows; a++) {
            datas[a] = []
            for (let b = 0; b < cols; b++) datas[a][b] = { text: "A" };
        }

        page.datas.forEach(config => {
            var options = config.options;
            options.text = config.text;
            if (config.key && record) options.text = getValue(record, config.key);
            if (!options.text) options.text = " ";
            datas[config.x][config.y] = options
        })

        // Setup widths
        for (let a = 0; a < cols; a++) widths.push(10);

        // setup body
        for (let a = 0; a < rows; a++) {
            var col_datas = [];
            for (let b = 0; b < cols; b++) col_datas.push(datas[a][b]);
            body.push(col_datas)
        }

        content.push({
            layout: "noBorders",
            table: {
                widths,
                body
            }
        })

        if (pages.length > page_index + 1) {
            content.push(
                {
                    layout: "noBorders",
                    table: {
                        widths: [10],
                        body: [
                            [

                                {
                                    text: "",
                                    pageBreak: 'before'
                                }

                            ]
                        ]
                    }
                })
        }
    })

    return content;
}

/**
 * @param {Object} obj 
 * @param {String} keyword 
 */
function getValue(obj, keyword) {
    if (obj && keyword) {
        var keywords = keyword.split('.'), value = obj;
        keywords.forEach(element => {
            value = value[element] || "";
        });
        return value
    } return ""
}

/**
 * 
 * @param {String} url 
 */
function getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        console.log('url :', url);
        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/jpeg");
            resolve(dataURL);
        };
        img.onerror = error => {
            reject(error);
        };
        img.src = url;
    });
}

export default {
    fillup
};