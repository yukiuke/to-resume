## Overview
Create a website resume of Fighting Game Events that BaalsDepe (aka Yuki) has run that is modern, filterable and searchable.

## Tech Stack
- PHP8.4.*
- MariaDB
- Laravel 12 PHP Framework
- Webpack
- Docker (for local development)
- Node (if necessary)
- Composer (if necessary)
- dotenv (for local docker setup)

## Features
- Heading/Hero section using (image path) as a hero image. Blur and desaturate BG image somewhat with CSS.
- "Events" section that lists the events I've been a part of with filtering (list filter categories below).

## Webpack Requirements
- Name of JS file input/output
- Name of SCSS file input and CSS output.
- Image processor? Do you have enough images that this is useful??

## Docker Requirements
- Use Docker Volumes to watch for changes to the codebase on the host machine and instantly apply them to the docker instance.

## Model Classes
At minimum, the following models are expected:
- Tournament
	- Role
	- Date
	- Game
	- Title/Name
	- URL