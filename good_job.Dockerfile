# syntax=docker/dockerfile:experimental
FROM ruby:3.2.0
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs libvips \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*\
  && npm install -g yarn@1

RUN mkdir -p /opt/rails-app

WORKDIR /opt/rails-app

COPY package.json .
COPY yarn.lock .
RUN yarn install

RUN gem install rails bundler

COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

COPY . .


RUN bundle exec i18n export

ENTRYPOINT ["bash"]
CMD ["./bin/run-good-job"]
