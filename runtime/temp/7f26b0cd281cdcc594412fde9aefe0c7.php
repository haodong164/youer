<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:74:"/data/home/bxu2713310775/htdocs/application/admin/view/index/add_news.html";i:1501653575;}*/ ?>

<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Amaze UI Admin index Examples</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="icon" type="image/png" href="assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__/assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__/assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__/assets/css/app.css">
</head>

<body>



<div class="tpl-portlet-components">
    <div class="portlet-title">
        <div class="caption font-green bold">
            新的用户
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
                <form action="<?php echo url('Index/do_add_news'); ?>" method="post"  class="am-form am-form-horizontal">
                    <div class="am-form-group">
                        <label for="rule_zh_name" class="am-u-sm-3 am-form-label">新闻标题 / Title</label>
                        <div class="am-u-sm-9">
                            <input type="text" name="title"  id="rule_zh_name" placeholder="新闻标题 / Title">
                            <small id="showzhmsg"></small>
                        </div>
                    </div>

                     <div class="am-form-group">
                        <label for="rule_zh_name" class="am-u-sm-3 am-form-label">新闻副标题 / Title</label>
                        <div class="am-u-sm-9">
                            <input type="text" name="futitle"  id="rule_zh_name" placeholder="新闻副标题 / Title">
                            <small id="showzhmsg"></small>
                        </div>
                    </div>



                    <!-- <div class="am-form-group">
                        <label class="am-u-sm-3 am-form-label">新闻分类ID</label>
                        <div class="am-u-sm-9">
                            <select name="pid">
                                <?php if(is_array($rulelist) || $rulelist instanceof \think\Collection || $rulelist instanceof \think\Paginator): $i = 0; $__LIST__ = $rulelist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                <option value="<?php echo $vo['id']; ?>"><?php echo $vo['id']; ?></option>
                                <?php endforeach; endif; else: echo "" ;endif; ?>
                            </select>
                        </div>
                    </div> -->
                    <div class="am-form-group">
                        <label class="am-u-sm-3 am-form-label">发布人ID</label>
                        <div class="am-u-sm-9">
                            <select name="tid">
                             <option>请选择老师姓名</option>
                                <?php if(is_array($rulelists) || $rulelists instanceof \think\Collection || $rulelists instanceof \think\Paginator): $i = 0; $__LIST__ = $rulelists;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                <option value="<?php echo $vo['id']; ?>"><?php echo $vo['truename']; ?></option>
                                <?php endforeach; endif; else: echo "" ;endif; ?>
                            </select>
                        </div>
                    </div>



                    <div class="am-form-group">
                        <label for="user-intro" class="am-u-sm-3 am-form-label">简介 / Intro</label>
                        <div class="am-u-sm-9">
                           <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
   
    </script>
    <!-- 配置文件 -->
    <script type="text/javascript" src="__STATIC__Ueditor/ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="__STATIC__Ueditor/ueditor.all.js"></script>
    <!-- 实例化编辑器 -->
    <script type="text/javascript">
        var ue = UE.getEditor('container');
    </script>
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
</div>>


<import type='js' file="public/ueditor/editor_config" />  
<import type='js' file="public/ueditor/editor_all" />  
<import type='css' file="public/ueditor/themes/default/ueditor" />

<script src="__STATIC__/assets/js/jquery.min.js"></script>
<script src="__STATIC__/assets/js/amazeui.min.js"></script>
<script src="__STATIC__/assets/js/app.js"></script>
<script type="text/javascript">
    /*$(function() {
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
    });*/

    // $('#rule_zh_name').blur(function(){
    //     var zhname=$(this).val();
    //     if(zhname=='')
    //     {
    //         $('#showzhmsg').html('标题名称不可为空');
    //         $('#showzhmsg').css('color','red');
    //         $('.am-btn-primary').attr('disabled',true);
    //         return false;
    //     }
    //     $.ajax({
    //         url:"<?php echo url('Index/checkzhname'); ?>",
    //         type:"post",
    //         data:{names:zhname},
    //         success:function(data){
    //             //alert(data.status);
    //             $('#showzhmsg').html(data.msg);
    //             if(data.status)
    //             {
    //                 $('#showzhmsg').css('color','red');
    //                 $('.am-btn-primary').attr('disabled',true);
    //             }else{
    //                 $('#showzhmsg').css('color','green');
    //                 $('.am-btn-primary').attr('disabled',false);
    //             }
    //         },
    //         error:function(){
    //             alert('未知错误');
    //         }
    //     });
    // });

</script>
</body>

</html>