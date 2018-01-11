<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:80:"/data/home/bxu2713310775/htdocs/application/admin/view/index/addphoto_group.html";i:1501414051;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>







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
                    <form action="<?php echo url('Index/do_add_photo_group'); ?>" method="post" class="am-form am-form-horizontal">
                        <div class="am-form-group">
                            <label for="rule_en_name" class="am-u-sm-3 am-form-label">相册名字/ Name</label>
                            <div class="am-u-sm-9">
                                <input type="text" name="title" id="rule_en_name" placeholder="相册名字 / Name">
                                <span id="ergouzi">检查</span>
                                <small id="showenmsg"></small>
                            </div>
                        </div>
                        <div class="am-form-group">
                            <label  class="am-u-sm-3 am-form-label">上传者ID / Id</label>
                            <div class="am-u-sm-9">
                                <select name="tid">
                                    <option value="0">请选择</option>
                                    <?php if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                                    <option value="<?php echo $vo['id']; ?>"><?php echo $vo['truename']; ?></option>
                                    <?php endforeach; endif; else: echo "" ;endif; ?>

                                </select>
                            </div>
                        </div>


                        <div class="am-form-group">
                            <div class="am-u-sm-9 am-u-sm-push-3">
                                <button type="submit" class="am-btn am-btn-primary">提交</button>
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
    $('#ergouzi').click(function(){
        var Enname=$('#rule_en_name').val();
        if(Enname=='')
        {
            $('#showenmsg').html('名称不可用');
            $('#showenmsg').css('color','red');
            $('.am-btn-primary').attr('disabled',true);
            return false;
        }
        $.ajax({
            url:"<?php echo url('Index/checkenname'); ?>",
            type:"post",
            data:{names:Enname},
            success:function(data){
                $('#showenmsg').html(data.msg);
                if(data.status)
                {
                    $('#showenmsg').css('color','red');
                    $('.am-btn-primary').attr('disabled',true);
                }
                else{
                    $('#showenmsg').css('color','green');
                    $('.am-btn-primary').attr('disabled',false);
                }
            }
        });
    });
    $('#sangouzi').click(function(){
        var zhname=$('#rule_zh_name').val();
        if(zhname=='')
        {
            $('#showzhmsg').html('名称不可用');
            $('#showzhmsg').css('color','red');
            $('.am-btn-primary').attr('disabled',true);
            return false;
        }
        $.ajax({
            url:"<?php echo url('Index/checkzhname'); ?>",
            type:"post",
            data:{names:zhname},
            success:function(data){
                $('#showzhmsg').html(data.msg);
                if(data.status)
                {
                    $('#showzhmsg').css('color','red');
                    $('.am-btn-primary').attr('disabled',true);
                }
                else{
                    $('#showzhmsg').css('color','green');
                    $('.am-btn-primary').attr('disabled',false);
                }
            }
        });
    });
</script>
</body>

</html>