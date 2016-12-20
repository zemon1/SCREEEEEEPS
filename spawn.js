var spawn = {

    run: function() {
        
        deleted = [];
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                deleted.push(name)
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log('Harvesters: ' + harvesters.length);
        
        for(var harvester in harvesters){
            harvester = harvesters[harvester]
            if(_.includes(deleted, harvester.memory.runner)){
                harvester.memory.runner = false;
            }
        }
        
        
         var runners = _.filter(Game.creeps, (creep) => creep.memory.role == 'runner');
        //console.log('Runners: ' + harvesters.length);
        
        for(var runner in runners){
            runner = runners[runner]
            if(_.includes(deleted, runner.memory.runner)){
                runner.memory.harvester = false;
            }
        }
        
        var equalizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'equalizer');
        //console.log('Equalizers: ' + equalizers.length);
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Builders: ' + builders.length);
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgraders:: ' + upgraders.length);
        
        if(equalizers.length < 0) {
            //var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'equalizer', dest: 0});
            console.log('Spawning new equalizer: ' + newName);
        }else if(harvesters.length < 2) {
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester', runner: false});
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester', runner: false});
            console.log('Spawning new harvester: ' + newName);
        }else if(runners.length < 2) {
            //var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'runner', harvester: false});
            var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'runner', harvester: false});
            console.log('Spawning new runner: ' + newName);
        }else if(builders.length < 6) {
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }else if(upgraders.length < 4) {
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
        
    }
};

module.exports = spawn;