<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/familylist.html";i:1501590751;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
            <span class="am-icon-code"></span> 列表
        </div>
        <div class="tpl-portlet-input tpl-fz-ml">
            <div class="portlet-input input-small input-inline">
                <div class="input-icon right">
                    <i class="am-icon-search"></i>
                    <input type="text" class="form-control form-control-solid" placeholder="搜索..."> </div>
            </div>
        </div>


    </div>
    <div class="tpl-block">
        <div class="am-g">
            <div class="am-u-sm-12 am-u-md-6">
                <div class="am-btn-toolbar">
                    <div class="am-btn-group am-btn-group -xs">
                        <a type="button" href="<?php echo url('Index/addfamily'); ?>" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                       
                        <a type="button"  id="delete" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</a>
                    </div>
                </div>
            </div>
          
           
        </div>
        <div class="am-g">
            <div class="am-u-sm-12">
                <form class="am-form" action="<?php echo url('Index/delfamily'); ?>" method="post">
                    <table class="am-table am-table-striped am-table-hover table-main">
                        <thead>
                        <tr>
                            <th class="table-check"><input type="checkbox" id="quanxuan" class="tpl-table-fz-check"></th>
                            <th class="table-id">ID</th>

                            <th class="table-title">家长姓名</th>
                            <th class="table-type">昵称</th>
                            <th class="table-date am-hide-sm-only">性别</th>
                            <th class="table-date am-hide-sm-only">是否激活</th>
                            <th class="table-id">手机号</th>
                            <th class="table-set">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?>
                        <tr>
                            <td><input type="checkbox"  value="<?php echo $vo['id']; ?>" class="ids"></td>
                            <td><?php echo $vo['id']; ?></td>
                            <td><a href="#"><?php echo $vo['truename']; ?></a></td>
                            <td class="am-hide-sm-only"><?php echo $vo['nickname']; ?></td>
                            <td><?php echo !empty($vo['sex'])?'女':'男'; ?></td>
                            <td><?php echo !empty($vo['status'])?'激活':'未激活'; ?></td>
                            <td class="am-hide-sm-only"><?php echo $vo['telphone']; ?></td>


                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <a class="am-btn am-btn-default am-btn-xs am-text-secondary" href="<?php echo url('Index/upfamily',['id'=>$vo['id']]); ?>" ><span class="am-icon-pencil-square-o"></span> 编辑</a>
                                        
                                        <a class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only" href="<?php echo url('Index/delfamily',['id'=>$vo['id']]); ?>"><span class="am-icon-trash-o"></span> 删除</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <?php endforeach; endif; else: echo "" ;endif; ?>


                        </tbody>
                    </table>
                    <div class="am-cf">

                        <div class="am-fr">
                            <?php echo $page; ?>
                        </div>
                    </div>
                    <hr>

                </form>
            </div>

        </div>
    </div>
    <div class="tpl-alert"></div>
</div>










</div>

</div>


 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>
<script type="text/javascript">
    $('#quanxuan').click(function(){
        if($(this).is(':checked'))
        {
            $('.ids').prop('checked',true);
        }else
        {
            $('.ids').prop('checked',false);
        }

    });
    $('#delete').click(function(){
        var idds='';
        $('.ids').each(function () {
            if($(this).is(':checked'))
            {
                idds+=$(this).val()+',';
            }

        });
        idds=idds.substr(0,idds.length-1);
        window.location.href="/index.php/admin/Index/delfamily/id/"+idds;
    })
</script>
</body>

</html>