<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:75:"/data/home/bxu2713310775/htdocs/application/admin/view/index/upclasses.html";i:1501655321;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
                <form class="am-form am-form-horizontal" method="post" action="<?php echo url('Index/do_upclasses'); ?>" enctype="multipart/form-data">
                    <div class="am-form-group">
                        <label for="user-name" class="am-u-sm-3 am-form-label">教师 / Id</label>
                        <div class="am-u-sm-9">
                            <input type="hidden" name="id" value="<?php echo $info['id']; ?>"/>
                            
                            <select name="tid" id="tid">
                             <option>请选择老师姓名</option>
                                           <?php if(is_array($tname) || $tname instanceof \think\Collection || $tname instanceof \think\Paginator): if( count($tname)==0 ) : echo "" ;else: foreach($tname as $key=>$tname): ?>
                                           <option value=<?php echo $tname['id']; if($info['tid'] == $tname['id']): ?> selected="selected" <?php endif; ?> ><?php echo $tname['truename']; ?></option>
                                           <?php endforeach; endif; else: echo "" ;endif; ?>
                             </select>
                            <small>输入这孩子老师的姓名</small>
                        </div>
                    </div>
                    <div class="am-form-group">
                        <label for="user-name" class="am-u-sm-3 am-form-label">科目</label>
                        <div class="am-u-sm-9">
                            <input type="text" name="title" value="<?php echo $info['title']; ?>" id="user-name" placeholder="科目">
                        </div>
                    </div>



                    <div class="am-form-group">
                        <label for="user-intro" class="am-u-sm-3 am-form-label">内容 / content</label>
                        <div class="am-u-sm-9">
                            <textarea class="" rows="5" name="content" id="user-intro" placeholder="输入作业内容"><?php echo $info['content']; ?></textarea>
                            <small>作业内容...</small>
                        </div>
                    </div>

                    <div class="am-form-group">
                        <div class="am-u-sm-9 am-u-sm-push-3">
                            <button type="submit" class="am-btn am-btn-primary">保存修改</button>
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
    });

</script>
</body>

</html>