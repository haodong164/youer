<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/do_teacher.html";i:1501414054;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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

<body>
    
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
                            <form class="am-form am-form-horizontal" action="<?php echo url('Index/do_class'); ?>" method="post">
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">班级</label>
                                    <div class="am-u-sm-9">
                                        <input type="text" id="user-name" placeholder="班级" name="class_name">
                                        <small id="showenmsg"></small>
                                    </div>
                                </div>
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">教师</label>
                                    <div class="am-u-sm-9">
                                       <select name="tid" id="user">
                                           <option>请选择教师</option>
                                           <?php if(is_array($jiaoshi) || $jiaoshi instanceof \think\Collection || $jiaoshi instanceof \think\Paginator): if( count($jiaoshi)==0 ) : echo "" ;else: foreach($jiaoshi as $key=>$jiaoshi): ?>
                                           <option value="<?php echo $jiaoshi['id']; ?>"><?php echo $jiaoshi['truename']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                                       </select>
                                        <small>请选择所负责的教师</small>
                                    </div>
                                </div>
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="submit" class="am-btn am-btn-primary">保存修改</button>
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