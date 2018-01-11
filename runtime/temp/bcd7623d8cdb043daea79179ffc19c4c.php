<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:78:"/data/home/bxu2713310775/htdocs/application/admin/view/index/up_groupinfo.html";i:1501414057;s:73:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/headcc.html";i:1501558014;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
    <link rel="icon" type="image/png" href="__STATIC__assets/i/favicon.png">
    <link rel="apple-touch-icon-precomposed" href="__STATIC__assets/i/app-icon72x72@2x.png">
    <meta name="apple-mobile-web-app-title" content="Amaze UI" />
    <link rel="stylesheet" href="__STATIC__assets/css/amazeui.min.css" />
    <link rel="stylesheet" href="__STATIC__assets/css/admin.css">
    <link rel="stylesheet" href="__STATIC__assets/css/app.css">
</head>
<body>



        <div class="tpl-content-wrapper1">
            
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                         用户组添加
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
                            <form class="am-form am-form-horizontal" action="<?php echo url('Index/up_think_auth_group'); ?>" method="post">

                                <div class="am-form-group">
                                    <label for="user_zh_name"  class="am-u-sm-3 am-form-label">职位 / ZhiWei</label>
                                    <div class="am-u-sm-9">
                                        <input type="hidden" name="id" value="<?php echo $info['id']; ?>">
                                        <input type="text" name="title" id="user_zh_name" value="<?php echo $info['title']; ?>" placeholder="职位 / Zhiwei">
                                        <small id="zhjs">输入用户中文名称</small>
                                    </div>


                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">状态 / Status</label>
                                    <div class="am-u-sm-9">
                                        <input type="radio" name="status" <?php if($info['status'] == 1): ?> checked="checked"<?php endif; ?> value="1"><small>启用</small>
                                        <input type="radio" name="status" <?php if($info['status'] == 0): ?> checked="checked"<?php endif; ?> value="0"><small>禁用</small>

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


        </div>


 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>

<script type="text/javascript">
    $('#user_zh_name').blur(function(){
        var Zhname=$(this).val();
        if(Zhname=='')
        {
            $('#zhjs').html('名称不可为空');
            $('#zhjs').css('color','red');
            return fales;
        }
       // alert (Zhname);
        $.ajax({
            url:"<?php echo url('Index/jianchazhname'); ?>",//到达的地址
            type:'post',
            data:{names:Zhname},
            success:function (data){
                //alert(data.zhuangtai);
                $('#zhjs').html(data.mags);
                if(data.zhuangtai)
                {
                    $('#zhjs').css('color','red');
                }
                else
                    {
                        $('#zhjs').css('color','green');
                    }
        }

        });
    });

    $('#user_qx_name').blur(function(){
        var qxname=$(this).val();
        if(qxname=='')
        {
            $('#qxjs').html('名称不可为空');
            $('#qxjs').css('color','red');
            return fales;
        }
        // alert (Zhname);
        $.ajax({
            url:"<?php echo url('Index/jianchaqxname'); ?>",//到达的地址
            type:'post',
            data:{names:qxname},
            success:function (data){
                //alert(data.zhuangtai);
                $('#qxjs').html(data.mags);
                if(data.zhuangtai)
                {
                    $('#qxjs').css('color','red');
                }
                else
                {
                    $('#qxjs').css('color','green');
                }
            }

        });
    });
    </script>



</body>

</html>