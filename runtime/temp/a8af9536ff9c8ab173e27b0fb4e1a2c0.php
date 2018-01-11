<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/recordlist.html";i:1501589818;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>

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
                    <div class="am-btn-group am-btn-group-xs">
                        <a href="<?php echo url('Index/addrecord'); ?>"  class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                        <button type="button" id="trash-all" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                    </div>
                </div>
            </div>
            <div class="am-u-sm-12 am-u-md-3">
                <div class="am-form-group">
                    <select data-am-selected="{btnSize: 'sm'}">
                        <option value="option1">所有类别</option>
                        <option value="option2">IT业界</option>
                        <option value="option3">数码产品</option>
                        <option value="option3">笔记本电脑</option>
                        <option value="option3">平板电脑</option>
                        <option value="option3">只能手机</option>
                        <option value="option3">超极本</option>
                    </select>
                </div>
            </div>
            <div class="am-u-sm-12 am-u-md-3">
                <div class="am-input-group am-input-group-sm">
                    <input type="text" class="am-form-field">
                                <span class="am-input-group-btn">
            <button  class="am-btn  am-btn-default am-btn-success tpl-am-btn-success am-icon-search" type="button"></button>
          </span>
                </div>
            </div>
        </div>
        <div class="am-g">
            <div class="am-u-sm-12">
                <form class="am-form">
                    <table class="am-table am-table-striped am-table-hover table-main">
                        <thead>
                        <tr>
                            <th class="table-check"><input type="checkbox" id="check_rule_all" class="tpl-table-fz-check"></th>
                            <th class="table-id">ID</th>
                            <th class="table-type">发表人</th>
                            <th class="table-type">地址</th>
                            <th class="table-type">相册</th>
                            <th class="table-type">内容</th>
                            <th class="table-author am-hide-sm-only">时间</th>
                            <th class="table-set">操作</th>

                        </tr>
                        </thead>

                        <tbody>
                        <?php if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): if( count($list)==0 ) : echo "" ;else: foreach($list as $key=>$info): ?>
                        <tr>
                            <td><input type="checkbox" class="ids" value="<?php echo $info['id']; ?>" ></td>
                            <td><?php echo $info['id']; ?></td>
                            <td><?php echo $info['name']; ?></td>
                            <td><?php echo $info['address']; ?></td>
                            <td><img style="width: 45px;height:45px" id="preview" src="http://www.ryaonet.cn/__UPLOADS__<?php echo $info['photos']; ?>" alt=""></td>

                            <td class="am-hide-sm-only"><?php echo $info['content']; ?></td>
                            <td class="am-hide-sm-only"><?php echo date("Y-m-d",$info['pubdate']); ?></td>
                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <a href="<?php echo url('Index/uprecord',['id'=>$info['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</a>
                                        <a href="<?php echo url('Index/delrecord',['id'=>$info['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</a>
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
 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>
<script type="text/javascript">
    $('#fz-check-all').click(function(){
        //alert($(this).is(':checked'));
        if($(this).is(':checked'))
        {
            $('.groupids').prop('checked',true);
        }
        else
        {
            $('.groupids').prop('checked',false);
        }
    });
    $('#trash-all').click(function(){
        var ids='';
        $('.groupids').each(function(){
            if($(this).is(':checked'))
            {
                ids+=$(this).val()+',';
            }
        });
        ids=ids.substr(0,ids.length-1);
        window.location.href="/admin/Index/delrecord/id/"+ids;
    });
</script>

</body>

</html>
