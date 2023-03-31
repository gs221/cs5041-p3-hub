function playerExists (player: string, player_list: any[]) {
    // check if the player is in the player list
    for (let i = 0; i <= player_list.length - 1; i++) {
        if (player_list[i] == player) {
            return true
        }
    }
    return false
}
// :: to do::
radio.onReceivedString(function (receivedString) {
    let player: string;
let messageParts = _py.py_string_split(receivedString, ":")
// maybe sent to serials??
    if (messageParts[0] == "register") {
        player = player_id++ + "";
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
        
        radio.sendString(messageParts[1].trim() + ":" + player)

        serial.writeLine("register:" + player)
        radio.sendString(receivedString)
        // if the player is not in the list, add to the list
        if (playerExists(player, player_list) == false) {
            player_list.push(player)
        }
        // send palyer list to controllers
        playerListString = "pl:" + player_list.join("")
        radio.sendString(playerListString)
    }
    if (messageParts[0] == "vote") {
        serial.writeLine(receivedString)
    }
    if (messageParts[0] == "kills") {
        serial.writeLine(receivedString)
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    info = serial.readLine()
    radio.sendString(info)
})
let info = ""
let playerListString = ""
let info3 = ""
let info2 = ""
let player_list: string[] = []
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
// start
let stage = "register"
radio.setGroup(1)
let player_id = 1;
