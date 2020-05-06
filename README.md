# node - express -ELK demo版

### 环境安装  Mac版  
* [参考一](https://www.cnblogs.com/Dev0ps/p/9314551.html)     
* [参考二](http://www.51niux.com/?id=205)

* brew 安装  kibana、 elasticsearch、logstash

* 启动  brew services start elasticsearch   默认端口9200 需要配置为全网段 0.0.0.0  具体百度吧


* brew services start kibana   默认端口5601  将配置文件修改用以关联到elasticsearch  Mac的目录位置/usr/local/Cellar/kibana/6.8.8/config/kibana.yml

```
	server.host: "0.0.0.0"
	server.port: 5601
	elasticsearch.hosts: ["http://localhost:9200"]
	kibana.index: ".kibana"
```


* logstash因为需要手动配置新的配置文件，没有有brew启动  我的logstash 安装目录/usr/local/Cellar/logstash/7.6.2


* 在 /usr/local/Cellar/logstash/7.6.2/libexec/config 创建配置文件 syslog2.conf，具体如下  logstash默认端口为9100


```
	input{
	    file{
	        path => ["/Users/maxianfei/Desktop/nodeLog/log/*.log”]  #该文件位置需要指定到程序生成的log的位置上，之前的问题就出在这里了，以为是logstash自己配置生成的
	        type => "elasticsearch"
	        start_position => "beginning" #从文件开始处读写
	    }
	}
	output{
	    elasticsearch {
	        hosts => ["127.0.0.1:9200"]
	         index => "es-message-%{+YYYY.MM.dd}"
	    }
	    stdout{codec => rubydebug}
	}
```

* 在目录下的bin文件执行


    * `logstash -f /usr/local/Cellar/logstash/7.6.2/libexec/config/syslog2.conf  —config.test_and_exit`  <br> 用来判断配置文件是否正确配置

    
    * `logstash -f /usr/local/Cellar/logstash/7.6.2/libexec/config/syslog2.conf  & ` <br>  后台启动
    

* http://127.0.0.1:9200/_cat/indices?v  用于查看logstash的配置是否生效到elasticsearch

```
health status index                   uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   es-message-2020.05.05   38XS9WW8SOqXkhU5ZDKYGw   5   1        110            0       460b           460b
green  open   kibana_sample_data_logs kJeTW91iTBacLcBjePUAZA   1   0      14005            0     11.3mb         11.3mb
yellow open   tcp-log-2020.05.05      O72rg_FKR5OPxTkd74lcmA   5   1         84            0    283.1kb        283.1kb
green  open   .kibana_1               VaCoRTBdQba_hPEup-OHYA   1   0         17            1     79.5kb         79.5kb

```
 
---- 
[Docker版一体化配置](https://weibo.com/ttarticle/p/show?id=2309404500938705469513) 该项目我没有实践过，这个是我自己手动搭建之后，同事推荐的链接，还未进行尝试。原理是一致的。