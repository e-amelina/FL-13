const fighterName = Symbol('name');
const fighterDamage = Symbol('fighter');
const fighterStrength = Symbol('strength');
const fighterAgility = Symbol('agility');
const fighterHp = Symbol('hp');
let wins = Symbol('wins');
let losses = Symbol('losses');
const MIN_POSIBILITY = 0;
const MAX_POSIBILITY = 100;
const MIN_HP = 0;
const MAX_HP = Symbol('MaxHP');


class Fighter {


    constructor({ name, damage, hp, strength, agility }) {
        this[fighterName] = name;
        this[fighterDamage] = damage;
        this[fighterStrength] = strength;
        this[fighterAgility] = agility;
        this[fighterHp] = hp;
        this[wins] = 0;
        this[losses] = 0;
        this[MAX_HP] = hp;
    }

    getName() {
        return this[fighterName];
    }

    getDamage() {
        return this[fighterDamage];
    }

    getStrength() {
        return this[fighterStrength];
    }

    getAgility() {
        return this[fighterAgility];
    }

    getHealth() {
        return this[fighterHp];
    }


    attack(anotherPlayer) {
        const name = anotherPlayer.getName();
        const strength = anotherPlayer.getStrength();
        const agility = anotherPlayer.getAgility();


        const rand = MIN_POSIBILITY + Math.random() * (MAX_POSIBILITY + 1 - MIN_POSIBILITY);
        if (rand < MAX_POSIBILITY - (strength + agility)) {
            anotherPlayer.dealDamage(this[fighterDamage]);

            console.log(this[fighterName] + ' makes ' + this[fighterDamage] + ' to ' + name);
            if (anotherPlayer.getHealth() === 0) {
                this.addWin();
                anotherPlayer.addLoss();
                console.log(this[fighterName] + ' has won!');
            }
        } else {
            console.log(this[fighterName] + ' attack missed');
        }
    }

    logCombatHistory() {
        console.log('Name: ' + this[fighterName] + ', Wins: ' + this[wins] + ', Losses: ' + this[losses]);
    }

    heal(countHP) {
        this[fighterHp] = this[fighterHp] + countHP;
        if (this[fighterHp] > this[MAX_HP]) {
            this[fighterHp] = this[MAX_HP];
        }
    }

    dealDamage(countDamage) {
        this[fighterHp] = this[fighterHp] - countDamage;
        if (this[fighterHp] < 0) {
            this[fighterHp] = 0;
        }
    }

    addWin() {
        this[wins] += 1;
    }

    addLoss() {
        this[losses] += 1;
    }
}

function battle(fighter1, fighter2) {
    if (fighter1.getHealth() === 0) {
        console.log(fighter1.getName() + 'is dead and can\'t fight.');
    }
    if (fighter2.getHealth() === 0) {
        console.log(fighter2.getName() + 'is dead and can\'t fight.');
    } else {
        for (; ;) {

            if (abilityToAttack(fighter1, fighter2)) {
                fighter1.attack(fighter2);
            } else {
                break;
            }
            if (abilityToAttack(fighter1, fighter2)) {
                fighter2.attack(fighter1);
            } else {
                break;
            }
        }
    }
}

function abilityToAttack(fighter1, fighter2) {
    if (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
        return true;
    } else {
        return false;
    }

}
