function toPlay(input) {
    document.getElementById("damage").innerHTML = "Current Damage";
    document.getElementById("damageValue").innerHTML = damageGenerator();
    document.getElementById("playerBar").innerHTML = "100 / 100";
    document.getElementById("playerH").style.width = "100%";
    document.getElementById("playerH").style["background-color"] = "rgba(0, 255, 0, 0.5)";
    document.getElementById("computerH").style["background-color"] = "rgba(0, 255, 0, 0.5)";
    document.getElementById("computerBar").innerHTML = "100 / 100";
    document.getElementById("computerH").style.width = "100%";
    document.getElementById("playerStatus").innerHTML = "This is Your Status";
    document.getElementById("computerStatus").innerHTML = "This is Computer Status";
    document.getElementById("play").innerHTML = "RESET";
    document.getElementById("attacking").innerHTML = "NOW ATTACK!";
    document.getElementById("defending").innerHTML = "DEFEND!";
}

function inputClick(input) {
    var players = [];
    var damage = 0;
    var attacking = true;
    var notPlay = true;
    var player = {
        Health: Number(document.getElementById("playerBar").innerHTML.split("/")[0]),
        Input: input,
    }
    var com = {
        Health: Number(document.getElementById("computerBar").innerHTML.split("/")[0]),
        Input: "",
    }

    var status = document.getElementById("damageValue").innerHTML;
    if (status.length !== 0 && player.Health !== 0 && com.Health !== 0) {
        notPlay = false;
    }

    if (notPlay && (player.Input === "attack" || player.Input === "snap" || player.Input === "dodge" || player.Input === "staystill")) {
        document.getElementById("playerStatus").innerHTML = "Play the game first!";
        document.getElementById("computerStatus").innerHTML = "Click Play Button!";
    } else {
        attacking = true;
        if (document.getElementById("attacking").innerHTML !== "NOW ATTACK!" && document.getElementById("defending").innerHTML === "NOW DEFEND!") {
            attacking = false;
        }
    
        if (attacking) {
            if (player.Input === "dodge" || player.Input === "staystill") {
                document.getElementById("playerStatus").innerHTML = "You are attacking!";
                document.getElementById("computerStatus").innerHTML = "Computer is defending!";    
            } else {
                damage = Number(document.getElementById("damageValue").innerHTML);
                console.log(">> Damage Before Status:", damage);
                document.getElementById("damageValue").innerHTML = damageGenerator();
        
                com.Input = defenseCaseGenerator();
                document.getElementById("playerStatus").innerHTML = "You " + player.Input;
                document.getElementById("computerStatus").innerHTML = "Computer " + com.Input;
        
                players = plak([player, com, attacking], damage);
                player = players[0];
                com = players[1];
                attacking = players[2];

                if (player.Health <= 0) {
                    player.Health = 0;
                    document.getElementById("playerStatus").innerHTML = "YOU LOSE!";
                    document.getElementById("computerStatus").innerHTML = "COMPUTER WIN!"; 
                    document.getElementById("play").innerHTML = "REPLAY";
                }
                if (com.Health <= 0) {
                    com.Health = 0;
                    document.getElementById("playerStatus").innerHTML = "YOU WIN!";
                    document.getElementById("computerStatus").innerHTML = "COMPUTER LOSE!"; 
                    document.getElementById("play").innerHTML = "REPLAY";
                }
        
                document.getElementById("playerBar").innerHTML = player.Health + " / 100";
                document.getElementById("playerH").style.width = player.Health + "%";
                if (player.Health < 60) {
                    document.getElementById("playerH").style["background-color"] = "rgba(255, 255, 0, 0.5)";
                }
                if (player.Health < 30) {
                    document.getElementById("playerH").style["background-color"] = "rgba(255, 0, 0, 0.5)";
                }
                document.getElementById("computerBar").innerHTML = com.Health + " / 100";
                document.getElementById("computerH").style.width = com.Health + "%";
                if (com.Health < 60) {
                    document.getElementById("computerH").style["background-color"] = "rgba(255, 255, 0, 0.5)";
                }
                if (com.Health < 30) {
                    document.getElementById("computerH").style["background-color"] = "rgba(255, 0, 0, 0.5)";
                }
            } 
        } else {
            if (player.Input === "attack" || player.Input === "snap") {
                document.getElementById("playerStatus").innerHTML = "You are defending!";
                document.getElementById("computerStatus").innerHTML = "Computer is attacking!";
            } else {
                damage = Number(document.getElementById("damageValue").innerHTML);
                document.getElementById("damageValue").innerHTML = damageGenerator();
    
                com.Input = attackCaseGenerator();
                document.getElementById("playerStatus").innerHTML = "You " + player.Input;
                document.getElementById("computerStatus").innerHTML = "Computer " + com.Input;
        
                players = plak([com, player, attacking], damage);
                player = players[1];
                com = players[0];
                attacking = players[2];

                if (player.Health <= 0) {
                    player.Health = 0;
                    document.getElementById("playerStatus").innerHTML = "YOU LOSE!";
                    document.getElementById("computerStatus").innerHTML = "COMPUTER WIN!"; 
                    document.getElementById("play").innerHTML = "REPLAY";
                }
                if (com.Health <= 0) {
                    com.Health = 0;
                    document.getElementById("playerStatus").innerHTML = "YOU WIN!";
                    document.getElementById("computerStatus").innerHTML = "COMPUTER LOSE!"; 
                    document.getElementById("play").innerHTML = "REPLAY";
                }
                
                document.getElementById("playerBar").innerHTML = player.Health + " / 100";
                document.getElementById("playerH").style.width = player.Health + "%";
                if (player.Health < 60) {
                    document.getElementById("playerH").style["background-color"] = "rgba(255, 255, 0, 0.5)";
                }
                if (player.Health < 30) {
                    document.getElementById("playerH").style["background-color"] = "rgba(255, 0, 0, 0.5)";
                }
                document.getElementById("computerBar").innerHTML = com.Health + " / 100";
                document.getElementById("computerH").style.width = com.Health + "%";
                if (com.Health < 60) {
                    document.getElementById("computerH").style["background-color"] = "rgba(255, 255, 0, 0.5)";
                }
                if (com.Health < 30) {
                    document.getElementById("computerH").style["background-color"] = "rgba(255, 0, 0, 0.5)";
                }
            }
        }

        if (attacking) {
            document.getElementById("attacking").innerHTML = "NOW ATTACK!"
            document.getElementById("defending").innerHTML = "DEFEND!"
        } else {
            document.getElementById("attacking").innerHTML = "ATTACK!"
            document.getElementById("defending").innerHTML = "NOW DEFEND!"
        }
    }
}

