var store = [{
        "title": "Lecture 0401 analyze KOWEPS data using ggplot",
        "excerpt":"한국 복지패널데이터 분석 경제활동, 생활실태, 복지욕구 등 수천 개 변수 정보로 구성 foreign : 통계 파일 SPSS 로드할 수 있는 package # install.packages(\"foreign\") library(foreign) library(dplyr) ## ## Attaching package: 'dplyr' ## The following objects are masked from 'package:stats': ## ## filter, lag ## The following objects are masked from 'package:base':...","categories": ["Study","R"],
        "tags": ["R","ggplot","bigdata","LectureNotes"],
        "url": "http://localhost:4000/study/r/LN-0401-KOWEPS-data-mini-project/",
        "teaser": null
      },{
        "title": "Lecture 0402 analyze APTs values around 홍대입구역 using Google Maps API",
        "excerpt":"Using Google Maps API install ggmap &amp; import libraries library(ggplot2) theme_update(text=element_text(family=\"NanumBarunGothic\")) import csv files station &lt;- read.csv(\"~/Desktop/johnwi_KNOU/Programming/1. R/handouts/0402/역주소.csv\") head(station) ## 역명 구주소 ## 1 시청 서울 중구 서소문동 27 ## 2 을지로입구 서울 중구 을지로1가 89-1 ## 3 을지로3가 서울 중구 을지로3가 70-1 ## 4 을지로4가 서울 중구 을지로4가 261-1...","categories": ["Study","R"],
        "tags": ["R","bigdata","LectureNotes","Google API"],
        "url": "http://localhost:4000/study/r/LN-0402-%ED%99%8D%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD-APT-%EC%8B%9C%EC%84%B8-%EC%A1%B0%ED%9A%8C-by-using-Google-maps-API/",
        "teaser": null
      },{
        "title": "Lecture 0403 Text Mining with R",
        "excerpt":"텍스트 마이닝 Text Mining Text-mining 개요 분석절차 형태소분석 Morphology Analsys 명사, 동사, 형용사 등 의미 지닌 품사 단어 추출 빈도표 시각화 ex1. 힙합 가사 분석 import libraries and data files library(KoNLP) ## Checking user defined dictionary! library(memoise) library(dplyr) ## ## Attaching package: 'dplyr' ## The following objects are masked from...","categories": ["Study","R"],
        "tags": ["R","bigdata","LectureNotes","text-mining","wordcloud"],
        "url": "http://localhost:4000/study/r/LN-0403-Text-mining-with-R/",
        "teaser": null
      },{
        "title": "Lecture 0403-2 Visualization Maps & Graphs with R",
        "excerpt":"Visualization Maps Choropleth Map 지역별 통계치를 색깔 차이로 표현 인구나 소득 같은 특성 미국 주별 강력 범죄율 단계 구분도 import libraries library(devtools) ## Loading required package: usethis # library(htmlwidgets) # library(htmltools) library(jsonlite) library(yaml) library(base64enc) library(tm) ## Loading required package: NLP # library(wordcloud2) # library(ggplot2) library(tibble) # maps library(ggmap) ## Loading...","categories": ["Study","R"],
        "tags": ["R","bigdata","LectureNotes","visualizion","graph","basic statistics"],
        "url": "http://localhost:4000/study/r/Lecture-0403-2-Visualization-Maps-&-Graphs/",
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
        "excerpt":"AWS 서버 인스턴스 생성 서버 인스턴스 AMI 선택 인스턴스 유형 선택 Key pair Error 같은 Normal Message 보다 편한 EC2 활용을 위한 Jupyter Notebook 설치 1. check python3 version 2. python3 개발환경 설치위한 pip install 3. pip를 통해 notebook install 4. notebook에서 사용할 p/w 설정 5. System terminal이 아닌 WebBrowser...","categories": ["Study","AWS"],
        "tags": ["Docker","LectureNotes","AWS","동빈나"],
        "url": "http://localhost:4000/study/aws/ln-aws-0102/",
        "teaser": null
      }]
