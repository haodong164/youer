<?php
	namespace app\admin\controller;
	
	use think\Controller;
	
	class Login extends Controller
	{
		
		public function login()
		{	
			//print_r (input('post.'));

		 	if(session('username')!='')
			{
				$this->redirect('Index/index');
			}else
			{
				return $this ->fetch();
				
			}
			//return $this ->fetch();
			
		}
		public function do_login()
		{
			//print_r(input('post.'));
			$username=input('post.username');
			$password=input('post.password');
			$table=db('auth_user');
			$info=$table->where('username = "'.$username.'"')->find();
			if($info){
				if($info['password']==$password)
				{	
					session('Id',$info['Id']);
					session('username',$username);
					$this ->success('succ','Index/index');
				}else{
					$this -> error('fail');
				}
			}else
			{
				$this-> error('fail');	
			}
		}
		
	
		
		
	}