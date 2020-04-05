var store = [{
        "title": "Lecture 0401 analyze KOWEPS data using ggplot",
        "excerpt":"한국 복지패널데이터 분석 경제활동, 생활실태, 복지욕구 등 수천 개 변수 정보로 구성 foreign : 통계 파일 SPSS 로드할 수 있는 package # install.packages(\"foreign\") library(foreign) library(dplyr) ## ## Attaching package: 'dplyr' ## The following objects are masked from 'package:stats': ## ## filter, lag ## The following objects are masked from 'package:base':...","categories": ["Study","R","MachineLearning"],
        "tags": ["R","ggplot","bigdata","LectureNotes"],
        "url": "http://localhost:4000/study/r/machinelearning/LN-0401-KOWEPS-data-mini-project/",
        "teaser": null
      },{
        "title": "Lecture 0402 analyze APTs values around 홍대입구역 using Google Maps API",
        "excerpt":"Using Google Maps API install ggmap &amp; import libraries library(ggplot2) theme_update(text=element_text(family=\"NanumBarunGothic\")) import csv files station &lt;- read.csv(\"~/Desktop/johnwi_KNOU/Programming/1. R/handouts/0402/역주소.csv\") head(station) ## 역명 구주소 ## 1 시청 서울 중구 서소문동 27 ## 2 을지로입구 서울 중구 을지로1가 89-1 ## 3 을지로3가 서울 중구 을지로3가 70-1 ## 4 을지로4가 서울 중구 을지로4가 261-1...","categories": ["Study","R","MachineLearning"],
        "tags": ["R","bigdata","LectureNotes","Google API"],
        "url": "http://localhost:4000/study/r/machinelearning/LN-0402-%ED%99%8D%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD-APT-%EC%8B%9C%EC%84%B8-%EC%A1%B0%ED%9A%8C-by-using-Google-maps-API/",
        "teaser": null
      },{
        "title": "Lecture 0403 Text Mining with R",
        "excerpt":"텍스트 마이닝 Text Mining Text-mining 개요 분석절차 형태소분석 Morphology Analsys 명사, 동사, 형용사 등 의미 지닌 품사 단어 추출 빈도표 시각화 ex1. 힙합 가사 분석 import libraries and data files library(KoNLP) ## Checking user defined dictionary! library(memoise) library(dplyr) ## ## Attaching package: 'dplyr' ## The following objects are masked from...","categories": ["Study","R","MachineLearning"],
        "tags": ["R","bigdata","LectureNotes","text-mining","wordcloud"],
        "url": "http://localhost:4000/study/r/machinelearning/LN-0403-Text-mining-with-R/",
        "teaser": null
      },{
        "title": "Lecture 0403-2 Visualization Maps & Graphs with R",
        "excerpt":"Visualization Maps Choropleth Map 지역별 통계치를 색깔 차이로 표현 인구나 소득 같은 특성 미국 주별 강력 범죄율 단계 구분도 import libraries library(devtools) ## Loading required package: usethis # library(htmlwidgets) # library(htmltools) library(jsonlite) library(yaml) library(base64enc) library(tm) ## Loading required package: NLP # library(wordcloud2) # library(ggplot2) library(tibble) # maps library(ggmap) ## Loading...","categories": ["Study","R","MachineLearning"],
        "tags": ["R","bigdata","LectureNotes","visualizion","graph","basic statistics"],
        "url": "http://localhost:4000/study/r/machinelearning/Lecture-0403-2-Visualization-Maps-&-Graphs/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 1강~",
        "excerpt":"- [AWS 서버 인스턴스 생성](#aws-) - [서버 인스턴스](#-) - [AMI 선택](#ami-) - [인스턴스 유형 선택](#-) - [Key pair](#key-pair) - [Error 같은 Normal Message](#error-normal-message) - [보다 편한 EC2 활용을 위한 `Jupyter Notebook` 설치](#-ec2-jupyter-notebook-) - [1. check python3 version](#1-check-python3-version) - [2. python3 개발환경 설치위한 pip install](#2-python3-pip-install) - [3. pip를 통해 notebook install](#3-pip-notebook-install)...","categories": ["Study","Docker"],
        "tags": ["Docker","LectureNotes","AWS","동빈나"],
        "url": "http://localhost:4000/study/docker/",
        "teaser": null
      },{
        "title": "왕초보도 따라하는 도커 기초 강의 by 재즐보프 youtube",
        "excerpt":"Docker basic by 재즐보프’s Youtube 왕초보도 따라하는 도커 기초 강의 lecture notes Install Apps in Docker in Terminal (base) JnWui-MacBook-Pro:~ WnJ$ sudo -i JnWui-MacBook-Pro:~ root# docker search tomcat9 # 검색 결과로 나온 tomcat9 관련 이미지 중 원하는 것을 찾아 # docker에서 8080 포트로 바로 실행 JnWui-MacBook-Pro:~ root# docker run -d...","categories": ["Study","Docker"],
        "tags": ["Docker","LectureNotes","Oracle","MySQL"],
        "url": "http://localhost:4000/study/docker/docker-basic-01/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 1강~2강",
        "excerpt":"01 실습용 AWS EC2 인스턴스 생성 및 접속 AWS 서버 인스턴스 생성 Docker Machine 설치를 위한 객체 생성 서버 인스턴스 EC2 강의일 현재까지 AWS에서 가장 많이 쓰이고 있는 서버 AMI 선택 Amazon Machine Image Ubuntu Server 18.04 (LTS) 선택 인스턴스 유형 선택 t2 micro free-tier 에서 사용 가능한 유일한 type...","categories": ["Study","AWS"],
        "tags": ["Docker","LectureNotes","AWS","동빈나"],
        "url": "http://localhost:4000/study/aws/ln-aws-0102/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 3강~4강",
        "excerpt":"03 AWS EC2에 도커(Docker) 설치 및 Dockerfile로 웹 서버 구동시키기 Docker 설치를 위한 준비 AWS에서 생성한 jupyter-notebook 접속 현재 메모리 상황 확인 /# df -h Filesystem Size Used Avail Use% Mounted on udev 481M 0 481M 0% /dev tmpfs 99M 752K 98M 1% /run /dev/xvda1 7.7G 1.7G 6.1G 22% /...","categories": ["Study","AWS","Docker"],
        "tags": ["Docker","LectureNotes","AWS","동빈나","Apache Server"],
        "url": "http://localhost:4000/study/aws/docker/ln-aws-0304/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 5강~6강",
        "excerpt":"05 Docker로 MySQL 컨테이너 만들어 보기 작업 전 모든 container 제거 root@ip-172-31-45-116:/# docker rm -f `docker ps -a -q` 0037b1e5d4eb root@ip-172-31-45-116:/# docker ps -a CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES MySQL5.6 설치 host 9876 port와 MySQL 3306 port 연결 root@ip-172-31-45-116:/# docker run -d -p 9876:3306 -e MYSQL_ROOT_PASSWORD=1234 mysql:5.6...","categories": ["Study","AWS","Docker"],
        "tags": ["Docker","LectureNotes","AWS","동빈나","Apache Server","MySQL"],
        "url": "http://localhost:4000/study/aws/docker/ln-aws-0506/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 7강~9강",
        "excerpt":"07 AWS RDS를 이용한 데이터베이스 구축 Amazon RDS를 통한 DB 생성 한글 parameter 설정 parameter 생성 parameter 수정 ‘char’, ‘collation’ 검색 가능한 모든 encoding을 UTF8, UTF8_general_ci로 설정 DB 생성 MySQL 5.6 template &gt; Free-Tier ; 반드시 확인! Master User Name / PW ; 외부접속 위한 ID/PW 보안 그룹 일반적으로 가장...","categories": ["Study","AWS","Docker"],
        "tags": ["Docker","동빈나","LectureNotes","AWS","AWS RDS","MySQL","GitHub","DockerHub"],
        "url": "http://localhost:4000/study/aws/docker/ln-aws-0709/",
        "teaser": null
      },{
        "title": "LN-Docker-동빈나's Docker 활용 10강~11강",
        "excerpt":"10 Jenkins를 이용해 Docker 프로젝트 빌드해보기 Jenkins를 활용한 Build 자동화 Docker in Docker 방식 Jenkins 설치 및 실행 Jenkins도 기본포트 == 8080 Jenkins 안에서 php가 구동되도록 root@ip-172-31-45-116:~/# docker pull jenkins/jenkins:lts LTS tag 붙이지 않고 설치할 경우 plugins 설치 시 ERROR jenkins의 repository가 변경되어서 그렇다고 함.. docker run -d -p 8080:8080...","categories": ["Study","AWS","Docker"],
        "tags": ["Docker","동빈나","LectureNotes","AWS","Jenkins"],
        "url": "http://localhost:4000/study/aws/docker/ln-aws-10~11/",
        "teaser": null
      },{
        "title": "2020 상반기 LINE online coding test 후기..",
        "excerpt":"2020 상반기 LINE online coding test 후기.. 정말 말그대로, 참가하는데 의의를 뒀다 개발 배운지 아직 반년도 안됐고, 말로만 듣던 코딩 테스트는 이번이 첫 경험이기 때문에 뭔가 될 거란 생각하는게 이상하지..ㅋㅋ AWS-Docker에 빠져서 밤새 유튜브 보고 따라해보느라, 6시반에 잠깐 잤다가 일어나서 샤워하고 시간 맞춰서 프로그래머스 들어간거라 정신도 없었다 6문제 중 홀수번...","categories": ["Career","Python"],
        "tags": ["LINE","취준기","Python"],
        "url": "http://localhost:4000/career/python/2020_%EC%83%81%EB%B0%98%EA%B8%B0_LINE-_online_coding_test_%ED%9B%84%EA%B8%B0/",
        "teaser": null
      },{
        "title": "Frequent Git Error Messages",
        "excerpt":"non-fast-forward 특별한 문제를 일으키지 않았는데도, non-fast-forward 메시지와 함께 push가 rejected되는 경우가 있다 이 에러가 발생하는 원인은 여러가지인 듯 $ git push -u origin master ! [rejected] master -&gt; master (non-fast-forward) error: failed to push some refs to 'https://github.com/gitgitWi/ezerwi' 해결방법 원인 01 GitHub에 저장한 내용 - Local에서 commit한 내용 중 겹치는...","categories": ["Git","Errors"],
        "tags": ["Git","Github","Error Messages"],
        "url": "http://localhost:4000/git/errors/Git-Error/",
        "teaser": null
      }]
