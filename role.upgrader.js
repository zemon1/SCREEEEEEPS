var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, cNum, sources) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy > creep.carryCapacity*.9) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            cont = _.filter(Memory.structs, function(structure) { 
                return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;}
            );
            var dropped = creep.pos.findClosestByPath(Memory.droppedEnergy)
	        //var close = creep.pos.findClosestByPath(Memory.fullCreeps)
	        if(dropped){
	           if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped);
                } 
	        }else if(cont.length > 0){
                if(creep.withdraw(cont[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont[0]);
                }
                
            }/*else{
                creep.moveTo(33, 41);
            }
            else{
                if(creep.harvest(sources[cNum]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[cNum]);
                }
            }*/
        }
	}
};

module.exports = roleUpgrader;