## Table of Contents
- [Goal](#goal)
- [Installation](#installation)
- [How To Use It](#howtouse)
- [Full Capabilities](#fc) 
- [Screenshots](#sc)

## Goal <a name="goal"></a>
The app was an attempt to make a tool to convert currency

## Installation <a name="installation"></a>
Pull the code from the repo and add a .env file which should contains API key for the currency API then do
```bash
npm install
```
## How To Use It <a name="howtouse"></a>
There are two main functions of the app, user can enter a value to convert to different currency
Users can also click on any currency to see a line chart showing its value in the last 14 days.

## Full Capabilities <a name="fc"></a>
When converting any amount into others currency, only 5 results were shown. However, to view more currency, removing the slice in rateProccessor into 
```bash
return Object.entries(rates).map ...
```
## Screenshots <a name="sc"></a>
The application worked on all devices. However, the screenshots will focus on laptop, ipad, iphone views.

Converting (Laptop)

![ConvertLaptop](/public/laptopConvert.png)

Converting (Ipad)

![ConvertIpad](/public/ipadConvert.png)

Converting (Iphone)

![ConvertIphone](/public/iphoneConvert.png)

History Rate Chart (Laptop)

![RateHisLaptop](/public/laptopRateHis.png)

History Rate Chart (Ipad)

![RateHisIpad](/public/ipadRateHis.png)

History Rate Chart (Iphone)

![RateHisIphone](/public/iphoneRateHis.png)





