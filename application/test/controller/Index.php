<?php
namespace app\test\controller;

use think\Controller;

class Index extends Controller
{
	public function index()
	{

		return $this->fetch();
	}

//APP BCZreact登录接口
	public function app()
	{	
		//return json('succ');
		$db=db('auth_user');
		// $data['username']='产品汪';
		// $data['password']=123;
		//print_r($data);
		
		$data['username']=input('post.username');
		$data['password']=input('post.password');
		  //  $data['username']='产品汪';
		  // $data['password']=123;
		$info=$db->where("username='".$data['username']."' and password='".$data['password']."'")
		->find();
		
		if($info)
		{
			$adata='succ';
		}else
			{
			$adata='fail';
			}
		return json($adata);
	}
//APP Zhuce注册接口
	public function zhuce()
	{
		$db=db('auth_user');

		//$data=input();
		$data['username']=input('post.username');
		$data['password']=input('post.password');
		$data['password1']=input('post.password1');
		
		if($data['username']&$data['password']&$data['password1']){
		if($data['password']==$data['password1'])
		{

			$info=$db->insert($data);
			if($info){
				$adata='succ';
				return json($adata);

			}else
			{
				$adata='fail';
				return json($adata);
			}
			

		}else
		{
			// mmbyz=密码不一致
			$adata='mmbyz';
			return json($adata);
		}

	}else
{
	$adata='yhmk';
	return json($adata);
}
}
	//调取校园动态值
	public function dongtai(){
		$db=db('news');
		$page=input('post.currage');
		$list=$db->page($page,4)->order('id desc')->select();
		foreach($list as &$v){
			$v['photo']="http://192.168.98.130".$v['photo'];
		}

		//print_r($list);
		return  json($list);
	}

	public function do_add()
	{

		$data=input('post.');



		if($data['password']==$data['password1'])
		{
			$file=request()->file('photo');
			$fileinfo=$file->move(config('upload_path'));

			$data['photo']=$fileinfo->getSavename();
			$data['inputtime']=time();

			$table=db('auth_user');
			$info=$table->insert($data);
			if($info)
			{
				$this->success('添加成功');
			}else
			{
				$this->error('添加失败');
			}
		}else
		{
			$this->error('密码不相同');
		}

	}

	public function userlist()
	{
		$table=db('auth_user');

		$list=$table->paginate(config('paginate.list_rows'));

		$this->assign('list',$list);
		$this->assign('ima_path',config('upload_path'));
		$this->assign('page',$list->render());
		return $this->fetch();
	}
	public function deluser()
	{
		$id= input('Id');
		$table=db('auth_user');
		$info=$table->where('Id='.$id)->delete();
		if($info)
		{
			$this->success('删除成功');
		}else
		{
			$this->error('删除失败');
		}
	}

	public function upuser()

	{
		$id=input('Id');
		$table=db('auth_user');
		$info=$table->where('Id='.$id)->find();

		$this->assign('info',$info);
			return $this->fetch();

	}

	public function do_upuser()
	{
		$data=input('post.');

		//echo "<pre>";
		//print_r($data);
		$file=request()->file('photo');
		//echo "<pre>";
		//print_r($file);exit;
		if($file){
				$fileinfo=$file->move(config('upload_path'));

				$data['photo']=$fileinfo->getSavename();
		}
		$table=db('user');
		$info=$table->update($data);
		if($info!==false)
		{
			$this->success('修改成功','Index/userlist');
		}else
		{
			$this->error('修改失败');
		}
	}
}