FROM nginx:1.23.3

COPY ./docs/.vitepress/dist/ /usr/share/nginx/html/jiaorong-super-agent-doc/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone

EXPOSE 80
