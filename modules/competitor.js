const eventEmitter = require ('events'),
    eventsConfig = require ('./config'),
    util = require ('util');

var log = []; //log array to print into html file

//Competitor Constructor
function Competitor(name, sportType, medals=0) {
    this.name = name;
    this.sportType = sportType;
    this.medals = 0;
    this.printCompetitor();
}

//Print the Competitor Details
Competitor.prototype.printCompetitor = function (){
    log.push(`Competitor:  ${this.name} <br>
    sportType: ${this.sportType} <br>
    Medals: ${this.medals}<br>`);
};

util.inherits(Competitor, eventEmitter);

//Add Medal to Competitor
Competitor.prototype.addMedal = function () {
    this.medals++;
    this.emit(eventsConfig.events.MEDAL_INCREASE,`Medal added to ${this.name}. Current Medals: ${this.medals}`);
    log.push (`Medal Added to ${this.name}. Current Medals for ${this.name}: ${this.medals}<br>`);
};

//Remove Medal From Competitor
Competitor.prototype.removeMedal = function (){
    //Check if Competitor Has one Medal or more before removing
    if (this.medals>0){
        this.medals--;
        this.emit(eventsConfig.events.MEDAL_DECREASE,`Medal was Removed from ${this.name}. Current Medals: ${this.medals}`);
        log.push (`Medal Removed from ${this.name}. Current Medals for ${this.name}: ${this.medals}<br>`);
    }
    else{
        this.emit(eventsConfig.errors.MIN_MEDAL,`Could not Remove Medal. ${this.name} Has No Medals`);
        log.push (`Medal Removed Failed - ${this.name} has No Medals`);
    }
};

//Set medal for Competitor
Competitor.prototype.setMedal = function(num) {
    if (num>=0){
        this.medals=num;
        this.emit(eventsConfig.events.MEDAL_SET,`${num} Medals were Set for  ${this.name}. Current Medals:  ${this.medals}`);
        log.push (`${num} Medals Set for ${this.name}.<br>`);
        this.printCompetitor();
    }
    else{
        this.emit(eventsConfig.errors.MIN_MEDAL,`Medals Set Failed!! You tried to give negative number
        (Current Medals for ${this.name}: ${this.medals}`);
        log.push (`Medals Set Failed! attempt to give negetive number (Current Medals for ${this.name}: ${this.medals})`);
    }
};

//Print Log
Competitor.prototype.printlog = function (){
    return log.toString().split(',').join("<br>");
};

module.exports = Competitor;

/**
 * Created by Shamir on 30-Apr-17.
 */
