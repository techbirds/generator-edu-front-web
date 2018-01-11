<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="app"></div>

    <div id="template-box" style="display:none;">
        <!-- @TEMPLATE -->
        <textarea name="html" data-src="module/layout/index.html"></textarea>
        <!-- /@TEMPLATE -->
        <!-- @MODULE -->
        <textarea name="html" data-src="module/home/index.html"></textarea>
        <!-- /@MODULE -->
    </div>

    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <script>
        location.config = {
            root: '/src/pages/demo2/'
        };
    </script>
    <script src="/src/lib/regularjs/dist/regular.js"></script>
    <script src="/src/lib/nej/src/define.js?pool=/src/lib/&pro=/src/pages/"></script>
    <script src="/src/pages/demo2/app.js"></script>

</body>

</html>