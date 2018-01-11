let NetUtil = {
      /*
       *  post请求
       *  url:请求地址
       *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
       *  callback:回调函数
       * */
      postJSON(url,params,callback){
          //fetch请求
          fetch(url,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify(params)
          })
              .then((response) => response.json())
              .then((responseJSON) => {
                  callback(responseJSON)
              })
              .catch((error) => {
                  callback(error)
              });
      },
      /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
     *  callback:回调函数
     * */
    postForm(url,params,callback){
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                callback(error)
            });
    },
      /*
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */
    get(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url,{
            method: 'GET',
        })
            .then((response) => {
                callback(response)
            })
            .catch((error) => {
                alert(error)
            });
    },
	 /*
	*  post请求
	*  url:请求地址
	*  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
	*  callback:回调函数
	* */
	postimg(url,params,callback){
		//fetch请求
		fetch(url,{
			  method: 'POST',
			  headers: {'Content-Type':'multipart/form-data',},
			  body: params
		  }).then((response) => response.json())
			.then((responseJSON) => {
				  callback(responseJSON)
			}).catch((error) => {
				//alert(error);
				 alert("error = " + error)
			});
	  },
	  postImg(url,params,callback){
            let formData = new FormData();
            let file = {uri: params.uri, type: 'multipart/form-data', name: params.fileName};
            formData.append("uploadfile",file);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData)=> {
                    callback(responseData);
                })
                .catch((err)=> {
                    callback(err);
                });
    }

}
export default NetUtil;