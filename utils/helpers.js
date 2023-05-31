const Handlebars = require('handlebars');

Handlebars.registerHelper('truncate', function(text, length) {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + '...';
  }
});