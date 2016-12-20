var roleEqualizer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var containers = _.filter(Memory.structs, function(structure) { return structure.structureType == STRUCTURE_CONTAINER});
        if(!Memory.mean){
            var qty = 0;
            for(var cnt in containers){
                qty += _.sum(containers[cnt].store);
            }
            
            Memory.mean = _.floor(qty/containers.length)
        }
        
        Memory.route = ['585106438efeac726989bf5a',
        '5850f913541c8fb907e37ed4', 
        '585391159f449d47114c950e',
        '58524bb851372c9f2f48d1bc',
        '58537260261d013d3f4acbd2']
        
        if(creep.carry.energy <= creep.carryCapacity){
            var cont = Game.getObjectById(Memory.route[creep.memory.dest])
            var amt = _.sum(cont.store)
            console.log(amt)
            
            if(amt < Memory.mean){
                var res = creep.transfer(cont, RESOURCE_ENERGY)
                if(res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont);
                }else if(res == 0){
                    if(creep.memory.dest == Memory.route.length-1){
                        creep.memory.dest = 0
                    }else{
                        creep.memory.dest += 1
                    }
                }else{
                    if(creep.memory.dest == Memory.route.length-1){
                        creep.memory.dest = 0
                    }else{
                        creep.memory.dest += 1
                    }
                }
            }else{
                console.log(amt-Memory.mean)
                var res = creep.withdraw(cont, RESOURCE_ENERGY)
                console.log(res)
                if(res == ERR_NOT_IN_RANGE) {
                        creep.moveTo(cont);
                }else if(res == 0){
                    if(creep.memory.dest == Memory.route.length-1){
                        creep.memory.dest = 0
                    }else{
                        creep.memory.dest += 1
                    }
                }else{
                    if(creep.memory.dest == Memory.route.length-1){
                        creep.memory.dest = 0
                    }else{
                        creep.memory.dest += 1
                    }
                }
            }
            
        }
	}
};

module.exports = roleEqualizer;



















        /*
	    if(creep.carry.energy < creep.carryCapacity) {
	        var dropped = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY)
	        if(dropped){
	           if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped);
                } 
	        }else if(close){
	           if(close.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(close);
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
            if(storageLoc) {
                if(creep.transfer(storageLoc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageLoc);
                }
            }else if(Memory.containers.length > 0) {
                var cont = creep.pos.findClosestByPath(Memory.containers)
                if(creep.transfer(cont, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont);
                }
            }
            else{
                creep.moveTo(32, 41)
            }
        }
        */
        
        

