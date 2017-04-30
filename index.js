'use strict';
const   http = require ('http'),
    express= require ('express'),
    app = express(),
    port = process.env.PORT || 3000,
    eventsConfig = require('./modules/config'),
    Competitor = require ("./modules/competitor");

app.get(`/`, function(req, res) {
    //create Competitors instances
    let competitor_one = new Competitor ("Michael Phelps","400m Mixed");
    let competitor_two = new Competitor ("Ian Thorpe","100m Freestyle");

    //Events listeners
    competitor_one.on(eventsConfig.events.MEDAL_INCREASE, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_INCREASE, function (data) {
        console.log(data);
    });

    competitor_one.on(eventsConfig.events.MEDAL_DECREASE, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_DECREASE, function (data) {
        console.log(data);
    });

    competitor_one.on(eventsConfig.events.MEDAL_SET, function (data) {
        console.log(data);
    });
    competitor_two.on(eventsConfig.events.MEDAL_SET, function (data) {
        console.log(data);
    });

    competitor_one.removeMedal();
    competitor_one.setMedal(-3);
    competitor_one.setMedal(6);
    competitor_two.setMedal(2);
    competitor_one.addMedal();
    competitor_one.removeMedal();
    competitor_two.removeMedal();
    competitor_two.addMedal();

    res.send('<h1>Success</h1> '+competitor_one.printlog());
});

http.createServer(app).listen(port);//create Server

/**
 * Created by Shamir on 30-Apr-17.
 */
