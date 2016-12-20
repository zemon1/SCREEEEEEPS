var tower = {
    run: function(tower) {
        close = tower.pos.findClosestByRange(Memory.badCreeps)
        var atk = tower.attack(close)
        if(close){
            if(atk != OK){
                console.log("Attack:", atk)
            }
        }
    }
};

module.exports = tower;