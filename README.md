# BFBB Decomp Website

This repository contains the source code to build the progress tracking website.

It uses [highcharts](https://www.highcharts.com/) to display progress.
Vue.js is used as a templating/reactive library.
The data for the entire website is processed by running the python script in the python folder, `python progress.py`.
It requires that there exist a full `bfbbdecomp` repository in the same parent directory as the website.

Make sure [parcel](https://parceljs.org/) is installed globaly.

Install all other dependencies with `npm install`

Once the data has been generated, the site can be developed with `npm run dev` or built with `npm run build`.

The main focus of this website is for it to be hosted on github pages, so there are some hardcoded things and quirks with the repo in order to tailor it towards that environment.
