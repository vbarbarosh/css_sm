const Promise = require('bluebird');
const assert = require('power-assert');
const node_sass = require('node-sass');

function scss(s)
{
    return new Promise(function (resolve, reject) {
        const options = {data: s, outputStyle: 'compact', includePaths: [__dirname]};
        node_sass.render(options, function (error, result) {
            error ? reject(error) : resolve(result.css.toString());
        });
    });
}

function smcss(expr)
{
    return scss('@import "../index";\n.foo{@include smcss(' + expr + ');}')
        .then(v => v.trim());
}

const table = {
    // align
    'l': '.foo { text-align: left; }',
    'r': '.foo { text-align: right; }',
    'c': '.foo { text-align: center; }',
    'j': '.foo { text-align: justify; }',
    'vm': '.foo { vertical-align: middle; }',
    'vt': '.foo { vertical-align: top; }',
    'vb': '.foo { vertical-align: bottom; }',

    // background
    'xbg': '.foo { background: none; }',
    'black': '.foo { background: #000; }',
    'gray': '.foo { background: #888; }',
    'silver': '.foo { background: #ccc; }',
    'white': '.foo { background: #fff; }',
    'red': '.foo { background: #f88; }',
    'green': '.foo { background: #8f8; }',
    'blue': '.foo { background: #88f; }',
    'yellow': '.foo { background: #ff8; }',
    'cyan': '.foo { background: #8ff; }',
    'gradient': '.foo { background: linear-gradient(to right, #f00 0%, #0f0 50%, #00f 100%); }',
    'checkerboard': '.foo { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX///+/v7+jQ3Y5AAAAEUlEQVQI12P4z8CAFWEX/Q8Afr8P8erzE9cAAAAASUVORK5CYII="); }',
    'rainbow': '.foo > :nth-child(3n+1) { background: #f88; }\n\n.foo > :nth-child(3n+2) { background: #8f8; }\n\n.foo > :nth-child(3n+3) { background: #88f; }',

    // border
    'xborder': '.foo { border: none; }',
    'xborder-t': '.foo { border-top: none; }',
    'xborder-l': '.foo { border-left: none; }',
    'xborder-r': '.foo { border-right: none; }',
    'xborder-b': '.foo { border-bottom: none; }',
    'xborder-v': '.foo { border-top: none; border-bottom: none; }',
    'xborder-h': '.foo { border-left: none; border-right: none; }',
    'xborder-vl': '.foo { border-top: none; border-left: none; border-bottom: none; }',
    'xborder-vr': '.foo { border-top: none; border-right: none; border-bottom: none; }',
    'xborder-ht': '.foo { border-top: none; border-left: none; border-right: none; }',
    'xborder-hb': '.foo { border-left: none; border-right: none; border-bottom: none; }',
    'border': '.foo { border: 1px solid currentColor; }',
    'dashed': '.foo { border: 1px dashed currentColor; }',
    'xbr': '.foo { border-radius: 0; }',
    'br5': '.foo { border-radius: 5px; }',

    // box
    'bbox': '.foo { box-sizing: border-box; }',
    'cbox': '.foo { box-sizing: content-box; }',

    // button
    'xbutton': '.foo { box-sizing: content-box; font: inherit; color: inherit; border: none; margin: 0; padding: 0; background: none; }\n\n.foo:focus { outline: none; }\n\n.foo::-moz-focus-inner { border: none; }',

    // cursor
    'cur-alias': '.foo { cursor: alias; }',
    'cur-all-scroll': '.foo { cursor: all-scroll; }',
    'cur-auto': '.foo { cursor: auto; }',
    'cur-cell': '.foo { cursor: cell; }',
    'cur-col-resize': '.foo { cursor: col-resize; }',
    'cur-context-menu': '.foo { cursor: context-menu; }',
    'cur-copy': '.foo { cursor: copy; }',
    'cur-crosshair': '.foo { cursor: crosshair; }',
    'cur-default': '.foo { cursor: default; }',
    'cur-e-resize': '.foo { cursor: e-resize; }',
    'cur-ew-resize': '.foo { cursor: ew-resize; }',
    'cur-help': '.foo { cursor: help; }',
    'cur-inherit': '.foo { cursor: inherit; }',
    'cur-initial': '.foo { cursor: initial; }',
    'cur-move': '.foo { cursor: move; }',
    'cur-n-resize': '.foo { cursor: n-resize; }',
    'cur-ne-resize': '.foo { cursor: ne-resize; }',
    'cur-nesw-resize': '.foo { cursor: nesw-resize; }',
    'cur-no-drop': '.foo { cursor: no-drop; }',
    'cur-none': '.foo { cursor: none; }',
    'cur-not-allowed': '.foo { cursor: not-allowed; }',
    'cur-ns-resize': '.foo { cursor: ns-resize; }',
    'cur-nw-resize': '.foo { cursor: nw-resize; }',
    'cur-nwse-resize': '.foo { cursor: nwse-resize; }',
    'cur-pointer': '.foo { cursor: pointer; }',
    'cur-progress': '.foo { cursor: progress; }',
    'cur-row-resize': '.foo { cursor: row-resize; }',
    'cur-s-resize': '.foo { cursor: s-resize; }',
    'cur-se-resize': '.foo { cursor: se-resize; }',
    'cur-sw-resize': '.foo { cursor: sw-resize; }',
    'cur-text': '.foo { cursor: text; }',
    'cur-vertical-text': '.foo { cursor: vertical-text; }',
    'cur-w-resize': '.foo { cursor: w-resize; }',
    'cur-wait': '.foo { cursor: wait; }',

    // display
    'xd': '.foo { display: none; }',
    'db': '.foo { display: block; }',
    'di': '.foo { display: inline; }',
    'dib': '.foo { display: inline-block; }',
    'dt': '.foo { display: table; }',
    'dtc': '.foo { display: table-cell; }',

    // ellipsis
    'ellipsis': '.foo { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }',
    'ellipsis2': '.foo { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-height: 1.25em; max-height: 2.5em; box-sizing: content-box; word-break: break-all; overflow-wrap: break-word; }',

    // expand
    'expand-1-2': '.foo { display: block; position: relative; }\n\n.foo:before { display: block; content: \'\'; padding-top: 200%; }',
    'expand-1-4': '.foo { display: block; position: relative; }\n\n.foo:before { display: block; content: \'\'; padding-top: 400%; }',

    // flex
    'iflex-row': '.foo { display: inline-flex; flex-direction: row; }',
    'iflex-row-center': '.foo { display: inline-flex; flex-direction: row; align-items: center; align-content: center; justify-content: center; }',
    'iflex-col': '.foo { display: inline-flex; flex-direction: column; }',
    'iflex-col-center': '.foo { display: inline-flex; flex-direction: column; align-items: center; align-content: center; justify-content: center; }',
    'flex-row': '.foo { display: flex; flex-direction: row; }',
    'flex-row-rev': '.foo { display: flex; flex-direction: row-reverse; }',
    'flex-row-center': '.foo { display: flex; flex-direction: row; align-items: center; align-content: center; justify-content: center; }',
    'flex-col': '.foo { display: flex; flex-direction: column; }',
    'flex-col-rev': '.foo { display: flex; flex-direction: column-reverse; }',
    'flex-col-center': '.foo { display: flex; flex-direction: column; align-items: center; align-content: center; justify-content: center; }',
    'flex-wrap': '.foo { flex-wrap: wrap; }',
    'flex-nowrap': '.foo { flex-wrap: nowrap; }',
    'flex-wrap-rev': '.foo { flex-wrap: wrap-reverse; }',
    'flex-center': '.foo { align-items: center; align-content: center; justify-content: center; }',
    'flex-align-start': '.foo { align-items: flex-start; align-content: flex-start; }',
    'flex-align-end': '.foo { align-items: flex-end; align-content: flex-end; }',
    'flex-align-center': '.foo { align-items: center; align-content: center; }',
    'flex-align-baseline': '.foo { align-items: baseline; align-content: baseline; }',
    'flex-align-stretch': '.foo { align-items: stretch; align-content: stretch; }',
    'flex-justify-start': '.foo { justify-content: flex-start; }',
    'flex-justify-end': '.foo { justify-content: flex-end; }',
    'flex-justify-center': '.foo { justify-content: center; }',
    'flex-justify-between': '.foo { justify-content: space-between; }',
    'flex-justify-around': '.foo { justify-content: space-around; }',
    'flex-justify-evenly': '.foo { justify-content: space-evenly; }',
    'flex-grow': '.foo { flex-grow: 1; }',
    'flex-nogrow': '.foo { flex-grow: 0; }',
    'flex-shrink': '.foo { flex-shrink: 1; flex-basis: auto; min-width: 0; min-height: 0; }',
    'flex-noshrink': '.foo { flex-shrink: 0; }',
    'flex-fluid': '.foo { flex-grow: 1; flex-shrink: 1; flex-basis: auto; min-width: 0; min-height: 0; -ms-flex-preferred-size: 0; }',

    // float
    'xf': '.foo { float: none; }',
    'fl': '.foo { float: left; }',
    'fr': '.foo { float: right; }',
    'xc': '.foo { clear: none; }',
    'cb': '.foo { clear: both; }',
    'cl': '.foo { clear: left; }',
    'cr': '.foo { clear: right; }',
    'clearfix': '.foo { *zoom: 1; }\n\n.foo:after { content: \'\\0020\'; display: block; height: 0; clear: both; overflow: hidden; visibility: hidden; }',
    'floats': '.foo { *zoom: 1; }\n\n.foo:after { content: \'\\0020\'; display: block; height: 0; clear: both; overflow: hidden; visibility: hidden; }\n\n.foo > * { float: left; }',

    // font
    'xfs': '.foo { font-size: inherit; }',
    'fs12': '.foo { font-size: 12px; }',
    'ls12': '.foo { letter-spacing: 12px; }',
    'lh12': '.foo { line-height: 12px; }',
    'lh12m': '.foo { line-height: 1.2em; }',
    'n': '.foo { font-style: normal; }',
    'i': '.foo { font-style: italic; }',
    'q': '.foo { font-style: oblique; }',
    'ii': '.foo { font-style: inherit; }',
    'b': '.foo { font-weight: bold; }',
    'xfw': '.foo { font-weight: normal; }',
    'fw3': '.foo { font-weight: 300; }',
    'fw4': '.foo { font-weight: 400; }',
    'fw5': '.foo { font-weight: 500; }',
    'fw6': '.foo { font-weight: 600; }',
    'fw7': '.foo { font-weight: 700; }',
    'fw8': '.foo { font-weight: 800; }',

    // hsplit
    'hsplit': '.foo { display: flex; flex-direction: row; flex-wrap: nowrap; }\n\n.foo > * { flex: none; }',
    'vsplit': '.foo { display: flex; flex-direction: column; flex-wrap: nowrap; }\n\n.foo > * { flex: none; }',
    'shrink': '.foo { flex-shrink: 1; flex-basis: auto; min-width: 0; min-height: 0; }',
    'grow': '.foo { flex-grow: 1; }',
    'fluid': '.foo { flex-grow: 1; flex-shrink: 1; flex-basis: auto; min-width: 0; min-height: 0; -ms-flex-preferred-size: 0; }',

    // list
    'xls': '.foo { list-style: none; }',

    // margin
    'xm': '.foo { margin: 0; }',
    'xmt': '.foo { margin-top: 0; }',
    'xml': '.foo { margin-left: 0; }',
    'xmb': '.foo { margin-bottom: 0; }',
    'xmr': '.foo { margin-right: 0; }',
    'xmv': '.foo { margin-top: 0; margin-bottom: 0; }',
    'xmh': '.foo { margin-left: 0; margin-right: 0; }',
    'ma': '.foo { margin: auto; }',
    'm5': '.foo { margin: 5px; }',
    'mv5': '.foo { margin-top: 5px; margin-bottom: 5px; }',
    'mh5': '.foo { margin-left: 5px; margin-right: 5px; }',
    'mt5': '.foo { margin-top: 5px; }',
    'mt5n': '.foo { margin-top: -5px; }',
    'ml5': '.foo { margin-left: 5px; }',
    'ml5n': '.foo { margin-left: -5px; }',
    'mb5': '.foo { margin-bottom: 5px; }',
    'mb5n': '.foo { margin-bottom: -5px; }',
    'mr5': '.foo { margin-right: 5px; }',
    'mr5n': '.foo { margin-right: -5px; }',
    'mg5': '.foo > :not(:last-child) { margin-bottom: 5px; }',
    'mi5': '.foo > :not(:last-child) { margin-right: 5px; }',

    // opacity
    'xo': '.foo { opacity: 1; }',
    'o25': '.foo { opacity: 0.25; }',

    // outline
    'xoutline': '.foo { outline: none; }',
    'outline': '.foo { outline: 1px currentColor; }',

    // overflow
    'oa': '.foo { overflow: auto; }',
    'oh': '.foo { overflow: hidden; }',
    'os': '.foo { overflow: scroll; }',

    // padding
    'xp': '.foo { padding: 0; }',
    'xpt': '.foo { padding-top: 0; }',
    'xpl': '.foo { padding-left: 0; }',
    'xpb': '.foo { padding-bottom: 0; }',
    'xpr': '.foo { padding-right: 0; }',
    'xpv': '.foo { padding-top: 0; padding-bottom: 0; }',
    'xph': '.foo { padding-left: 0; padding-right: 0; }',
    'pa': '.foo { padding: auto; }',
    'p5': '.foo { padding: 5px; }',
    'pv5': '.foo { padding-top: 5px; padding-bottom: 5px; }',
    'ph5': '.foo { padding-left: 5px; padding-right: 5px; }',
    'pt5': '.foo { padding-top: 5px; }',
    'pl5': '.foo { padding-left: 5px; }',
    'pb5': '.foo { padding-bottom: 5px; }',
    'pr5': '.foo { padding-right: 5px; }',
    'pg5': '.foo > :not(:last-child) { padding-bottom: 5px; }',
    'pi5': '.foo > :not(:last-child) { padding-right: 5px; }',

    // pointer-events
    'no-pointer-events': '.foo { pointer-events: none; }',

    // position
    'stat': '.foo { position: static; }',
    'rel': '.foo { position: relative; }',
    'abs': '.foo { position: absolute; }',
    'fix': '.foo { position: fixed; }',
    'sticky': '.foo { position: sticky; }',
    'sticky-t': '.foo { position: sticky; top: 0; }',
    'sticky-l': '.foo { position: sticky; left: 0; }',
    'sticky-r': '.foo { position: sticky; right: 0; }',
    'sticky-b': '.foo { position: sticky; bottom: 0; }',
    'abs-f': '.foo { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }',
    'abs-t': '.foo { position: absolute; top: 0; left: 0; right: 0; }',
    'abs-b': '.foo { position: absolute; left: 0; right: 0; bottom: 0; }',
    'abs-l': '.foo { position: absolute; top: 0; left: 0; bottom: 0; }',
    'abs-r': '.foo { position: absolute; top: 0; right: 0; bottom: 0; }',
    'abs-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }',
    'abs-tl': '.foo { position: absolute; top: 0; left: 0; }',
    'abs-tl-c': '.foo { position: absolute; top: 50%; left: 50%; }',
    'abs-tl-ct': '.foo { position: absolute; top: 0; left: 50%; }',
    'abs-tl-cb': '.foo { position: absolute; top: 100%; left: 50%; }',
    'abs-tl-cl': '.foo { position: absolute; top: 50%; left: 0; }',
    'abs-tl-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(100%, 0); }',
    'abs-tl-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(100%, 0); }',
    'abs-tl-bl': '.foo { position: absolute; top: 100%; left: 0; }',
    'abs-tl-br': '.foo { position: absolute; top: 100%; right: 0; transform: translate(100%, 0); }',
    'abs-tr': '.foo { position: absolute; top: 0; right: 0; }',
    'abs-tr-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-100%, 0); }',
    'abs-tr-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-100%, 0); }',
    'abs-tr-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-100%, 100%); }',
    'abs-tr-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-100%, 0); }',
    'abs-tr-cr': '.foo { position: absolute; top: 50%; right: 0; }',
    'abs-tr-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-100%, 0); }',
    'abs-tr-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-100%, 100%); }',
    'abs-tr-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(0, 100%); }',
    'abs-bl': '.foo { position: absolute; left: 0; bottom: 0; }',
    'abs-bl-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(0, -100%); }',
    'abs-bl-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(0, -100%); }',
    'abs-bl-cb': '.foo { position: absolute; left: 50%; bottom: 0; }',
    'abs-bl-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(0, -100%); }',
    'abs-bl-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(100%, -100%); }',
    'abs-bl-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(0, -100%); }',
    'abs-bl-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(100%, -100%); }',
    'abs-bl-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(100%, 0); }',
    'abs-br': '.foo { position: absolute; right: 0; bottom: 0; }',
    'abs-br-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-100%, -100%); }',
    'abs-br-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-100%, -100%); }',
    'abs-br-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-100%, 0); }',
    'abs-br-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-100%, -100%); }',
    'abs-br-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(0, -100%); }',
    'abs-br-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-100%, -100%); }',
    'abs-br-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(0, -100%); }',
    'abs-br-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-100%, 0); }',
    'abs-c-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); }',
    'abs-c-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 50%); }',
    'abs-c-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-50%, -50%); }',
    'abs-c-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(50%, -50%); }',
    'abs-c-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-50%, -50%); }',
    'abs-c-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(50%, -50%); }',
    'abs-c-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-50%, 50%); }',
    'abs-c-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(50%, 50%); }',
    'abs-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-50%, 0); }',
    'abs-ct-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, 0); }',
    'abs-ct-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 100%); }',
    'abs-ct-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-50%, 0); }',
    'abs-ct-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(50%, 0); }',
    'abs-ct-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-50%, 0); }',
    'abs-ct-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(50%, 0); }',
    'abs-ct-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-50%, 100%); }',
    'abs-ct-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(50%, 100%); }',
    'abs-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 0); }',
    'abs-cb-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); }',
    'abs-cb-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-50%, -100%); }',
    'abs-cb-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, -100%); }',
    'abs-cb-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-50%, -100%); }',
    'abs-cb-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(50%, -100%); }',
    'abs-cb-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-50%, -100%); }',
    'abs-cb-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(50%, -100%); }',
    'abs-cb-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-50%, 0); }',
    'abs-cb-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(50%, 0); }',
    'abs-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(0, -50%); }',
    'abs-cl-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(0, -50%); }',
    'abs-cl-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(0, -50%); }',
    'abs-cl-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(0, 50%); }',
    'abs-cl-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(100%, -50%); }',
    'abs-cl-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(0, -50%); }',
    'abs-cl-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(100%, -50%); }',
    'abs-cl-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(0, 50%); }',
    'abs-cl-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(100%, 50%); }',
    'abs-cr': '.foo { position: absolute; top: 50%; right: 0; transform: translate(0, -50%); }',
    'abs-cr-c': '.foo { position: absolute; top: 50%; left: 50%; transform: translate(-100%, -50%); }',
    'abs-cr-ct': '.foo { position: absolute; top: 0; left: 50%; transform: translate(-100%, -50%); }',
    'abs-cr-cb': '.foo { position: absolute; left: 50%; bottom: 0; transform: translate(-100%, 50%); }',
    'abs-cr-cl': '.foo { position: absolute; top: 50%; left: 0; transform: translate(-100%, -50%); }',
    'abs-cr-tl': '.foo { position: absolute; top: 0; left: 0; transform: translate(-100%, -50%); }',
    'abs-cr-tr': '.foo { position: absolute; top: 0; right: 0; transform: translate(0, -50%); }',
    'abs-cr-bl': '.foo { position: absolute; left: 0; bottom: 0; transform: translate(-100%, 50%); }',
    'abs-cr-br': '.foo { position: absolute; right: 0; bottom: 0; transform: translate(0, 50%); }',
    'fix-f': '.foo { position: fixed; top: 0; left: 0; right: 0; bottom: 0; }',
    'fix-t': '.foo { position: fixed; top: 0; left: 0; right: 0; }',
    'fix-b': '.foo { position: fixed; left: 0; right: 0; bottom: 0; }',
    'fix-l': '.foo { position: fixed; top: 0; left: 0; bottom: 0; }',
    'fix-r': '.foo { position: fixed; top: 0; right: 0; bottom: 0; }',
    'fix-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }',
    'fix-tl': '.foo { position: fixed; top: 0; left: 0; }',
    'fix-tl-c': '.foo { position: fixed; top: 50%; left: 50%; }',
    'fix-tl-ct': '.foo { position: fixed; top: 0; left: 50%; }',
    'fix-tl-cb': '.foo { position: fixed; top: 100%; left: 50%; }',
    'fix-tl-cl': '.foo { position: fixed; top: 50%; left: 0; }',
    'fix-tl-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(100%, 0); }',
    'fix-tl-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(100%, 0); }',
    'fix-tl-bl': '.foo { position: fixed; top: 100%; left: 0; }',
    'fix-tl-br': '.foo { position: fixed; top: 100%; right: 0; transform: translate(100%, 0); }',
    'fix-tr': '.foo { position: fixed; top: 0; right: 0; }',
    'fix-tr-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-100%, 0); }',
    'fix-tr-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-100%, 0); }',
    'fix-tr-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-100%, 100%); }',
    'fix-tr-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-100%, 0); }',
    'fix-tr-cr': '.foo { position: fixed; top: 50%; right: 0; }',
    'fix-tr-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-100%, 0); }',
    'fix-tr-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-100%, 100%); }',
    'fix-tr-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(0, 100%); }',
    'fix-bl': '.foo { position: fixed; left: 0; bottom: 0; }',
    'fix-bl-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(0, -100%); }',
    'fix-bl-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(0, -100%); }',
    'fix-bl-cb': '.foo { position: fixed; left: 50%; bottom: 0; }',
    'fix-bl-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(0, -100%); }',
    'fix-bl-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(100%, -100%); }',
    'fix-bl-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(0, -100%); }',
    'fix-bl-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(100%, -100%); }',
    'fix-bl-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(100%, 0); }',
    'fix-br': '.foo { position: fixed; right: 0; bottom: 0; }',
    'fix-br-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-100%, -100%); }',
    'fix-br-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-100%, -100%); }',
    'fix-br-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-100%, 0); }',
    'fix-br-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-100%, -100%); }',
    'fix-br-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(0, -100%); }',
    'fix-br-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-100%, -100%); }',
    'fix-br-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(0, -100%); }',
    'fix-br-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-100%, 0); }',
    'fix-c-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-50%, -50%); }',
    'fix-c-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 50%); }',
    'fix-c-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-50%, -50%); }',
    'fix-c-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(50%, -50%); }',
    'fix-c-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); }',
    'fix-c-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(50%, -50%); }',
    'fix-c-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-50%, 50%); }',
    'fix-c-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(50%, 50%); }',
    'fix-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-50%, 0); }',
    'fix-ct-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-50%, 0); }',
    'fix-ct-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 100%); }',
    'fix-ct-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-50%, 0); }',
    'fix-ct-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(50%, 0); }',
    'fix-ct-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-50%, 0); }',
    'fix-ct-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(50%, 0); }',
    'fix-ct-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-50%, 100%); }',
    'fix-ct-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(50%, 100%); }',
    'fix-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-50%, 0); }',
    'fix-cb-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -100%); }',
    'fix-cb-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-50%, -100%); }',
    'fix-cb-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-50%, -100%); }',
    'fix-cb-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-50%, -100%); }',
    'fix-cb-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(50%, -100%); }',
    'fix-cb-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-50%, -100%); }',
    'fix-cb-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(50%, -100%); }',
    'fix-cb-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-50%, 0); }',
    'fix-cb-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(50%, 0); }',
    'fix-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(0, -50%); }',
    'fix-cl-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(0, -50%); }',
    'fix-cl-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(0, -50%); }',
    'fix-cl-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(0, 50%); }',
    'fix-cl-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(100%, -50%); }',
    'fix-cl-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(0, -50%); }',
    'fix-cl-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(100%, -50%); }',
    'fix-cl-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(0, 50%); }',
    'fix-cl-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(100%, 50%); }',
    'fix-cr': '.foo { position: fixed; top: 50%; right: 0; transform: translate(0, -50%); }',
    'fix-cr-c': '.foo { position: fixed; top: 50%; left: 50%; transform: translate(-100%, -50%); }',
    'fix-cr-ct': '.foo { position: fixed; top: 0; left: 50%; transform: translate(-100%, -50%); }',
    'fix-cr-cb': '.foo { position: fixed; left: 50%; bottom: 0; transform: translate(-100%, 50%); }',
    'fix-cr-cl': '.foo { position: fixed; top: 50%; left: 0; transform: translate(-100%, -50%); }',
    'fix-cr-tl': '.foo { position: fixed; top: 0; left: 0; transform: translate(-100%, -50%); }',
    'fix-cr-tr': '.foo { position: fixed; top: 0; right: 0; transform: translate(0, -50%); }',
    'fix-cr-bl': '.foo { position: fixed; left: 0; bottom: 0; transform: translate(-100%, 50%); }',
    'fix-cr-br': '.foo { position: fixed; right: 0; bottom: 0; transform: translate(0, 50%); }',
    'tlbr': '.foo { top: 0; left: 0; right: 0; bottom: 0; }',
    'tlbr5': '.foo { top: 5px; left: 5px; right: 5px; bottom: 5px; }',
    't5': '.foo { top: 5px; }',
    'l5': '.foo { left: 5px; }',
    'l50p': '.foo { left: 50%; }',
    'b5': '.foo { bottom: 5px; }',
    'r5': '.foo { right: 5px; }',
    'ta': '.foo { top: auto; }',
    'la': '.foo { left: auto; }',
    'ba': '.foo { bottom: auto; }',
    'ra': '.foo { right: auto; }',

    // resize
    'xresize': '.foo { resize: none; }',
    'resize': '.foo { resize: both; }',
    'resize-h': '.foo { resize: horizontal; }',
    'resize-v': '.foo { resize: vertical; }',

    // scrollbar
    'no-scrollbars': '.foo { overflow: scroll; overflow: -moz-scrollbars-none; -ms-overflow-style: none; }\n\n.foo::-webkit-scrollbar { display: none; }',

    // shadow
    'xbs': '.foo { box-shadow: none; }',
    'bs5': '.foo { box-shadow: 0 0 5px rgba(0, 0, 0, 0.75); }',
    'is5': '.foo { box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.75); }',

    // size
    'wa': '.foo { width: auto; }',
    'ha': '.foo { height: auto; }',
    'ww': '.foo { width: 100%; }',
    'hh': '.foo { height: 100%; }',
    'w50p': '.foo { width: 50%; }',
    'w200': '.foo { width: 200px; }',
    'h200': '.foo { height: 200px; }',
    'max': '.foo { max-width: 100%; max-height: 100%; }',
    'min': '.foo { min-width: 100%; min-height: 100%; }',
    'max100': '.foo { max-width: 100px; max-height: 100px; }',
    'min100': '.foo { min-width: 100px; min-height: 100px; }',
    'max200x300': '.foo { max-width: 200px; max-height: 300px; }',
    'min200x300': '.foo { min-width: 200px; min-height: 300px; }',
    'max-w': '.foo { max-width: 100%; }',
    'max-h': '.foo { max-height: 100%; }',
    'min-w': '.foo { min-width: 100%; }',
    'min-h': '.foo { min-height: 100%; }',
    'max-w200': '.foo { max-width: 200px; }',
    'max-h200': '.foo { max-height: 200px; }',
    'min-w200': '.foo { min-width: 200px; }',
    'min-h200': '.foo { min-height: 200px; }',

    // text
    'nowrap': '.foo { white-space: nowrap; }',
    'x': '.foo { text-decoration: none; }',
    'u': '.foo { text-decoration: underline; }',
    'o': '.foo { text-decoration: overline; }',
    's': '.foo { text-decoration: line-through; }',
    'xx': '.foo { text-transform: none; }',
    'uc': '.foo { text-transform: uppercase; }',
    'lc': '.foo { text-transform: lowercase; }',
    'cc': '.foo { text-transform: capitalize; }',

    // theme
    'theme-navy': '.foo { color: #80bfff; background: #001f3f; }',
    'theme-blue': '.foo { color: #b3dbff; background: #0074d9; }',
    'theme-aqua': '.foo { color: #004966; background: #7fdbff; }',
    'theme-teal': '.foo { color: #000; background: #39cccc; }',
    'theme-olive': '.foo { color: #163728; background: #3d9970; }',
    'theme-green': '.foo { color: #0e3e14; background: #2ecc40; }',
    'theme-lime': '.foo { color: #00662c; background: #01ff70; }',
    'theme-yellow': '.foo { color: #665800; background: #ffdc00; }',
    'theme-orange': '.foo { color: #663000; background: #ff851b; }',
    'theme-red': '.foo { color: #800600; background: #ff4136; }',
    'theme-maroon': '.foo { color: #eb7ab1; background: #85144b; }',
    'theme-fuchsia': '.foo { color: #65064f; background: #f012be; }',
    'theme-purple': '.foo { color: #efa9f9; background: #b10dc9; }',
    'theme-black': '.foo { color: #ddd; background: #111; }',
    'theme-gray': '.foo { color: #000; background: #aaa; }',
    'theme-silver': '.foo { color: #000; background: #ddd; }',

    // transform
    'hflip': '.foo { transform: scale(-1, 1); }',
    'vflip': '.foo { transform: scale(1, -1); }',
    'scale25': '.foo { transform: scale(0.25); }',
    'rotate45': '.foo { transform: rotate(45deg); }',

    // user-select
    'no-user-select': '.foo { user-select: none; }',

    // zindex
    'z1': '.foo { z-index: 1; }',
    'z1n': '.foo { z-index: -1; }',

    // container/grid
    'grid3': '.foo > .col1 { width: 33.33333%; }\n\n.foo > .col2 { width: 66.66667%; }\n\n.foo > .col3 { width: 100%; }',
    'grid4': '.foo > .col1 { width: 25%; }\n\n.foo > .col2 { width: 50%; }\n\n.foo > .col3 { width: 75%; }\n\n.foo > .col4 { width: 100%; }'

};

describe('smcss', function () {

    it('basic', async function () {
        const s = await scss('.foo { color: red; }');
        assert(s == '.foo { color: red; }\n');
    });

    for (let a = Object.keys(table); a.length; ) {
        const expr = a.shift();
        it(expr, async function () {
            const s = await smcss(expr);
            const s2 = table[expr];
            assert(expr && s == s2);
        });
    }

});
