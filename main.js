var roleEqualizer = require('role.equalizer');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');
var helpers = require('helpers');
var spawner = require('spawn');
var towerCode = require('tower');

module.exports.loop = function () {
    for(var tRoom in Game.rooms){
        Memory.sources = Game.rooms[tRoom].find(FIND_SOURCES)
        Memory.structs = Game.rooms[tRoom].find(FIND_STRUCTURES)
        Memory.myCreeps = Game.rooms[tRoom].find(FIND_MY_CREEPS)
        Memory.badCreeps = Game.rooms[tRoom].find(FIND_HOSTILE_CREEPS)
        Memory.droppedEnergy = _.filter(Game.rooms[tRoom].find(FIND_DROPPED_ENERGY), function(x){return x.energy > 25})
        Memory.towers = _.filter(Memory.structs, function(struct) { 
            return struct.structureType == STRUCTURE_TOWER;}
        );
        Memory.fullCreeps = _.filter(Memory.myCreeps, function(crp) { 
            return crp.carry.energy > crp.carryCapacity*.75 && crp.memory.role == 'harvester';}
        );
        
        Memory.containers = _.filter(Memory.structs, function(structure) { 
            return structure.structureType == STRUCTURE_CONTAINER && 
            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;}
        );
                
        spawner.run();
        
        for(var tower in Memory.towers){
            var tower = Memory.towers[tower];
            towerCode.run(tower);
            
        }
        
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length+1;
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            var sources = creep.room.find(FIND_SOURCES);
            //helpers.sourcesFull()
            
            if(creep.memory.role == 'harvester') {
                harvesters -= 1;
                roleHarvester.run(creep, harvesters%sources.length, sources);
            }
            if(creep.memory.role == 'runner') {
                roleRunner.run(creep, harvesters%sources.length, sources);
            }
            if(creep.memory.role == 'equalizer') {
                roleEqualizer.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                upgraders -= 1;
                roleUpgrader.run(creep, upgraders%sources.length, sources);
            }
            if(creep.memory.role == 'builder') {
                builders -= 1;
                roleBuilder.run(creep, builders%sources.length, sources);
            }
        }
        Memory.mean = false
    }
}