<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:76:"/data/home/bxu2713310775/htdocs/application/admin/view/index/leyuanlist.html";i:1501655976;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/head.html";i:1501579231;s:71:"/data/home/bxu2713310775/htdocs/application/admin/view/Public/foot.html";i:1501558013;}*/ ?>
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
                        <a href="<?php echo url('Index/add_leyuan'); ?>" type="button" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                       
                        <button type="button" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                    </div>
                </div>
            </div>
            
            <div class="am-u-sm-12 am-u-md-3">
                <div class="am-input-group am-input-group-sm">
                    <input type="text" class="am-form-field">
                                <span class="am-input-group-btn">
            <button class="am-btn  am-btn-default am-btn-success tpl-am-btn-success am-icon-search" type="button"></button>
          </span>
                </div>
            </div>
        </div>
        <div class="am-g">
            <div class="tpl-table-images">
                <?php if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): if( count($list)==0 ) : echo "" ;else: foreach($list as $key=>$vo): ?>
                <div class="am-u-sm-12 am-u-md-6 am-u-lg-4">
                    <div class="tpl-table-images-content">
                        <div class="tpl-table-images-content-i-time"><?php echo date("Y-m-d",$vo['pubdate']); ?></div>
                        <div class="tpl-i-title">

                        </div>
                        <a href="javascript:;" class="tpl-table-images-content-i">
                            <span class="tpl-table-images-content-i-shadow"></span>
                            <img src="http://www.ryaonet.cn/public/Uploads/<?php echo $vo['photo']; ?>" alt="">
                        </a>
                        <div class="tpl-table-images-content-block">
                            <div class="tpl-i-font">
                                <?php echo $vo['content']; ?>
                            </div>
                            <div class="tpl-i-more">
                                <ul>
                                    <li><span class="am-icon-qq am-text-warning"> 100+</span></li>
                                    <li><span class="am-icon-weixin am-text-success"> 235+</span></li>
                                    <li><span class="am-icon-github font-green"> 600+</span></li>
                                </ul>
                            </div>
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs tpl-edit-content-btn">
                                    <a href="<?php echo url('Index/add_leyuan',['id'=>$vo['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</a>
                                    <a href="<?php echo url('Index/up_leyuan',['id'=>$vo['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-edit"></span> 编辑</a>
                                    <button type="button" class="am-btn am-btn-default am-btn-warning"><span class="am-icon-archive"></span> 审核</button>
                                    <a href="<?php echo url('Index/del_leyuan',['id'=>$vo['id']]); ?>" type="button" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; endif; else: echo "" ;endif; ?>
                <div class="am-u-lg-12">
                    <div class="am-cf">

                        <div class="am-fr">
                            <ul class="am-pagination tpl-pagination">
                                <?php echo $page; ?>
                            </ul>
                        </div>
                    </div>
                    <hr>
                </div>

            </div>

        </div>
    </div>
    <div class="tpl-alert"></div>
</div>



 <script src="__STATIC__assets/js/jquery.min.js"></script>
    <script src="__STATIC__assets/js/amazeui.min.js"></script>
    <script src="__STATIC__assets/js/app.js"></script>

</body>

</html>