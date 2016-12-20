var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, cNum, sources) {
        
	    if(creep.memory.building && creep.carry.energy < 10) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy > creep.carryCapacity*.9) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        
	        if(!creep.memory.toFix){
    	        var toRepair = creep.pos.findClosestByPath(Memory.structs, {
                    filter: function(object){ 
                        if(object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART){
                            return object.hits < 50000
                        }else{
                            return object.hits < object.hitsMax / 3
                        }
                    } 
                });
                if(toRepair){
                    creep.memory.toFix = toRepair.id;
                }
	        }
	        if(!creep.memory.toBuild && !creep.memory.toFix){
	            var toBuild = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	            if(toBuild){
                    creep.memory.toBuild = toBuild.id;
                }
	            
	        }
	        
	        if(creep.memory.toFix){
	            var fix = Game.getObjectById(creep.memory.toFix)
	            if(!fix){
	                creep.memory.toFix = false;
	            }
	            creep.moveTo(fix);
                creep.repair(fix);
                if(fix.structureType == STRUCTURE_WALL || fix.structureType == STRUCTURE_RAMPART){
                    if(fix.hits > 100000){
                        creep.memory.toFix = false;
                    }
                }else{
                    if(fix.hits > fix.hitsMax/2){
                        creep.memory.toFix = false;
                    }
                }
	        }
	        
	        if(creep.memory.toBuild){
	            var b = Game.getObjectById(creep.memory.toBuild)
	            //var b = Game.getObjectById('58549e82d03d397b1e00ab06')
	            
	            if(!b){
	                creep.memory.toBuild = false;
	            }
                creep.moveTo(b);
                creep.build(b);
                
    	        if(creep.memory.toBuild.progress == creep.memory.toBuild.progressTotal){
    	            creep.memory.toBuild = false;
    	        }
	        }
	    }
	    else {
	        cont = _.filter(Memory.structs, function(structure) { 
                return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;}
            );
            var dropped = creep.pos.findClosestByPath(_.filter(Game.rooms['W68N72'].find(FIND_DROPPED_ENERGY), function(x){return x.energy > 25}))
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
                if(creep.harvest(sources[cNum]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[cNum]);
                }
            }*/
	    }
	}
};

module.exports = roleBuilder;