function plak(players, damage) {
    if (players[0].Input === "attack") {
        if (players[1].Input === "dodge") {
            players[2] = !players[2];
        } else if (players[1].Input === "staystill") {
            players[1].Health -= attack(damage, players[0].Input);
        }
    } else if (players[0].Input === "snap") {
        if (players[1].Input === "dodge") {
            players[1].Health -= attack(damage, players[0].Input);
        } else if (players[1].Input === "staystill") {
            players[2] = !players[2];
        }
    }

    return players;
}

function attack(damage, attackCase) {
    if (attackCase === "attack") {
        return damage;
    } else if (attackCase === "snap") {
        return 2 * damage;
    }

    return 0;
}

function defense(defenseCase) {
    if (defenseCase === "dodge") {
        return true;
    } else if (defenseCase === "staystill") {
        return false;
    }

    return false;
}

function damageGenerator() {
    var highProb = Math.round(Math.random() * 3);

    if(Math.round(Math.random() * 3) === 3) {
        return Math.round(Math.random() * 20) + 70;    
    } else {
        return Math.round(Math.random() * 40);
    }
}

function attackCaseGenerator(attackCase) {
    var a = Math.round(Math.random());

    if(!attackCase) {
        if (a === 0) {
            return "attack"
        } else {
            return "snap"
        }
    } else {
        return attackCase;
    }
}

function defenseCaseGenerator(defenseCase) {
    var d = Math.round(Math.random());

    if (!defenseCase) {
        if (d === 0) {
            return "dodge"
        } else {
            return "staystill"
        }
    } else {
        return defenseCase;
    }
}
