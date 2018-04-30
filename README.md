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

Your landing page and leads manager **out-of-the-box** with Node.js+Express.

Create you landing page infrastructure in **30 second**. TinyLanding is the easy out-of-the-box system for store **your leads in sqlite database** and manage it. Use your HTML for create landing and don't worry about anything else. TinyLanding is write in Node.js + Express and is ready to use for all javascript developer in easy way.

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

* Create landing page in simple way by HTML and CSS
* Out-of-the-box leads system
* Export leads in CSV
* Send email to admin each lead form reached
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

Use `npn` or `yarn` to install it. Go to project folder, use install command There is post install scripts that runs after install dependences.

```
npm install 
```

### Setup

After install all dependences, the post-install script crate and execute all migrations on sqlite db.<br/>
The database file is placed in `app/data` folder. You can change all db connection properties in config file `app/config/database.json`. Use **development** key for use in development and **production** key when you are ready to switch TinyLanding it in production mode.

Copy `app/config/email_dist.json` and rename it in `app/config/email.json`. Change all configuration with all yours email configuration. In same way of db config file, use **development** and **production** keys respectively in develop and production mode.

> In this version the email password setting isn't crypted. Remember to use an email other than yours or to hide this file from prying eyes.


### Customizing

TinyLanding is the best way for frontender and webdesigner to create in rapid way a landing page in HTML with lead form contact. 
The system use [mustache](https://mustache.github.io/) view engine system. You use your HTML, css and script directly in mustache file.

#### HTML

Change file `app/views/index.mustache` with your HTML for create your personal web page. 

* *(Under costruction) Include template form.mustache in landing page*
* *(Under costruction) Include JQuery and main.js scripts*
* *(Under costruction) Include main.css*
* *(Under costruction) Errorfile*

In `app/public` folder there is all public asset for landing. This file is reached from root url. In this folder you include all CSS, scripts, images, other assets used in your landing.

#### Mail Template

For each leads form sended, TinyLanding send to admin (configured in email.json) a recap email of lead.

If you want personalized message for this mail, change `app/templates/lead.mustache` file. This file use the same view engine of HTML: mustaches.

> Remember to use absolute URL for image and embedded CSS style for this file.

### Using

For running the system use `npm start` command.

## Manage TinyLanding

TinyLanding use out-of-the-box system for store leads in db. The only choose at moment is use Sqlite db. For read all leads stored you can use script manager.

Use `npm run leads` for show all leads stored in db.

Use `npm run leads2csv path_to_save` for save all leads in CSV format.

## Deployment

For use TinyLanding in production use this command:

`NODE_ENV=production PORT=80 npm start`

In this mode, TinyLanding use optimized settings:

* Compress with gzip and minify all response
* Recording error log in `/app/data/log`
* Using caching system
* Using standard 80 http port

> If you change listen post use different `PORT=[port_number]` argument when run the script.
> <br/>
> Remember to use process manager for production mode e.g. [PM2](http://pm2.keymetrics.io/)<br/>
> A process manager is a “container” for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.


### Deploy on Docker (Under Construction) 

You can create docker container:

1. Build

2. Run

You can use docker-compose for run TinyLanding in production 

## Roadmap

* Istruction for create PM2 Services
* System for multiple landing page in one 
* Provisioning on Heroku
* Documentation for edit template
* Documentation for run in docker
* Create config system
* Adding Test
* Add linter for javascript client-site
* Add linter for css
* Add linker for html

## Maintainers

[Pasqualino de Simone @pasalino](http://www.github.com/pasalino)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [Tags](https://github.com/pasalino/TinyLanding/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details