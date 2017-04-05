<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link href="../demo.css?<?php echo uniqid() ?>" type="text/css" rel="stylesheet">
    <style type="text/css">
    .mt10 { margin-top: 10px; }
    .ml10 { margin-left: 10px; }
    .m5 { margin: 5px; }
    .m10 { margin: 10px; }
    </style>
</head>
<body>

<div id="app" class="mt50">
    <div class="fix tlbr ba z1 ph15 bs10 white">
        <input v-model="width" class="ww" type="range" min="100" max="1200">
    </div>
    <div class="ma dashed bs10 red" v-bind:style="{width: width + 'px'}">
        <div class="grid5 floats mt10n ml10n">
            <div v-for="clipart in cliparts" v-bind:class="[clipart.col]">
                <div v-bind:class="[clipart.expand]">
                    <div class="abs tlbr mt10 ml10 br3 theme-white">
                        <!-- .ww.hh is necessary for FireFox only -->
                        <button class="abs tlbr ww hh p5 xbutton">
                            <svg class="db ww hh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <path d="M91.826 5.975V71.59c0 3.27-2.367 7.328-5.186 8.906L55.186 98.422c-2.818 1.578-7.554 1.578-10.372 0L13.36 80.496c-2.819-1.578-5.186-5.637-5.186-8.906V5.975C8.174 2.705 10.879 0 14.149 0h71.59c3.269 0 6.087 2.706 6.087 5.975zm-42.502 6.652v39.346c0-.902-4.06-1.24-6.652-.676-5.975 1.127-9.245 6.087-8.23 11.048.902 4.96 5.411 7.666 11.387 6.539 5.186-1.015 7.102-4.51 7.102-9.47V27.959c3.608 0 14.43 9.245 8.568 25.029h1.128c11.612-25.705-12.402-27.396-12.289-40.361h-1.014z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.2.5/vue.min.js" type="text/javascript"></script>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            cliparts: [
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col2', expand: 'expand-2-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
                {col: 'col1', expand: 'expand-1-1'},
            ],
            width: 500
        }
    });
</script>

</body>
</html>
