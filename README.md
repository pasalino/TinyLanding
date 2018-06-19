# TinyLanding
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![airbnb-style](https://img.shields.io/badge/eslint-airbnb-4B32C3.svg)](https://github.com/airbnb/javascript)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpasalino%2FTinyLanding.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpasalino%2FTinyLanding?ref=badge_shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/pasalino/TinyLanding.svg)](https://beta.gemnasium.com/projects/github.com/pasalino/TinyLanding)
[![Maintainability](https://api.codeclimate.com/v1/badges/8d16bd77e8894ef68299/maintainability)](https://codeclimate.com/github/pasalino/TinyLanding/maintainability)
[![Build Status](https://travis-ci.org/pasalino/TinyLanding.svg?branch=master)](https://travis-ci.org/pasalino/TinyLanding)
[![codecov](https://codecov.io/gh/pasalino/TinyLanding/branch/master/graph/badge.svg)](https://codecov.io/gh/pasalino/TinyLanding)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1809/badge)](https://bestpractices.coreinfrastructure.org/projects/1809)

Your multi landing page and leads manager **out-of-the-box** with Node.js+Express.

Create your landing page system infrastructure in **30 seconds**. TinyLanding is the easy out-of-the-box system for storing **your leads in a sqlite database** and manage it. Use only HTML to create your landing page and don't worry about anything else. TinyLanding is written in Node.js + Express and is ready to use for all JavaScript developers.

[Demo - tinylanding.site](http://tinylanding.site)

## Table Of Contents

- [TinyLanding](#TinyLanding)
  * [Table Of Contents](#table-of-contents)
  * [Features](#features)
  * [Getting Started](#getting-started)
    + [Installing](#installing)
    + [Setup](#setup)
    + [Customizing](#customizing)
      - [HTML](#html)
      - [Mail Template](#mail-template)
    + [Using](#using)
  * [Manage TinyLanding](#manage-TinyLanding)
  * [Deployment](#deployment)
    + [Deploy on Docker](#deploy-on-docker)
  * [Roadmap](#roadmap)
  * [Contributing](#contributing)
  * [Versioning](#versioning)
  * [License](#license)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpasalino%2FTinyLanding.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpasalino%2FTinyLanding?ref=badge_large)

## Features

* Easily create a landing page using HTML and CSS
* Create multi landing pages in one system
* Out-of-the-box leads system
* Export leads in CSV
* Admin receives an email for each lead form submitted
* Use CsrfToken for security
* Compress the output in minified mode
* Use sqlite

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Clone this repository to your destination and edit.

```
git clone git@github.com:pasalino/TinyLanding.git
```

### Installing

Use `npm` or `yarn` to install. Go to project folder and use the install command. Post-install scripts will run after all dependencies are installed.

```
npm install
```

### Setup

The post-install scriptW create and execute all migrations on your Sqlite database.<br/>
The db file is placed in the `app/data` folder. You can change all db connection properties in the config file at `app/config/database.json`. Use the **development** key in your development environment and the **production** key when you are ready to switch TinyLanding to production mode.

Copy `app/config/email_dist.json` and rename it to `app/config/email.json`. Edit the default configuration with your email details. Same as for the db config file, use **development** and **production** keys respectively in development and production mode.

> In this version the email password setting isn't crypted. Remember to use an email other than yours or to hide this file from prying eyes.


### Customizing

TinyLanding is the best way for frontenders and webdesigners to quickly boot up a HTML landing page with a lead contact form.
The system use [mustache](https://mustache.github.io/) view engine system. You use your HTML, CSS and scripts directly in the mustache file.

#### HTML

Change file `app/views/landing_anem/index.mustache` with your HTML to create your personal web page.

* *(Under construction) Include template form.mustache in landing page*
* *(Under construction) Include JQuery and main.js scripts*
* *(Under construction) Include main.css*
* *(Under construction) Errorfile*

All public assets are in the `app/public/landing_name` folder. This file is reached from the root url. Include all your CSS, scripts, images and other assets in this folder.

#### Mail Template

TinyLanding will send an email to the admin configured in email.json for each lead form submitted. You can personalize the email in `app/templates/lead.mustache`. This file uses the same view engine of HTML: mustaches.

> Remember to use absolute URLs for images and embedded CSS stylesheets for this file.

### Usage

Run the system using the `npm start` command.

## Manage TinyLanding

TinyLanding uses an out-of-the-box system to store leads in your db. Sqlite is currently the only available db. You can use the script manager to read your leads.

Use `bin/manage.js` to manage your landing page and your leads.

* *(Under construction)*

Use `bin/manage.js --help` to show commands list

## Deployment

Use this command to use TinyLanding in production:

`NODE_ENV=production PORT=80 npm start`

In production, TinyLanding uses optimized settings:

* Compress with gzip and minify all responses
* Record error logs in `/app/data/log`
* Use caching system
* Use standard 80 http port

> If you want to listen to a different port use `PORT=[port_number]` as an argument when running the script.
> <br/>
> Remember to use a process manager for production mode (e.g. [PM2](http://pm2.keymetrics.io/))<br/>
> A process manager is a “container” for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.


### Deploy on Docker (Under Construction)

You can create a docker container:

1. Build

2. Run

You can use docker-compose to run TinyLanding in production

## Roadmap

* Istructions for creating PM2 Services
* Provisioning on Heroku
* Documentation for editing the template
* Documentation for running in docker
* Create config system
* Add Test
* Add linter for JavaScript client-site
* Add linter for CSS
* Add linker for HTML

## Maintainers

[Pasqualino de Simone @pasalino](http://www.github.com/pasalino)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [Tags](https://github.com/pasalino/TinyLanding/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
