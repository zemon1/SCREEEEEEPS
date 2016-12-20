var helpers = require('helpers');
var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep, creepNum, sources) {
        if(!creep.memory.harvester){
            var harvesters = _.filter(Memory.myCreeps, function(crp) { return (crp.memory.role == 'harvester' && crp.memory.runner == false) })
            if(harvesters.length > 0){
                var harvester = harvesters[0].name
                creep.memory.harvester = harvester
                harvesters[0].memory.runner = creep.name
                console.log(creep.name, ": Running for: ", harvester)
            }
        }
        
        
	    if(creep.carry.energy < creep.carryCapacity*.45) {
	        var dropped = creep.pos.findClosestByPath(Memory.droppedEnergy)
	        //var close = creep.pos.findClosestByPath(Memory.fullCreeps)
	        //console.log(dropped)
	        if(dropped){
	           if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped);
                } 
	        }/*else if(close){
	           if(close.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(close);
                } 
	        }*/
	        else if(creep.memory.harvester){
	            var har = Game.creeps[creep.memory.harvester]
	            if (har){
    	            if(har.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(har);
                    } 
	            }else{
	                creep.memory.harvester = false
	            }
	        }
	        
        }
        else {
            var storageLoc = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            var tower = creep.pos.findClosestByPath(_.filter(Memory.towers, function(tower) { 
                return tower.energy < tower.energyCapacity;
            }))
            
            if(storageLoc) {
                helpers.transferOrMoveTo(creep, storageLoc);
            }else if(Memory.containers.length > 0) {
                var cont = creep.pos.findClosestByPath(Memory.containers)
                helpers.transferOrMoveTo(creep, cont);
            }else if(tower){
                helpers.transferOrMoveTo(creep, tower);
            }else{
                creep.moveTo(23, 25)
            }
        }
	}
};

module.exports = roleRunner;