<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/addattence.html";i:1501650395;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
<!doctype html>
<html>

<head>
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
</head>

<body data-type="generalComponents">
        <div class="tpl-portlet-components">
            <div class="portlet-title">
                <div class="caption font-green bold">
                    <span class="am-icon-code"></span> 表单
                </div>
                <div class="tpl-portlet-input tpl-fz-ml">
                    <div class="portlet-input input-small input-inline">
                        <div class="input-icon right">
                            <i class="am-icon-search"></i>
                            <input type="text" class="form-control form-control-solid" placeholder="搜索..."> </div>
                    </div>
                </div>


            </div>
            <div class="tpl-block ">

                <div class="am-g tpl-amazeui-form">


                    <div class="am-u-sm-12 am-u-md-9">
                        <form action="<?php echo url('Index/do_addattence'); ?>" method="post" class="am-form am-form-horizontal">
                            <div class="am-form-group">
                                <label for="user-name" class="am-u-sm-3 am-form-label">教师Id / id</label>
                                <div class="am-u-sm-9">
                                   
                                     <select name="tid" id="tid">
                                            <option>请选择老师姓名</option>
                                           <?php if(is_array($tname) || $tname instanceof \think\Collection || $tname instanceof \think\Paginator): if( count($tname)==0 ) : echo "" ;else: foreach($tname as $key=>$tname): ?>
                                           <option value=<?php echo $tname['id']; ?> ><?php echo $tname['truename']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                          </select>
                            <small>输入这孩子老师的姓名</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label for="user-email" class="am-u-sm-3 am-form-label">学生Id / id</label>
                                <div class="am-u-sm-9">
                                    

                                        <select name="sid" id="tid">
                                         <option>请选择学生姓名</option>
                                           <?php if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): if( count($list)==0 ) : echo "" ;else: foreach($list as $key=>$list): ?>
                                           <option value=<?php echo $list['id']; ?> ><?php echo $list['sname']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                       </select>
                                         <small>输入学生的姓名</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label for="user-email" class="am-u-sm-3 am-form-label">未出勤的原因</label>
                                <div class="am-u-sm-9">
                                    <input type="text" name="intro" id="user-text" placeholder="未出勤的原因">
                                    <small></small>
                                </div>
                            </div>







                            <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3">
                                    <button type="submit" class="am-btn am-btn-primary">保存</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>


 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>
</body>

</html>