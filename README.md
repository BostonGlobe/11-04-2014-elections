# 11-04-2014-elections

This project was generated with [generator-globeproject](https://github.com/BostonGlobe/generator-globeproject). Consult its [README](https://github.com/BostonGlobe/generator-globeproject) for more information.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## TODO

- build a smaller version of d3/topojson
- optimize choropleth

## These are the components we are building

### strip
**not homepage**
![strip](https://cloud.githubusercontent.com/assets/370976/4511030/59b4e9a6-4b30-11e4-9de6-e28b890d616c.jpg)
- display results for **multiple** races.
- should also contain nav links.
- could we add links to town pages?
- remove feature strip on article pages.

### bigmap
**homepage**
![bigmap](https://cloud.githubusercontent.com/assets/370976/4511026/59abccb8-4b30-11e4-9833-fdd10f87c5af.jpg)
- display results for **one** race.
- one map.
- no zooming.
- add dropdown for towns.
- use the summaryresults-fancy component.

### balanceofpower
**homepage**
![balanceofpower](https://cloud.githubusercontent.com/assets/370976/4511024/59a832ec-4b30-11e4-91ae-6bb8592a122c.jpg)
- display results for US house / senate.
- show before/after.
- small - no table.

### summaryresults
**homepage**
![summaryresults](https://cloud.githubusercontent.com/assets/370976/4511025/59a929e0-4b30-11e4-9287-88be4b596369.jpg)
- display summary results for **multiple** races.
- one table per race.
- enhanced version should feature candidate photos / other extra styling marks.

### detailedresults
**igraphic**
![detailedresults](https://cloud.githubusercontent.com/assets/370976/4511023/59a5d2ae-4b30-11e4-874c-1f64149429bf.jpg)
- display results for **one** race.
- map and table/s.
- add nav links like in breaking strip.

### summaryresults-group
**igraphic**
![summaryresults-group](https://cloud.githubusercontent.com/assets/370976/4511029/59b243ea-4b30-11e4-9a5b-418d2c7fb070.jpg)
- display summary results for **multiple** races.
- use many columns.
- grouping is predetermined and not dynamic.

### summaryresults-fancy
**igraphic**
![summaryresults-fancy](https://cloud.githubusercontent.com/assets/370976/4511028/59aee182-4b30-11e4-8572-aef3f8d0cfb7.jpg)
- display summary results for **multiple** races.
- biggest boldest summary results treatment.
- perhaps this can be summaryresults with extra css.

### townresults
**igraphic**
![townresults](https://cloud.githubusercontent.com/assets/370976/4511027/59ac578c-4b30-11e4-9af2-2f371dc9f8a1.jpg)
- display all results for one town.
- note that for each race we should display the town result and the summary result.

## Install

- `npm install`
- `bower install`

## Usage

- `gulp`

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
