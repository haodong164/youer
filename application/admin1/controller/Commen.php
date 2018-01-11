<?php
	namespace app\admin\controller;
	
	use think\Controller;
	use think\Auth;
	class Commen extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			if(session('Id')==''){
				$this->redirect('Login/login');
			}
			else
			{
				$auth=new Auth();
				$controller=request()->controller();
				$action=request()->action();
				$info=$auth->check($controller,session('Id'));
				if($info)
				{
					$info1=$auth->check($controller."/".$action,session('Id'));
					if(!$info1)
					{
						//dump('没权限');exit;
					}
				}else
				{
					//dump('没权限');exit;
				}
			}

		}


	}