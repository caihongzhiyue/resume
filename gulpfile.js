var gulp = require('gulp');


//webserver服务器
var webserver = require('gulp-webserver');
//url地址
var url = require('url');
//filesystem
var fs = require('fs');
//sass模块
var sass = require('gulp-sass');
//css压缩
var minifycss = require('gulp-minify-css');
//丑化操作
var uglify = require('gulp-uglify');
//模块化打包的工具
var webpack = require('gulp-webpack');  
//命名模块
var named = require('vinyl-named');  
//版本模块
var rev = require('gulp-rev');  
//版本控制模块
var revCollector = require('gulp-rev-collector'); 
//监控模块
var watch = require('gulp-watch');  
//队列模块
var sequence = require('gulp-watch-sequence');  
//压缩HTML
var minifyhtml = require('gulp-minify-html');  



gulp.task('webserver', function() {
  gulp.src('www')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,

      //实现我们的Mock数据
      //1 用户在浏览器输入URL地址，比如说http://localhostList
      //2 系统通过判断，获取URL的地址参数，即queryList
      //3 通过URL的地址参数queryList，去查找相对应json文件，比如说queryList.json
      //4 读取（read）queryList.json文件，并将这个文件的内容写到(write)我们的浏览器上
      middleware:function(req,res,next){
      	var urlObj = url.parse(req.url,true),
      	method = req.method;
      	
      	switch(urlObj.pathname){
      		case '/api/skill':
      			//设置头信息
	      		res.setHeader("Content-Type",'application/json');
	      		//读取本地的json文件，并将读取的信息内容设置编码，然后将内容转成data数据返回
	      		fs.readFile('mock/skill.json','utf-8',function(err,data){
	      			//res的全称response，end是结束的意思，就是把我们的data数据渲染到浏览器中
	      			res.end(data);
	      		});
	      		return;
	      	case '/api/project':
	      		res.setHeader("Content-Type",'application/json');
	      		fs.readFile('mock/project.json','utf-8',function(err,data){
	      			res.end(data);
	      		});
	      		return;
	      	case '/api/work':
	      		res.setHeader("Content-Type",'application/json');
	      		fs.readFile('mock/work.json','utf-8',function(err,data){
	      			res.end(data);
	      		});
	      		return;
	      	case '/api/state':
	      		res.setHeader("Content-Type",'application/json');
	      		fs.readFile('mock/state.json','utf-8',function(err,data){
	      			res.end(data);
	      		});
	      		return;
	      	default:
	      	;
      	}
      	next();//这行代码非常重要，next解决的是循环遍历操作
      }// end middleware

    }));
})

gulp.task('copy-index',function(){
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./www'));
})

gulp.task('sass',function(){
	return gulp.src('./src/styles/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('www/css'));
})

//js模块化管理
var jsFiles = ['./src/script/index.js'];

//打包js
gulp.task('js',function(){
	return gulp.src(jsFiles)
	.pipe(named())
	.pipe(webpack())
	//.pipe(uglify())
	.pipe(gulp.dest('www/js'));
})

//images的复制
gulp.task('images',function(){
	return gulp.src("./src/images/**")
	.pipe(gulp.dest('www/images'));
})


gulp.task('json',function(){
	return gulp.src("./mock/*.*")
	.pipe(gulp.dest('www/mock'));
})

//设置监控
gulp.task('watch',function(){

	gulp.watch('./src/images/**',['images']);

	gulp.watch('./src/styles/**',['sass']);

	gulp.watch('./src/script/**',['js']);

	gulp.watch('./src/index.html',['copy-index']);

	gulp.watch('./mock/*.*',['json']);

})

//设置默认任务
gulp.task('default',['webserver','watch'])