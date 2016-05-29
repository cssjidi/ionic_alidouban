# ionic_alidouban
这个案例适合做图片APP，图片均来自阿里豆瓣（alidouban.com）。

采用ionic进行开发，服务器则用WordPress，wp-rest-api插件并对API字段进行扩展。

使用gulp进行压缩，合并，重命名等。

gulp clean用于清除www,.tmp目录。

gulp build 则打包，压缩，合并等操作，最终生成在www目录下。

测试可知生成的apk由原来的10m压缩到1m不到。

