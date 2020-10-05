const sanitizeHtml = require('sanitize-html');

const sanitize = (dirty) => {
    return sanitizeHtml(dirty, {
        allowedTags: [],
        disallowedTagsMode: 'escape',
        allowedAttributes: {}
      });
}

module.exports = sanitize;