import escapeHtml from 'escape-html';

export default function contentFilter(content) {
    return escapeHtml(content).replace(/\r\n/g, '<br />').replace(/\n/g, '<br />');
}