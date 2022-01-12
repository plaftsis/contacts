# contacts

## About

A simple contact manager application built with Ruby on Rails and React.js.

## Prerequisites
- Github
- Ruby [2.7.4](https://www.ruby-lang.org/en/news/2021/07/07/ruby-2-7-4-released/)
- Rails [6.1.4.4](https://rubyonrails.org/2021/12/15/Rails-6-0-4-4-and-6-1-4-4-have-been-released)
- Node [14.7.3](https://nodejs.org/en/blog/release/v14.17.3/)
- npm [6.14.13](https://www.npmjs.com/package/npm/v/6.14.13)

## Install

### Clone the repository

```shell
git clone git@github.com:plaftsis/contacts.git
cd contacts
```

### Install dependencies

Using [Bundler](https://bundler.io/) and [npm](https://www.npmjs.com/):

```shell
bundle install
cd client
npm install
cd ..
```

### Initialize the database

```shell
bin/rails db:create db:migrate db:seed
```

### Running tests

```shell
rspec spec/
```

## Usage

### Start server
```shell
bin/rails server -p 8000
```

### Start client
```shell
cd client
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## License
[MIT](https://choosealicense.com/licenses/mit/)