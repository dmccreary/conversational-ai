// CANVAS_HEIGHT: 300
// React Chat Component Architecture - Mermaid component tree showing the
// parent-child hierarchy of a typical React chat interface, color-coded by
// component role (container, presentational, user-interaction) with the key
// data-flow edges (onSendMessage callback up, props down) highlighted.

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        subGraphTitleMargin: { top: 10, bottom: 14 }
    }
});

// Hover descriptions keyed by Mermaid node id.
const nodeInfo = {
    'App': 'ChatbotApp is the root container. It receives userId, apiEndpoint, and theme as props and owns the conversation history and connection status in state.',
    'Header': 'ChatHeader is presentational: it shows the bot name, avatar, online status, and the minimize and close buttons.',
    'MsgList': 'MessageList is a container that receives the messages array and isTyping flag as props and tracks its own scroll position in state.',
    'Input': 'InputArea is a container that holds the current input text and a sending flag in state, and reports new messages upward.',
    'Message': 'Message is rendered once per message. Its props (text, sender, timestamp, type) decide which sub-component renders.',
    'Typing': 'TypingIndicator shows animated dots while the bot is processing a response.',
    'Scroll': 'ScrollToBottom is an interaction button that appears when the user scrolls up into older history.',
    'UserMsg': 'UserMessage renders a right-aligned blue bubble for messages sent by the user.',
    'BotMsg': 'BotMessage renders a left-aligned gray bubble for the bot, including an avatar, content, and timestamp.',
    'TextMsg': 'TextMessage renders plain text content inside a bot bubble.',
    'RichMsg': 'RichMessage renders cards, carousels, and buttons for structured bot replies.',
    'MediaMsg': 'MediaMessage renders images, videos, and file attachments.',
    'TextInput': 'TextInput is the text field where the user types a message.',
    'SendBtn': 'SendButton triggers sending the current message via the onSendMessage callback.',
    'AttachBtn': 'AttachmentButton (optional) lets the user upload a file.',
    'QuickReplies': 'QuickReplies (optional) renders suggested response buttons the user can tap.'
};

const panel = document.getElementById('panel');
const panelWrap = document.getElementById('panelWrap');
const defaultText = 'Hover a component to see its props, state, and place in the React chat component tree.';

function positionPanel(evt) {
    const r = panelWrap.getBoundingClientRect();
    const panelH = panel.offsetHeight || 120;
    const wrapH = panelWrap.offsetHeight;
    const y = evt.clientY - r.top - 20;
    const top = Math.max(8, Math.min(wrapH - panelH - 60, y));
    panel.style.top = `${top}px`;
}

function setupNodeHover() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        const nodeId = node.id.replace('flowchart-', '').split('-')[0];
        if (nodeInfo[nodeId]) {
            node.addEventListener('mouseenter', (e) => {
                panel.textContent = nodeInfo[nodeId];
                positionPanel(e);
            });
            node.addEventListener('mousemove', (e) => positionPanel(e));
            node.addEventListener('mouseleave', () => {
                panel.textContent = defaultText;
                panel.style.top = '8px';
            });
        }
    });
}

function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
        setupNodeHover();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 100));
} else {
    setTimeout(waitForMermaid, 100);
}
