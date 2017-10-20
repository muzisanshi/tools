//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    pump   = require('pump');
 
//定义一个uglify任务
gulp.task('uglify', function () {
    // gulp.src('tools.js') //该任务针对的文件
    //     .pipe(uglify()) //该任务调用的模块
    //     .pipe(gulp.dest('result'));
    pump([
        gulp.src('tools.js'),
        rename({suffix:".min"}),
        uglify(),
        gulp.dest('result')
    ]);
    
    pump([
        gulp.src('tools.css'),
        rename({suffix:".min"}),
        minify(),
        gulp.dest('result')
    ]);
});