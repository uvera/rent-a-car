# syntax=docker/dockerfile:experimental
FROM ruby:3.2.0

RUN mkdir -p /opt/rails-app

WORKDIR /opt/rails-app

RUN gem install rails bundler

COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

COPY . .

RUN bundle exec i18n export

ENTRYPOINT ["bash"]
CMD ["./bin/bundle", "exec", "good_job", "start"]
