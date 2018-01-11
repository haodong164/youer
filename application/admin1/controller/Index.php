<?php
    namespace app\admin\controller;
	use think\Controller;
	//use app\admin\controller\Commen;
	
	class Index extends Commen
	{
		//首页
		public function index()
		{
			if (session('Id') == '') {
				$this->redirect('Index/login');
			} else {
				$table = db('auth_user');
				$info = $table->where('Id=' . session('Id'))->find();
				$this->assign('info', $info);
				return $this->fetch();
			}
		}

		public function tuichu()
		{

			unset($_SESSION["Id"]);
			//echo $_SESSION['Id'];exit;
			$this->success('退出成功', 'Index/index');
		}

		//权限列表
		public function permissionslist()
		{
			$db = db('auth_rule');
			$list = $db->paginate(config('paginate.list_rows'));//paginate查询分页 config助手函数 list_rows每页数
			$this->assign('list', $list);//获取值赋值给html
			$this->assign('page', $list->render());//render()从list调取渲染分页
			return $this->fetch();
		}

		//增添页面
		public function addpermissions()
		{
			//$groupid=input('id');
			$db = db('auth_rule');
			$rulelist = $db->where('parentid=0')->select();
			foreach ($rulelist as &$v) {
				$v['second'] = $db->where('parentid=' . $v['id'])->select();

			}
			$this->assign('rulelist', $rulelist);
			return $this->fetch();
		}

		//增添处理页面
		public function do_addpermissions()
		{
			$db = db("auth_rule");
			$input = input('post.');
			$info = $db->insert($input);
			if ($info) {
				$this->success('增加成功', 'Index/permissionslist');
			} else {
				$this->error('未知错误插入失败', 'Index/permissionslist');
			}

		}


		//ajax检查规则中英文名是否存在
		public function checkenname()
		{
			$name = input('post.names');
			$db = db('auth_rule');
			$info = $db->where("name= '" . $name . "'")->find();
			if ($info) {
				$adata = [
					'status' => 1,
					'msg' => '英文名称已存在'
				];
			} else {
				$adata = [
					'status' => 0,
					'msg' => '英文名称可用'
				];
			}
			return json($adata);//把数组值以json格式返回给success:function(data)
		}

		//ajax//检查规则中文名是否存在

		public function checkzwname()
		{
			$name = input('post.names');
			$db = db('auth_rule');
			$info = $db->where("title= '" . $name . "'")->find();
			if ($info) {
				$adata = [
					's' => 1,
					'msg' => '中文名称已存在'
				];
			} else {
				$adata = [
					's' => 0,
					'msg' => '中文名称可用'
				];
			}
			return json($adata);//把数组值以json格式返回给success:function(data)
		}

		//修改权限处理页面
		public function uppermissions()
		{
			$id = input('id');
			$db = db('auth_rule');
			$info = $db->where('id=' . $id)->find();
			$this->assign('info', $info);

			$db = db('auth_rule');
			$grouplist = $db->select();
			$this->assign('grouplist', $grouplist);

			//$groupid=input('id');
			$db = db('auth_rule');
			$rulelist = $db->where('parentid=0')->select();
			foreach ($rulelist as &$v) {
				$v['second'] = $db->where('parentid=' . $v['id'])->select();

			}
			$this->assign('rulelist', $rulelist);

			return $this->fetch();
		}

		//修改权限处理页面
		public function do_uppermissions()
		{
			$data = input('post.');

			$table = db('auth_rule');
			$info = $table->update($data);
			if ($info) {
				$this->success('修改成功', 'Index/permissionslist');
			} else {
				$this->error('修改失败');
			}
		}

		//删除权限
		public function delpermissions()
		{

			$id = input('id');
			$db = db('auth_rule');
			$info = $db->delete($id);
			//$info=$db->where('id in('.$id.')')->delete();
			if ($info) {
				$this->success('删除成功', 'Index/permissionslist');
			} else {
				$this->error('未知错误删除失败1', 'Index/permissionslist');
			}
		}


		//用户列表开始
		public function userlist()
		{
			$db = db('auth_user');
			$list = $db->paginate(config('paginate.list_rows'));
			$this->assign('page', $list->render());
			$this->assign('list', $list);
			return $this->fetch();
		}

		//用户列表删除
		public function deluser()
		{
			$id = input('id');
			$db = db('auth_user');
			$info = $db->delete($id);
			if ($info) {
				$this->success('删除成功', 'Index/userlist');
			} else {
				$this->error('删除失败未知原因', 'Index/userlist');
			}
		}

		//用户列表增加
		public function adduser()
		{
			$db = db('auth_group');
			$grouplist = $db->select();
			$this->assign('grouplist', $grouplist);
			return $this->fetch();
		}

		//用户添加处理页面
		public function do_adduser()
		{

			$data = input('post.');
			//print_r($data);exit;

			if ($data['password'] == $data['password1']) {
				$file = request()->file('photo');
				$fileinfo = $file->move(config('upload_path'));

				$data['photo'] = $fileinfo->getSavename();
				$data['inputtime'] = time();
				$gdata['group_id'] = $data['groupname'];
				unset($data['groupname']);

				$table = db('auth_user');
				$info = $table->insert($data);
				if ($info) {
					$gdata['uid'] = $table->getLastInsID();
					$table1 = db('auth_group_access');
					$tbinfo = $table1->insert($gdata);
					if ($tbinfo) {
						$this->success('添加成功', 'Index/userlist');
					} else {
						$this->error('添加失败', 'Index/userlist');
					}

				} else {
					$this->error('添加失败', 'Index/userlist');
				}
			} else {
				$this->error('密码不相同', 'Index/userlist');
			}

		}

		//ajax//检查规则中文名是否存在

		public function username()
		{
			$name = input('post.username');
			$db = db('auth_user');
			$info = $db->where("username= '" . $name . "'")->find();
			if ($info) {
				$adata = [
					's' => 1,
					'msg' => '中文名称已存在'
				];
			} else {
				$adata = [
					's' => 0,
					'msg' => '中文名称可用'
				];
			}
			return json($adata);//把数组值以json格式返回给success:function(data)
		}

		//修改页面
		public function upuser()
		{
			$db = db('auth_group');
			$grouplist = $db->select();
			$this->assign('grouplist', $grouplist);


			$data = input('id');
			$db = db('auth_user');
			$info = $db->where('Id=' . $data)->find();
			$this->assign('list', $info);

			$group = db('auth_group_access')->where('uid=' . $data)->find();
			$this->assign('groupid', $group['group_id']);


			return $this->fetch();
		}

		//修改处理页面
		public function do_upuser()
		{
			$data = input('post.');
			$id = $data['Id'];
			unset($data['Id']);
			//echo "<pre>";
			//print_r($data);
			$file = request()->file('photo');
			//echo "<pre>";
			//print_r($file);exit;

			if ($file) {
				$fileinfo = $file->move(config('upload_path'));

				$data['photo'] = $fileinfo->getSavename();
			}
			$table = db('auth_user');
			$gdata['group_id'] = $data['groupname'];
			unset($data['groupname']);
			$info = $table->where('Id=' . $id)->update($data);
			$info1 = db('auth_group_access')->where('uid=' . $id)->update($gdata);
			if ($data['password'] == $data['password1']) {
				if ($info || $info1) {
					$this->success('修改成功', 'Index/userlist');
				} else {
					$this->error('修改失败');
				}
			} else {
				$this->error('密码不相同', 'Index/userlist');
			}
		}

		//管理员列表
		public function auth_group()
		{
			$db = db('auth_group');
			$list = $db->paginate(config('paginate.list_rows'));
			$this->assign('page', $list->render());
			$this->assign('list', $list);
			return $this->fetch();
		}

		//权限管理
		public function auth_guanli()
		{
			$groupid = input('id');
			$db = db('auth_rule');
			$rulelist = $db->where('parentid=0')->select();
			foreach ($rulelist as &$v) {
				$v['second'] = $db->where('parentid=' . $v['id'])->select();
				foreach ($v['second'] as &$t) {
					$t['third'] = $db->where('parentid=' . $t['id'])->select();
				}
			}
			$this->assign('group', $groupid);
			$this->assign('rulelist', $rulelist);
			return $this->fetch();
		}

		//权限管理处理页面
		public function do_auth_guanli()
		{
			$data = input('post.');
			$db = db('auth_group');
			$rules = implode(',', $data['rule']);
			$adata = [
				'rules' => $rules
			];

			$info = $db->where('id=' . $data['groupid'])->update($adata);
			if ($info !== false) {
				$this->success('保存成功', 'Index/auth_group');
			} else {
				$this->error('保存失败', 'Index/auth_group');
			}
		}

		//管理员auth_group删除
		public function del_auth_group()
		{
			$id = input('id');

			$db = db('auth_group');
			$info = $db->delete($id);
			if ($info) {
				$this->success('删除成功', 'Index/auth_group');
			} else {
				$this->error('删除失败未知原因', 'Index/auth_group');
			}
		}

		//管理员增加页面
		public function add_auth_group()
		{

			return $this->fetch();
		}

		//JS检测
		public function groupjc()
		{
			$name = input('post.names');
			$db = db('auth_group');
			$info = $db->where("title= '" . $name . "'")->find();
			if ($info) {
				$adata = [
					'status' => 1,
					'msg' => '英文名称已存在'
				];
			} else {
				$adata = [
					'status' => 0,
					'msg' => '英文名称可用'
				];
			}
			return json($adata);//把数组值以json格式返回给success:function(data)
		}

		//管理员增加处理页面
		public function do_add_auth_group()
		{
			$db = db('auth_group');
			$data = input('post.');
			$info = $db->insert($data);
			if ($info) {
				$this->success('增加成功', 'Index/auth_group');
			} else {
				$this->error('未知原因增加失败', 'Index/auth_group');
			}
		}

		//管理员编辑页面
		public function up_auth_group()
		{
			$id = input('id');
			$db = db('auth_group');
			$list = $db->where('id=' . $id)->find();
			$this->assign('list', $list);
			return $this->fetch();
		}

		//管理员编辑处理页面
		public function do_up_auth_group()
		{
			$data = input('post.');
			//print_r($data);exit;
			$table = db('auth_group');
			$info = $table->update($data);
			if ($info) {
				$this->success('修改成功', 'Index/auth_group');
			} else {
				$this->error('修改失败');
			}

		}

		//索引页
		public function access()
		{
			$db = db('auth_group_access');
			$data = $db->paginate(config('paginate.list_rows'));
			$this->assign('list', $data);
			$this->assign('page', $data->render());
			return $this->fetch();
		}
		//此处有BUG,索引页基于其他两个表的ID此处可增删改违背了正常逻辑
		//索引增加页面
		public function addaccess()
		{
			return $this->fetch();
		}

		//索引增加处理页面
		public function do_addaccess()
		{
			$data = input('post.');
			$db = db('auth_group_access');
			$info = $db->insert($data);
			if ($info) {
				$this->success('增加成功', 'Index/access');
			} else {
				$this->error('增加失败', 'Index/access');
			}
		}

		//编辑索引页
		public function upaccess()
		{
			$id = input('id');
			$db = db('auth_group_access');
			$data = $db->where('uid=' . $id)->find();
			$this->assign('list', $data);
			return $this->fetch();
		}

		public function upuseraccess()
		{
			$id = input('id');
			$db = db('auth_group_access');
			$data = $db->where('group_id=' . $id)->find();
			$this->assign('list', $data);
			return $this->fetch();
		}

		//编辑索引处理页面
		public function do_upaccess()
		{
			$id = input('post.uid');
			$data = input('post.');
			$db = db('auth_group_access');
			$info = $db->where('uid=' . $id)->update($data);
			if ($info) {
				$this->success('修改成功', 'Index/access');
			} else {
				$this->error('修改失败');
			}
		}

		public function do_upuseraccess()
		{
			$id = input('post.group_id');
			$data = input('post.');
			$db = db('auth_group_access');
			$info = $db->where('group_id=' . $id)->update($data);
			if ($info) {
				$this->success('修改成功', 'Index/access');
			} else {
				$this->error('修改失败');
			}
		}

		//删除索引表
		public function delaccess()
		{
			$id = input('id');
			//print_r($id);exit;
			$db = db('auth_group_access');
			$info = $db->where('uid in(' . $id . ')')->delete($id);
			//$info=$db->delete($id);
			if ($info) {
				$this->success('删除成功', 'Index/access');
			} else {
				$this->error('删除失败');
			}
		}

		public function xinwen()
		{
//			echo "<pre>";
//			print_r($_SESSION);
//
//			echo $_SESSION['think']['Id'];exit;


			$username['username'] = $_SESSION['think']['username'];
			$username['time'] = date("Y-m-d H:i:s");

			$this->assign('name', $username);

			return $this->fetch();
		}

		public function do_xinwen()
		{
			$data = input('post.');

			$file = request()->file('photo');

			$fileinfo = $file->move(config('upload_path'));
			$data['photo'] = $fileinfo->getSavename();

			$db = db('xinwen');
			$info = $db->insert($data);
			if ($info) {
				$this->success('增加成功', 'Index/xinwenlist');
			} else {
				$this->error('增加失败', 'Index/xinwenlist');
			}
 
		}

		public function xinwenlist()
		{

			$db = db('xinwen');
			$info = $db->paginate(config('paginate.list_rows'));
			$page = $info->render();
			//print_r($page);exit;
			$this->assign('page', $page);
			$this->assign('zhi', $info);
			return $this->fetch();
		}

		public function upxinwen()
		{
			$id = input('id');
			$db = db('xinwen');
			$info = $db->where('Id=' . $id)->find();
			$this->assign('name', $info);
			return $this->fetch();
		}

		public function do_upxinwen()
		{
			$id = input('Id');
			$data = input('post.');
			$file = request()->file('photo');
			if ($file) {
				$fileinfo = $file->move(config('upload_path'));
				$data['photo'] = $fileinfo->getSavename();
			}
			$db = db('xinwen');
			$info = $db->where('Id=' . $id)->update($data);
			if ($info) {
				$this->success('修改成功', 'Index/xinwenlist');
			} else {
				$this->error('修改失败', 'Index/xinwenlist');
			}

		}

		public function delxinwen()
		{
			$db=db('xinwen');
			$id=input('id');

			$info=$db->delete($id);
			if ($info) {
				$this->success('删除成功', 'Index/xinwenlist');
			} else {
				$this->error('删除失败', 'Index/xinwenlist');
			}
		}


		//智慧幼儿园项目

		//家长模块
		public function familylist()
		{
			$db=db('family');
			$list=$db->paginate(config('paginate.list_rows'));
			$this->assign('page',$list->render());
			$this->assign('list',$list);
			return $this->fetch();

		}
		//增
		public function  addfamily()
		{
			return $this->fetch();
		}

		public function do_addfamily()
		{

			$data=input('post.');
			$db=db('family');
			$file = request()->file('photo');
			$fileinfo = $file->move(config('upload_path'));
			$data['photo'] = $fileinfo->getSavename();
			$info=$db->insert($data);
			if($info)
			{
				$this->success('增加成功','Index/familylist');
			}else
			{
				$this->error('增加失败','Index/familylist');
			}
		}

		public function upfamily()
		{
			$id=input('id');
			$db=db('family');
			$list=$db->where('id='.$id)->find();
			//print_r($list);exit;
			$this->assign('list',$list);
			return $this->fetch();
		}

		public function do_upfamily()
		{
			$db=db('family');
			$data=input('post.');
			$file = request()->file('photo');
			if($file) {
				$fileinfo = $file->move(config('upload_path'));
				$data['photo'] = $fileinfo->getSavename();
			}

			$info=$db->update($data);
			if($info)
			{
				$this->success('修改成功','Index/familylist');
			}else
			{
				$this->error('修改失败',Index/familylist);
			}
		}

		public  function delfamily()
		{
			$id=input('id');
			$db=db('family');
			$info=$db->delete($id);
			if($info)
			{
				$this->success('删除成功','Index/familylist');
			}
			else
			{
				$this->error('删除失败','Index/familylist');
			}
		}

	}