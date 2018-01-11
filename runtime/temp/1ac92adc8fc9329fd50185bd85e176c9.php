<?php if (!defined('THINK_PATH')) exit(); /*a:5:{s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/index/index.html";i:1501573759;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:73:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/header.html";i:1501579123;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/menu.html";i:1501653770;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>智慧幼儿园</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" type="image/png" href="__STATIC__assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="__STATIC__assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__assets/css/app.css">
</head>


<body data-type="generalComponents">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>智慧幼儿园</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" type="image/png" href="__STATIC__assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="__STATIC__assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__assets/css/app.css">
</head>

<body data-type="generalComponents">


    <header class="am-topbar am-topbar-inverse admin-header">
        <div class="am-topbar-brand">
            <a href="javascript:;" class="tpl-logo">
               <img src="__STATIC__assets/img/logo1.png" alt="">
               
               <!-- <img src="www.ryaonet.cn/public/static/assets/img/logo1.png" alt=""> -->
            </a>
        </div>
        <div class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right">

        </div>

        <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

        <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

            <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
               
               
                
                <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen" class="tpl-header-list-link"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>

                <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                    <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                        <span class="tpl-header-list-user-nick"><?php echo $truename['nickname']; ?></span><span class="tpl-header-list-user-ico"> <img src="http://www.ryaonet.cn/public/Uploads/<?php echo $truename['photo']; ?>"></span>
                    </a>
                    <ul class="am-dropdown-content">
                        <li><a href="#"><span class="am-icon-bell-o"></span> 资料</a></li>
                        <li><a href="#"><span class="am-icon-cog"></span> 设置</a></li>
                        <li><a href="<?php echo url('Index/tuichu'); ?>"><span class="am-icon-power-off"></span> 退出</a></li>
                    </ul>
                </li>
                <li><a href="<?php echo url('Index/tuichu'); ?>" class="tpl-header-list-link"><span class="am-icon-sign-out tpl-header-list-ico-out-size"></span></a></li>
            </ul>
        </div>
    </header>

	
	


<div class="tpl-page-container tpl-page-header-fixed">



    ﻿<div class="tpl-left-nav tpl-left-nav-hover">
            <div class="tpl-left-nav-title">
               智慧幼儿园 列表
            </div>
            <div class="tpl-left-nav-list">
                <ul class="tpl-left-nav-menu">
                    <li class="tpl-left-nav-item">
                        <a href="index.html" class="nav-link active">
                            <i class="am-icon-home"></i>
                            <span>首页</span>
                        </a>
                    </li>
                 <!--    <li class="tpl-left-nav-item">
                     <a href="chart.html" class="nav-link tpl-left-nav-link-list">
                         <i class="am-icon-bar-chart"></i>
                         <span>数据表</span>
                         <i class="tpl-left-nav-content tpl-badge-danger">
                                12
                              </i>
                     </a>
                 </li> -->


                     <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>教师表</span>

                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
      
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="1" data_id="<?php echo url('Index/teacherlist'); ?>">教师信息</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>

                                
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="2" data_id="<?php echo url('Index/recordlist'); ?>">记录信息</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                            </li>
                        </ul>
                    </li>
            
                    <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>智慧幼儿园</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="3" data_id="<?php echo url('Index/familylist'); ?>">家长表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>

                                
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="4" data_id="<?php echo url('Index/studentlist'); ?>">学生表</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                            </li>
                        </ul>
                    </li>
                    <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>相册</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                            <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="5" data_id="<?php echo url('Index/ablumnlist'); ?>">相册表</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                            </a>
                            
                            <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab"  data_sid="6" data_id="<?php echo url('Index/photo_grouplist'); ?>">相册分组</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                            </a>
                            
                               
                            </li>
                        </ul>
                    </li>

                    <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>幼儿管理</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="7" data_id="<?php echo url('Index/userlist'); ?>">幼儿列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                              <!--  <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_id="<?php echo url('Index/grouplist'); ?>">用户组列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
-->
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="8" data_id="<?php echo url('Index/calendar_list'); ?>">日程表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                                
                            </li>
                        </ul>
                    </li>

                    <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>话题管理</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="9" data_id="<?php echo url('Index/themelist'); ?>">话题列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                        </ul>
                    </li>
     <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>校园动态</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="9" data_id="<?php echo url('Index/noticelist'); ?>">动态列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                        </ul>
                    </li>
                    <li class="tpl-left-nav-item">
                <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                    <i class="am-icon-table"></i>
                    <span>校园通知</span>
                    <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                </a>
                <ul class="tpl-left-nav-sub-menu">
                    <li>
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="10" data_id="<?php echo url('Index/add_news'); ?>">添加通知</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="11" data_id="<?php echo url('Index/newslist'); ?>">通知列表</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                       <!--  <a href="javascript:" class="active">
                           <i class="am-icon-angle-right"></i>
                           <span class="js-append-tab" data_sid="12" data_id="<?php echo url('Index/add_new_cate'); ?>">添加新闻分类</span>
                           <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                       </a>
                       <a href="javascript:" class="active">
                           <i class="am-icon-angle-right"></i>
                           <span class="js-append-tab" data_sid="13" data_id="<?php echo url('Index/new_catelist'); ?>">新闻分类列表</span>
                           <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                              
                       </a> -->
                    </li>
                </ul>
            </li>



                    <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>班级表</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="14" data_id="<?php echo url('Index/do_teacher'); ?>">班级添加</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="15" data_id="<?php echo url('Index/comment'); ?>">教师评论</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                            
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="17" data_id="<?php echo url('Index/xiugai'); ?>">教师修改</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>

                                </a>
                            </li>
                        </ul>
                    </li>
                    
  <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>班级作业</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="14" data_id="<?php echo url('Index/classes'); ?>">班级作业</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                              
                            </li>
                        </ul>
                    </li>


                <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>即时通讯</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="9" data_id="<?php echo url('Index/telephonelist'); ?>">通讯列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                        </ul>
                    </li>


                <li class="tpl-left-nav-item">
                        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                            <i class="am-icon-table"></i>
                            <span>成长乐园</span>
                            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                        </a>
                        <ul class="tpl-left-nav-sub-menu">
                            <li>
                                <a href="javascript:" class="active">
                                    <i class="am-icon-angle-right"></i>
                                    <span class="js-append-tab" data_sid="9" data_id="<?php echo url('Index/leyuanlist'); ?>">乐园列表</span>
                                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                                </a>
                        </ul>
                    </li>
               


            <li class="tpl-left-nav-item">
                <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                    <i class="am-icon-table"></i>
                    <span>后台管理</span>
                    <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
                </a>

                <ul class="tpl-left-nav-sub-menu">
                    <li>
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="18" data_id="<?php echo url('Index/rulelist'); ?>">规则列表</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                        <a href="javascript:" class="active">
                            <i class="am-icon-angle-right"></i>
                            <span class="js-append-tab" data_sid="19" data_id="<?php echo url('Index/group_grouplist'); ?>">用户组列表</span>
                            <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                        </a>
                    </li>
                </ul>
            </li>
                  <!--   <li class="tpl-left-nav-item">
                      <a href="login.php" class="nav-link tpl-left-nav-link-list">
                          <i class="am-icon-key"></i>
                          <span>登录</span>
                  
                      </a>
                  </li> -->
                </ul>
            </div>
        </div>


    <style>
        .am-tabs-nav li {
            position: relative;
            z-index: 1;
        }

        .am-tabs-nav .am-icon-close {
            position: absolute;
            top: 0;
            right: 10px;
            color: #888;
            cursor: pointer;
            z-index: 100;
        }

        .am-tabs-nav .am-icon-close:hover {
            color: #333;
        }

        .am-tabs-nav .am-icon-close ~ a {
            padding-right: 25px!important;
        }
    </style>
    <div class="tpl-content-wrapper">

<div class="tpl-portlet-components">

    <div class="am-tabs" data-am-tabs="{noSwipe: 1}" id="doc-tab-demo-1">
        <ul class="am-tabs-nav am-nav am-nav-tabs">
            <li class="am-active"><a href="javascript: void(0)">首页</a></li>
        </ul>

        <div class="am-tabs-bd">
            <div class="am-tab-panel am-active">
                <style rel="stylesheet" type="text/css">
                    .today_font { color: #0b76ac; font-weight: 600;}
                    .main_left { width: 400px;float: left;}
                    .main_left h1 {color: #0e90d2;}
                    .main_left p { overflow: hidden;line-height: 35px;}
                    .main_left p span { display: block; width: 120px; text-align: left; float: left}
                    .main_right { float: left;}
                    .main_right h1 {color: #0e90d2;}
                    .main_right p { line-height: 35px;}
                </style>
                <div class="tpl-content-wrapper tpl-content-wrapper-center">
                    <div class="am-g">
                    <div class="am-u-sm-12">
                    <form class="am-form">
                    <div class="main_left">
                        <h1>用户信息</h1>
                        <p><span>上次登陆时间 :
                            <?php 
                                if(empty($lastLoginTime)){
                                    echo "欢迎登录";
                                }else{
                                ?>
                                 <?php echo date("Y-m-d H:i:s",$lastLoginTime); 
                                }
                            ?>
                            
            
                         </span></p>
                        <p><span>姓名 :<?php echo $truename['truename']; ?> </span></p>
                        <p><span>手机号 : <?php echo $truename['telphone']; ?></span></p>
                        <p><span>职位 :<?php echo $truename['dept']; ?></span> </p>
                        
                    </div>
                    <div class="main_right">
                        <h1>近期数据</h1>
                        <p>今天更新校园动态 <span class="today_font"><?php echo $noticeg; ?></span> 条，共收到 <span class="today_font"><?php echo $noticez; ?></span> 条动态</p>
                        <p>今天更新校园通知 <span class="today_font"><?php echo $newsg; ?></span> 条，共收到 <span class="today_font"><?php echo $newsz; ?></span> 条通知</p>
                        <p>今天更新成长记录 <span class="today_font"><?php echo $recordg; ?></span> 条，共收到 <span class="today_font"><?php echo $recordz; ?></span> 条记录</p>
                        <p>今天更新成长乐园 <span class="today_font"><?php echo $funlandg; ?></span> 条，共收到 <span class="today_font"><?php echo $funlandz; ?></span> 条成长乐园</p>
                        <p>今天更新互动圈 <span class="today_font"><?php echo $jrgx; ?></span> 条，共收到 <span class="today_font"><?php echo $zong; ?></span> 条互动圈</p>
                    </div>
                    </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
</div>

</div>

</div>

 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>

<script type="text/javascript">
    $(function() {
        $("#doc-form-file").change(function() {
            var $file = $(this);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $("#preview");

            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.attr('src',dataURL);
            }else{
                dataURL = $file.val();
                var imgObj = document.getElementById("preview");
// 两个坑:
// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
                imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

            }
        });
        var tabCounter = 0;
        var $tab = $('#doc-tab-demo-1');
        var $nav = $tab.find('.am-tabs-nav');
        var $bd = $tab.find('.am-tabs-bd');

        function addTab(titletext,urls) {
            $('.am-nav-tabs li').removeClass('am-active');
            $('.am-tabs-bd > div').removeClass('am-active');
            var nav = '<li class="am-active"><span class="am-icon-close"></span>' +
                    '<a href="javascript: void(0)">'+titletext+'</a></li>';
            var content = '<div class="am-tab-panel am-active"><iframe class="J_iframe" name="iframe0" width="100%" height="100%" style="min-height: 500px;" src="'+urls+'" frameborder="0" seamless></iframe></div>';

            $nav.append(nav);
            $bd.append(content);
            tabCounter++;
            $tab.tabs('refresh');
        }
        // 动态添加标签页
        $('.js-append-tab').on('click', function() {
            var titletext = $(this).text();
            var index = $(".am-nav-tabs a:contains('" + titletext + "')").parent().index();
            //alert(index);
            if (index > 0)
            {
                $tab.tabs('open',index);
            }
            else
            {
                var urls=$(this).attr('data_id');
                //$.post(urls,{},function(data,textStatus){
                addTab(titletext,urls);
                //});
            }
        });

        // 移除标签页
        $nav.on('click', '.am-icon-close', function() {
            var $item = $(this).closest('li');
            var index = $nav.children('li').index($item);

            $item.remove();
            $bd.find('.am-tab-panel').eq(index).remove();

            $tab.tabs('open', index > 0 ? index - 1 : index + 1);
            $tab.tabs('refresh');
        });

    });

</script>

</body>

</html>