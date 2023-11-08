const React = require('react');
const ReactDOMServer = require('react-dom/server');

function createHtml(elem, props) {
  const element = React.createElement(elem, props);
  const html = ReactDOMServer.renderToStaticMarkup(element);
  return html;
}

module.exports = createHtml;
