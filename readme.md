# ES6前端模板项目

## 概述

gulp+browserify 支持前端es6开发的项目模板.

- 支持ES6热编译
- 支持html修改热部署
- 未添加VUE等库的支持

## 环境

- 较新的Node及npm版本
- babel 7
- gulp 4

## 目录结构

- 版本控制文件目录: 
    - src: es6代码目录
    - .gitignore: git忽略清单
    - index.html: 首页html文件
    - package.json: npm项目描述文件
    - readme.md: 自述文件
- 非版本控制文件目录:
    - dist: 制品发布路径, 包含所有在浏览器下运行需要的文件
    - lib: js代码编译到es2015的中间目录
    - node_modules: js本地依赖
    - package-lock.json: npm锁文件
    
## 使用说明

1. 全局安装cnpm使用阿里源提速下载

~~~bash
npm install cnpm -g
~~~

2. 全局安装gulp

~~~bash
cnpm install gulp -g
~~~

3. 构建并运行默认页面, 支持修改代码热部署

~~~base
gulp dev
~~~

4. 打包

~~~bash
gulp build
~~~

## FAQ

- `npm install xxx`报错: `Maximum call stack size exceeded` 请使用cnpm安装而非npm， 除非之前也都使用的npm。

