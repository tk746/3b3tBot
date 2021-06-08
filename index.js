const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')
const MinecraftData = require('minecraft-data')
const autoeat = require('mineflayer-auto-eat')
const fs = require('fs');
var navigatePlugin = require('mineflayer-navigate')(mineflayer);

let accountraw = fs.readFileSync('account.json');
let accountdata = JSON.parse(accountraw);

const bot = mineflayer.createBot({
    host: process.argv[2] || '147.135.124.101',
    port: process.argv[3] || '25565',
    username: process.argv[4] || accountdata['email'],
    password: process.argv[5] || accountdata['password'],
    logErrors: false
})

bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)
bot.loadPlugin(autoeat)
  navigatePlugin(bot);


bot.on('playerEquip', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
  }, 150)
})






let guardPos = null

function guardArea (pos) {
  guardPos = pos.clone()

  if (!bot.pvp.target) {
    moveToGuardPos()
  }
}

function stopGuarding () {
  guardPos = null
  bot.pvp.stop()
  bot.pathfinder.setGoal(null)
}

function moveToGuardPos () {
  const mcData = require('minecraft-data')(bot.version)
  bot.pathfinder.setMovements(new Movements(bot, mcData))
  bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
}



bot.on('stoppedAttacking', () => {
  if (guardPos) {
    moveToGuardPos()
  }
})

bot.on('physicTick', () => {
  if (bot.pvp.target) return
  if (bot.pathfinder.isMoving()) return

  const entity = bot.nearestEntity()
  if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
})

bot.on('physicTick', () => {
  if (!guardPos) return

  const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
                      e.mobType !== 'Armor Stand' // Mojang classifies armor stands as mobs for some reason?

  const entity = bot.nearestEntity(filter)
  if (entity) {
    bot.pvp.attack(entity)
  }

  const RANGE_GOAL = 3 // get within this radius of the player


})

// auto eat

bot.on("health", () => {
  if (bot.health === 20) bot.autoEat.disable()
  // Disable the plugin if the bot is at 20 food points
  else bot.autoEat.enable() // Else enable the plugin again
})
// come command


// WELCOMER

var items = [523, 3452, 334, 31];
var item = items[Math.floor(Math.random() * items.length)];

bot.on('playerJoined', (player) => {
  if (player.username !== bot.username) {
    bot.chat(item)
  }
})


bot.on('chat', (username, message) => {
  if (message === '!guard') {
    const player = bot.players[username]

    bot.on('chat',(username, message) => {
      if (message === '!follow') {
        bot.navigate.to [username] // WIP

        const RANGE_goal = 2

      }
    })

    if (!player) {
      bot.chat("> I can't see you.")
      return
    }

    bot.chat('> I will guard that location.')
    guardArea(player.entity.position)
  }

  if (message === '!fightme') {
    const player = bot.players[username]

    if (!player) {
      bot.chat("> I can't see you.")
      return
    }

    bot.chat('>Prepare to fight!')
    bot.pvp.attack(player.entity)
  }

  if (message === '!stop') {
    bot.chat('>I will no longer guard this area.')
    stopGuarding()
  }
// COMMANDS VVVV

setInterval(() => bot.chat('You can use !help to see my commands'), 600000)

  if (message === '!help') {
    bot.chat('>My commands so far are !discord, !fightme, !stop, !bruh, !guard, !kys, and !ping')
  }

  if (message === '!discord') {
    bot.chat('> 3B3T Discord: https://discord.gg/FtGvtjbNef')
  }

  if (message === '!kys') {
    bot.chat('> okay bet')
    bot.chat('/kill')
  }



  if (message === '!ping') {
    bot.chat('> Pong!')
  }

  if (message === '!bruh') {
    bot.chat('> bruh moment')
  }

  if (message === '!author') {
    bot.chat('>  tk746 is the author of 3b3tbot :)')
  }

  if (message === '!locate') {
    bot.chat('my location is X: '+ bot.entity.position.x + ' Y:' + bot.entity.position.y + ' Z:' + bot.entity.position.z)
  }

  

  })