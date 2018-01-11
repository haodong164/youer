<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:74:"/data/home/bxu2713310775/htdocs/application/admin/view/index/upfamily.html";i:1501591025;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
﻿<!doctype html>
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
                <form action="<?php echo url('Index/do_upfamily'); ?>" method="post" enctype="multipart/form-data" class="am-form am-form-horizontal">
                    <div class="am-form-group">
                        <label  id="rule_en_name" class="am-u-sm-3 am-form-label">姓名 / Name</label>
                        <div class="am-u-sm-9">
                            <input type="hidden" name="id" value="<?php echo $list['id']; ?>">
                            <input type="text" name="truename" id="rulename"  value="<?php echo $list['truename']; ?>"  placeholder="姓名 / Name">
                            <small id="showjs" >输入你的名字，让我们记住你。</small>
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label for="user-QQ"  class="am-u-sm-3 am-form-label">密码</label>
                        <div class="am-u-sm-9">
                            <input type="password" name="password"  value="<?php echo $list['password']; ?>" pattern="[0-9]*" id="user-QQ" placeholder="输入密码">
                        </div>
                    </div>

                    <!--<div class="am-form-group">-->
                    <!--<label for="user-QQ"  class="am-u-sm-3 am-form-label">确认密码</label>-->
                    <!--<div class="am-u-sm-9">-->
                    <!--<input type="password" name="password1" pattern="[0-9]*" id="user-QQ" placeholder="输入密码">-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="am-form-group">
                        <label  class="am-u-sm-3 am-form-label">头像 / Photo</label>
                        <div class="am-u-sm-9">
                            <div class="am-form-group am-form-file">
                                <div class="tpl-form-file-img">
                                    <img style="max-height: 200px; width: auto;" id="preview" src="http://www.ryaonet.cn/public/Uploads/<?php echo $list['photo']; ?>" alt="">
                                </div>
                                <button type="button" class="am-btn am-btn-danger am-btn-sm">
                                    <i class="am-icon-cloud-upload"></i> 添加封面图片</button>
                                <input id="doc-form-file" name="photo" type="file" multiple>
                            </div>
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label for="user-phone" class="am-u-sm-3 am-form-label">昵称/ Nickname</label>
                        <div class="am-u-sm-9">
                            <input type="tel"   name="nickname"   value="<?php echo $list['nickname']; ?>" id="user-phone" placeholder="昵称 / Nickname">
                        </div>
                    </div>

                    <div class="am-form-group">
                        <label for="user-phone" class="am-u-sm-3 am-form-label">性别/ Sex</label>
                        <div class="am-u-sm-9">
                            男
                            <input type="radio" id="user-phone" <?php if($list['sex'] == 0): ?>checked="checked"<?php endif; ?>  value="0"  name="sex" >
                            女
                            <input type="radio"  <?php if($list['sex'] == 1): ?>checked="checked"<?php endif; ?>   value="1" name="sex">

                        </div>
                    </div>

                    <div class="am-form-group">
                        <label for="user-phone" class="am-u-sm-3 am-form-label">电话 / Telephone</label>
                        <div class="am-u-sm-9">
                            <input type="tel" maxlength="11"  name="telphone" id="user-phone"  value="<?php echo $list['telphone']; ?>" placeholder="输入你的电话号码 / Telephone">
                        </div>
                    </div>






                    <div class="am-form-group">
                        <div class="am-u-sm-9 am-u-sm-push-3">
                            <button type="submit" class="am-btn am-btn-primary ">保存修改</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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


    $('#rulename').blur(function(){
        var Enname=$(this).val();//获得当前框中的值
        //  alert(Enname);
        if(Enname=='')
        {
            $('#showjs').html('名称不可为空');
            $('#showjs').css('color','red');
            $('.am-btn-primary').attr('disabled',true);
            return false;

        }

        $.ajax({
            url:"<?php echo url('Index/username'); ?>",
            type:"post",
            data:{names:Enname},
            success:function (data) {
                // alert(data.zhuangtai);
                $('#showjs').html(data.msg);
                if(data.s)
                {
                    $('#showjs').css('color','red');
                    $('.am-btn-primary').attr('disabled',true);
                }
                else
                {
                    $('#showjs').css('color','green');
                    $('.am-btn-primary').attr('disabled',false);
                }
            }
        });


    });
</script>
</body>

</html>