<H1>Nginx</H1>
<p align="left">
  <a href="https://velog.velcdn.com/post-images/jeff0720/91343f60-eb33-11e8-b115-5df0fc60ff3a/ngnix.png target="blank"><img src="https://velog.velcdn.com/post-images/jeff0720/91343f60-eb33-11e8-b115-5df0fc60ff3a/ngnix.png" width="500" alt="nginx" /></a>
</p>
<p>Nginx는 Event-Driven 방식으로 클라이언트에 요청을 처리해주는 웹 서버이다.</p>

<H3>Nginx와 같은 웹 서버를 왜 사용할까?</H2>
<ul>
  <li>클라이언트의 요청 처리를 분산시킬 수 있는 로드 밸런스를 사용함으로써 효율적인 처리함</li>
  <li>정적파일을 다이렉트로 제공해주기 때문에 백엔드 서버에 부담을 주지 않음</li>
  <li>클라이언트는 Ngnix 포트로만 백엔드 서버에 접근할 수 있어 보안에 도움이 됨</li>
</ul>

<H3>실습</H3>
 <a href="https://github.com/yhd1101/nest_koreanmarket/commit/02150f54a6c4ab7f3c652492fcab19ed1ce1b54c">docker</a> 
<a href="https://github.com/yhd1101/KoreaMarket_Project/commit/9d744637e77836724c87a33aed73fdec3933a8c1">nginx</a>
<p>위 링크 참고하면서 실습하면됌</p>

<H1>Swagger</H1>
<p align="left">
   <a href="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F100b5a0e-959d-48b7-b9b7-a3b0472740e6%2Fcb5afc44-21f7-4dd0-9a49-a9e2b722465c%2FUntitled.png?table=block&id=8d4a7b1c-9589-492c-8b00-e98c5907931c&spaceId=100b5a0e-959d-48b7-b9b7-a3b0472740e6&width=2000&userId=52657ad4-9c58-4d0e-aaf5-7723cf2ac8e9&cache=v2"><img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F100b5a0e-959d-48b7-b9b7-a3b0472740e6%2Fcb5afc44-21f7-4dd0-9a49-a9e2b722465c%2FUntitled.png?table=block&id=8d4a7b1c-9589-492c-8b00-e98c5907931c&spaceId=100b5a0e-959d-48b7-b9b7-a3b0472740e6&width=2000&userId=52657ad4-9c58-4d0e-aaf5-7723cf2ac8e9&cache=v2" width="500" alt="Swagger" /></a>
</p>
<p>Swagger 는 REST API를 설계, 빌드, 문서화 및 사용하는 데 도움이되는 OpenAPI 사양을 중심으로 구축 된 오픈 소스 도구이다.</p>
<H3>Swagger를 왜 사용하나??</H3>
<ul>
  <li>적용하기 쉽다.. Spring REST Docs라는 문서화 도구와는 달리 Swagger는 코드 몇 줄만 추가하면 만들 수 있음</li>
  <li>테스트 할 수 있는 UI를 제공한다. Spring REST Docs는 테스트를 돌리면서 성공하는지 실패하는지 확인하지만 Swagger는 문서 화면에서 API를 바로 테스트 할 수 있다.</li>
</ul>





  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

