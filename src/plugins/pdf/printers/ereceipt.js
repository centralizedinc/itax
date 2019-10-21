

/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    var content = getContent(details);
    return {
        content: content,                                                                                                                                                               
        pageSize: 'LEGAL'
    };
}
function getContent(details) {
    var content = [{
        layout: "noBorders",
        text:`SmartTAX eReciept \n${new Date()}`
    }]
    return content;
}

function formatDate(date, type) {
    if (!date) {
        return "";
    }
    if (type === 'dateonly') type = { year: "numeric", month: "long", day: "2-digit" };
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

function mapTin(tin, from, to) {
    if (!tin || from === null || to === null) return "";
    return tin.substring(from, to);
}

export default {
    fillup
};