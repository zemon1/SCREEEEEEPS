var helpers = require('helpers');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, creepNum, sources) {
        if(creep.harvest(sources[creepNum]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creepNum]);
            creep.memory.cont = false
        }
        if(!creep.memory.cont){
            var container = _.filter(creep.pos.look(), function(item) {return item.type == 'structure' && item.structure.t;})
            if(container[0]){
                creep.memory.cont = container[0].structure.id
            }
        }else{
            console.log(creep.memory.cont)
            var container = Game.getObjectById(creep.memory.cont)
            console.log(container)
            try{
                if(container){
                    console.log('IN')
                    if(container.store[RESOURCE_ENERGY] < container.storeCapacity){
                        console.log('DUMP')
                        creep.transfer(container, RESOURCE_ENERGY)
                    }
                }else{
                    console.log("DROP")
                    creep.drop(RESOURCE_ENERGY)
                }
            }catch(err) {
                creep.memory.cont = false
            }
            
        }
    }
};
module.exports = roleHarvester;

/*else {
            
            var storageLoc = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            //console.log(storageLoc)
            //console.log(Memory.containers)
            if(storageLoc) {
                if(creep.transfer(storageLoc, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageLoc);
                }
            }else if(Memory.containers.length > 0) {
                var cont = creep.pos.findClosestByPath(Memory.containers)
                console.log(cont)
                if(creep.transfer(cont, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(cont);
                }
            } else{
                creep.moveTo(34, 40);
            }
        }*/
        
/*else if(creep.carry.energy == creep.carryCapacity){
            for(var src in Memory.sources){
                if(creep.pos.isNearTo(Memory.sources[src])){
                    var x = Memory.sources[src].pos.x
                    var y = Memory.sources[src].pos.y
                    if(creep.moveTo(x+1, y) == 0){
                        z = true
                    }else if(creep.moveTo(x-1, y) == 0){
                        z = true
                    }else if(creep.moveTo(x-1, y-1) == 0){
                        z = true
                    }else if(creep.moveTo(x+1, y+1) == 0){
                        z = true
                    }else if(creep.moveTo(x, y+1) == 0){
                        z = true
                    }else if(creep.moveTo(x, y-1) == 0){
                        z = true
                    }
                }
            }
        }*/
        
/*
	    if(creep.carry.energy < creep.carryCapacity) {
            console.log(creep)
            if(creep.harvest(sources[creepNum]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creepNum]);
            }
            
        }*//*else{
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
            }
        }*/
