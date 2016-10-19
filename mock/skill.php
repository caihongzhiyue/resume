<?php
header("Access-Control-Allow-Origin:*");

$postData = '[{
    "id": 0,
    "name": "HTML4/HTML5/ES5/ES6/CommonJs/Amd/Cmd等规范",
    "lastText": "了解互联网的一些常用规范的知识内容",
    "face": "img/h5.png"
  }, {
    "id": 1,
    "name": "Jquery/Zepto/Angular/Easyui/BootStrap/Mui/Yo/Ionic",
    "lastText": "灵活运用众多的框架内容，包括纯界面框架、交互框架及软件集成应用框架",
    "face": "img/angular.png"
  }, {
    "id": 2,
    "name": "Swiper/Iscroll",
    "lastText": "熟练操作各种类库及框架插件",
    "face": "img/jquery.png"
  }, {
    "id": 3,
    "name": "webapp/webChat Jssdk/phonegap",
    "lastText": "轻松实现轻应用开发、微信集成以及独立移动软件的混合式开发",
    "face": "img/weixinjs.png"
  }, {
    "id": 4,
    "name": "Fekit/gulp/Hbuilder/Atom/Sublime",
    "lastText": "对于前端自动化构建工作能够在不同的项目里进行恰当的使用与整合",
    "face": "img/gulp.png"
  }, {
    "id": 5,
    "name": "行业知识",
    "lastText": "了解互联网的发展及趋势，移动应用成为未来的方向",
    "face": "img/phonegap.png"
  }, {
    "id": 6,
    "name": "JavaScript",
    "lastText": "原生JavaScript",
    "face": "img/js.png"
  }, {
    "id": 7,
    "name": "Zepto",
    "lastText": "针对PC端Dom对象的开发模式，较为熟悉",
    "face": "img/Zepto.png"
  }]';

//$dataArr =  json_decode($postData);
//echo json_encode($dataArr[2]);
function json_clean_decode($json, $assoc = false, $depth = 512, $options = 0) {
    // search and remove comments like /* */ and //
    $json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t]//.*)|(^//.*)#", '', $json);
    
    if(version_compare(phpversion(), '5.4.0', '>=')) {
        $json = json_decode($json, $assoc, $depth, $options);
    }
    elseif(version_compare(phpversion(), '5.3.0', '>=')) {
        $json = json_decode($json, $assoc, $depth);
    }
    else {
        $json = json_decode($json, $assoc);
    }

    return $json;
}

echo json_encode(json_clean_decode($postData));
?>